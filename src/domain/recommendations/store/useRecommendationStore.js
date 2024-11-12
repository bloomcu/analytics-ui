import { defineStore, acceptHMRUpdate } from 'pinia'
import { recommendationsApi as RecommendationsApi } from '@/domain/recommendations/api/recommendationsApi'

export const useRecommendationStore = defineStore('recommendationStore', {
    state: () => ({
        recommendation: null,
        recommendations: [],
        isLoading: false,
    }),
    
    actions: {
      index(organizationSlug, dashboardId, params) {
        this.analyses = []

        RecommendationsApi.index(organizationSlug, dashboardId, params)
          .then(response => {
            this.recommendations = response.data.data
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },

      async store(organizationSlug, dashboardId, recommendation) {
        this.isLoading = true

        return await RecommendationsApi.store(organizationSlug, dashboardId, recommendation)
          .then(response => {
            console.log('Response from recommendation store', response)
            this.recommendation = response.data.data
            this.recommendations.unshift(response.data.data)
            this.isLoading = false
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
      
      async show(organizationSlug, dashboardId, id) {
        this.isLoading = true
        
        return await RecommendationsApi.show(organizationSlug, dashboardId, id)
          .then(response => {
            this.recommendation = response.data.data
            this.isLoading = false
          })
      },

      async attachFile(organizationSlug, recommendationId, fileIds, type) {
        return await RecommendationsApi.attachFile(organizationSlug, recommendationId, fileIds, type)
          .then(response => {
            console.log('Response', response.data.data)
            // this.recommendation.files.unshift(response.data.data)
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRecommendationStore, import.meta.hot))
}
