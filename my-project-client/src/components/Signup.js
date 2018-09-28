import React from 'react';
import { NavLink } from 'react-router-dom';

const Signup = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="ui form">
      <div className="field">
        <input  onChange={props.handleUsernameInput}
                  placeholder="Username"
                  type="text"
                  value={props.usernameInput}
                />
      </div>
      <div className="ui checkbox">
        <input type="checkbox" tabindex="0" className="hidden"/>
        <label>I agree to the Terms and Conditions</label>
      </div>
      <div className="field">
        <input  type='submit'
                value="Signup"
                className="ui submit button" />
       </div>
       <div className="field">
        <p>Already have an account?</p>
         <NavLink className="ui button"
                  to="/Login"
                  >Login</NavLink>
      </div>
    </form>
  )
}

export default Signup;
