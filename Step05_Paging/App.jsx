import axios from "axios";
import { useEffect, useState } from "react";
//key 값을 얻어내기 위한 함수 import
import {v4 as uuid} from "uuid";
/*
    npm install bootstrap 해서 설치하고
    아래와 같이 import 하면전역에서 사용 가능한 bootstrap css 가 로딩된다
*/
import "bootstrap/dist/css/bootstrap.css";

function App(){
    //페이지 정보를 관리한다
    const [pageInfo, setPageInfo] = useState({
        list:[],

    });

    //페이지를 요청해서 출력하는 함수
    const refresh=(pageNum)=>{
        axios.get("/posts?pageNum="+pageNum)
        .then(res=>{
            //서버에서 응답한 data 는 res.data 에 들어있다다
            console.log(res.data);
            //상태값을 변경
            setPageInfo(res.data);
            //페이징 퍼리에 필요한 배열을 만들어서
            const result=range(res.data.startPageNum, res.data.endPageNum);
            //상태값을 변경한다다
            setPageArray(result);
        })
        .catch(error=>console.log(error));
    }
    //컴포넌트가 활성화되는 시점에 1 페이지 정보를 얻어온다다
    useEffect(()=>{
        refresh(1);
    },[]);

    //페이징 숫자를 출력할 떄 사용하는 배열을 상태값으로 관리하자
    const [pageArray, setPageArray]=useState([]);

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수를 만들어어 두고 활용하자자
    function range(start, end){
        const result=[];
        for(let i = start;i<=end;i++){
            result.push(i);
        }
        return result;
    }

    return  (
        <div className="container">
            <h1>인덱스 페이지지</h1>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination">
                <li className={`page-item ${pageInfo.pageNum === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={(e)=>{
                        e.preventDefault();
                        refresh(pageInfo.startPageNum-1);
                    }}>Prev</a>
                </li>
                {pageArray.map(num=>
                    <li className={`page-item ${pageInfo.pageNum === num ? 'active':''}`} key={uuid()}>
                        <a className="page-link" href="#" onClick={(e)=>{
                            e.preventDefault(); //링크의 기본 동작 막기
                            refresh(num);
                        }}>{num}</a>
                    </li>
                )}
                <li className={`page-item ${pageInfo.endPageNum < pageInfo.totalPageCount ? '' : 'disabled'}`}>
                    <a className="page-link" href="javscript:" onClick={(e)=>{
                        e.preventDefault();
                        refresh(pageInfo.endPageNum+1);
                    }}>Next</a>
                </li>
            </ul>
        </div>
    )
}

export default App;