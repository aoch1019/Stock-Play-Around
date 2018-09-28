import React from 'react';

const SubmitButton = (props) => {

  return(
    <button onClick={props.handleClick}>
      Submit ETF
    </button>
  )
}

export default SubmitButton
