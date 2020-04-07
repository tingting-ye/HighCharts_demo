import React from "react";
import { merge } from "lodash";
import Highcharts from "highcharts/highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import dragPanes from "highcharts/modules/drag-panes";
import BaseChart from "../BaseChart";

HighchartsMore(Highcharts);
dragPanes(Highcharts);

export default class index extends BaseChart {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.customConfig = {
      chart: {
        type: "gauge"
      },
      series: [
        {
          name: "速度",
          data: [80]
        }
      ]
    };
    this.currentConfig = merge({}, this.initConfig, this.customConfig);
  }

  componentDidMount() {
    this.chart = Highcharts.chart(this.container, this.currentConfig);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  render() {
    return (
      <div style={{ minWidth: "410px", maxWidth: "600px", height: "400px", margin: "0 auto", overflow: "hidden" }}>
        <div ref={(el) => { this.container = el; }}/>
      </div>
    );
  }
}
