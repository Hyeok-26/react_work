import { useState } from "react";
// uuid 의 v4 를 import 해서 uuid 라는 이름으로 사용용
import { v4 as uuid } from "uuid";
/*
    필요한 추가 package(라이브러리) 는 npm install 을 이용해서 설치하고 사용하면 된다
    설치된 라이브러리는 package.json 파일에 dependences 목목록에 추가된다

    npm install uuid
*/
function App(){
    
    const [names, setNames] = useState(["김구라","해골","원숭이"]);
    console.log(uuid());
    return (
        <div>
            <ul>
                {names.map((item,index) => <li key={index}>{item}</li>)}
            </ul>
            <h1>친구 목록</h1>
            <ul>
                {names.map(item => <li key={uuid()}>{item}</li>)}
            </ul>
        </div>
    )
}

export default App;