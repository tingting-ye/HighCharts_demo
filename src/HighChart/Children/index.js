import React, { Component } from "react";
import { Input, Checkbox, Button, InputNumber } from "antd";
import "./index.less";

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title: { isShowTitle, backupsTxet } } = this.props.currentConfig;
    return (
      <div
        className="leftTool"
        // style={{ width: "300px", float: "left" }}
      >
        {/** 标题显影功能，隐藏可以不占空间 */}
        <p>标题</p>
        内容：<Input style={{ width: "250px" }} value={backupsTxet} onChange={this.props.changeTitle}/><br/>
        显影：<Checkbox defaultChecked={isShowTitle} onChange={this.props.onTitleShowChange}/><br/>
        字体大小：<InputNumber onChange={this.props.updateTitleSize}/>
        <hr/>
        <Button onClick={this.props.clearAxis}>删除a1</Button>
        <Button onClick={this.props.addAxis}>新增o1</Button>
      </div>
    );
  }
}
