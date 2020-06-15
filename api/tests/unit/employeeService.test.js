const employeeService = require('../../services/employeeService')

describe('Create', () => {
  it('should create employee with valid parameters', async () => {
    const newEmployee = {
      first_name: 'Felipe',
      last_name: 'Chiapini',
      position: 'Software Engineer',
      email: 'felipe@example.com',
      password_hash: '123456',
    }

    await employeeService.create(newEmployee)
    const savedEmployee = await employeeService.findEmployeeByEmail(
      newEmployee.email
    )

    expect(savedEmployee.email).toBe(newEmployee.email)
  })
})

describe('Update', () => {
  it('should update employee with valid parameters', async () => {
    const newEmployee = {
      first_name: 'Felipe',
      last_name: 'Chiapini',
      position: 'Software Engineer',
      email: 'felipe2@example.com',
      password_hash: '123456',
    }

    await employeeService.create(newEmployee)
    const updateEmployee = await employeeService.findEmployeeByEmail(
      newEmployee.email
    )

    await employeeService.update(updateEmployee.id, {
      first_name: 'Philip',
      last_name: 'Chiapini',
      position: 'Tech Lead',
      email: 'philip@example.com',
      password_hash: '12345678910',
    })

    const updatedEmployee = await employeeService.findEmployeeByEmail(
      'philip@example.com'
    )

    expect(updatedEmployee.first_name).toBe('Philip')
  })
})

describe('Delete', () => {
  it('should delete employee with valid id', async () => {
    const employeeToBeDeleted = {
      first_name: 'Felipe',
      last_name: 'Chiapini',
      position: 'Software Engineer',
      email: 'felipe3@example.com',
      password_hash: '123456',
    }

    await employeeService.create(employeeToBeDeleted)
    const savedEmployee = await employeeService.findEmployeeByEmail(
      employeeToBeDeleted.email
    )

    await employeeService.delete(savedEmployee.id)

    const deletedEmployee = await employeeService.findEmployeeById(
      employeeToBeDeleted.id
    )

    expect(deletedEmployee).toBeNull()
  })
})
