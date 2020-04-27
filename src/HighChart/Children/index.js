import React, { Component } from "react";
import { Input, Checkbox, Button, InputNumber, Select } from "antd";
import "./index.less";

const { Option } = Select;

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { chartType, currentConfig } = this.props;
    const {
      title: { isShowTitle, text, backupsTxet, style: { fontSize } },
      legend: { enabled },
      extra: { moreAxis, decimalPoint }
    } = currentConfig;
    const titleFontSize = fontSize.replace(/[^0-9]/ig, "");
    return (
      <div className="leftTool" >
        {/** 标题显影功能，隐藏可以不占空间 */}
        <p>标题</p>
        内容：<Input style={{ width: "250px" }} value={isShowTitle ? text : backupsTxet} onChange={(e) => this.props.changeTitle("title", e)}/><br/>
        显影：<Checkbox checked={isShowTitle} onChange={(e) => this.props.onTitleShowChange("title", e)}/><br/>
        字体大小：<InputNumber value={titleFontSize} step={1} precision={0} onChange={(e) => this.props.updateTitleSize("title", e)}/>
        <hr/>
        <p>自定义功能</p>
        单/多轴切换：<Checkbox checked={moreAxis} onChange={this.props.cutChartAxis}/><br/>
        更新对象：<Button size={"small"} onClick={this.props.updateSource}>+</Button><br/>
        切换类型：
        <Select value={chartType} style={{ width: "100px" }} onChange={this.props.selectChartType}>
          <Option value={"line"}>折线图</Option>
          <Option value={"spline"}>曲线图</Option>
          <Option value={"column"}>柱状图</Option>
          <Option value={"area"}>面积图</Option>
        </Select><br/>
        标签小数点：<InputNumber value={decimalPoint} step={1} precision={0} onChange={(e) => this.props.updateLabelDecimalPoint(e)}/>
        <hr/>
        <p>图例</p>
        显示隐藏：<Checkbox checked={enabled} onChange={this.props.cutChartLegend}/><br/>
        <hr/>
        {/* 圆角：
        <Select value={symbolRadius} style={{ width: "100px" }} onChange={this.props.selectLegendRadius}>
          <Option value={0}>正方形</Option>
          <Option value={100}>圆形</Option>
        </Select> */}
      </div>
    );
  }
}
