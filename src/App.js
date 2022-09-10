import React, { Fragment } from "react";

import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Provider } from "./context/Context";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Books from "./components/Books";
import About from "./components/About";
import BookCart from "./components/BookCart";
import BookDetails from "./components/BookDetails";
import Paymentpage from "./components/Paymentpage";
import Success from "./components/Success";

function App() {
  return (
    <Provider>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <Header />
                <Books />
              </Fragment>
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/book-cart" component={BookCart} />
          <Route path="/book/details/:id" component={BookDetails} />
          <Route path="/pay" component={Paymentpage} />
          <Route path="/success" component={Success} />

          

        </Switch>
      </div>
    </Provider>
  );
}

export default App;
