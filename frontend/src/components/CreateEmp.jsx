import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmpService from '../services/EmpService';
import { toast } from 'react-toastify';

const CreateEmp = () => {

    const [emp, setEmp] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();
    const {id}=useParams();

    const saveOrUpdateEmp=(e)=>{
      e.preventDefault();

      const employee={username,email,password,role}
      const validationErrors = {};


    if (!username) {
        validationErrors.username = 'username is required !';
    }else{
        if (!username.match("^[a-zA-Z\\s]+$")) {
            validationErrors.username = 'Invalid username format. It accepts only alphabets !';
        }
    }

    if (!email) {
        validationErrors.email = 'email is required !';
    }else{
        if (!email.match("^[a-z0-9+_.-]+@(.)+[a-z]$")) {
            validationErrors.email = 'Invalid email format !';
        }
    }

    if (!password) {
        validationErrors.password = 'password is required !';
    }
    if (!role) {
        validationErrors.password = 'role is required !';
    }
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    else{
        if (id) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  EmpService.updateEmp(id, employee, headers)
    .then((result) => {
      
      const loggedInEmpId = localStorage.getItem('loggedInEmpId');
      if (loggedInEmpId.match(id)) {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('loggedInEmpId');
        toast.success('Data updated successfully :)');
        navigate('/login');
      } else {
        toast.success('Data updated successfully :)');
        navigate('/');
      }
    })
    .catch((error) => {
      console.log(error);
    });
} else{
        EmpService.createEmp(employee).then(response=>{
        // console.log(response.data);
        toast.success('data added successfully :)');
        navigate("/");
        }).catch(error=>{
        console.log(error);
        })
    }   
}
}

  useEffect(() => {
    EmpService.getEmpById(id).then((result)=>{
              setUsername(result.data.username);
              setEmail(result.data.email);
              setPassword(result.data.password);
              setRole(result.data.role);
          }).catch((error)=>{
              console.log(error);
          })
  }, [])
  
  

const title=()=>{
    if (id) {
        return <h2 className="text-center mt-4 mb-3">Update Employee Details here !</h2>
    }else{
        return <h2 className="text-center mt-4 mb-3">Add New Employee Details here !</h2>
    }
}
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                {title()}
                <div className="card-body">
                    <form>

                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                placeholder="enter username"
                                name="username"
                                id='username'
                                className="form-control"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                required
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>} 
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="email"
                                placeholder="enter email address"
                                name="email"
                                id='email'
                                className="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>} 
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="password"
                                placeholder="enter correct password"
                                name="password"
                                id='password'
                                className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>} 
                        </div>

                        <div className="form-group mb-2">
                            <select 
                                className="form-select" 
                                id='role'
                                name='role' 
                                value={role}
                                onChange={(e)=>setRole(e.target.value)}
                                aria-label="Default select example">
                                    <option value="admin">select role</option>
                                    <option value="admin">ADMIN</option>
                                    <option value="user">USER</option>
                            </select>
                            {errors.role && <div className="text-danger">{errors.role}</div>} 
                        </div>

                        <div className="text-center mt-3">
                            <button className="btn btn-success" onClick={(e)=>saveOrUpdateEmp(e)}>SAVE</button>
                            <Link to={'/'} className="btn btn-danger mx-3">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEmp
