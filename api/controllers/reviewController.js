import reviewService from '../services/reviewService'

export default {
  async getReviews(req, res) {
    try {
      const result = await reviewService.findAllReviews()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error,
      })
    }
  },
  async getReviewById(req, res) {
    try {
      const { id } = req.params
      const result = await reviewService.findReviewById(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error,
      })
    }
  },
  async getReviewsByRevieweeId(req, res) {
    try {
      const { revieweeId } = req.params
      const result = await reviewService.findReviewsByRevieweeId(revieweeId)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error,
      })
    }
  },
  async getReviewsByReviewerId(req, res) {
    try {
      const { reviewerId } = req.params
      const result = await reviewService.findReviewsByReviewerId(reviewerId)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error,
      })
    }
  },
  async createReview(req, res) {
    const newReview = req.body
    try {
      reviewService
        .create(newReview)
        .then((createdReview) => res.json(createdReview))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async updateReview(req, res) {
    const { id } = req.params
    const updatedReview = req.body
    try {
      reviewService.update(id, updatedReview).then((review) => res.json(review))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
}
