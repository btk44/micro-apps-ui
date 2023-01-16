import React from "react";
import Calculator from "../components/calculator/Calculator";

export default class Home extends React.Component {
  testHandler(value){
    console.log('home ' + value)
  }

  render() {
    return (
      <div className="home">
        <h1>This will be a home page soon</h1>
        <Calculator resultChanged={this.testHandler}></Calculator>
      </div>
    );
  }
}