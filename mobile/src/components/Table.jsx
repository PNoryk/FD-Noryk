import React, { PureComponent } from "react";
import { Row } from "./Row.jsx";

export class Table extends PureComponent {
  generateRows = () =>
    this.props.data.map((el) => <Row object={el} key={el.id} />);

  render() {
    console.log("tableRender");
    return (
      <table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>{this.generateRows()}</tbody>
      </table>
    );
  }
}
