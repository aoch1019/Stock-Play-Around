import React from 'react'

const Stock = (props) => {
  return(
    <tr>
      <td>{props.data["Name"]}</td>
      <td>{props.data["Symbol"]}</td>
    </tr>
  )

}


export default Stock
