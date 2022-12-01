import React from "react";
import { eventEmitter } from "../services/eventEmitter.js";

export const Row = React.memo(({ object }) => {
  let isActive = object.balance > 0;
  let status = isActive ? "active" : "blocked";
  let onEditClick = () => eventEmitter.emit("select", object);
  let onRemoveClick = () => eventEmitter.emit("remove", object.id);

  console.log("rowRender", Object.values(object).join(" "));

  return (
    <tr>
      <td>{object.lastName}</td>
      <td>{object.firstName}</td>
      <td>{object.sureName}</td>
      <td>{object.balance}</td>
      <td style={{ backgroundColor: isActive ? "green" : "red" }}>
        {status}
      </td>
      <td>
        <button onClick={onEditClick}>Редактировать</button>
      </td>
      <td>
        <button onClick={onRemoveClick}>Удалить</button>
      </td>
    </tr>
  );
});
