import db from '../database/models'

export default {
  async findEmployeeById(id) {
    return await db.sequelize.transaction(async (t) => {
      return await db.employee.findByPk(id)
    })
  },
  async findAllEmployees() {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.employee.findAll()
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async findEmployeeByEmail(email) {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.employee.findOne({ where: { email: email } })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async create({ name, position, email, password_hash }) {
    return await db.sequelize.transaction(async (t) => {
      try {
        return await db.employee.create({
          name: name,
          position: position,
          email: email,
          password_hash: password_hash,
        })
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async update(id, { name, position, email, password_hash }) {
    return await db.sequelize.transaction(async (t) => {
      try {
        const employee = await db.employee.findByPk(id)
        employee.name = name
        employee.position = position
        employee.email = email
        employee.password_hash = password_hash
        return await employee.save()
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
  async delete(id) {
    return await db.sequelize.transaction(async (t) => {
      try {
        const employee = await db.employee.findByPk(id)
        if (employee) employee.destroy()
      } catch (e) {
        throw new Error(e.message)
      }
    })
  },
}
