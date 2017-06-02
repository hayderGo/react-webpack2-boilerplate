/* eslint import/no-unresolved: 0 */
/* eslint no-shadow: 0 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import TicC from 'bundle-loader?lazy!../tic-tac-toe.jsx';
import BarChartC from 'bundle-loader?lazy!../Echarts/barChart';
import PieChartC from 'bundle-loader?lazy!../Echarts/pieChart';
import candlestickChartC from 'bundle-loader?lazy!../Echarts/candlestickChart';
import scatterChartC from 'bundle-loader?lazy!../Echarts/scatterChart';
import radarChartC from 'bundle-loader?lazy!../Echarts/radarChart';
import Bundle from './Bundle';

// console.log(TicC);
// console.log(import('bundle-loader?lazy!../tic-tac-toe.jsx'));

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">TIC-TAC-TOE</Link></li>
        <li><Link to="/topics">ECharts</Link></li>
      </ul>
      
      <hr />
      
      <Route exact path="/" component={Home} />
      <Route path="/about" component={Tic} />
      <Route path="/topics" component={Echarts} />
    </div>
  </Router>
);

const Home = () => (
  <h2>
    首页
  </h2>
);

const Tic = () => (
  <Bundle load={TicC}>
    {(Game) => <Game />}
  </Bundle>
);

const Echarts = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h2>ECharts</h2>
      <ul>
        <li>
          <Link to={`${match.url}/bar`}>
            柱状图
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/pie`}>
            饼图
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/candlestick`}>
            K线图
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/scatter`}>
            散点图
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/radar`}>
            雷达图
          </Link>
        </li>
      </ul>
      <Route path={`${match.url}/:chartType`} component={Chart} />
      <Route
        exact
        path={match.url}
        render={() => (
          <h3>Please select a topic.</h3>
        )}
      />
    </div>);
};

const Chart = ({ match }) => {
  let Container = null;
  switch (match.params.chartType) {
    case 'bar':
      Container = BarChartC;
      break;
    case 'pie':
      Container = PieChartC;
      break;
    case 'candlestick':
      Container = candlestickChartC;
      break;
    case 'scatter':
      Container = scatterChartC;
      break;
    case 'radar':
      Container = radarChartC;
      break;
    default:
      Container = null;
  }
  return (
    <Bundle load={Container}>
      {(Chart) => <Chart ajax="123" />}
    </Bundle>
  );
};

export default BasicExample;
