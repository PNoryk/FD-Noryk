import React, { Component } from "react";
import { Table } from "./components/Table.jsx";
import { eventEmitter } from "./services/eventEmitter.js";
import { InputForm } from "./components/InputForm";
import Filter from "./components/Filter.jsx";

let data = [
  { lastName: "Иванов", firstName: "Иван", sureName: "Иванович", balance: 200 },
  {
    lastName: "Сидоров",
    firstName: "Сидор",
    sureName: "Сидорович",
    balance: 250,
  },
  { lastName: "Петров", firstName: "Пётр", sureName: "Петрович", balance: 180 },
  {
    lastName: "Григорьев",
    firstName: "Григорий",
    sureName: "Григорьевич",
    balance: -220,
  },
];

export class App extends Component {
  state = {
    data: data.map((el, index) => ({ ...el, id: index })),
    showAddButton: true,
    filter: "all",
    selected: {},
  };

  componentDidMount() {
    eventEmitter.on("select", this.select);
    eventEmitter.on("save", this.saveChanges);
    eventEmitter.on("remove", this.removeRow);
    eventEmitter.on("remove", this.remove);
    eventEmitter.on("filter", this.filterRows);
  }

  componentWillUnmount() {
    eventEmitter.off("select", this.select);
    eventEmitter.off("save", this.saveChanges);
    eventEmitter.off("remove", this.removeRow);
    eventEmitter.off("remove", this.remove);
    eventEmitter.off("filter", this.filterRows);
  }

  select = (selected) => {
    this.setState({ selected, showAddButton: false });
  };

  remove = () => {
    this.setState({ selected: {}, showAddButton: true });
  };

  getFilteredData = () => {
    let filteredData = this.state.data;
    switch (this.state.filter) {
      case "blocked":
        filteredData = filteredData.filter(({ balance }) => balance <= 0);
        break;
      case "active":
        filteredData = filteredData.filter(({ balance }) => balance > 0);
        break;
    }
    return filteredData;
  };

  filterRows = (filter) => {
    this.setState({ filter });
  };

  saveChanges = (data) => {
    let method = "id" in data ? this.editRow : this.addRow;
    method(data);
    this.setState({ selected: {}, showAddButton: true });
  };

  addRow = (newData) => {
    this.setState(({ data }) => ({
      data: [
        ...data,
        {
          ...newData,
          id: Math.max(Math.max(...data.map(({ id }) => id)), -1) + 1,
        },
      ],
    }));
  };

  editRow = (newData) => {
    this.setState(({ data }) => ({
      data: data.map((el) => (el.id === newData.id ? newData : el)),
    }));
  };

  removeRow = (idToRemove) => {
    this.setState(({ data }) => ({
      data: data.filter(({ id }) => id !== idToRemove),
    }));
  };

  render() {
    return (
      <>
        <Filter />
        <Table data={this.getFilteredData()} />
        {this.state.showAddButton ? (
          <button onClick={() => this.setState({ showAddButton: false })}>
            Добавить клиента
          </button>
        ) : (
          <InputForm selected={this.state.selected} />
        )}
      </>
    );
  }
}
