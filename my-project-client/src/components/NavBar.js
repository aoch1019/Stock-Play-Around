import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return(
    <div className="ui three item menu" >
      <NavLink className="active item" to="/main-view" >Main View</NavLink>
      <NavLink className="item" to="/view-ETF" >View ETF(s)</NavLink>
        {props.currUser ?
                        <button className="ui tiny button" onClick={this.handleLogout}>Logout {this.state.currUser.name}</button>
                      :
                        <NavLink className="item" to="/Login">Login</NavLink>
                        }
    </div>
  )

}

export default NavBar;
