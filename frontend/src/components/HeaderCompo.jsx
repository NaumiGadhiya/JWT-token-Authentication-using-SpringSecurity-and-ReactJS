import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';


const HeaderCompo = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <Link to={'/'} className="navbar-brand" >EMPLOYEE MANAGEMENT SYSTEM</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              {/* <Link className='btn btn-outline-light' to='/add'>Add New Employee</Link>
              <Link className='btn btn-outline-light' to='/login'>LOGOUT</Link> */}

              <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                <li style={{ marginRight: '20px' }}>
                  {/* <Link className='btn btn-outline-light' to='/add'>Add New Employee</Link> */}
                </li>
                <li>
                  {/* <Link className='btn btn-outline-light' to='/login'>LOGOUT</Link> */}
                </li>
              </ul>
          </div>
      </nav>
    </div>
  )
}

export default HeaderCompo
