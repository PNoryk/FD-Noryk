import "./Shop.css"
import { Component } from "react";

export default class Shop extends Component {
  createHeadings = () => this.props.headings.map(heading => <th key={ heading }>{ heading }</th>)

  makeColumns = (row) => Object.entries(row).map((column, idx) => this.makeColumn(column, row.id))

  makeColumn = ([ type, text ], rowId) =>
    <td key={ `${ type }_${ rowId }` }>{ type === "image" ? <img src={ text } height={ 200 }/> : text }</td>

  createRows = () => this.props.products.map(row => {
    let columns = this.makeColumns(row)
    let actionColumn = (
      <td key={ `action_${ row.id }` }>
        <button type="button" className="btn btn-danger" onClick={ () => this.props.showModal(row.id) }>remove</button>
      </td>
    )
    columns.push(actionColumn)
    return (
      <tr onClick={ () => this.props.handleSelect(row.id) }
          className={ this.props.selected === row.id ? 'bg-success bg-opacity-25' : null }
          key={ row.id }>{ columns }</tr>
    )
  });

  render = () => (
    this.props.products.length ?
      <table className="table">
        <thead>
        <tr>
          { this.createHeadings() }
        </tr>
        </thead>
        {
          <tbody>
          { this.createRows() }
          </tbody>
        }
      </table>
      : null
  )
}
