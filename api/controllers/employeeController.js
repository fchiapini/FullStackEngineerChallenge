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
      employeeService.create(newEmployee).then((post) => res.json(post))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
  async updateEmployee(req, res) {
    const { id } = req.params
    const updatedEmployee = req.body
    try {
      employeeService.update(id, updatedEmployee).then((post) => res.json(post))
    } catch (error) {
      res.sendStatus(500, error)
    }
  },
}
