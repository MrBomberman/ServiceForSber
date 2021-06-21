import React, { useEffect, useState } from "react";
import QuestionService from "../../services/questionService";
import "./questionPage.css";
import FinishPage from "../finishPage";
import CheckboxAnswer from "../CheckboxAnswer";
import RadioAnswer from "../RadioAnswer";
import formatString from "../../utils/renderString";

const api = new QuestionService();

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hard, setHard] = useState(0);
  const [medium, setMedium] = useState(0);
  const [easy, setEasy] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    api.getResource().then((res) => {
      setQuestions(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const question = questions[currentIndex];

  if (currentIndex >= questions.length) {
    return (
      <FinishPage
        questions={questions}
        hard={hard}
        medium={medium}
        easy={easy}
      />
    );
  }

  const { incorrect_answers, correct_answer, type } = question;
  const isMultiple = type === "multiple";

  const onChange = (data) => {
    if (isMultiple) {
      const { checked, value } = data;
      setCurrentAnswer((prev) => {
        if (checked) {
          return (prev || []).concat([value]); 
        }
        return (prev || []).filter((item) => item !== value);
      });
      return;
    }
    setCurrentAnswer(data);
  };

  const submitAnswer = () => {
    const { difficulty } = question;
    
    if(currentAnswer === null) {
      return  
    }

    const answer = isMultiple ? currentAnswer.join(",") : currentAnswer;

    if (answer === correct_answer) {
      if (difficulty === "hard") {
        setHard((prev) => prev + 1);
      }
      if (difficulty === "medium") {
        setMedium((prev) => prev + 1);
      }
      if (difficulty === "easy") {
        setEasy((prev) => prev + 1);
      }
    }
    setCurrentIndex((prev) => prev + 1);
    setCurrentAnswer(null);
  };

  return (
    <div className="container">
      <h5>Question #{currentIndex + 1}</h5>
      <h3>{formatString(question.question)}</h3>
      <div>
        <Answers
          incorrectAnswers={incorrect_answers}
          correctAnswer={correct_answer}
          isMultiple={isMultiple}
          onChange={onChange}
        />
      </div>
      <div className="submit-button-container">
        <button onClick={submitAnswer} disabled={currentAnswer === null}>Complete</button>
      </div>
    </div>
  );
};

const Answers = ({ incorrectAnswers, correctAnswer, isMultiple, onChange }) => {
  const answers = incorrectAnswers.concat([correctAnswer]);

  if (isMultiple) {
    return (
      <div>
        {answers.map((answer) => (
          <CheckboxAnswer key={answer} answer={answer} onChange={onChange} />
        ))}
      </div>
    );
  }
  return (
    <div>
      {answers.map((answer) => (
        <RadioAnswer key={answer} answer={answer} onChange={onChange} />
      ))}
    </div>
  );
};

export default QuestionPage;