import { Component } from "react";


export default class Product extends Component {

  render = () => this.props.product ? <img src={this.props.product.image} width={400} alt={this.props.product.name} /> : null

}