import React,{useState, useEffect} from "react"

export default function Questions(){
  const [questionData,setData] = useState([])
  const [questionNo , setNo ] = useState(1)
  const [scoreCard , setScore] = useState(false)
  const [totalScore , setTotal] = useState(0)

  

  useEffect(()=>{
    async function getData(){
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=29&difficulty=medium&type=multiple")
      const data = await res.json()
      setData(data.results)
    }
    getData();
  },[])
// console.log(questionData[0]?.question)

function handleClick(e){
    if(e.target.innerHTML===questionData[questionNo-1]?.correct_answer){
        console.log(e)
        let total = totalScore + 1
        setTotal(total)
    }
  if(questionNo<5){
let next = questionNo + 1
setNo(next)
  }
  else{
    setScore(true)
  }
}
let arr = []
 // l 35 - 47 shuffling array
for(let i=0;i<5;i++){
  let row = []
  questionData[i]?.incorrect_answers.map((i)=>row.push(i))
  row.push(questionData[i]?.correct_answer)
  
  row.sort(()=>Math.random() -0.5)
  
  arr.push(row)
}


return (<>
    { !scoreCard ?   
    <div className='cont'>
      <div className='questions'>
      <h1>Question {questionNo }/5</h1>
      {questionData[questionNo-1]?.question}
      </div>

      <div className='options'>
      {arr[questionNo-1].map((i,index)=><button onClick={(i)=>handleClick(i)}>{i}</button>)}
      {/* <button onClick={()=>handleClick(true)}>{questionData[questionNo-1]?.correct_answer}</button> */}

      </div>
    </div> :
     <div className="cont">
     <h1>you scored {totalScore} out of 5</h1>
 </div>}
    
  </>)
}