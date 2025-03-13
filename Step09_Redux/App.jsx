import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Child from "./components/Child";

function App(){

    //redux store 에서 관리되는 state 는 useSelector() 라는 hook 을 이용해면 된다다
    const isLogin = useSelector((state)=>state.isLogin);
    const inputName = useRef();
    //action 을 발행할 때 사용하는 hook
    const dispatch = useDispatch();
    const userName = useSelector((state)=>state.userName);
    return  (
        <div className="container">
            <h1>인덱스 페이지지</h1>
            {isLogin ?
                <p>
                    <strong>{userName}</strong> 님 로그인 중...
                    <button onClick={()=>{
                        alert("로그 아웃 되었습니다.");
                        //userName = "", isLogin = flase로 변경
                        dispatch({type:"LOGIN_STATUS",payload:false});
                    }}>로그 아웃</button>
                </p>
            :
                <>
                    <input ref={inputName} type="text" placeholder="사용자명..."/>
                    <button onClick={()=>{
                        //입력한 userName
                        const userName = inputName.current.value;
                        //userName 을 변경하는 action
                        const action1 = {type:"USER_NAME", payload:userName};
                        const action2 = {type:"LOGIN_STATUS", payload:true};
                        //action발행하기기
                        dispatch(action1);
                        dispatch(action2);
                    }}>로그인인</button>
                </>
            }
           <Child/>

        </div>
    )
}

export default App;