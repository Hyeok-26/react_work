import React from 'react';
/*
    특정 component 에만 적용된 css 파일을 만들 때는 xxx.module.css형태로 만들어야 한다
    import 된 myCss 는 object 이다
    object의 구조
    {클래스 명 : "변화될 클래스 명", ...}
*/
import myCss from './css/study.module.css';

function Study(props) {
    //myCss 는 object 이다
    console.log(myCss);

    return (
        <>
            <h2 className={myCss["my-color"]}>Study 페이지입니다</h2>
            <p className={myCss["my-color"]+" "+myCss["bg-yellow"]}>p1</p>
            <p className={`${myCss["my-color"]} ${myCss["bg-yellow"]}`}>p2</p>    
        </>
    );
}

export default Study;