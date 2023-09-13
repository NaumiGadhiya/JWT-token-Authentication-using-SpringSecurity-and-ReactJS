import axios from "axios";

const EMP_API_BASE_URL = "http://localhost:8088/emp";

class EmpService {
  getAllEmp() {
    return axios.get(EMP_API_BASE_URL);
  }

  createEmp(employee) {
    return axios.post(EMP_API_BASE_URL, employee);
  }

  getEmpById(employeeId) {
    return axios.get(EMP_API_BASE_URL + '/' + employeeId);
  }

  updateEmp(employeeId, employee, headers) {
    return axios.put(EMP_API_BASE_URL + '/' + employeeId, employee, { headers })
    
  }
  
  deleteEmp(employeeId, headers) {
    return axios.delete(EMP_API_BASE_URL + '/' + employeeId, { headers })
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return headers;
  }

  loginEmp(employee){
    return axios.post(EMP_API_BASE_URL+"/auth", employee);
  }

}

export default new EmpService();
