import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserDetail(props) {

    //가입된 정보를 상태값으로 관리리
    const[user, setUser] = useState({});
    //컴포넌트가 활성화되는 시점에 가입정보를 서버로부터 읽어와서 UI 에 출력
    useEffect(()=>{
        axios.get("/user")
        .then(res=>{
            //응답된 내용을 state 에 반영한다
            //console.log(res.data);
            setUser(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    //프로필 이미지 스타일
    const profileStyle={
        width:"200px",
        height:"200px",
        border:"1px solid #cecece",
        borderRadius:"50%"
    }
    return (
        <>
            <h1>회원 정보입니다다</h1> 
            <Table striped bordered size='sm'>
                <colgroup>
                    <col className="col-3"/>
                    <col className='col-3'/>
                </colgroup>
                <thead className="table-dark">
                    <tr>
                        <th>항목</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td>{user.userName}</td>
                    </tr>
                    <tr>
                        <td>ROLE</td>
                        <td>{user.role}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td>
                            <Link to="/user/password/edit">수정하기</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>프로필 이미지</td>
                        <td>
                        { 
                            !user.profileImage  ? <svg style={profileStyle}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            :   <img  style={profileStyle} src={`/upload/${user.profileImage}`} alt="프로필 이미지" />
                        }   
                        </td>
                    </tr>
                    <tr>
                        <td>수정일</td>
                        <td>{user.updateAt}</td>
                    </tr>
                    <tr>
                        <td>가입일</td>
                        <td>{user.createdAt}</td>
                    </tr>
                </tbody>
            </Table>
            <Link to="/user/edit">개인 정보 수정</Link>
        </>
    );
}

export default UserDetail;