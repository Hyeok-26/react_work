// components/Child.jsx

function Child(){

    return(
        <div>
            <h2>Child Components입니다다</h2>
            <button onClick={(e)=>{
                e.target.innerText="버튼이 눌리네?"
            }}>눌러보셈셈</button>
        </div>

    )
}

export default Child;