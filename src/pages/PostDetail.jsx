import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import {Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

//module css 를 import 해서 cx 함수로 사용할 준비를 한다
import customCss from "./css/cafe_detail.module.css"
import binder from "classnames/bind"
import { useSelector } from 'react-redux';
const cx=binder.bind(customCss);

function PostDetail(props) {

    //"/posts/:num" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams();
    //글 하나의 정보를 상태값으로 관리
    const [state, setState] = useState({});
    //검색 키워드 관리
    const [params, setParams] = useSearchParams({
        condition:"",
        keyword:""
    });

    //로그인된 userName
    const userName = useSelector(state=>state.userInfo && state.userInfo.userName);

    const navigate = useNavigate();

    useEffect(()=>{
        const query = new URLSearchParams(params).toString();
        axios.get(`/posts/${num}${params.get("conditon")? "?"+query : ""}`)
        .then(res=>{
            setState(res.data);
        })
        .catch(err=>{console.log(err)});
    },[num]);

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <ConfirmModal show={modalShow} message="이 글을 삭제하시겠습니까?" 
                onCancel={()=>{setModalShow(false)}} onYes={()=>{
                axios.delete(`/posts/${state.num}`)
                .then(res=>{
                    navigate("/posts");
                })
                .catch(err=>{console.log(err);});
                setModalShow(false);
            }}/>
            {state.prevNum !== 0 ? <Link to={`/posts/${state.prevNum}${params.get("condition") && "?"+new URLSearchParams(params).toString()}`}>이전 글</Link> : ""}
            {state.nextNum !== 0 ? <Link to={`/posts/${state.nextNum}${params.get("condition") && "?"+new URLSearchParams(params).toString()}`}>다음 글</Link> : ""}
            <h1>글 제세히 봐봐</h1>
            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <td>{state.num}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{state.title}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{state.viewCount}</td>
                    </tr>
                    <tr>
                        <th>수정일</th>
                        <td>{state.updatedAt}</td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{state.createdAt}</td>
                    </tr>
                </thead>
            </Table>
            <div className={cx("content")} dangerouslySetInnerHTML={{ __html: state.content }}></div>
            {
                userName ===state.writer ?
                <>
                    <Button variant='warning' onClick={()=>{
                        navigate(`/posts/${state.num}/edit`);
                    }}>수정</Button>
                    <Button variant='danger' onClick={()=>{setModalShow(true)}}>삭제</Button>
                </>
                : ""
            }
        </>
    );
}

export default PostDetail;