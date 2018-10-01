import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return(
    <div className="ui three item menu" >
      <NavLink className="active item" to="/main-view" >Main View</NavLink>
      <NavLink className="item" to="/view-ETF" >View ETF(s)</NavLink>
        {props.currUser ?
                        <React.Fragment>
                          <NavLink className="item" onChange={this.handleLogout} to="/Logout">Logout {props.currUser.name}</NavLink>
                          <NavLink className="item" to="/EditAccount">Edit {props.currUser.name}</NavLink>
                        </React.Fragment>
                      :
                        <NavLink className="item" to="/Login">Login</NavLink>
                        }
    </div>
  )

}

export default NavBar;
