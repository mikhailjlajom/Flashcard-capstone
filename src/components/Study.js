import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const [front, setFront] = useState(true);

  function flipCard() {
    if (front) {
      setFront(false);
    } else {
      setFront(true);
    }
  }

  function nextButton(index, cards) {
    if (!front && index === cards.length - 1) {
      if (
        window.confirm(`Restart cards? Click "cancel" to return to home page.`)
      ) {
        setCardNumber(0);
        setFront(true);
      } else {
        history.push("/");
      }
    } else if (!front && index < cards.length - 1) {
      return (
        <button
          onClick={() => {
            setCardNumber(cardNumber + 1);
            setFront(true);
          }}
          className="btn btn-primary my-2 mx-1"
        >
          Next
        </button>
      );
    } else {
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        console.log("study file", response);
        setDeck(response);
        setCards(response.cards);
        console.log("study file", response.cards);
      } catch (error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  if (cards.length > 2) {
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
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>
        <h1>{`${deck.name}: Study`}</h1>

        {cards.map((card, index) => {
          if (index === cardNumber) {
            return (
              <div className="card" key={card.id}>
                <div className="container">
                  <h5 className="card-title mb-2 mx-1 mt-4">{`Card ${index+1} of ${cards.length}`}</h5>
                  <div className="card-text my-2">
                    {front ? card.front : card.back}
                  </div>

                  <button onClick={flipCard} className="btn btn-secondary my-2">
                    Flip
                  </button>
                  {nextButton(index, cards)}
                </div>
              </div>
            );
          }})}
      </div>
    );
  } else {
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
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>
        <h1>{`${deck.name}: Study`}</h1>
        <h2>Not enough cards.</h2>
        <p>{`You need at least 3 cards to study. There are ${cards.length} cards in this deck.`}</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }
}

export default Study;
