import React,{useRef, useState} from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
const Quiz = () => {
    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let[lock,setLock] = useState(false);
    let[score,setScore] = useState(0);
    let[incorrect,setIncorrect] = useState(0);
    let[result,setResult] = useState(false);
    let[userAnswers,setUserAnswers]=useState({});

    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);

    let option_array=[Option1,Option2,Option3,Option4];

    const checkAns=(e,ans)=>{
        if(lock==false){
            if(question.ans==ans){
                e.target.classList.add("correct");
                
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong");
                
                option_array[question.ans-1].current.classList.add("correct");
                setIncorrect(prev=>prev+1);
            }
            setLock(true);
            //save
            setUserAnswers(prev=>({
              ...prev,
              [index]:ans
            }));
        }

    }
    
    const next=()=>{
      if(index==data.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);

      // setLock(false);
      //clear old classes first
      option_array.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        // return null;
      });
      //if answered already
      if(userAnswers[index]!=undefined){
        const selectedOption=userAnswers[index];

        if(selectedOption==data[index].ans){
          option_array[selectedOption-1].current.classList.add("correct");
        }
        else{
          option_array[selectedOption - 1].current.classList.add("wrong");
          option_array[data[index].ans - 1].current.classList.add("correct");
        }
        setLock(true);
      }
      else{
        setLock(false);
      }

    }

    const prev=()=>{
      if(index==0){
         
        return 0;
      }      
      setIndex(--index);
      setQuestion(data[index]);
      // setLock(false);
      option_array.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });

      //store
      if (userAnswers[index] != undefined) {
        const selectedOption = userAnswers[index];
    
        if (selectedOption == data[index].ans) {
          option_array[selectedOption - 1].current.classList.add("correct");
        } else {
          option_array[selectedOption - 1].current.classList.add("wrong");
          option_array[data[index].ans - 1].current.classList.add("correct");
        }
        setLock(true);
      } else {
        setLock(false);
      }
      
    }
    const reset=()=>{
      setIndex(0);
      setQuestion(data[0]);
      setScore(0);
      setLock(false);
      setResult(false);
      setIncorrect(0);
      setUserAnswers(0);
    }

  return (

    <div className='container'>
      <h1>QuizApp</h1>
      <hr />
      {result?<></>:<>
      <h2>{index+1}. {question.question}</h2>
    <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}> {question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3} </li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}> {question.option4}</li>
    </ul>
    <button onClick={next}>Next</button>
    <button onClick={prev}>Previous</button>
    <div className="index">{index+1} of {data.length} questions</div>
      </>}
      {result?<>
        <div className='score-section'>
        <h2>Correct Answers: {score}</h2>
        <h2>Incorrect Answers: {incorrect}</h2>
      </div>
      <h2>Total Questions: {data.length}</h2>
      <button onClick={reset}>Reset</button>
      </>:<></>}
    </div>
  )
}

export default Quiz
