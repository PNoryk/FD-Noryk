import { Component } from "react";

export default class Product extends Component {
  render = () => {
    let { row } = this.props;

    let columns = Object.entries(row).map(([name, text]) => (
      <td key={`${row.id}_${name}`}>
        {name === "image" ? (
          <img alt={row.name} src={text} height={200} />
        ) : (
          text
        )}
      </td>
    ));
    columns.push(
      <td key={`${row.id}_action`}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.showModal(row.id)}
        >
          remove
        </button>
      </td>
    );
    return (
      <tr
        onClick={() => this.props.onClick(row.id)}
        className={this.props.selected ? "bg-success bg-opacity-25" : null}
      >
        {columns}
      </tr>
    );
  };
}
