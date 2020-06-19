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
  async fetchEmployees({ commit }) {
    const response = await this.$axios.get('/employees')
    commit('SET_EMPLOYEES', response.data)
  },
  async fetchEmployee({ commit }, id) {
    const response = await this.$axios.get(`/employees/${id}`)
    commit('SET_EMPLOYEE', response.data)
  },
  async createEmployee({ commit }, newEmployee) {
    const response = await this.$axios.post('/employees', newEmployee)
    commit('ADD_EMPLOYEE', response.data)
  },
  async updateEmployee({ commit }, updatedEmployee) {
    const response = await this.$axios.put(
      `/employees/${updatedEmployee.id}`,
      updatedEmployee
    )
    commit('UPDATE_EMPLOYEE', response.data)
  },
  async deleteEmployee({ commit }, deletedEmployee) {
    await this.$axios.delete(`/employees/${deletedEmployee.id}`)
    commit('DELETE_EMPLOYEE', deletedEmployee)
  }
}
