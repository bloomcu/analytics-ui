import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const stripeApi = {  
    test(organizationSlug, params) {
      return HttpClient.post(`/${organizationSlug}/stripe/checkout`, params)
    },
}

export { stripeApi }
