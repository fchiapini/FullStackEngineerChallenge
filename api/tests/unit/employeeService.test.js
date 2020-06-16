import employeeService from '../../services/employeeService'
import { truncateDatabase } from './testUtils'

beforeEach(async () => {
  await truncateDatabase()
})

function buildEmployee() {
  return {
    first_name: 'Felipe',
    last_name: 'Chiapini',
    position: 'Software Engineer',
    email: 'felipe@example.com',
    password_hash: '123456',
  }
}

describe('Create', () => {
  it('should create employee with valid parameters', async () => {
    const newEmployee = buildEmployee()
    const createdEmployee = await employeeService.create(newEmployee)
    expect(createdEmployee.email).toBe(newEmployee.email)
  })
})

describe('Update', () => {
  it('should update employee with valid parameters', async () => {
    const employee = buildEmployee()
    const employeeToBeUpdated = await employeeService.create(employee)

    const updatedEmployee = await employeeService.update(
      employeeToBeUpdated.id,
      {
        first_name: 'Philip',
        last_name: 'Chiapini',
        position: 'Tech Lead',
        email: 'philip@example.com',
        password_hash: '12345678910',
      }
    )

    expect(updatedEmployee.first_name).toBe('Philip')
    expect(updatedEmployee.last_name).toBe('Chiapini')
    expect(updatedEmployee.position).toBe('Tech Lead')
    expect(updatedEmployee.email).toBe('philip@example.com')
    expect(updatedEmployee.password_hash).toBe('12345678910')
  })
})

describe('Delete', () => {
  it('should delete employee with valid id', async () => {
    const employee = buildEmployee()
    const employeeToBeDeleted = await employeeService.create(employee)

    await employeeService.delete(employeeToBeDeleted.id)

    const deletedEmployee = await employeeService.findEmployeeById(
      employeeToBeDeleted.id
    )

    expect(deletedEmployee).toBeNull()
  })
})
