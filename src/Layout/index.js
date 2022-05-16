import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "../components/CreateDeck";

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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
