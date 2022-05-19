import React from "react"
import { Link } from "react-router-dom"

function Form({onSubmit, valueName, valueDescription, onChange, linkTo }) {
return (
    <form name="create" onSubmit={onSubmit}>
    <div className="form-group">
      <label>Name</label>
      <br></br>
      <input
        name="name"
        id="name"
        type="text"
        placeholder="Deck Name"
        onChange={onChange}
        value={valueName}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label>Description</label>
      <br></br>
      <textarea
        name="description"
        id="description"
        type="text"
        placeholder="Brief description of the deck"
        onChange={onChange}
        value={valueDescription}
        className="form-control"
        rows="4"
      />
    </div>
    <Link to={linkTo} className="btn btn-secondary mr-1">
        Cancel
      </Link>
      <button className="btn btn-primary mx-1" type="submit">
        Submit
      </button>
  </form>

)
}

export default Form