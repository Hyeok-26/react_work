import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function PostUpdateForm(props) {

    //경로 파라미터에서 id 얻어내기
    // object 가 리턴 따라서 수정할 글 번호는 params.id
    const params = useParams();

    const[post, setPost] = useState({});

    //참조할 값을 저장해주는 hook
    let savePost=useRef(null);//savePost 는 object 이고 current 라는 방에 저장된 값이 들어있다.
    
    useEffect(()=>{
        //컴포넌트가 활성화되는 시점에 수정할 회원의 번호를 이용해서 수정할 회원의 정보를 로딩한다,
        axios.get(`/v3/posts/${params.id}`)
                    .then(res=>{
                        setPost(res.data);
                        //훅이 리턴한 오브텍트에 초기 포스트를 저장해둔다
                        savePost.current=res.data;
                    })
                    .catch(error=>{

                        console.log(error);
                    })
    },[]);

    //입력란애 이벤트 발생했을 때 상태값 변경
    const handleChange = (e)=>{
        setPost({
            ...post,
            [e.target.name]:e.target.value,
        })
    };

    const navigate = useNavigate();

    return (
        <>
            <h1>수정합니다</h1>
            <Form>
                <Form.Group className="mb-3" controlId="id">
                    <Form.Label>글 번호호</Form.Label>
                    <Form.Control type="text" value={post.id} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>제목목</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange} value={post.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control type="text" name="author" onChange={handleChange} value={post.author}/>
                </Form.Group>
            </Form>
            <Button type="submit" variant="success" onClick={()=>{
                axios.put(`/v3/posts/${post.id}`,post)
                .then(res=>{
                    alert(res.data.id+" 번 글을 수정했습니다.");
                    navigate("/posts");
                })
                .catch(err=>console.log(err));
            }}>저장</Button>
            <Button variant="danger" onClick={()=>{
                // useRef() 를 이용해서 저장해 두었던 초기 post 로 되돌린다.
                setPost(savePost.current);
            }}>취소</Button>
        </>
    );
}

export default PostUpdateForm;