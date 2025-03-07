import { NavLink, useNavigate, useOutlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


function App(){
    //현재 라우팅된 정보를 출력해주는 hook
    const currentOutlet = useOutlet();

    // javascript 로 route 이동을 하게 해주는 hook
    const navigate = useNavigate();

    return  (
        <div className="container">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/game">Game</NavLink></li>
                <li><NavLink to="/study">Study</NavLink></li>
                <li><NavLink to="/posts">Post</NavLink></li>
            </ul>
            <button className="btn btn-primary" onClick={()=>{
                // javascript 로 "/post" 경로로 라우트되게 하려면?
                navigate("/posts")
            }}>Post</button>
            <button className="btn btn-primary" onClick={()=>{
                // javascript 로 "/post" 경로로 라우트되게 하려면?
                navigate("/posts?pageNum=2")
            }}>Post2</button>
            <div>{currentOutlet}</div>
        </div>
    )
}

export default App;