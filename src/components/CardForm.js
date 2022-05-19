import React from "react";
import { Link } from "react-router-dom";

function CardForm({onChange, onSubmit, valueFront, linkTo, valueBack}) {
return (
    <form name="create" onSubmit={onSubmit}>
    <div className="form-group">
      <label>Front</label>
      <br></br>
      <textarea
        name="front"
        id="front"
        type="text"
        placeholder="Front side of card"
        onChange={onChange}
        value={valueFront}
        className="form-control"
        rows="2"
      />
    </div>
    <div className="form-group">
      <label>Back</label>
      <br></br>
      <textarea
        name="back"
        id="back"
        type="text"
        placeholder="Back side of card"
        onChange={onChange}
        value={valueBack}
        className="form-control"
        rows="2"
      />
    </div>
    <Link to={linkTo} className="btn btn-secondary mr-1">
        Done
      </Link>
      <button className="btn btn-primary mx-1" type="submit">
        Save
      </button>
  </form>
)
}

export default CardForm