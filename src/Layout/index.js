import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "../components/CreateDeck";
import Study from "../components/Study";
import Deck from "../components/Deck";
import EditDeck from "../components/EditDeck";
import AddCard from "../components/AddCard";
import EditCard from "../components/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route>
            <NotFound />
          </Route>
          
        </Switch>
      </div>
    </>
  );
}

export default Layout;
