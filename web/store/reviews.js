import ReviewService from '@/services/ReviewService.js'

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
  fetchReviewsAsReviewee({ commit }, employeeId) {
    return ReviewService.getReviewsByEmployeeIdAsReviewee(employeeId).then(
      (response) => {
        commit('SET_REVIEWS_AS_REVIEWEE', response.data)
      }
    )
  },
  fetchReviewsAsReviewer({ commit }, employeeId) {
    return ReviewService.getReviewsByEmployeeIdAsReviewer(employeeId).then(
      (response) => {
        commit('SET_REVIEWS_AS_REVIEWER', response.data)
      }
    )
  },
  createReview({ commit }, newReview) {
    return ReviewService.create(newReview).then((response) => {
      commit('ADD_REVIEW', response.data)
    })
  },
  updateReviewAsReviewee({ commit }, updatedReview) {
    return ReviewService.update(updatedReview).then((response) => {
      commit('UPDATE_REVIEW_AS_REVIEWEE', response.data)
    })
  },
  updateReviewAsReviewer({ dispatch, commit }, updatedReview) {
    return ReviewService.update(updatedReview).then((response) => {
      commit('UPDATE_REVIEW_AS_REVIEWER', response.data)
      dispatch('fetchReviewsAsReviewer', updatedReview.reviewer.id)
    })
  }
}
