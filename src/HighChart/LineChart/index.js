import React from "react";
import { merge } from "lodash";
import { Input, Checkbox } from "antd";
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
    const { title: { isShowTitle, backupsTxet } } = this.currentConfig;
    return (
      <div style={{ width: "100%", height: "500px" }}>
        {/** 标题显影功能，隐藏可以不占空间 */}
        <div>
          <Input value={backupsTxet} onChange={this.changeTitle}/>
          <Checkbox defaultChecked={isShowTitle} onChange={this.onTitleShowChange}/>
        </div>
        <div style={{ minWidth: "410px", maxWidth: "600px", height: "400px", margin: "0 auto", overflow: "hidden" }}>
          <div ref={(el) => { this.container = el; }}/>
        </div>
      </div>
    );
  }
}
