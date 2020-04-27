import React, { Component } from "react";
import LineChart from "./LineChart/index";

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container" >
        <LineChart newType={"line"}/>
      </div>
    );
  }
}
