import React from 'react'
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  return (
    <form onSubmit={props.handleLoginSubmit} className="ui small form">
      <div className="fields">
        <div className="field">
          <input  onChange={props.handleNameInput}
                    placeholder="Username"
                    type="text"
                    value={props.nameInput}
                  />
        </div>
        <div className="field">
          <input  type='submit'
                  value="Login"
                  className="ui submit button" />
         </div>
         <div className="field">
           <NavLink className="ui button"
                    to="/Signup"
                    >Signup</NavLink>
        </div>
      </div>
    </form>
  )
}

export default Login
