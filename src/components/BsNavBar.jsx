

import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BsNavBar(props) {
    const dispatch = useDispatch();
    //store 로부터 상태값 가져오기기
    const userInfo = useSelector(state=>state.userInfo);
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
                                    <Nav.Link>{userInfo.userName}</Nav.Link>
                                    <span className="navbar-text">Signed in</span>
                                </Nav>
                                <Button className='ms-1' size='sm' variant='outline-primary'>Logout</Button>                                
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