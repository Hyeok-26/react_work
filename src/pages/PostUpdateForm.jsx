import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
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
        axios.get(`/posts/${params.id}`)
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
            <div>
                <label htmlFor="id">글 번호</label>
                <input type="text" id="id" value={post.id} readOnly/>
            </div>
            <div>
                <label htmlFor="title">제목</label>
                <input type="text" id="title" name="title" onChange={handleChange} value={post.title}/>
            </div>
            <div>
                <label htmlFor="author">작성저</label>
                <input type="text" id="author" name="author" onChange={handleChange} value={post.author}/>
            </div>
            <button type="submit" onClick={()=>{
                axios.put(`/posts/${post.id}`,post)
                .then(res=>{
                    alert("글 수정 완료");
                    navigate("/posts");
                })
                .catch(err=>console.log(err));
            }}>저장</button>
            <button onClick={()=>{
                //훅을 이용하여 저장해두었던 초기 post 로 돌린다
                setPost(savePost.current);
            }}>취소</button>
        </>
    );
}

export default PostUpdateForm;