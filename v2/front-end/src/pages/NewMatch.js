import React, {useEffect, useState} from 'react'

const NewMatch = () => {
    const [playerStats, setPlayerStats] = useState([]);
    const playerData = [{
        name: "L",
        catches: 0,
        drops: 0
    },{
        name: "T",
        catches: 0,
        drops: 0
    }]
    return (
        <>
            <button>Click</button>
        </>
    )
}
 
export default NewMatch