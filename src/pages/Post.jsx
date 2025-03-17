import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormLabel, Pagination, Table } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {v4 as uuid} from "uuid";

function Post(props) {

    //posts?pageNum=x 에서 pageNum 을 추출하기 위한 hook
    const [params, setParams] = useSearchParams({
        pageNum:1,
        condition:"",
        keyword:""
    });
    //글 정보를 상태값으로 관리
    const [pageInfo, setPageInfo] = useState({ list: [] });

    
    //검색 상태를 관리
    const [searchState, setSearchState] = useState({
        condition:"",
        keyword:""
    });
    

    //글 목록 데이터를 새로 읽어오는 함수
    const refresh = (pageNum)=>{

        //검색 조건과 keyword 에 관련된 정보 얻어내기
        const query = `condition=${params.get("condition")}&keyword=${params.get("keyword")}`;

        axios.get(`/posts?pageNum=${pageNum}${params.get("condition") && "&"+query}`)
        .then(res=>{
            //응답된 내용을 state 에 반영한다
            console.log(res.data);
            setPageInfo(res.data);
            //페이징 숫자 배열을 만ㄷㄹ어서 state 에 넣어준다
            setPageArray(range(res.data.startPageNum, res.data.endPageNum));
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    //페이징 숫자를 출력할 때 사용하는 배열을 상태값으로 관리
    const [pageArray, setPageArray]=useState([]);


    useEffect(()=>{
        //query 파라미터 값을 읽어와 본다
        let pageNum=params.get("pageNum")
        //만일 존재 하지 않는다면 1 페이지로 설정
        if(pageNum==null)pageNum=1
        //해당 페이지의 내용을 원격지 서버로 부터 받아온다 
        refresh(pageNum)
    },[params]);

    //페이지를 이동할 hook
    const navigate = useNavigate()

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
    function range(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }
    //페이지 이동하는 함수
    const move = (pageNum)=>{
        //object 에 저장된 정보를 이용해서 query 문자열 만들어내기
        const query = new URLSearchParams(searchState).toString();
        navigate(`/posts?pageNum=${pageNum}${searchState.condition && "&"+query}`);
    }
    
    //검색창에 입력할 때마다 변화를 주는 함수
    const handleSearchChange = (e) => {
        setSearchState({ 
            ...searchState,
            [e.target.name]: e.target.value 
        });
    };
    //리셋 버튼을 눌렀을 떄
    const handleReset=()=>{
        setSearchState({
            condition:"",
            keyword:""
        });
        move(1); //1page 내용이 보여지게
    }
    
    return (
        <>
            <h1>글 목록입니다</h1>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item=>(
                            <tr key={item.num}>
                                <td>{item.num}</td>
                                <td>{item.title}</td>
                                <td>{item.writer}</td>
                                <td>{item.viewCount}</td>
                                <td>{item.createdAt}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Pagination className='mt-3'>
                <Pagination.First className={pageInfo.startPageNum === 1 ? 'disabled' : ''} onClick={() => 
                   move(pageInfo.startPageNum-1)
                }/>
                <Pagination.Prev className={pageInfo.pageNum === 1 ? 'disabled' : ''} onClick={() => 
                    move(pageInfo.pageNum-1)
                }/>
                {
                    pageArray.map(item=>
                        <Pagination.Item key={item} active={pageInfo.pageNum === item} onClick={() => move(item)}>
                            {item}
                        </Pagination.Item>
                    )
                }
                <Pagination.Next className={pageInfo.pageNum === pageInfo.totalPageCount ? 'disabled' : ''} onClick={() => 
                    move(pageInfo.pageNum+1)}/>
                <Pagination.Last className={pageInfo.endPageNum === pageInfo.totalPageCount ? 'disabled' : ''} onClick={() => 
                   move(pageInfo.endPageNum+1)}/>
            </Pagination>
			<label htmlFor="search">검색조건</label>
			<select name="condition" id="search" onChange={handleSearchChange} value={searchState.condition}>
                <option value="">선택</option>
				<option value="title_content">제목 + 내용</option>
				<option value="title">제목</option>
				<option value="writer">작성자</option>
			</select>	
			<input type="text" name="keyword" placeholder="검색어..." onChange={handleSearchChange} value={searchState.keyword}/>
			<button className="btn btn-primary btn-sm ms-1" onClick={() => move(1)}>검색</button>
            <button className='btn btn-danger btn-sm ms-1' onClick={handleReset}>Reset</button>
            { pageInfo.keyword && <p> <strong>{pageInfo.totalRow}</strong> 개의 게시글이 검색되었습니다.</p>}
        </>
    );
}

export default Post;