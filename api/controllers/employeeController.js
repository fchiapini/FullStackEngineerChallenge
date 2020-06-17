import employeeService from '../services/employeeService'

export default {
  async getEmployees(req, res) {
    try {
      const result = await employeeService.findAllEmployees()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error,
      })
    }
  },
  async createEmployee(req, res) {
    const newEmployee = req.body
    try {
      employeeService
        .create(newEmployee)
        .then((createdEmployee) => res.json(createdEmployee))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async updateEmployee(req, res) {
    const { id } = req.params
    const updatedEmployee = req.body
    try {
      employeeService
        .update(id, updatedEmployee)
        .then((employee) => res.json(employee))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async deleteEmployee(req, res) {
    const { id } = req.params
    try {
      employeeService.delete(id).then(() => res.sendStatus(200))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
}
