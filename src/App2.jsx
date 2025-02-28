import { useState } from "react";

function App() {

    const[names, setNames] = useState(["김구라","해골","원숭이"]);

    const handleAdd = ()=>{
        setNames([...names,"주뎅이"])
    }
    return (

        <div className = "container">
            <h1>배열을 state 로 관리해보기</h1>
            <button onClick={handleAdd}>추가</button>
            <ul>
                {names.map(item => <li>{item}</li>)}
            </ul>
        </div>
    )
}

export default App;