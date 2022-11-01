import {Dispatch, SetStateAction} from "react";

type Props = {
  isChecked: boolean;
  onCheckboxChange: Dispatch<SetStateAction<boolean>>;
  input: string;
  onInputChange: Dispatch<SetStateAction<string>>;
  onResetClick: () => void;
};
export const Controls = ({
  isChecked,
  onCheckboxChange,
  input,
  onInputChange,
  onResetClick,
}: Props) => (
  <p>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onCheckboxChange(e.target.checked)}
    />
    <input
      type="text"
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
    />
    <button type="button" onClick={onResetClick}>
      clear
    </button>
  </p>
);