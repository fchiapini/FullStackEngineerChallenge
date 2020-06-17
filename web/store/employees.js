import EmployeeService from '@/services/EmployeeService.js'

export const state = () => ({
  employees: [],
  employee: {}
})

export const mutations = {
  SET_EMPLOYEES(state, employees) {
    state.employees = employees
  },
  SET_EMPLOYEE(state, employee) {
    state.employee = employee
  },
  ADD_EMPLOYEE(state, employee) {
    state.employees.push(employee)
  },
  UPDATE_EMPLOYEE(state, updatedEmployee) {
    const editedIndex = state.employees.findIndex(
      (employee) => employee.id === updatedEmployee.id
    )
    Object.assign(state.employees[editedIndex], updatedEmployee)
  },
  DELETE_EMPLOYEE(state, deletedEmployee) {
    const deletedIndex = state.employees.findIndex(
      (employee) => employee.id === deletedEmployee.id
    )
    state.employees.splice(deletedIndex, 1)
  }
}

export const actions = {
  fetchEmployees({ commit }) {
    return EmployeeService.getEmployees().then((response) => {
      commit('SET_EMPLOYEES', response.data)
    })
  },
  fetchEvent({ commit }, id) {
    return EmployeeService.getEmployee(id).then((response) => {
      commit('SET_EMPLOYEE', response.data)
    })
  },
  createEmployee({ commit }, newEmployee) {
    return EmployeeService.create(newEmployee).then((response) => {
      commit('ADD_EMPLOYEE', response.data)
    })
  },
  updateEmployee({ commit }, updatedEmployee) {
    return EmployeeService.update(updatedEmployee).then((response) => {
      commit('UPDATE_EMPLOYEE', response.data)
    })
  },
  deleteEmployee({ commit }, deletedEmployee) {
    return EmployeeService.delete(deletedEmployee.id).then((response) => {
      commit('DELETE_EMPLOYEE', deletedEmployee)
    })
  }
}
