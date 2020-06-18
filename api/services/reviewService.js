import db from '../database/models'

export default {
  async findReviewById(id) {
    return await db.sequelize.transaction(async (t) => {
      return await db.review.findByPk(id, {
        include: [
          {
            association: 'reviewer',
            attributes: ['id', 'name', 'position', 'email'],
          },
          {
            association: 'reviewee',
            attributes: ['id', 'name', 'position', 'email'],
          },
        ],
      })
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
        return await db.review.findAll({
          include: [
            {
              association: 'reviewer',
              attributes: ['id', 'name', 'position', 'email'],
            },
            {
              association: 'reviewee',
              attributes: ['id', 'name', 'position', 'email'],
            },
          ],
          order: [['updatedAt', 'DESC']],
          where: { reviewer_id: id },
        })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async findReviewsByRevieweeId(id) {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.review.findAll({
          include: [
            {
              association: 'reviewer',
              attributes: ['id', 'name', 'position', 'email'],
            },
            {
              association: 'reviewee',
              attributes: ['id', 'name', 'position', 'email'],
            },
          ],
          order: [['updatedAt', 'DESC']],
          where: { reviewee_id: id },
        })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async create({ feedback, reviewer_id, reviewee_id }) {
    console.log('Reviewer: ' + reviewer_id)
    return await db.sequelize.transaction(async (t) => {
      try {
        const created = await db.review.create({
          feedback: feedback,
          reviewer_id: reviewer_id,
          reviewee_id: reviewee_id,
        })

        return await this.findReviewById(created.id)
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async update(id, { reviewer_id, feedback }) {
    return await db.sequelize.transaction(async (t) => {
      try {
        const review = await db.review.findByPk(id)
        review.reviewer_id = reviewer_id
        review.feedback = feedback
        review.isReviewed = true
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
