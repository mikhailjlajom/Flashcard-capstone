import React, { useEffect, useState } from "react";

import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";


function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        console.log("deck file", response);
        setCards(response.cards);
        console.log("deck file card", response.cards);
      } catch (error) {
        console.log("Something wrong happened", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  async function deleteHandler(deck) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.push("/");
      return await deleteDeck(deck.id);
    }
  }

  async function deleteCardHandler(card) {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      history.go(0);
      return await deleteCard(card.id);
    }
  }
  if (cards.length > 0) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {`${deck.name}`}
            </li>
          </ol>
        </nav>
        <div>
          <h5>{`${deck.name}`}</h5>
          <p>{`${deck.description}`}</p>
          <div className="d-flex">
            <Link
              to={`/decks/${deckId}/edit`}
              className="btn btn-secondary mr-1"
            >
              Edit
            </Link>
            <Link
              to={`/decks/${deckId}/study`}
              className="btn btn-primary mx-1"
            >
              Study
            </Link>
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary mx-1"
            >
              Add Cards
            </Link>
            <button
              onClick={() => deleteHandler(deck)}
              className="btn btn-danger ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <h4 className="mt-3">Cards</h4>
          <div className="card-deck">
            {cards.map((card) => {
              return (
                <div className="card" key={card.id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">{`${card.front}`}</div>
                      <div className="col">{`${card.back}`}</div>
                    </div>
                    <div className="container row d-flex justify-content-end">
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className="btn btn-secondary mx-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCardHandler(card)}
                        className="btn btn-danger mx-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Deck;
