import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);

  const handleChange = (evt) => {
      setNewDeck({...newDeck, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const abortController = new AbortController()
    const response = createDeck({...newDeck}, abortController.signal);
    return response
  };


  return (
      <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
    <form name="create" onSubmit={handleSubmit}>
        <h1>Create Deck</h1>
        <div>
            <label>Name</label>
            <br></br>
            <input
            name="name"
            id="name"
            type="text"
            placeholder="Deck Name"
            onChange={handleChange}
            value={newDeck.name}
            />
        </div>
        <div>
            <label>Description</label>
            <br></br>
            <textarea
            name="description"
            id="description"
            type="text"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={newDeck.description}
            />
        </div>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
        <Link to="/" className="btn btn-primary" type="submit">Submit</Link>
    </form>
    </div>
  );
}

export default CreateDeck;
