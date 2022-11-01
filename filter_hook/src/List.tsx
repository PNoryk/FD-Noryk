export const List = ({items}: {items: string[]}) => {
  let options = items.map((name) => <option value={name} key={name}>{name}</option>)
  return (
    <select multiple className="Select">
      { options }
    </select>
  )
}