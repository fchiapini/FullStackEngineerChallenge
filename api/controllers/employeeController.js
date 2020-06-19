import employeeService from '../services/employeeService'

export default {
  async getEmployees(req, res) {
    try {
      const result = await employeeService.findAllEmployees()
      res.json(result)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async getEmployeeById(req, res) {
    try {
      const { id } = req.params
      const result = await employeeService.findEmployeeById(id)
      res.json(result)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async createEmployee(req, res) {
    const newEmployee = req.body
    try {
      const created = await employeeService.create(newEmployee)
      res.json(created)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async updateEmployee(req, res) {
    const { id } = req.params
    const updatedEmployee = req.body
    try {
      const updated = await employeeService.update(id, updatedEmployee)
      res.json(updated)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async deleteEmployee(req, res) {
    const { id } = req.params
    try {
      await employeeService.delete(id)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
}
