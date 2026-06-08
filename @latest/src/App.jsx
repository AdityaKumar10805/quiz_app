import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [index, setIndex] = useState(0);
  const [score,setScore]=useState(0)
  const[answered,setAnswered]=useState(false)
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [bestScore, setBestScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["Delhi", "Patna", "Lucknow", "Kolkata"],
      ans:"Delhi"
    },
    {
      id: 2,
      question: "First PM of India?",
      options: ["Nehru", "Thala", "Mukherjee", "Modi"],
      ans:"Nehru"
    },
    {
      id: 3,
      question: "Capital of Bihar?",
      options: ["Patna", "Lucknow", "Kolkata", "Washington DC"],
      ans:"Patna"
    }
  ];

  function handleNext() {
    
    setIndex(index + 1);
    setAnswered(false);
    setSelectedOption(null);
  }
  function handlePrev(){
    if(index==0)
      return
    setIndex(index-1)
  }
  function handleClick(option){
    if(answered)return;
    setSelectedOption(option);
    setUserAnswers([...userAnswers, option]);
    if(questions[index].ans===option){
      setScore(score+4)
    }
    setAnswered(true)
  }
  function handleRestart() {
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setUserAnswers([]);
    setSelectedOption(null);
  }
  useEffect(()=>{
    if(score>bestScore){
      setBestScore(score)
      localStorage.setItem("best_score",JSON.stringify(score));

    }
    
  },[score,bestScore])
  useEffect(()=>{
   const s= localStorage.getItem("best_score");
   if(s)
    setBestScore(JSON.parse(s))
},[])



  return (
    <div className="app">
<h1 className="title">Quiz App 🚀</h1>

     
      {(index===questions.length)?<>
        <h3>Your score is {score}</h3>
        <h3>your best score is:{bestScore}</h3>

{questions.map((q, i) => (

  <div key={q.id}>

    <h4>{q.question}</h4>

    <p>
  {userAnswers[i] === q.ans
    ? `Your Answer: ${userAnswers[i]} ✅`
    : `Your Answer: ${userAnswers[i]} ❌`}
</p>

    <p>

      Correct Answer: {q.ans}

    </p>

  </div>

))}
<button onClick={handleRestart}>
  Restart Quiz
</button>
      
      
      
      </>:
     <>
      <p>
        Question {index + 1} of {questions.length}
      </p>
      <h2 className="question">
  {questions[index].question}
</h2><ul className="options">
        
        {questions[index].options.map((option, idx) => (
          <li className="option" key={idx}>{option}<button
          onClick={() => handleClick(option)}
          style={{
            backgroundColor:
              selectedOption === option
                ? (option === questions[index].ans
                    ? "green"
                    : "red")
                : ""
          }}
        >
          click me
        </button></li>
            ) )}
      </ul>
      <button className="nav-btn" onClick={handlePrev}>
        prev Question
      </button>


      <button className="nav-btn" onClick={handleNext}>
        Next Question
      </button>
      </>}

      
      
      </div>
  )
}

export default App;