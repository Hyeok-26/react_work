import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, FloatingLabel, Form} from 'react-bootstrap';
import { useNavigate, useParams} from 'react-router-dom';

import { initEditor } from '../editor/SmartEditor';
import AlertModal from '../components/AlertModal';

function PostUpdateForm(props) {
    //주성할 글 번호 추출 "/posts/:num/edit" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams();
    
    //editor 에 작성한 내용을 textarea 의 value 로 넣어줄 때 필요한 함수가 editorTool이다
    const [editorTool, setEditorTool] = useState([]);

    //원래 글의 내용을 state 에 저장해 놓는다
    const [savedData, setSavedData] = useState({});


    // component 가 활성화되는 시점에 호출되는 함수
    useEffect(()=>{
        //initEditor() 함수를 호출해야 SmartEditor 가 초기화된다
        setEditorTool(initEditor("content"));

        //비동기로 동작(호출하면 바로 리턴하지만 안에 있는 code 는 모두 실행된 상태가 나닌 비동기 함수)
        const fetchPost = async ()=>{
            try{
                const res=await axios.get(`/posts/${num}`);
                //글 정보를 콘솔창에 출력하기
                console.log(res.data);
                //글 제목과 내용을 input 요소에 넣어주가
                inputTitle.current.value=res.data.title;
                inputContent.current.value=res.data.content;
                setSavedData(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchPost();
    },[num]);

    //제목과 내용에 입력할 내용의 참조값을 관리하기 위해해
    const inputTitle = useRef();
    const inputContent = useRef();

    const handleSubmit = (e)=>{
        e.preventDefault();
        //에디터 tool 을 이용해서 SmartEditor 에 입력한 내용을 textarea 의 value 값으로 변환
        editorTool.exec();
        const title=inputTitle.current.value;
        const content = inputContent.current.value;
        //수정 반영 요청을 하는 비동기 함수
        const updatePost = async()=>{
            try{
                const res=await axios.patch(`/posts/${num}`,{title, content});
                console.log(res.data);
                //모달을 띄운 다음 글 자세히 보기로 이동되도록 한다
                setShowModal(true);
                
            }catch(err){
                console.log(err);
            }
        };
        updatePost();
    } 
    const [showModal, setShowModal] = useState(false);
    
    const navigate = useNavigate();

    const handleReset = (e)=>{
        e.preventDefault(); //기본 이벤트 막아주기기
        //title 을 원상복구
        inputTitle.current.value=savedData.title;
        console.log(savedData);
        //smart editor 에 출력된 내용 원상 복구
        editorTool.setContents(savedData.content);
    }
    return (
        <>
            <AlertModal show={showModal} message="수정했습니다" onYes={()=>{
                navigate(`/posts/${num}`);
            }}/>
            <h1>글 수정 폼</h1>
            <Form>
                <FloatingLabel label="제목" className='mb-3' controlId='title'>
                    <Form.Control ref={inputTitle} type="text"/>
                </FloatingLabel>
                <Form.Group className='mb-3' controlId='content'>
                    <Form.Label>내용</Form.Label>
                    <Form.Control ref={inputContent} as="textarea" style={{height:"300px"}}/>
                </Form.Group>
                <Button type="submit" onClick={handleSubmit}>수정확인</Button>
                <Button type="reset" variant='danger' onClick={handleReset}>취소</Button>
            </Form>
            
            
        </>
    );
}

export default PostUpdateForm;