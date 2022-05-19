import React, { useEffect, useState } from "react";

import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Form from "./Form";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const linkTo = `/decks/${deckId}`;
  const initialEditState = {
    id: "",
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState(initialEditState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        console.log("editdeck", response);
        setDeck(response);
      } catch (error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const handleChange = (evt) => {
    setDeck({ ...deck, [evt.target.name]: evt.target.value });
  };

  const handleSubmitEdit = (evt) => {
    console.log("handle submit edit called");
    evt.preventDefault();
    const abortController = new AbortController();
    const response = updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to={`/decks/${deckId}`}>{`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <Form
        onSubmit={handleSubmitEdit}
        valueName={deck.name}
        valueDescription={deck.description}
        onChange={handleChange}
        linkTo={linkTo}
      />
    </div>
  );
}

export default EditDeck;
