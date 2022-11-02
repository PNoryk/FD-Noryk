export enum ControlType {
  Input,
  Checkbox,
  ResetButton,
}

let input = "";
let setInput = (payload: string) => (input = payload);

let isChecked = false;
let setIsChecked = (payload: boolean) => (isChecked = payload);

const onChange: {
  (type: ControlType.Input, payload: string): void;
  (type: ControlType.Checkbox, payload: boolean): void;
  (type: ControlType.ResetButton): void;
} = (type, payload?: string | boolean): void => {
  switch (type) {
    case ControlType.Input:
      setInput(payload as string);
      break;
    case ControlType.Checkbox:
      setIsChecked(payload as boolean);
      break;
    case ControlType.ResetButton:
      setInput("");
      setIsChecked(false);
  }
};

onChange(ControlType.Input, "adsfadsf")
onChange(ControlType.Checkbox, false)
onChange(ControlType.ResetButton)
