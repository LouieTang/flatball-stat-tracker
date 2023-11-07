import React from 'react'
import Button from './Button'

const Body = () => {
    const onClick = () => {
        alert("click2");
    }
    return (
    <body>
        <div className="players">

        </div>
        <Button onClick={onClick} color="green" text="Start Game" />
    </body>
  )
}

export default Body