import { useEffect, useMemo, useState } from "react";
import { Table } from "./components/Table.jsx";
import { InputForm } from "./components/InputForm";
import { Filter } from "./components/Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, remove as removeAction } from "./features/clientsSlice.js";
import { eventEmitter } from "./services/eventEmitter.js";

export const App = () => {
  let [filter, setFilter] = useState("all");
  let [showAddButton, setShowAddButton] = useState(true);
  let [selected, setSelected] = useState({});

  let dispatch = useDispatch()
  let filteredData = useSelector((state) => {
    let filteredData = state.clients.data;
    switch (filter) {
      case "blocked":
        filteredData = filteredData.filter(({ balance }) => balance <= 0);
        break;
      case "active":
        filteredData = filteredData.filter(({ balance }) => balance > 0);
        break;
    }
    return filteredData;
  })

  let select = (selected) => {
    setSelected(selected);
    setShowAddButton(false);
  };

  let remove = (id) => {
    dispatch(removeAction(id))
    setSelected({});
    setShowAddButton(true);
  };

  let saveChanges = (data) => {
    setSelected({});
    setShowAddButton(true)
    let action = ("id" in data ? edit : add)
    dispatch(action(data))
  };

  let filterRows = (filter) => setFilter(filter)

  useEffect(() => {
    eventEmitter.on("select", select);
    eventEmitter.on("save", saveChanges);
    eventEmitter.on("remove", remove);
    eventEmitter.on("filter", filterRows);
    return () => {
      eventEmitter.off("select", select);
      eventEmitter.off("save", saveChanges);
      eventEmitter.off("remove", remove);
      eventEmitter.off("filter", filterRows);
    }
  }, [])

  return (
    <>
      <Filter />
      {useMemo(() => <Table data={filteredData} />, [filteredData])}
      {showAddButton ? (
        <button onClick={() => setShowAddButton(false) }>
          Добавить клиента
        </button>
      ) : (
        <InputForm selected={selected} />
      )}
    </>
  );
};
