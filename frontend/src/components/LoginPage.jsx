import React, { useState } from 'react';
import EmpService from '../services/EmpService';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState(''); 
  const navigate=useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!username) {
      setUsernameError('username is required !');
      valid = false;
    } else{
        if (!username.match("^[a-zA-Z\\s]+$")) {
          setUsernameError('invalid username format !');
        }
    }

    if (!password) {
      setPasswordError('password is required !');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const loginBtn = async (e) => {
    e.preventDefault();
    
    const employee={username,password};
    
    if (validateForm()) {
  
        EmpService.loginEmp(employee)
          .then((response) => {
            console.log(response.data);
            const token = response.data.token;
            const role=response.data.role;
            const loggedInEmpId=response.data.id;
            localStorage.setItem('role', role);
            localStorage.setItem('loggedInEmpId', loggedInEmpId);
            localStorage.setItem('token', token);
            // console.log(loggedInEmpId);
            // console.log(role); 
            // console.log(token);
            setAuthenticated(true);
            navigate('/');
          })
          .catch((error) => {
            console.log(error);
            setGeneralError('invalid username or password !');
          });
      }
  };

  return (
    <div className="container mt-5">
      <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3 ">
                <h2 className="mt-3">Login here !</h2>
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <br />
                            <input
                                type="text"
                                placeholder="username"
                                name="username"
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p style={{ color: 'red' }}>{usernameError}</p>
                        </div>

                        <div className="form-group mb-2">
                            <br />
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <p style={{ color: 'red' }}>{passwordError}</p>
                        </div>
                        <button className="btn btn-success mx-3" onClick={(e)=>loginBtn(e)}>Login</button>
                        
                        <Link className='btn btn-outline-dark mx-2' to='/add'>Register</Link>
                        
                        <p style={{ color: 'red' }}>{generalError}</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
