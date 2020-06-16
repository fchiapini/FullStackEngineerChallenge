import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEmployees() {
    return apiClient.get('/employees')
  },

  getEmployeeById(id) {
    return apiClient.get(`/employees/${id}`)
  },

  create(employee) {
    return apiClient.post('/employees', employee)
  },

  update(employee) {
    return apiClient.put(`/employees/${employee.id}`, employee)
  }
}
