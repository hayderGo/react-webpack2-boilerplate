/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

const products = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

function ProductCategoryRow(props) {
  return (
    <tr><th colSpan="2">{props.category}</th></tr>
  );
}

function ProductRow(props) {
  const style = {
    color: 'red'
  };
  const name = props.product.stocked ?
    <span>{props.product.name}</span> : <span style={style}>{props.product.name}</span>;
  const price = <span>{props.product.price}</span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductTable(props) {
  const rows = [];
  let lastCategory = null;
  props.products.forEach((product) => {
    if (product.name.indexOf(props.filterText) === -1 || (!product.stocked && props.inStockOnly)) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function SearchBar(props) {
  const changeHandler = (e) => {
    props.changeHandler(e.target.value);
  };
  const toggleHandler = () => {
    props.toggleHandler();
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={changeHandler}
      />
      <p>
        <input
          type="checkbox"
          value={props.inStockOnly}
          onChange={toggleHandler}
        />
        Only show products in stock
      </p>
    </form>
  );
}

// function ProductDemo(props) {
//   const style = {
//     margin: '20px',
//     border: '1px solid #000'
//   };
//   return (
//     <div style={style}>
//       <SearchBar />
//       <ProductTable products={props.products} />
//     </div>
//   );
// }
//
// export default ProductDemo;

export default class ProductDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products,
      filterText: '',
      inStockOnly: false
    };
  }
  toggleHandler = () => {
    this.setState((prevState) => ({
      inStockOnly: !prevState.inStockOnly
    }));
  };
  changeHandler = (text) => {
    this.setState({
      filterText: text
    });
  }
  render() {
    const style = {
      margin: '20px',
      padding: '20px',
      border: '1px solid #000'
    };
    return (
      <div style={style}>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          toggleHandler={this.toggleHandler}
          changeHandler={this.changeHandler}
        />
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}
