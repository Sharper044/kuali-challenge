import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    requestArr = [],
    noOfFloors = 1,
    noOfElevators = 1,
  }

  changeNumberOf(number, type) {
    if (number >= 1) {
      this.setState({ [type]: Math.floor(number) }); // In there in case a non-integer is used. type must be 'noOfFloors' or 'noOfElevators'
    }
  }

  // This method can be called by any floor at any time to request an elevator lift.
  makeRequest(startFloor, endFloor) {

  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
