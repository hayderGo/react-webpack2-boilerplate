/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/radar');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

export default class PieReact extends Component {
  constructor(props) {
    super(props);
    this.setPieOption = this.setPieOption.bind(this);
    this.initPie = this.initPie.bind(this);
  }
  
  componentDidMount() {
    this.initPie();
  }
  
  componentDidUpdate() {
    this.initPie();
  }
  
  // 一个基本的echarts图表配置函数
  setPieOption() {
    return {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          {
            name: '销售（sales）',
            max: 6500
          },
          {
            name: '管理（Administration）',
            max: 16000
          },
          {
            name: '信息技术（Information Techology）',
            max: 30000
          },
          {
            name: '客服（Customer Support）',
            max: 38000
          },
          {
            name: '研发（Development）',
            max: 52000
          },
          {
            name: '市场（Marketing）',
            max: 25000
          }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          }
        ]
      }]
    };
  }
  
  initPie() {
    const data = [1, 2, 3, 5, 6]; // 外部传入的data数据
    let myChart = null;
    if (!echarts.getInstanceByDom(this.div)) {
      myChart = echarts.init(this.div); // 初始化echarts
    } else {
      myChart = echarts.getInstanceByDom(this.div);
    }
    
    // 我们要定义一个setPieOption函数将data传入option里面
    const options = this.setPieOption(data);
    // 设置options
    myChart.setOption(options);
  }
  
  render() {
    return (
      <div className="pie-react">
        <div
          ref={(div) => {
            this.div = div;
          }}
          style={{
            width: '100%',
            height: '400px'
          }}
        />
      </div>
    );
  }
  
}
