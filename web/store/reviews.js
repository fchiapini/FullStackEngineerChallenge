export const state = () => ({
  reviewsAsReviewee: [],
  reviewsAsReviewer: []
})

export const mutations = {
  SET_REVIEWS_AS_REVIEWEE(state, reviews) {
    state.reviewsAsReviewee = reviews
  },
  SET_REVIEWS_AS_REVIEWER(state, reviews) {
    state.reviewsAsReviewer = reviews
  },
  ADD_REVIEW(state, review) {
    state.reviewsAsReviewee.push(review)
  },
  UPDATE_REVIEW_AS_REVIEWEE(state, updatedReview) {
    const editedIndex = state.reviewsAsReviewee.findIndex(
      (review) => review.id === updatedReview.id
    )
    Object.assign(state.reviewsAsReviewee[editedIndex], updatedReview)
  },
  UPDATE_REVIEW_AS_REVIEWER(state, updatedReview) {
    const editedIndex = state.reviewsAsReviewer.findIndex(
      (review) => review.id === updatedReview.id
    )
    Object.assign(state.reviewsAsReviewer[editedIndex], updatedReview)
  }
}

export const actions = {
  async fetchReviewsAsReviewee({ commit }, employeeId) {
    const response = await this.$axios.get(
      `/employees/${employeeId}/reviewee-reviews`
    )
    commit('SET_REVIEWS_AS_REVIEWEE', response.data)
  },
  async fetchReviewsAsReviewer({ commit }, employeeId) {
    const response = await this.$axios.get(
      `/employees/${employeeId}/reviewer-reviews`
    )
    commit('SET_REVIEWS_AS_REVIEWER', response.data)
  },
  async createReview({ commit }, newReview) {
    const response = await this.$axios.post('/reviews', newReview)
    commit('ADD_REVIEW', response.data)
  },
  async updateReviewAsReviewee({ commit }, updatedReview) {
    const response = await this.$axios.put(
      `/reviews/${updatedReview.id}`,
      updatedReview
    )
    commit('UPDATE_REVIEW_AS_REVIEWEE', response.data)
  },
  async updateReviewAsReviewer({ dispatch, commit }, updatedReview) {
    const response = await this.$axios.put(
      `/reviews/${updatedReview.id}`,
      updatedReview
    )
    commit('UPDATE_REVIEW_AS_REVIEWER', response.data)
    dispatch('fetchReviewsAsReviewer', updatedReview.reviewer.id)
  }
}
