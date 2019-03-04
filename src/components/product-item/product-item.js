import React, { Component, Fragment } from "react";
import photo from "../../assets/Photo.png";
import "./product-item.css";

export default class ProductItem extends Component {
  state = {
    selected: false,
    isFirsthHover: false,
    hovered: false
  };

  changeSelectedState = () => {
    this.setState((prevState) => {
      return { selected: !prevState.selected };
    });
  };

  itemSelectHandler = () => {
    this.changeSelectedState();
  };

  itemClickHandler = () => {
    const { isAvailable } = this.props.product;
    if (!isAvailable) return;
    this.changeSelectedState();
  };

  mouseEnterHandler = () => {
    const { id, isAvailable } = this.props.product;
    const { hoveredItem } = this.props;

    if (!isAvailable) return;

    if (id !== hoveredItem) {
      this.setState({
        isFirsthHover: false
      });
    }
  };

  mouseLeaveHandler = () => {
    const { id, isAvailable } = this.props.product;
    const { hoveredItem, changeHoveredItem } = this.props;
    const { isFirsthHover } = this.state;

    if (isFirsthHover || !isAvailable) {
      return;
    }

    if (id !== hoveredItem) {
      changeHoveredItem(id);
    }

    this.setState({
      isFirsthHover: true,
      hovered: true
    });
  };

  componentDidUpdate({ hoveredItem }, prevState) {
    const { hovered } = prevState;
    const { id } = this.props.product;

    if (hoveredItem === id && hovered) {
      this.setState({
        hovered: false
      });
    }
  }

  render() {
    const { selected, hovered } = this.state;

    const {
      id,
      caption,
      title,
      type,
      info,
      weight,
      isAvailable,
      description
    } = this.props.product;

    const footerText = isAvailable ? (
      <Fragment>
        <span>Чего сидишь? Порадуй котэ,</span>{" "}
        <label htmlFor={`input-${id}`} className="product-item__buy">
          купи.
        </label>
      </Fragment>
    ) : (
      "Печалька, с курой закончился."
    );

    let unvailableStyle = {};

    if (!isAvailable) {
      unvailableStyle = { cursor: "not-allowed" };
    }

    return (
      <article className="product-item">
        <input
          className="visually-hidden"
          type="checkbox"
          disabled={!isAvailable}
          id={`input-${id}`}
          checked={selected}
          onChange={this.itemSelectHandler}
        />
        <div
          style={unvailableStyle}
          className={`product-item__card-wrapper ${
            hovered ? `product-item__card-wrapper--hovered` : ``
          }`}
          onClick={this.itemClickHandler}
          onMouseEnter={this.mouseEnterHandler}
          onMouseLeave={this.mouseLeaveHandler}
        >
          <div className="product-item__card">
            <header className="product-item__header">
              <p
                className={`product-item__caption ${
                  selected ? `product-item__caption--selected` : ``
                }`}
              >
                {selected ? "Котэ не одобраяет?" : caption}
              </p>
              <h2 className="product-item__title">{title}</h2>
              <p className="product-item__type">{type}</p>
            </header>
            <ul className="product-item__info">
              {info.map((item, idx) => (
                <li key={item + idx}>{item}</li>
              ))}
            </ul>
            <img
              className="product-item__image"
              src={photo}
              alt={`${title} ${type}`}
            />
            <div className="product-item__weight">
              <p className="product-item__weight-count">
                {weight}{" "}
                <span className="product-item__weight-measure">кг</span>
              </p>
            </div>
          </div>
        </div>
        <b
          className={`product-item__description ${
            !isAvailable ? `product-item__description--unavailable` : ``
          }`}
        >
          {selected ? description : footerText}
        </b>
      </article>
    );
  }
}
