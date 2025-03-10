
/*
    우리가 만든css 파일 import 하기
    import 된 css 는 모든 Component 에서 공통적으로 사용할 수 잇다다
*/
import Game from "./components/Game"
import Play from "./components/Play"
import Study from "./components/Study"

import "./index.css"
import "bootstrap/dist/css/bootstrap.css"

function App(){

    return  (
        <div className="container">
            <h1>인덱스 페이지지</h1>
            <Play></Play>
            <Study></Study>
            <Game/>
        </div>
    )
}

export default App;