import axios from 'axios';
import React from 'react';

function Home(props) {
    return (
        <>
            <h1>인덱스 페이지</h1>
            <button onClick={()=>{
                axios.get("/ping")
                .then(res=>{
                    alert(res.data);
                })
                .catch(err=>{
                    alert("응답하지 않음...");
                })
            }}>ping 요청</button>
        </>
    );
}

export default Home;