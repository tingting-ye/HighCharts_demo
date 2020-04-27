import React from "react";
import Highcharts from "highcharts/highcharts";
import { map, merge, forEach, transform } from "lodash";
// import fp from "loadsh/fp";

export default class BaseChart extends React.Component {
  constructor(props) {
    super(props);
    this.initConfig = {
      /** 公共配置 */
      // 图表配置 边框（宽度 圆角 颜色） 上下左右边距 背景色 图表颜色
      chart: {
        animation: false, // 整体动画(默认关闭)
        showAxes: true, // 初始化显示坐标轴
        borderWidth: 1, // 边框（宽度）
        borderRadius: 0, // 边框（圆角）
        borderColor: "#ddd", // 边框（颜色）
        spacingTop: 10, // 边距-上
        spacingRight: 10, // 边距-右
        spacingBottom: 10, // 边距-下
        spacingLeft: 10, // 边距-左
        backgroundColor: "rgba(0, 0, 0, 0)", // 背景色
        plotBackgroundColor: "rgba(0, 0, 0, 0)" // 图表颜色
      },
      // 主标题 标题 文本样式（字体 大小 颜色 粗细 倾斜） 对齐方式
      title: {
        text: "杭州欢迎你~", // 标题
        isShowTitle: true, // 是否隐藏标题
        backupsTxet: undefined, // 配置项内配置的标题
        style: {
          fontFamily: "微软雅黑", // 文本样式(字体)
          fontSize: "16px", // 文本样式(大小)
          color: "#272C3D", // 文本样式(颜色)
          fontWeight: "normal", // 文本样式(粗细)
          fontStyle: "normal" // 文本样式(倾斜)
        },
        margin: 0,
        useHTML: true,
        align: "center" // 标题位置
      },
      // 副标题 标题 文本样式（字体 大小 颜色 粗细 倾斜） 对齐方式
      subtitle: {
        text: "我就是一个副标题", // 副标题
        isShowTitle: true, // 是否隐藏副标题
        backupsTxet: undefined, // 配置项内配置的副标题
        style: {
          fontFamily: "微软雅黑", // 文本样式(字体)
          fontSize: "16px", // 文本样式(大小)
          color: "#272C3D", // 文本样式(颜色)
          fontWeight: "normal", // 文本样式(粗细)
          fontStyle: "normal", // 文本样式(倾斜)
          paddingBottom: "5px"
        },
        useHTML: true,
        align: "center" // 标题位置
      },
      tooltip: {
        shared: true
      },
      // 图例 是否显示 边框（宽度 圆角 颜色） 对齐方式 布局方式 文本样式（字体 大小 颜色 粗细 倾斜） 背景色
      legend: {
        enabled: true, // 是否显示
        borderWidth: 0, // 边框（宽度）
        borderRadius: 0, // 边框（圆角）
        borderColor: "#999999", // 边框（颜色）
        align: "center", // 对齐方式(水平)
        verticalAlign: "bottom", // 对齐方式（垂直）
        layout: "horizontal", // 布局方式
        itemStyle: {
          color: "#333333", // 文本样式(颜色)
          fontFamily: "微软雅黑", // 文本样式(字体)
          fontSize: "12px", // 文本样式(大小)
          fontWeight: "bold", // 文本样式(粗细)
          fontStyle: "normal", // 文本样式(倾斜)
          cursor: "pointer"
        },
        // squareSymbol: true,
        // symbolHeight: 10,
        // symbolWidth: 10,
        // symbolRadius: 0, // 标记（正方形：0，圆形：100）
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      // // 标签 是否显示 边框（宽度 圆角 颜色）标签颜色 背景颜色 对齐方式 数据（格式 位数）字体大小 内间距
      plotOptions: {
        series: {
          // showInLegend: true, // 是否显示图例
          dataLabels: { // 标签
            enabled: true, // 是否显示
            borderWidth: 0, // 边框（宽度）
            borderRadius: 0, // 边框（圆角）
            borderColor: "#ddd", // 边框（颜色）
            color: "#272C3D", // 标签颜色
            backgroundColor: undefined, // 背景颜色
            align: "center", // 对齐方式(水平)
            padding: 5, // 内间距
            style: {
              fontSize: 11 // 字体大小
            },
            // distance: 30, // 环形图专用
            formatter: function () {
              const { series: { userOptions: { decimalPoint = 2 } } } = this;
              return this.key + ":" + Highcharts.numberFormat(this.y, decimalPoint);
            }
          }
        }
      },
      // 备注(版权信息) 是否显示 备注信息
      credits: {
        enabled: false, // 是否显示
        text: undefined // 信息
      },
      // 共用额外配置
      extra: {
        zIndex: 100, // 定位层级
        intervalTime: 0, // 定时器
        isFullScreenIcon: false, // 当前图表是否全局显示
        decimalPoint: 3
      },
      /** 以上 图表配置、标题、副标题、备注（版本信息），额外 等配置为公共配置，不可缺 */
      // x轴 是否显示 网格线 刻度（初始值 间隔） 标题 文本样式（字体 大小 颜色 粗细 倾斜） 标题位置 轴线颜色 轴字颜色 旋转角度 竖排文字
      // y轴 是否显示 网格线 准星线 单位 刻度（初始值 间隔） 标题 文本样式（字体 大小 颜色 粗细 倾斜） 标题位置 轴线颜色 轴字颜色 旋转角度 最大值
      xAxis: [{
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        /** x轴内容 提出 */
        type: "category",
        // type: "datetime",
        showEmpty: false, // 当坐标轴没有数据时，是否显示坐标轴（包括轴线及坐标轴标题）
        startOnTick: false, // 强制开始刻度（配合刻度）
        endOnTick: false, // 强制结束刻度（配合刻度）
        visible: true, // 是否显示X轴
        gridLineWidth: 0, // 网格线
        min: null, // 刻度（初始值）
        tickInterval: undefined, // 刻度（间隔）
        title: {
          text: undefined, // 标题
          style: {
            fontFamily: "微软雅黑", // 文本样式(字体)
            fontSize: 16, // 文本样式(大小)
            color: "#272C3D", // 文本样式(颜色)
            fontWeight: "normal", // 文本样式(粗细)
            fontStyle: "normal" // 文本样式(倾斜)
          },
          align: "center" // 标题位置
        },
        lineColor: "#ccd6eb", // 轴线颜色
        labels: { // 轴标签
          style: {
            color: "#666666", // 轴字颜色
            writingMode: "" // 竖排文字
          },
          rotation: 0 // 旋转角度
        }
      }],
      yAxis: [{
        /** y轴内容 提出 */
        id: "init_yAxis",
        showEmpty: false, // 当坐标轴没有数据时，是否显示坐标轴（包括轴线及坐标轴标题）
        startOnTick: true, // 强制开始刻度（配合刻度）
        endOnTick: true, // 强制结束刻度（配合刻度）
        visible: true, // 是否显示X轴
        gridLineWidth: 1, // 网格线
        crosshair: false, // 准星线
        min: null, // 刻度（初始值）
        max: null, // 刻度（最大值）
        tickInterval: undefined, // 刻度（间隔）
        title: {
          text: undefined, // 标题
          style: {
            fontFamily: "微软雅黑", // 文本样式(字体)
            fontSize: 16, // 文本样式(大小)
            color: "#272C3D", // 文本样式(颜色)
            fontWeight: "normal", // 文本样式(粗细)
            fontStyle: "normal" // 文本样式(倾斜)
          },
          align: "center" // 标题位置
        },
        lineColor: "#ccd6eb", // 轴线颜色
        labels: { // 轴标签
          style: {
            color: "#666666", // 轴字颜色
            writingMode: "", // 竖排文字
            display: "inline-block",
            padding: "0 5px"
          },
          rotation: 0, // 旋转角度
          x: 0,
          useHTML: true
        },
        plotLines: [] // 预警线
      }],
      series: []
    };
    this.state = {};
    this.dataSource = [
      {
        chooseX: "month",
        chooseY: "man",
        color: "#3073D6",
        id: "AAAA_p1.a1",
        type: "source",
        lineType: "column"
      }
      // {
      //   chooseX: "month",
      //   chooseY: "woman",
      //   color: "#EC6723",
      //   id: "AAAA_p1.a1",
      //   type: "yAxis",
      //   serviceShowName: "名称"
      // },
      // {
      //   chooseX: "month",
      //   chooseY: "woman",
      //   color: "#3BB45E",
      //   id: "AAAA_p1.a2",
      //   type: "source",
      //   lineType: "area"
      // }
    ];
    this.dataSourceData = {
      "AAAA_p1.a1": { list: Array(10).fill(0).map((item, index) => {
        return {
          month: `month${index}`,
          woman: Number(Math.random().toFixed(2)),
          man: Number(Math.random().toFixed(2))
        };
      }) },
      "AAAA_p1.a2": { list: Array(10).fill(0).map((item, index) => {
        return {
          month: `month${index}`,
          woman: Number(Math.random().toFixed(2)),
          man: Number(Math.random().toFixed(2))
        };
      }) }
    };
  }

  // 根据图表类型删除无用配置
  handleInit = (type) => {
    const initConfig = merge({}, this.initConfig);
    // 无图例配置图表
    const notLegend = ["SolidgaugeChart", "GaugeChart", "FunnelChart"];
    if (notLegend.indexOf(type) >= 0) delete initConfig.legend;
    return initConfig;
  }

  handleProperty(oldObj, newObj) {
    const newObjConfig = merge({}, oldObj, newObj);
    return transform(newObjConfig, (result, value, key) => {
      const oldValue = oldObj ? oldObj[key] : undefined;
      // 为{}但是不为[],再往下面查
      if (oldValue && typeof oldValue === "object" && typeof value === "object" && !Array.isArray(value)) {
        result[key] = this.handleProperty(value, oldValue);
      } else {
        result[key] = typeof oldValue !== "undefined" ? oldValue : value;
      }
    });
  }

  // 根据对象属性，初始化图表
  initAxis = () => {
    map(this.dataSource, (item, index) => this.addSingleAxis(item, index));
    window.chart.redraw();
  }

  // 更新series配置
  updateSeries = (type, value) => {
    forEach(window.chart.series, (item) => {
      window.chart.get(item.userOptions.id).update({ [type]: value }, false);
    });
  }

  // 公共更新操作
  updateConfig = (type, newObj) => {
    if (type !== "extra") {
      window.chart.update({ [type]: { ...newObj } });
    } else {
      window.chart.redraw();
    }
    console.log(this.currentConfig);
    // this.currentConfig[type] = Object.assign(this.currentConfig[type], newObj);
    this.forceUpdate();
  }

  // 改变标题的值
  changeTitle = (type = "title", e) => {
    const oldObj = this.currentConfig[type];
    const { value } = e.target;
    this.updateConfig(type, { [oldObj.isShowTitle ? "text" : "backupsTxet"]: value });
  }

  // 隐藏标题
  onTitleShowChange = (type = "title", e) => {
    const titleObj = this.currentConfig[type];
    const { checked } = e.target;
    const newObj = {};
    if (checked) {
      newObj.isShowTitle = true;
      newObj.text = titleObj.backupsTxet;
    } else {
      newObj.isShowTitle = false;
      newObj.backupsTxet = titleObj.text;
      newObj.text = undefined;
    }
    this.updateConfig(type, newObj);
  }

  // 改变标题文字大小
  updateTitleSize = (type = "title", value) => {
    const titleObj = this.currentConfig[type];
    titleObj.style.fontSize = `${value}px`;
    this.updateConfig(type, titleObj);
  }

  // 数据源变更
  // updateSource = () => {
  //   map(this.dataSource, (item) => {
  //     const { id, chooseY } = item;
  //     window.chart.get(`${id}_${chooseY}_series`).remove(false);
  //     window.chart.get(`${id}_${chooseY}_yAxis`).remove(false);
  //   });
  //   const newDataSource = [
  //     {
  //       chooseX: "month",
  //       chooseY: "man",
  //       color: "#3073D6",
  //       id: "AAAA_p1.a1",
  //       type: "source",
  //       serviceShowName: "新图标"
  //     },
  //     {
  //       chooseX: "month",
  //       chooseY: "woman",
  //       color: "#3BB45E",
  //       id: "AAAA_p1.a2",
  //       type: "source",
  //       serviceShowName: "新图标1"
  //     },
  //     {
  //       chooseX: "month",
  //       chooseY: "woman",
  //       color: "red",
  //       id: "AAAA_p1.a1",
  //       type: "yAxis",
  //       serviceShowName: "新图标22"
  //     }
  //   ];
  //   this.dataSource = merge([], newDataSource);
  //   this.initAxis();
  // }

  // 多y轴和单轴切换
  cutChartAxis = () => {
    const { extra: { moreAxis } } = this.currentConfig;
    this.currentConfig.extra.moreAxis = !moreAxis;
    map(window.chart.series, (item) => {
      window.chart.get(`${item.userOptions.yAxisId}_yAxis`).update({ visible: !moreAxis }, false);
      window.chart.get(item.userOptions.id).update({ yAxis: !moreAxis ? `${item.userOptions.yAxisId}_yAxis` : 0 }, false);
    });
    window.chart.redraw();
    this.forceUpdate();
  }

  // 运行期改动图表类型
  selectChartType = (value) => {
    this.updateSeries("type", value);
    window.chart.redraw();
    this.setState({ chartType: value });
  }

  // 添加单个对象属性
  addSingleAxis=(item, index) => {
    const { extra: { moreAxis, decimalPoint }, yAxis, chart: { type } } = this.currentConfig;
    const { id, serviceShowName, color, chooseX, chooseY, lineType } = item;
    const customConfig = Object.assign({}, yAxis[0]);
    customConfig.labels.style.color = color;
    window.chart.addAxis({
      ...customConfig,
      id: `${id}_${chooseY}_yAxis`,
      title: { text: null },
      lineWidth: 2,
      lineColor: color,
      opposite: index % 2 === 1,
      visible: moreAxis
    }, false);
    const data = map(this.dataSourceData[id].list || [], item => {
      return { name: item[chooseX], y: item[chooseY], drilldown: `${item[chooseX]}_drilldown${index}` };
    });
    console.log(data);
    window.chart.addSeries({
      id: `${id}_${chooseY}_series`,
      yAxisId: `${id}_${chooseY}`,
      name: serviceShowName,
      color: color,
      type: lineType || type,
      decimalPoint: decimalPoint,
      yAxis: moreAxis ? `${id}_${chooseY}_yAxis` : "init_yAxis",
      data: data
    }, false);
  }

  // 显示隐藏图例
  cutChartLegend = (e) => {
    const { checked } = e.target;
    this.updateConfig("legend", { enabled: checked });
  }

  updateLabelDecimalPoint = (value) => {
    this.updateSeries("decimalPoint", value);
    this.updateConfig("extra", { decimalPoint: value });
  }

  // selectLegendRadius = (value) => {
  //   const { legend } = this.currentConfig;
  //   legend.symbolRadius = value;
  //   this.updateConfig("legend", legend);
  // }
}
