import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return(
    props.currUser ?
      <div className="ui four item menu" >
        <NavLink className="active item" to="/main-view" >Main View</NavLink>
        <NavLink className="item" to="/view-ETF" >View ETF(s)</NavLink>
        <NavLink className="item" to="/EditAccount">Edit {props.currUser.name}</NavLink>
        <NavLink className="item" onClick={props.handleLogout} to="/Logout">Logout {props.currUser.name}</NavLink>
      </div>
      :
      <div className="ui three item menu" >
        <NavLink className="active item" to="/main-view" >Main View</NavLink>
        <NavLink className="item" to="/view-ETF" >View ETF(s)</NavLink>
        <NavLink className="item" to="/Login">Login</NavLink>
      </div>
    )

}

export default NavBar;
