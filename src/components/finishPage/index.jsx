import "./finishPage.css";

export default function FinishPage({ questions, hard, medium, easy }) {
  return (
    <div className="container">
      <h1>Right answers: {hard + medium + easy}</h1>
      <h3>In this test there were: {questions.length} questions</h3>
      <h4>Successful questions: </h4>
      <div>Hard questions: {hard} </div>
      <div>Medium questions: {medium}</div>
      <div>Easy questions: {easy}</div>
    </div>
  );
}