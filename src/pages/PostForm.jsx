import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { initEditor } from '../editor/SmartEditor';
import axios from 'axios';

function PostForm(props) {

    //smartEditor 에 작성한 내용을 textarea 의 value 로 넣어 줄 따 필요한 함수가 editorTool 이다
    const [editorTool, setEditorTool] = useState([]);


    useEffect(()=>{
        //initEditor() 함수를 호출하면서 SmartEditor 로 변환할 textarea 의 id를 전덜하면
        //textrea 가 smartEditor 로 변경되면서 에디터 tool 객체가 리턴된다
        setEditorTool(initEditor("content")); //initEditor() 함수를 호출해야 SmartEditor 가 초기화된다다
    },[]);

    //입력한 내용을 얻어오기 위한 useRef()
    const inputTitle = useRef();
    const inputContent = useRef();
    //경로 이동을 할 함수
    const navigate = useNavigate();

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/" as={Link} to="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/" as={Link} to="/posts">Post</Breadcrumb.Item>
                <Breadcrumb.Item active>New</Breadcrumb.Item>  
            </Breadcrumb>
            <h1>새 글 추가 양식입니다</h1>
            <Form>
                <FloatingLabel label="제목" className="mb-3" controlId="title">
                    <Form.Control ref={inputTitle} type="text" placeholder="제목 입력..."/>
                </FloatingLabel>
                <Form.Group className="mb-3"  controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control ref={inputContent}as="textarea" rows="10"/>
                </Form.Group> 
                <Button type="submit" onClick={(e)=>{
                    //ㅍ모 제출 막기
                    e.preventDefault();
                    //에디터 tool 을 이용해서 smartEditor 에 입력한 내용을 textarea 의 value 값으로 변환환
                    editorTool.exec();
                    //입력한 제목과 내용을 릭어와서
                    const title = inputTitle.current.value;
                    const content = inputContent.current.value;
                    //axios 를이용하여 API 서버 전송
                    axios.post("/posts",{title, content})
                    .then(res=>{
                        alert("글을 성공적으로 저장했습니다");
                        navigate("/posts")
                    })
                    .catch(err=>{console.log(err)});
                }}>저장</Button>
            </Form>
        </>
    );
}

export default PostForm;