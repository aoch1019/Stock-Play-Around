import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {

  return(
    <div className="ui three item menu" >
      <NavLink className="active item" to="/main-view" >Main View</NavLink>
      <NavLink className="item" to="/view-ETF" >View ETF(s)</NavLink>
    </div>
  )

}

export default NavBar;
