import db from '../database/models'

export default {
  async findReviewById(id) {
    return await db.sequelize.transaction(async (t) => {
      return await db.review.findByPk(id)
    })
  },
  async findAllReviews() {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.review.findAll()
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async findReviewsByReviewerId(id) {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.review.findAll({ where: { reviewer_id: id } })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async findReviewsByRevieweeId(id) {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.review.findAll({ where: { reviewee_id: id } })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async create(feedback, reviewer_id, reviewee_id) {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.review.create({
          feedback: feedback,
          reviewer_id: reviewer_id,
          reviewee_id: reviewee_id,
        })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async update(id, feedback) {
    return await db.sequelize.transaction(async (t) => {
      try {
        const review = await db.review.findByPk(id)
        console.log(review)
        review.feedback = feedback
        return await review.save()
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async delete(id) {
    return await db.sequelize.transaction(async (t) => {
      try {
        const review = await db.review.findByPk(id)
        if (review) review.destroy()
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
}
