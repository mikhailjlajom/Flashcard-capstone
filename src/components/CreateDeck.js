import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Form from "./Form";

function CreateDeck() {
  const history = useHistory();
  const linkTo = "/"
  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);

  const handleChange = (evt) => {
    setNewDeck({ ...newDeck, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const abortController = new AbortController();
    const response = createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  };

  

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

      <Form 
      onSubmit={handleSubmit} 
      valueName={newDeck.name}
      valueDescription={newDeck.description}
      onChange={handleChange}
      linkTo={linkTo}/>
    </div>
  );
}

export default CreateDeck;
