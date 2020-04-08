import React, { Component } from "react";
import { Input, Checkbox, Button, InputNumber } from "antd";
import "./index.less";

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title: { isShowTitle, text, backupsTxet, style: { fontSize } },
      extra: { moreAxis }
    } = this.props.currentConfig;
    const titleFontSize = fontSize.replace(/[^0-9]/ig, "");
    return (
      <div className="leftTool" >
        {/** 标题显影功能，隐藏可以不占空间 */}
        <p>标题</p>
        内容：<Input style={{ width: "250px" }} value={isShowTitle ? text : backupsTxet} onChange={(e) => this.props.changeTitle("title", e)}/><br/>
        显影：<Checkbox checked={isShowTitle} onChange={(e) => this.props.onTitleShowChange("title", e)}/><br/>
        字体大小：<InputNumber value={titleFontSize} step={1} precision={0} onChange={(e) => this.props.updateTitleSize("title", e)}/>
        <hr/>
        单/多轴切换：<Checkbox checked={moreAxis} onChange={this.props.cutChartAxis}/><br/>
        更新对象：<Button size={"small"} onClick={this.props.updateSource}>+</Button>
      </div>
    );
  }
}
