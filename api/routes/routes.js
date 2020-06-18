import express from 'express'
import employeeController from '../controllers/employeeController'
import reviewController from '../controllers/reviewController'
import employeeService from '../services/employeeService'

const routes = express.Router()

routes.get('/employees', employeeController.getEmployees)

routes.get('/employees/:id', employeeController.getEmployeeById)

routes.post('/employees', employeeController.createEmployee)

routes.put('/employees/:id', employeeController.updateEmployee)

routes.delete('/employees/:id', employeeController.deleteEmployee)

routes.get('/reviews', reviewController.getReviews)

routes.get('/reviews/:id', reviewController.getReviewById)

routes.get(
  '/employees/:revieweeId/reviewee-reviews',
  reviewController.getReviewsByRevieweeId
)

routes.get(
  '/employees/:reviewerId/reviewer-reviews',
  reviewController.getReviewsByReviewerId
)

routes.post('/reviews', reviewController.createReview)

routes.put('/reviews/:id', reviewController.updateReview)

export default routes
