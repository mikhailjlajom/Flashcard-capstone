import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        console.log("data here", deckResponse);
        setDecks(deckResponse);
      } catch (error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function deleteHandler(deck) {
      if(window.confirm("Delete this deck? You will not be able to recover it.")) {
          history.go(0);
          return await deleteDeck(deck.id)
      }
  }

  return (
    <div className="container">
      <Link to="/decks/new" className="btn btn-secondary my-2">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => {
          return (
            <div className="card" key={deck.id}>
              <div className="card-body">
                <div className="row">
                <div className="card-title col-9">{`${deck.name}`}</div>
                <div className="card-subtitle col text-muted">{`${deck.cards.length} cards`}</div>
                </div>
                <div className="card-text">{`${deck.description}`}</div>
                <div className="d-flex">
                  <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1"> View</Link>
                  <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-1">Study</Link>
                  <button onClick={() => deleteHandler(deck)} className="btn btn-danger ml-auto">Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
