import React from "react";
import { Row } from "./Row.jsx";

export const Table = ({ data }) => {
  const rows = data.map((el) => <Row object={ el } key={ el.id }/>);

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
      <tbody>{ rows }</tbody>
    </table>
  );
};
