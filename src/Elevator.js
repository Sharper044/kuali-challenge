// I am defining a trip as when the elevator returns to ground floor. This will improve the maintenance experience for our techs.
import React, { Component } from 'react';

class App extends Component {
  state = {
    currentFloor: 1,
    movingTo: [], // Array of objects {floor: number, load: boolean}
    doorsOpen: false,
    occupied: false,
    numberOfFloorsPassed: 0,
    numberOfTrips: 0,
    maintenanceMode: false,
  }

  // insert componentDidUpdate to update the moveTo Arr with any new commands from the controller.

  load() {
    let arr = this.state.movingTo.slice();
    arr.shift();
    this.setState({
      doorsOpen: true,
      occupied: true,
      movingTo: arr,
    });
    this.maintenanceCheck();
    this.props.report(this.state); // I realize this is anti-pattern in react, but without taking the time to learn the context api or react hooks, or to implement redux, I will have to cut this corner.
    setTimeout(this.move, 1000);
  }

  unload() {
    let arr = this.state.movingTo.slice();
    arr.shift();
    this.setState({
      doorsOpen: true,
      occupied: false,
      movingTo: arr,
    });
    this.maintenanceCheck();
    this.props.report(this.state);
    setTimeout(this.move, 1000);
  }

  maintenanceCheck() {
    let tripsArr = this.state.movingTo.slice();
    let trips = tripsArr.filter(f => f.floor === 1).length;
    let obj = {};
    if ((this.state.numberOfTrips + trips) % 100 === 99) {
      obj = { maintenanceMode: true, movingTo: [ ...this.state.movingTo, {floor: 1, load: false}] }; //Signal controller to not let any new trips be added and move to bottom floor.
    }

    else if (this.state.currentFloor === 1) {
      obj = { numberOfTrips: this.state.numberOfTrips + 1 };
      if (obj.numberOfTrips % 100 === 0) {
        obj = { ...obj, maintenanceMode: true}
      }
      this.setState(obj);
    }
  }

  move() {
    if (this.state.maintenanceMode && this.state.currentFloor === 1) {
      this.stop();
    }
    else if (this.state.movingTo.length === 0) {
      setTimeout(this.move, 1000);
    }
    else if (this.state.currentFloor === this.state.movingTo[0].floor) {
      this.state.movingTo[0].load ? this.load() : this.unload();
    }
    else if (this.state.movingTo[0].floor > this.state.currentFloor) {
      this.setState({ currentFloor: this.state.currentFloor + 1, doorsOpen: false, numberOfFloorsPassed: this.state.numberOfFloorsPassed + 1});
      this.props.report(this.state);
      setTimeout(this.move, 1000);
    }
    else if (this.this.state.movingTo[0].floor < this.state.currentFloor) {
      this.setState({ currentFloor: this.state.currentFloor - 1, doorsOpen: false, numberOfFloorsPassed: this.state.numberOfFloorsPassed + 1});
      this.props.report(this.state);
      setTimeout(this.move, 1000);
    }
  }

  stop() {} // The goal of this function is to break the recursive nature of the move function and report maintenance issue.
  maintain() { // The goal of this function would be to reset maintenance mode to false, report its availability to the controller and invoke move()
  }
}

export default App;
