import React, { PureComponent } from "react";
import { eventEmitter } from "../services/eventEmitter.js";

export class Row extends PureComponent {
  isActive = () => this.props.object.balance > 0;
  getStatus = () => (this.isActive() ? "active" : "blocked");
  onEditClick = () => eventEmitter.emit("select", this.props.object);
  onRemoveClick = () => eventEmitter.emit("remove", this.props.object.id);

  render() {
    console.log("rowRender", this.props.object);
    return (
      <tr>
        <td>{ this.props.object.lastName }</td>
        <td>{ this.props.object.firstName }</td>
        <td>{ this.props.object.sureName }</td>
        <td>{ this.props.object.balance }</td>
        <td style={ { backgroundColor: this.isActive() ? "green" : "red" } }>
          { this.getStatus() }
        </td>
        <td>
          <button onClick={ this.onEditClick }>Редактировать</button>
        </td>
        <td>
          <button onClick={ this.onRemoveClick }>Удалить</button>
        </td>
      </tr>
    );
  }
}
