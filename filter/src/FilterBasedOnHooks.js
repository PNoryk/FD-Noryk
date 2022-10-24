import './Filter.css'
import { useEffect, useState } from "react";

export const FilterBasedOnHooks = ({ list: initialList }) => {
  const [ list, setList ] = useState(initialList);
  const [ input, setInput ] = useState("");
  const [ isChecked, setIsChecked ] = useState(false);

  let options = list.map(name => <option key={ name } value={ name }>{ name }</option>);

  const setDefault = () => {
    setList(initialList);
    setInput("");
    setIsChecked(false);
  }

  useEffect(() => {
    let newList = input ? initialList.filter(el => el.includes(input)) : [ ...initialList ]
    if (isChecked) {
      newList.sort()
    }
    setList(newList)
  }, [initialList, input, isChecked])

  return (
    <div className="Filter">
      <p>
        <input type="checkbox" checked={ isChecked }
               onChange={ (e) => setIsChecked(e.target.checked) }/>
        <input type="text" value={ input }
               onChange={ (e) => setInput(e.target.value) }/>
        <button type="button" onClick={ setDefault }>clear</button>
      </p>
      <select multiple className="Select">
        { options }
      </select>
    </div>
  )
}
