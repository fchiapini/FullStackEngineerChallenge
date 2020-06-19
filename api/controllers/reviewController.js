import reviewService from '../services/reviewService'

export default {
  async getReviews(req, res) {
    try {
      const result = await reviewService.findAllReviews()
      res.json(result)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async getReviewById(req, res) {
    try {
      const { id } = req.params
      const result = await reviewService.findReviewById(id)
      res.json(result)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async getReviewsByRevieweeId(req, res) {
    try {
      const { revieweeId } = req.params
      const { user } = req

      if (!user.isAdmin && user.id != revieweeId)
        res
          .sendStatus(403)
          .send('Forbidden! You only have access to your own reviews')
      const result = await reviewService.findReviewsByRevieweeId(revieweeId)
      res.json(result)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async getReviewsByReviewerId(req, res) {
    try {
      const { reviewerId } = req.params
      const { user } = req

      if (!user.isAdmin && user.id != reviewerId)
        res
          .sendStatus(403)
          .send('Forbidden! You only have access to your own reviews')

      const result = await reviewService.findReviewsByReviewerId(reviewerId)
      res.json(result)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async createReview(req, res) {
    const newReview = req.body
    try {
      const created = await reviewService.create(newReview)
      res.json(created)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async updateReview(req, res) {
    const { id } = req.params
    const updatedReview = req.body
    try {
      const updated = await reviewService.update(id, updatedReview)
      res.json(updated)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
}
