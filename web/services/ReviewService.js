import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getReviews() {
    return apiClient.get('/reviews')
  },

  getReviewById(id) {
    return apiClient.get(`/reviews/${id}`)
  },

  getReviewsByEmployeeIdAsReviewer(employeeId) {
    return apiClient.get(`/employees/${id}/reviewer-reviews`)
  },

  getReviewsByEmployeeIdAsReviewee(employeeId) {
    return apiClient.get(`/employees/${id}/reviewee-reviews`)
  },

  create(review) {
    return apiClient.post('/reviews', review)
  },

  update(review) {
    return apiClient.put(`/reviews/${review.id}`, review)
  }
}
