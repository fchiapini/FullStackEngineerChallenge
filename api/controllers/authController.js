import employeeService from '../services/employeeService'
import jwt from 'jsonwebtoken'

export default {
  async login(req, res) {
    const { email, password } = req.body

    const employee = await employeeService.findEmployeeByEmail(email)

    if (!employee) return res.status(400).send('Email account does not exist!')

    if (employee.password_hash !== password)
      return res.status(400).send('Incorrect Password!')

    const token = jwt.sign(
      { id: employee.id, isAdmin: employee.is_admin },
      process.env.TOKEN_SECRET,
      { expiresIn: '1800s' }
    )

    res.header('auth-token', token).send({ token })
  },

  async me(req, res) {
    const { user } = req
    try {
      const employee = await employeeService.findEmployeeById(user.id)
      res.json({ data: employee })
    } catch (error) {
      res.sendStatus(500, error.message)
    }
  },
}
