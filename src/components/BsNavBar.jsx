

import axios from 'axios';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function BsNavBar(props) {
    //store 의 상태값을 바꿀 함수수
    const dispatch = useDispatch();
    //store 로부터 상태값 가져오기기
    const userInfo = useSelector(state=>state.userInfo);
    //route 이동을 하기 위한 hook
    const navigate=useNavigate();
    return (
        <>
            <Navbar fixed="top" expand="md" className="bg-warning mb-2">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
                    <Navbar.Toggle aria-controls="one"/>
                    <Navbar.Collapse id="one">
                        <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
                        </Nav>
                        {userInfo ? 
                            <>
                                <Nav>
                                    <Nav.Link as={Link} to="/user/detail">{userInfo.userName}</Nav.Link>
                                    <span className="navbar-text">Signed in</span>
                                </Nav>
                                <Button className='ms-1' size='sm' variant='outline-primary' onClick={()=>{
                                    const isLogout = window.confirm("로그아웃 할 거에요?");
                                    if(!isLogout)return;
                                    //토큰 삭제
                                    delete localStorage.token;
                                    //요청 헤더에 token 포함되도록 설정한 것 삭제하기기
                                    delete axios.defaults.headers.common["Authorization"]
                                    //store 에 userInfo 르 초기화
                                    dispatch({type : "USER_INFO", payload : null});
                                    //인덱스로 이동
                                    navigate("/");
                                }}>Logout</Button>                                
                            </>
                        :
                            <>
                                <Button size="sm" variant='success' onClick={()=>{
                                    const action={type:"LOGIN_MODAL", payload:{
                                        title:"로그입 뽐",
                                        show: true
                                    }};
                                    dispatch(action);
                                }}> Sign in </Button>
                                <Button className='ms-1' size='sm' variant='primary'>Sign-up</Button>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default BsNavBar;