import { useState } from "react";
import formatString from "../../utils/renderString";

const CheckboxAnswer = ({ answer, onChange }) => {
  const [checked, setChecked] = useState(false);
  return (
    <label className="control control-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked((prev) => !prev);
          onChange({
            checked: !checked,
            value: answer,
          });
        }}
      />
      {formatString(answer)}
      <div className="control_indicator"></div>
    </label>
  );
};

export default CheckboxAnswer;