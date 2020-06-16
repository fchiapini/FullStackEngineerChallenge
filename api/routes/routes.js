import express from 'express'
import employeeController from '../controllers/employeeController'

const routes = express.Router()

routes.get('/employees', employeeController.getEmployees)

routes.post('/employees', employeeController.createEmployee)

routes.put('/employees/:id', employeeController.updateEmployee)

export default routes
