import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
//gemini 가 응답한 markdown 을 해석하기 위한 패키지 설치 및 import
import Markdown from "react-markdown";
//CodeMirror 를 사용하기 위해 3개의 패키지를 서설치하고 import 해야 한다
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
//Markdown 에 코드 블럭을 prettify 하기 위해
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; //github 과 동일한 스타일로 코드 디자인이 된다
//import "highlight.js/styles/atom-one-dark.css" //dark 테마 스타일 코드
import ProgressBar from 'react-bootstrap/ProgressBar';
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function Quiz(){
    let quizs = [
        { content: "콘솔창에 1 ~ 10 까지 순서대로 출력하는 code 를 javascript 로 작성해 보세요", score: 10 },
        { content: "myName 이라는 변수를 만들고 본인의 이름을 넣고 addr 이라는 키값으로 주소를 넣으세요", score: 10 },
        { content: "object 에 name 이라는 키값으로 본인의 이름을 넣고 addr 이라는 키값으로 주소를 넣으세요", score: 10 },
        { content: "주어진 배열 '[10, 20, 30, 40, 50]' 의 모든 요소를 한 줄씩 콘솔에 출력하는 코드를 작성하세요.", score: 10 },
        { content: "크레스티드 게코가 선호하는 과일의 종류를  3 가지 배열에 담아 출력해보세요", score: 10 },
        { content: "1부터 20까지 숫자 중에서 짝수만 콘솔에 출력하는 코드를 작성하세요.", score: 10 },
        { content: "10부터 1까지 순서대로 콘솔에 출력하는 코드를 작성하세요.", score: 10 },
        { content: "1부터 5까지 숫자를 1초 간격으로 순서대로 출력하는 코드를 작성하세요.", score: 10 },
        { content: "주어진 문자열 'hello'를 거꾸로 뒤집어 출력하는 코드를 작성하세요.", score: 10 },
        { content: "숫자 2의 구구단(2 × 1 ~ 2 × 9)을 콘솔창에 출력하는 코드를 작성하세요.", score: 10 }
    ];
    //const inputAnswer = useRef();

    useEffect(()=>{
        //DB 에서 불러온 데이터를 state 에 넣어준다.
        setState({
            ...state,
            list:quizs.map(item=>{
                //isCorrect 라는 키갑으로 null 을 너넣어준다
                item.isCorrect=null;
                return item;
            })
        });
    },[]);
    
    const handleSubmit = (e)=>{
        //질문과 입력한 답을 json 으로 전송한다.
        axios.post("/gemini/quiz",{
            quiz:state.list[state.index].content,
            answer:state.inputCode //state 에 있는 내용을 전송
        })
        .then(res=>{
            //res.data 는 이런 모양의 object 이다 {isCorrect: true or false, comment: '마크다운'}
            console.log(res.data);
            setState({
                ...state,
                ...res.data,
                isAnswered:true,
                list:state.list.map((item,index)=> {
                    //만일 현재 인덱스가 현재 문제를 푼 index 하면
                    if(index === state.index){
                        //채첨 결과를 넣어준다다
                        item.isCorrect=res.data.isCorrect;
                    }
                    return item;    
                }),
                //문제를 풀었을 때 게이지지
                progress:state.progress +state.list[state.index].score,
                isFinish : state.index === state.list.length-1 && true
            })
        })
        .catch(err=>{console.log(err)});

    }

    
    const [state, setState] = useState({
        isFinish:false,
        progress:0,
        list:[],
        index:0, //문제의 index 값 state 로 관리리
        isAnswered : false,
        isCorrect : false,
        inputCode : "",//입력한 코드를 state 로 관리리
    });
    //다시 풀기를 눌렀을 때 실행되는 함수
    const handleRetry=(e)=>{
        setState({
            ...state,
            isAnswered:false,
            progress:state.progress - state.list[state.index].score
        })
    }
    const handleNext=(e)=>{
        //index 1 증가, isAnswer : false, inputCode:""
        setState({
            ...state,
            index:state.index+1,
            inputCode : "",
            isAnswered : false
        });
    }

    const handleChange=(e)=>{
        //입력한 내용을 바로바로 state 에 반영하기
        setState({
            ...state,
            inputCode:e.target.value
        });
    }
    //결과보기 버튼을 눌렀을때때
    const handleFinish=(e)=>{
        let totalScore=0;
        for (let i = 0; i < state.list.length; i++) {
            // i번째 아이템 을 불러와서
            const item = state.list[i];
            //만일 정답을 맞추었으면
            if(item.isCorrect){
                //totalscore 에 획득한 점수를 누적시킨다
                totalScore+=item.score;
            }
        }
        //reduce 함수를 이용해서 총점 계산하기
        /*
            배열의 방의 갯수만큰 호출된다
            item 매개변수에는 배열에 전달된 아임템이 순서대로 전달된다
            sum 에는 함수 안에 리턴된 값이 전달된다.
            최초 호출 시에는 초기값(0)이 전달된다.
            Reduce 함수는 가장 마지막에 리턴한 값이 리턴된다.
            정리하자면 배열에 저장된 모든 아이템템을 활용해서 하나의 값을 만들어낸다
        */
        const totalScore2 = state.list.reduce((sum,item)=> {
            if(item.isCorrect){
                return sum+item.score;
            }else{
                return sum;
            }
        }, 0);
        //한줄 표현현
        const totalScore3 = state.list.reduce((sum,item)=> item.isCorrect ? sum+item.score : sum, 0);

        setModal({
            show:true,
            message:`총점 ${totalScore3} 점입니다. 확인을 누르면 다시 풀기, 취소를 누르면 종료됩니다.`
        })
    }
    //모달의 상태값 제어
    const [modal, setModal] = useState({
        show : false,
        message:"",

    });
    //모달의 재도전 버튼
    const handleYes = ()=>{
        //초기 상태로 만들기
        setState({
            isFinish:false,
            progress:0,
            list:quizs.map(item=>{
                //isCorrect 라는 키값으로 null 을 넣어준다. 
                item.isCorrect=null;
                return item;
            }),
            index:0, //문제의 index 값 state 로 관리 
            isAnswered:false,
            isCorrect:false,
            inputCode:"" //입력한 code 를 state 로 관리  
        });
        setModal({show:false});
    }

    const navigate = useNavigate();
    //모달의 닫기 버튼튼
    const handleCancel = ()=>{
        setModal({show:false});
        navigate("/");
    }
    const [show, setShow] = useState(true);
    return (
        <>
            <button onClick={() => setShow(prev => !prev)}>토글</button>

            <ConfirmModal show={modal.show} message={modal.message} onYes={handleYes} onCancel={handleCancel}/>

            <h1> javascript 문제</h1>
            <ProgressBar now={state.progress} animated variant='primary' className="mb-2"/>
            <ProgressBar>
                { state.list.map(item=> item.isCorrect !== null && 
                    <ProgressBar  now={item.score} animated variant={item.isCorrect ? "success" : "danger"}/>)}
            </ProgressBar>
            <AnimatePresence mode="wait">
                {state.isAnswered ? (
                <motion.p
                    key="p1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <h3>채점 결과</h3>
                        {state.isCorrect ?
                            <>
                            <Alert variant='success'>축하 합니다. 정답 입니다</Alert>
                            </>
                        :
                            <>
                            <Alert variant='danger'>오답 입니다</Alert>
                            </>
                        }
                        <Markdown rehypePlugins={rehypeHighlight}>{state.comment}</Markdown>
                        <Button variant='warning' className='me-3' onClick={handleRetry}> &larr;재도전</Button>
                        {state.isFinish ?
                            <Button variant="primary" onClick={handleFinish}>결과보기</Button>
                        :
                            <Button variant='success' onClick={handleNext}>다음 문제 &rarr;</Button>
                        }
                    </div>
                </motion.p>
                ) : (
                <motion.p
                    key="p2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                {   state.list.length > 0 &&
                    <div>
                        <div>
                            <strong>{`${state.index+1}. 번 `}</strong> 
                            <strong>{`배점:${state.list[state.index].score}`}</strong>
                            <Markdown rehypePlugins={rehypeHighlight}>{state.list[state.index].content}</Markdown>
                        </div>
                        <CodeMirror style={{fontSize:"20px"}}
                            extensions={javascript()}
                            theme={dracula}
                            height="300px"
                            value={state.inputCode}
                            onChange={value=>setState({...state,inputCode:value})}/>
                        <Button onClick={handleSubmit}>제출</Button>
                    </div>
                }
                </motion.p>
                )}
            </AnimatePresence>
        </>
    )
}

export default Quiz;