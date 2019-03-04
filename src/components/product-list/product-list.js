import React, { Component } from "react";
import "./product-list.css";

import ProductItem from "../product-item";

export default class ProductList extends Component {
  state = {
    hoveredItem: null
  };

  changeHoveredItem = (id) => {
    this.setState({
      hoveredItem: id
    });
  };

  render() {
    const productList = this.props.products.map((product) => {
      const { id } = product;
      return (
        <ProductItem
          key={id}
          product={product}
          changeHoveredItem={this.changeHoveredItem}
          {...this.state}
        />
      );
    });

    return <div className="product-list">{productList}</div>;
  }
}
