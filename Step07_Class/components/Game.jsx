import React, { useState } from 'react';

import myCss from './css/study.module.css'
//classnames를 import햐서 cn이라는 이름으로 사용하기
//import cn from 'classnames'
//외부 css를 바인딩해서 사용하게 도와주는 binder import
import binder from 'classnames/bind'
//binder 를 이용해 myCss 를 바인딩해서 cx라는 이름의 함수로 사용하시
const cx = binder.bind(myCss);

function Game(props) {

    const [array, setArray] = useState(["my-color","bg-yellow"]);
    const [isYellow, setYellow] = useState(false);
    const [style, setStyle] = useState({
        "my-color":false,
        "bg-yellow":false
    });

    const handleChange=(e)=>{
        //변화된 checkbox 의 name 속성과 체크 여부 얻어내기
        const {name, checked} = e.target;
        setStyle({
            ...style,
            [name]:checked
        })
    }
    return (
        <>
            <h2 className={cx("my-color")}>Game 입니다</h2>
            <p className={cx("my-color", "bg-yellow")}>p1</p>
            <p className={cx(["my-color","bg-yellow"])}>p2</p>
            <p className={cx(array)}>p3</p>
            <p className={cx({"my-color":true, "bg-yellow":true})}>p4</p>
            bg-yellow <input type="checkbox" onChange={(e)=>{
                //현재 checkbox 의 체트 상태를 isYellow 에 반영한다
                setYellow(e.target.checked);
            }}/>
            <p className={cx({"my-color":true, "bg-yellow":isYellow})}>p4</p>
            <br/>
            my-color <input type="checkbox" name="my-color" onChange={handleChange}/>
            bg-yellow <input type="checkbox" name="bg-yellow" onChange={handleChange}/>
            <p className={cx(style)}>p5</p>
        </>
    );
}

export default Game;