import React from 'react';
import { NavLink } from 'react-router-dom';

const Signup = (props) => {
  return (
    <form onSubmit={props.handleLoginSubmit} className="ui form">
      <div className="field">
        <input  onChange={props.handleNameInput}
                  placeholder="Username"
                  type="text"
                  value={props.nameInput}
                />
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

// Possible T&C Checkbox:
// <div className="ui checkbox">
//   <input type="checkbox" tabIndex="0" className="hidden"/>
//   <label>I agree to the Terms and Conditions</label>
// </div>
