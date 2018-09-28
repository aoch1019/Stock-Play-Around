import React from 'react'
import { NavLink } from 'react-router-dom';


const Stock = (props) => {

    return(
      <tr>
        <td>{props.stockInfo.name.replace(/"/g, '')}</td>
        <td>{props.stockInfo.symbol}</td>
        <td>${props.stockInfo.price}</td>
        <td><button onClick={() => props.handleClick(props.stockInfo)}> {props.button === "add" ? "Add Stock" : "Remove Stock"} </button></td>
      </tr>
    )


  }

export default Stock
