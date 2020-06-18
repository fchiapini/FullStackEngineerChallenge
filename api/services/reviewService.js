import db from '../database/models'
const { Op } = require('sequelize')

export default {
  async findReviewById(id) {
    return await db.sequelize.transaction(async (t) => {
      return await db.review.findByPk(id, {
        include: [
          {
            association: 'reviewer',
            attributes: { exclude: ['password_hash'] },
          },
          {
            association: 'reviewee',
            attributes: { exclude: ['password_hash'] },
          },
        ],
      })
    })
  },
  async findAllReviews() {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.review.findAll({
          include: [
            {
              association: 'reviewer',
              attributes: { exclude: ['password_hash'] },
            },
            {
              association: 'reviewee',
              attributes: { exclude: ['password_hash'] },
            },
          ],
        })
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
              attributes: { exclude: ['password_hash'] },
            },
            {
              association: 'reviewee',
              attributes: { exclude: ['password_hash'] },
            },
          ],
          where: {
            [Op.and]: [{ reviewer_id: id }, { is_reviewed: false }],
          },
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
              attributes: { exclude: ['password_hash'] },
            },
            {
              association: 'reviewee',
              attributes: { exclude: ['password_hash'] },
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

        if (feedback) review.is_reviewed = true
        else review.is_reviewed = false

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
