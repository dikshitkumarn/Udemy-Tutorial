import React, { Component } from "react";
import Transition from 'react-transition-group/Transition'

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {

  state= {
    show: false,
    showBlock: false
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
        <button className="Button" onClick={() => this.setState(prevState => {return {showBlock: !prevState.showBlock}})} >Toggle</button>
        <Transition in={this.state.showBlock} timeout={3000} mountOnEnter unmountOnExit >
          {state => 
            (<div style={{
              margin:'auto',
              width: 100,
              height: 100,
              backgroundColor: 'red',
              transition: 'opacity 1s ease-out',
              opacity: state === 'entered' ? 1 : 0
              }} >
            </div>)
          }
        </Transition>
        <br />
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
