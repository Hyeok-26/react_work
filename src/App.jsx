import { useOutlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useSelector } from "react-redux";

function App(){

    const currentOutlet = useOutlet();
    //모달의 상태값
    const loginModal= useSelector(state=>state.loginModal);
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