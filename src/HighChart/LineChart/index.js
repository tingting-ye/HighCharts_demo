import React from "react";
import { merge, map } from "lodash";
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
        moreAxis: false, // 是否多Y轴
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

  initAxis = () => {
    map(this.dataSource, (item, index) => {
      this.addSingleAxis(item, index);
    });
    window.chart.redraw();
  }

  addSingleAxis=(item, index) => {
    const { extra: { moreAxis }, yAxis, chart: { type } } = this.currentConfig;
    const { name, color, source, customType } = item;
    const customConfig = merge({}, yAxis[0]);
    customConfig.labels.style.color = color;
    window.chart.addAxis({ // Secondary yAxis
      ...customConfig,
      id: source,
      title: { text: null },
      lineWidth: 2,
      lineColor: color,
      opposite: index % 2 === 1,
      visible: moreAxis
    }, false);
    window.chart.addSeries({
      yAxisId: source,
      name: name,
      color: color,
      type: customType || type,
      yAxis: moreAxis ? source : 0,
      data: Array(10).fill(0).map(() => Number(Math.random().toFixed(2)))
    }, false);
  }

  clearAxis = () => {
    // 删除数据源
    // this.dataSource.splice(1,1)
    // window.chart.get("AAAA_p1.a2").remove(false);
    // map(window.chart.yAxis,( item, index ) => {
    //   if(index>0) {
    //     const opposite = index % 2 === 0
    //     window.chart.yAxis[index].update({opposite:opposite},false);
    //   }
    // });
    // window.chart.redraw();

    // 多y轴和单y
    const { extra: { moreAxis } } = this.currentConfig;
    this.currentConfig.extra.moreAxis = !moreAxis;
    map(window.chart.series, (item, index) => {
      window.chart.get(item.userOptions.yAxisId).update({ visible: !moreAxis });
      window.chart.series[index].update({ yAxis: !moreAxis ? item.userOptions.yAxisId : 0 }, false);
    });
    window.chart.redraw();

    // window.chart.get("id").remove() 删除对应yAxis和series
    // map(this.dataSource,( item ) => {
    //   window.chart.get(item.source).remove(false);
    // });
    // this.currentConfig.extra.moreAxis = !this.currentConfig.extra.moreAxis;
    // this.initAxis()
  }

  addAxis = () => {
    const item = { name: "我是新增的", color: "#000", source: "o1" };
    this.dataSource.push(item);
    this.addSingleAxis(item, this.dataSource.length - 1);
    window.chart.redraw();
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ToolChild
          currentConfig={this.currentConfig}
          changeTitle={this.changeTitle} // 改变（正/负）标题名称
          onTitleShowChange={this.onTitleShowChange} // （正/负）标题显示隐藏
          clearAxis={this.clearAxis}
          addAxis={this.addAxis}
          updateTitleSize={this.updateTitleSize}
        />
        <div
          className="chart"
          // style={{ marginLeft: "300px", width: "calc(100% - 300px)", height: "100%", overflow: "hidden" }}
        >
          <div ref={(el) => { this.container = el; }}/>
        </div>
      </div>
    );
  }
}
