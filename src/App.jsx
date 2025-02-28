import { useState } from "react";

function App(){

    //상태값 관리
    const [count, setCount] = useState(0);

    const handleMinus = ()=>{
        setCount(count-1)
    }
    const handlePlus = ()=>{
        setCount(count+1)
    }

    const [name, setName] = useState("김구라");

    return  (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <button onClick={handleMinus}>-</button>
            <strong>{count}</strong>
            <button onClick={handlePlus}>+</button>
            <p>내 이름은 <strong>{name}</strong></p>
            <button onClick={()=>{
                setName("원숭이")
            } }>버튼</button>
        </div>
    )
}

export default App;