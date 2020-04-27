import React from "react";
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
    this.customConfig = {
      chart: { type: props.newType || "line" }
      // plotOptions: {
      //   series: {
      //     marker: {
      //       enabled: true,
      //       // "circle"（圆形）、"square"（正方形）、"diamond"（菱形）、 "triangle"（三角形）及 "triangle-down"（倒三角形）
      //       symbol: "circle",
      //       fillColor: undefined,
      //       lineWidth: 0,
      //       lineColor: null
      //     }
      //   }
      // },
      // extra: {
      //   moreAxis: true, // 是否多Y轴
      //   yAxisUnit: "" // y轴单位
      // }
    };
    // 根据图表类型删除无用配置
    this.initConfig = this.handleInit("LineChart");
    this.currentConfig = this.handleProperty(this.initConfig, this.customConfig);
    const { chart: { type } } = this.currentConfig;
    this.state = {
      chartType: type // 当前图表类型
    };
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
          chartType={this.state.chartType}
          currentConfig={this.currentConfig}
          changeTitle={this.changeTitle} // 改变标题名称
          onTitleShowChange={this.onTitleShowChange} // 标题显示隐藏
          updateTitleSize={this.updateTitleSize} // 标题字体大小
          updateSource={this.updateSource} // 对象属性变更
          cutChartAxis={this.cutChartAxis} // 多轴、单轴切换
          selectChartType={this.selectChartType} // 切换图表类型
          cutChartLegend={this.cutChartLegend} // 切换图例显示隐藏
          // selectLegendRadius={this.selectLegendRadius} // 图例类型
          updateLabelDecimalPoint={this.updateLabelDecimalPoint} // 小数点
        />
        <div className="chart">
          <div ref={(el) => { this.container = el; }}/>
        </div>
      </div>
    );
  }
}
