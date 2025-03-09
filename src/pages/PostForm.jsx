import axios from 'axios';
import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PostForm(props) {
    //javascript 로 page이동을 하기위한 hook
    const navigate = useNavigate();

    return (
        <>
           <h1>새 post 작성 폼</h1>

           <Form action="/posts" method="post" onSubmit={(e)=>{
                    e.preventDefault();
                    //요청 url
                    const url = e.target.action;
                    //FormData 객체
                    const formData = new FormData(e.target);
                    //폼에 입력한 내용 object 로 변환
                    const obj = Object.fromEntries(formData);
                    //object 에 있는 내용을 이용해서 JSON 문자열 만들어내기
                    const json=JSON.stringify(obj);
                    // 이용해서 psot 방식 전송
                    axios.post(url,obj)
                        .then(res=>{
                            //저장된 글 정보 응답답
                            console.log(res.data);
                            alert(res.data.id+"번 글로 저장되었습니다");
                            //"/posts="
                            navigate("/posts");
                        })
                        .catch(error=>{
    
                            console.log(error);
                        })
                }}>
                <FloatingLabel label="제목" className="mb-3" controlId="title">
                    <Form.Control type="text" name = "title" placeholder='제목입력...'/>
                </FloatingLabel>
                <FloatingLabel label="작성자" className="mb-3" controlId="author">
                    <Form.Control type="text" name = "author" placeholder='작성자 입력...'/>
                </FloatingLabel>
                <Button type="submit" variant="success">저장</Button>
           </Form>
           <form action="/posts" method="post" onSubmit={(e)=>{
                e.preventDefault();
                //요청 url
                const url = e.target.action;
                //FormData 객체
                const formData = new FormData(e.target);
                //폼에 입력한 내용 object 로 변환
                const obj = Object.fromEntries(formData);
                //object 에 있는 내용을 이용해서 JSON 문자열 만들어내기
                const json=JSON.stringify(obj);
                // 이용해서 psot 방식 전송
                axios.post(url,obj)
                    .then(res=>{
                        //저장된 글 정보 응답답
                        console.log(res.data);
                        alert(res.data.id+"번 글로 저장되었습니다");
                        //"/posts="
                        navigate("/posts");
                    })
                    .catch(error=>{

                        console.log(error);
                    })
           
           }}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title"/>
                </div>
                <div>
                    <label htmlFor="author">작성저</label>
                    <input type="text" id="author" name="author"/>
                </div>
                <button type="submit">저장</button>
            </form>  
        </>
    );
}

export default PostForm;