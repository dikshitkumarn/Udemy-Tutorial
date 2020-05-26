import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {

  state= {
    show: false
  }

  modalOpen = () => {
    this.setState({show: true})
  }

  modalClose = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <Modal closed={this.modalClose} show={this.state.show} />
        <Backdrop show={this.state.show} />
        <button className="Button" onClick={this.modalOpen}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
