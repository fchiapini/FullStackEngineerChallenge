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
  }
}
