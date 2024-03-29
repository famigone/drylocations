import React, { Component } from "react";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "react-pure-render/function";

import {
  greatPlaceStyle,
  greatPlaceStyleHover
} from "./my_great_place_with_hover_styles.js";

export default class MyGreatPlaceWithHover extends React.Component {
  //  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;

    return <div style={style}>{this.props.text}</div>;
  }
}
MyGreatPlaceWithHover.propTypes = {
  // GoogleMap pass $hover props to hovered components
  // to detect hover it uses internal mechanism, explained in x_distance_hover example
  text: PropTypes.string,
  $hover: PropTypes.bool
};
