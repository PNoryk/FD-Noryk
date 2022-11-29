import { createRef, PureComponent } from "react";
import { eventEmitter } from "../services/eventEmitter.js";

export class InputForm extends PureComponent {
  constructor(props) {
    super(props);
    this.lastName = createRef();
    this.firstName = createRef();
    this.sureName = createRef();
    this.balance = createRef();
  }

  updateForm = () => {
    this.lastName.current.value = this.props.selected.lastName;
    this.firstName.current.value = this.props.selected.firstName;
    this.sureName.current.value = this.props.selected.sureName;
    this.balance.current.value = this.props.selected.balance;
  };

  componentDidMount() {
    if (Object.keys(this.props.selected).length) {
      this.updateForm();
    }
  }

  componentDidUpdate() {
    this.updateForm();
  }

  buildObject = () => ({
    ...this.props.selected,
    lastName: this.lastName.current.value,
    firstName: this.firstName.current.value,
    sureName: this.sureName.current.value,
    balance: this.balance.current.value,
  });

  render() {
    console.log("render InputForm");
    return (
      <div style={ { marginTop: 100 } }>
        <input type="text" ref={ this.lastName }/>
        <input type="text" ref={ this.firstName }/>
        <input type="text" ref={ this.sureName }/>
        <input type="number" ref={ this.balance }/>
        <button onClick={ () => eventEmitter.emit("save", this.buildObject()) }>
          Сохранить
        </button>
      </div>
    );
  }
}
