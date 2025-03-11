
import React, { useReducer, useRef } from 'react';
import {v4 as uuid} from "uuid";

const reducer = (state, action)=>{
    let newState;
    if(action.type==="add"){
        newState={
            ...state,
            friends:[...state.friends,{id:uuid(), name:action.payload}]
        }
    }else if(action.type === "reset"){
        newState={
            ...state,
            friends:[]
        }
    }else if(action.type === "remove"){
        newState={
            ...state,
            friends:state.friends.filter(item => item.id !== action.payload)
        }
    }
    else{
        newState=state;
    }
    return newState;
}

//초기 상태값값
const initState = {
    userName:"kimgura",
    friends:[]
}

function Friends(props) {
    // useReducer(리듀서 함수, 초초기 상태값)
    const[state, dispatch] = useReducer(reducer, initState);

    //특정 요소의 참조값을 관리하기 위한 hook
    const inputName = useRef();

    return (
        <>
            <p>로그인된 userName : <strong>{state.userName}</strong></p>
            <input ref={inputName} type="text" placeholder="친구 이름 입력..."/>
            <button onClick={()=>{
                //입력한 이름을 추가하는 action 을 dispatch 한다(동작을 발행한다)
                //inputName.current 라는 방에는 참조값(input) 요소가 들어있다
                const name= inputName.current.value;
                //발행할 action 를 object 로 만든다
                const action = {type:"add", payload:name};
                //action 발행하기기
                dispatch(action);
            }}>추가</button>
            <button onClick={()=>{
                const action ={type:"reset"};
                dispatch(action);
            }}>Reset</button>
            <ul>
                {state.friends.map(item=>
                    <li key={item.id}>
                        {item.name} <button onClick={()=>{
                            const action = {type:"remove", payload:item.id}
                            dispatch(action);
                        }}>x</button>
                    </li>
                )}
            </ul>
        </>
    );
}

export default Friends;