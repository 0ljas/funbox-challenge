import React, { Component } from "react";
import "./app.css";
import ProductList from "../product-list";

import products from "../../mock.js";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app__container">
          <main className="app__content">
            <h1 className="app__title">Ты сегодня покормил кота?</h1>
            <ProductList products={products} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
