import React, { Component } from "react";

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const myName = "I‘m YTT";
    return (
      <div>Hello World { myName }</div>
    );
  }
}