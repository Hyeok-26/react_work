import { useState } from "react";

function App(){
    console.log("Aop함수 호출출");
    const [state, setState] = useState({
        name:"김구라",
        addr:"노량진"
    })

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <p>이름은 <strong>{state.name}</strong></p>
            <p>주소는 <strong>{state.addr}</strong></p>
            이름 입력<input type="text" onChange={(e)=>{
                setState({
                    ...state,
                    name:e.target.value})
            }} value={state.name}/>
            
            주소소 입력<input type="text" onChange={(e)=>{
                setState({
                    ...state,
                    addr:e.target.value})
            }} value={state.addr}/>
        </div>


    )
}
export default App;