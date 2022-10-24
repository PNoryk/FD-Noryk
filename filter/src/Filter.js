import './Filter.css'
import { Component } from "react";

export default class Filter extends Component {
  state = {
    input: "",
    isChecked: false,
    list: [ ...this.props.list ],
  }

  setDefault = () => this.setState({
    list: this.props.list,
    input: "",
    isChecked: false,
  })
  // 1
  // separate handlers were removed coz of processing extra data (checkbox in input handler and vice versa)

  // 2
  // onChange = ({ isChecked, input }) => {
  //
  //   this.setState({ input: input })
  //   if (input) {
  //     this.setState(({ defaultList }) => ({
  //       list: defaultList.filter(el => el.includes(input)),
  //     }));
  //   } else {
  //     this.setState(({ defaultList }) => ({ list: defaultList }))
  //   }
  //   this.setState({ isChecked: isChecked })
  //
  //   -> // Here is a problem to return unsorted list
  //   this.setState(({ list }) => ({
  //     list: list.sort(),
  //   }));
  // }

  // 3
  // have problems with only one argument in 1 call
  // onChange = ({ isChecked, input }) => {
  //   this.setState(({list, defaultList}) => {
  //     const newState = {input, isChecked}
  //
  //     newState.list = input ? defaultList.filter(el => el.includes(input)) : defaultList
  //
  //     if ( isChecked ) {
  //       newState.list = newState.list.sort()
  //     }
  //
  //     return newState
  //   })
  // }

  // 4th solution – separate setting controls state and processing list
  updateInput = (input) => {
    this.setState({ input }, this.updateList)
  }

  updateCheckbox = (isChecked) => {
    this.setState({ isChecked }, this.updateList)
  }

  updateList = () => {
    const { input, isChecked } = this.state;
    let list = input ? this.props.list.filter(el => el.includes(input)) : [ ...this.props.list ]
    if (isChecked) {
      list.sort()
    }
    this.setState({ list })
  }

  render() {
    let options = this.state.list.map(name => <option key={ name } value={ name }>{ name }</option>);
    return (
      <div className="Filter">
        <p>
          <input type="checkbox" checked={ this.state.isChecked }
                 onChange={ (e) => this.updateCheckbox(e.target.checked) }/>
          <input type="text" value={ this.state.input } onChange={ (e) => this.updateInput(e.target.value) }/>
          <button type="button" onClick={ this.setDefault }>clear</button>
        </p>
        <select multiple className="Select">
          { options }
        </select>
      </div>
    )
  }
}
