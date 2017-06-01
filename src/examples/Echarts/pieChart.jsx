/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');

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
  setPieOption(data) {
    return {
      series: [
        {
          name: '比例',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: true,
          data, // 传入外部的data数据
          label: {
            normal: {
              show: false,
              position: 'center',
              textStyle: {
                fontSize: '18'
              },
              formatter: '{d}% \n{b}'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '18'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
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
