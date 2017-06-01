/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/scatter');
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
        text: '大规模散点图'
      },
      tooltip: {
        trigger: 'axis',
        showDelay: 0,
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        },
        zlevel: 1
      },
      legend: {
        data: ['sin', 'cos']
      },
      xAxis: [
        {
          type: 'value',
          scale: true
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true
        }
      ],
      series: [
        {
          name: 'sin',
          type: 'scatter',
          large: true,
          symbolSize: 3,
          data: (() => {
            const d = [];
            let len = 10000;
            let x = 0;
            while (len--) {
              x = (Math.random() * 10).toFixed(3) - 0;
              d.push([
                x,
                // Math.random() * 10
                (Math.sin(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
              ]);
            }
            // console.log(d)
            return d;
          })()
        },
        {
          name: 'cos',
          type: 'scatter',
          large: true,
          symbolSize: 2,
          data: (() => {
            const d = [];
            let len = 20000;
            let x = 0;
            while (len--) {
              x = (Math.random() * 10).toFixed(3) - 0;
              d.push([
                x,
                // Math.random() * 10
                (Math.cos(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
              ]);
            }
            // console.log(d)
            return d;
          })()
        }
      ]
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
