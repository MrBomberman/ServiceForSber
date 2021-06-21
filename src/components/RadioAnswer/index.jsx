import formatString from "../../utils/renderString";

const RadioAnswer = ({ answer, onChange }) => {
  return (
    <label className="b-contain">
      <input
        className="radiobtn"
        type="radio"
        name="radio"
        value={answer}
        onChange={() => {
          onChange(answer);
        }}
      />{" "}
      {formatString(answer)}
      <div className="b-input"></div>
    </label>
  );
};

export default RadioAnswer;