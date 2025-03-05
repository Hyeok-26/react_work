import { useEffect, useState } from "react";

function App(){

    //글 목록을 상태값으로 관리하기 위해
    const [posts, setPosts] = useState([]);

    //글 목록 데이터를 받아오는 함수
    const refresh = ()=>{
        //GET 방식 /posts 요청하기 
        fetch("/v1/posts")
            .then(res=>res.json())
            .then(data=>{
                //서버로부터 받아온 배열로 상태값을 변경한다
                //state 를 변경하는 함수를 호출하면 App() 함수가 다시 호출된다.
                //useState([]) 함수가 호출해주는 배열의 0번방에는 새로운 posts 배열이 들어있다.
                setPosts(data);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    //refresh(); 무한루프가 걸린다.
    /*
        useEffect(함수, 배열)
        배열을 비워두면 App 컴포넌트가 초기화 되는 시점에 최초 1번만 호출된다.
        비워두지 않으면 ... 즉 어떤 state 값을 넣어주면 해당 state 가 변경될 때마다 호출된다.
    */
    useEffect(()=>{
        refresh();
    }, [])
    
    return  (
        <div className="container">
            <h1>새글 작성 폼</h1>
            <form action="/v1/posts" onSubmit={(e)=>{
                e.preventDefault(); //폼 전송을 막고 fetch 함수로 직접 전송
                //요청 url
                const url = e.target.action;
                //FormData 객체
                const formData = new FormData(e.target);
                //폼에 입력한 내용 object 로 변환
                const obj = Object.fromEntries(formData);
        
                //object 에 있는 내용을 이용해서 JSON 문자열 만들어내기
                const json=JSON.stringify(obj);

                //fetch 함수를 이용해서 페이지 전환없이 post 방식 요청하면서 json 문자열 전송하기
                fetch(url, {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:json
                })
                .then(res=>res.json())
                .then(data=>{
                    //data 는 서버에서 응답한 json 문자열이 object 로 변경되어서 전달된다.
                    console.log(data);
                    refresh();
                })
                .catch(error=>{

                })

            }}>
                <input type="text" name="title" placeholder="제목 입력..."/>
                <input type="text"name="author" placeholder="작성자 입력..."/>
                <button type="submit">저장</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                        {posts.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td><button onClick={()=>{
                                    //수정할 제목을 입력 받는다
                                    const title = prompt(item.id+"번 글의 수정할 제목 입력")
                                    //수정할 정보를 이용해서 object 만든다.
                                    const obj = {
                                        title:title,
                                        author:item.author
                                    };
                                    fetch("/v1/posts/"+item.id,{
                                        method:"PUT", //id 를 제외한 전체 수정을 할때 사용한다.
                                        headers:{"Content-Type":"application/json"},
                                        body:JSON.stringify(obj) //object 를 json 문자열로 변경해서 넣어준다
                                    })
                                    .then(res=>res.json())
                                    .then(data=>{
                                        console.log(data);
                                        refresh();
                                    });
                                }}>수정</button></td>
                                <td><button onClick={()=>{
                                    fetch("/v1/posts/"+item.id,{
                                        method:"DELETE",
                                    })
                                    .then(res=>res.json())
                                    .then(data=>{
                                        alert(data.author+"님의 post 를 삭제했습니다.")
                                        refresh();
                                    });
                                }}>x</button></td>
                            </tr>
                        )}
                </tbody>
            </table>
            <form action="">

            </form>
        </div>
    )
}

export default App;