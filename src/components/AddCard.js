import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const initialCardState = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState(initialCardState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController()
      try {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
      } catch (error) {
        console.log("Something went wrong", error)
      } return () => {
        abortController.abort()
      }
    }
    fetchData()
  }, [deckId])

  const handleCardChange = (evt) => {
    setNewCard({ ...newCard, [evt.target.name]: evt.target.value });
  };

  const handleSubmitCard = (evt) => {
    evt.preventDefault();
    const abortController = new AbortController();
    const cardResponse = createCard(
      deckId,
      { ...newCard },
      abortController.signal
    );
    setNewCard(initialCardState)
    return cardResponse;
  };

  const linkTo = `/decks/${deckId}`

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{`${deck.name}`}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h4>{`${deck.name}: Add Card`}</h4>
      <CardForm 
      onChange={handleCardChange}
      onSubmit={handleSubmitCard}
      valueFront={newCard.front}
      valueBack={newCard.back}
      linkTo={linkTo}
      />
    </div>
  );
}
export default AddCard;
