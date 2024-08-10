const Filter = (props) => {
    return(
      <div>filter shown with <input type="text" value={props.newFilter} onChange={props.handleFilterChange} /> </div>
    )
  }

export default Filter