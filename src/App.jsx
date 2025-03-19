import { useOutlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function App(){

    const currentOutlet = useOutlet();

    //모달의 상태값
    const loginModal= useSelector(state=>state.loginModal);
    const dispatch = useDispatch();
    

    //App 컴포넌트가 활성화되는 시점에 token 관련 처리
    useEffect(()=>{
        const token = localStorage.token;
        //만일 토큰이 존재 한다면
        if(token){

            axios.get("/ping",{
                headers:{Authorization:token}
            })
            .then(res=>{
                //axios 의 요청헤더에 자동으로 토큰이 포함되도록 한다
                axios.defaults.headers.common["Authorization"]=token;
                //여기가 실행되면 토큰은 유효하다다
                //토큰을 디코딩해서 userName 을 얻어온다
                const decoded=jwtDecode(token.substring(7));
                //발행할 action
                const action={type:"USER_INFO", payload:{
                    userName : decoded.sub,
                    role : decoded.role
                }};
                //액션 발행하기
                dispatch(action);
            })
            .catch(error=>{
                //여기가 실행되면 토큰은 유효하지 않다
                alert("시간이 초과되어 로그아웃됩니다");
                delete localStorage.token;
            })
        }
    },[]);

    return  (
        <>
            <BsNavBar/>
            <div className="container" style={{marginTop:"60px"}}>
                <div>{currentOutlet}</div>
            </div>
            <LoginModal show={loginModal.show}/>
        </>
    )
}

export default App;