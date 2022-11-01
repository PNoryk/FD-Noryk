import { Controls } from "./Controls";
import { useEffect, useState } from "react";
import { List } from "./List";

export interface Props {
  list: string[];
}

export const Filter = ({ list: initialList }: Props) => {
  const [list, setList] = useState(initialList);
  const [input, setInput] = useState("");
  const [isChecked, setCheckbox] = useState(false);

  const onResetClick = () => {
    setList(initialList);
    setInput("");
    setCheckbox(false);
  };

  useEffect(() => {
    let newList = input
      ? initialList.filter((el) => el.includes(input))
      : [...initialList];
    if (isChecked) {
      newList.sort();
    }
    setList(newList);
  }, [initialList, input, isChecked]);

  return (
    <div>
      <Controls
        isChecked={isChecked}
        onCheckboxChange={setCheckbox}
        input={input}
        onInputChange={setInput}
        onResetClick={onResetClick}
      />
      <List items={list} />
    </div>
  );
};