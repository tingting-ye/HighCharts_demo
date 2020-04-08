import React from "react";
import { merge } from "lodash";
import Highcharts from "highcharts/highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import dragPanes from "highcharts/modules/drag-panes";
import BaseChart from "../BaseChart";
import ToolChild from "../Children/index";
import "../chart.less";

HighchartsMore(Highcharts);
dragPanes(Highcharts);

export default class index extends BaseChart {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.customConfig = {
      extra: {
        moreAxis: true, // 是否多Y轴
        yAxisUnit: "" // y轴单位
      }
    };
    this.currentConfig = merge({}, this.initConfig, this.customConfig);
  }

  componentDidMount() {
    window.chart = Highcharts.chart(this.container, this.currentConfig);
    this.initAxis();
  }

  componentWillUnmount() {
    if (window.chart) {
      window.chart.destroy();
      window.chart = null;
    }
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ToolChild
          currentConfig={this.currentConfig}
          changeTitle={this.changeTitle} // 改变标题名称
          onTitleShowChange={this.onTitleShowChange} // 标题显示隐藏
          updateTitleSize={this.updateTitleSize} // 标题字体大小
          updateSource={this.updateSource} // 对象属性变更
          cutChartAxis={this.cutChartAxis} // 多轴、单轴切换
        />
        <div className="chart">
          <div ref={(el) => { this.container = el; }}/>
        </div>
      </div>
    );
  }
}
