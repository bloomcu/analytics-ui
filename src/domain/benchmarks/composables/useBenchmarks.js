import { ref, computed } from 'vue'
import { benchmarkApi } from '@/domain/benchmarks/api/benchmarkApi.js'

let benchmarks = ref()
let benchmark = ref()
let isBenchmarksLoading = ref(false)

export default function useBenchmarks() {
  async function indexBenchmarks(params) {
    isBenchmarksLoading.value = true

    await benchmarkApi.index(params).then(response => {
      benchmarks.value = response.data.data
      isBenchmarksLoading.value = false
    })
  }

  async function storeBenchmark(benchmark) {
    await benchmarkApi.store(benchmark).then(response => {
      benchmark.value = response.data.data
      return benchmark
    })
  }

  async function showBenchmark(id) {
    await benchmarkApi.show(id).then(response => {
      benchmark.value = response.data.data
    })
  }

  async function updateBenchmark(benchmarkId, request) {
    return await benchmarkApi.update(benchmarkId, request).then(response => {
      // update benchmark
      benchmark.value = response.data.data
      
      // update benchmark in benchmarks array
      const index = benchmarks.value.findIndex((benchmark) => benchmark.id === benchmarkId)
      benchmarks.value[index] = response.data.data

      return response.data.data
    })
  }

  async function destroyBenchmark(id) {
    await benchmarkApi.destroy(id).then(response => {
      benchmark.value = null
      benchmarks.value = benchmarks.value.filter((benchmark) => benchmark.id !== id)
    })
  }

  return {
    benchmarks: computed(() => benchmarks.value),
    benchmark: computed(() => benchmark.value),
    isBenchmarksLoading: computed(() => isBenchmarksLoading.value),
    indexBenchmarks,
    storeBenchmark,
    showBenchmark,
    updateBenchmark,
    destroyBenchmark,
  }
}