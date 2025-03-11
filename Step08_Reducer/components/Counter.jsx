
import React, { useState } from 'react';

function Counter(props) {

    const[count, setCount]=useState(0);

    return (
        <>
            <button onClick={()=>{
                setCount(count-1)
            }}>-</button>
            <strong>{count}</strong>
            <button onClick={()=>{
                setCount(count+1)
            }}>+</button>
        </>
    );
}

export default Counter;