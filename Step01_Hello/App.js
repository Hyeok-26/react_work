//이미지를 import  해서 logo 라는 변수에 담기기
import logo from './logo.svg'
//css import 하기
import './App.css'
import './Custom.css'

function App() {

  const logoStyle = {
    width:"100px",
    height:"100px"
  }

  return (
    <div className="container">
      <h1>인덱스 페이지</h1>
      <img src={logo} alt="" style={logoStyle}/>
    </div>
  );
}

export default App;
