import express from 'express'
import employeeController from '../controllers/employeeController'
import reviewController from '../controllers/reviewController'
import { authenticateToken } from '../middleware/authenticateToken'
import { permit } from '../middleware/permission'

const routes = express.Router()

const ONLY_ADMIN = true

routes.get(
  '/employees',
  authenticateToken,
  permit(ONLY_ADMIN),
  employeeController.getEmployees
)

routes.get(
  '/employees/:id',
  authenticateToken,
  employeeController.getEmployeeById
)

routes.post(
  '/employees',
  authenticateToken,
  permit(ONLY_ADMIN),
  employeeController.createEmployee
)

routes.put(
  '/employees/:id',
  authenticateToken,
  permit(ONLY_ADMIN),
  employeeController.updateEmployee
)

routes.delete(
  '/employees/:id',
  authenticateToken,
  permit(ONLY_ADMIN),
  employeeController.deleteEmployee
)

routes.get(
  '/reviews',
  authenticateToken,
  permit(ONLY_ADMIN),
  reviewController.getReviews
)

routes.get(
  '/reviews/:id',
  authenticateToken,
  permit(ONLY_ADMIN),
  reviewController.getReviewById
)

routes.post(
  '/reviews',
  authenticateToken,
  permit(ONLY_ADMIN),
  reviewController.createReview
)

routes.put('/reviews/:id', authenticateToken, reviewController.updateReview)

routes.get(
  '/employees/:revieweeId/reviewee-reviews',
  authenticateToken,
  permit(ONLY_ADMIN),
  reviewController.getReviewsByRevieweeId
)

routes.get(
  '/employees/:reviewerId/reviewer-reviews',
  authenticateToken,
  reviewController.getReviewsByReviewerId
)

export default routes
