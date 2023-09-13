import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import EmpService from '../services/EmpService';
import { toast } from 'react-toastify';

const ManageEmp = () => {

  const [emp, setEmp] = useState([]);
  const navigate=useNavigate();
  const role = localStorage.getItem('role');
  const loggedInEmpId = localStorage.getItem('loggedInEmpId');

  
  useEffect(() => {
    loadEmp();
  }, [])
  
  const loadEmp=async()=>{
    EmpService.getAllEmp().then(result=>{
      setEmp(result.data);
    }).catch(error=>{
      console.log(error);
    })
  };

const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`, 
};   

const deleteEmp=(employeeId)=>{       
  EmpService.deleteEmp(employeeId,headers).then(result=>{
    loadEmp();
    toast.error('data deleted !', {className: 'error-toast'});
  }).catch(error=>{
    console.log(error);
  })
};


const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('loggedInEmpId');
  toast.success('Logged out successfully :)');
  navigate("/login");
};
  return (
    <div>
      <div className='container mt-5'>
      <h4 className='text-center'>MANAGE EMPLOYEES LIST</h4>
        <div className='py-4'>
          <table className='table table-dark table-striped'>
          <thead>
              <tr>
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>OPERATION</th>
              </tr>
            </thead>  
            <tbody>
              {
                emp.map(e=>(
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.username}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                    <td>
                      {role === 'user' && loggedInEmpId.match(e.id) ? (
                        <Link to={`/edit/${e.id}`} className="btn btn-outline-warning">UPDATE</Link>
                      ) : null}
                      {role !== 'user' ? ( 
                      <>
                        <Link to={`/edit/${e.id}`} className="btn btn-outline-warning">UPDATE</Link>
                        <button className="btn btn-outline-danger mx-2" onClick={() => deleteEmp(e.id)}> DELETE </button>
                      </>
                      ) : null}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          
          <Link className='btn btn-success mx-3' to='/add'>Add New Employee</Link>
          <button className='btn btn-dark mx-2' onClick={handleLogout}>LOGOUT</button>
        </div>
        

      </div>
    </div>
  )
}

export default ManageEmp