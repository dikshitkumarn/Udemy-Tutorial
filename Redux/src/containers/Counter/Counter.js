import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions/index'
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrement} />
                <CounterControl label="Decrement" clicked={this.props.onDecrement}  />
                <CounterControl label="Add 5" clicked={this.props.onAdd}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtract}  />
                <hr />
                <button onClick= {() => this.props.onStoreResult(this.props.ctr)} >Store result</button>
                <ul>
                    {this.props.storedResults.map( result => 
                            <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)} > {result.value} </li>
                        )}
                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
}

const mapDispatch = (dispatch) => {
    return {
        onIncrement: () => dispatch( actionTypes.increment() ),
        onDecrement: () => dispatch( actionTypes.decrement() ),
        onAdd: () => dispatch( actionTypes.add(5) ),
        onSubtract: () => dispatch( actionTypes.subtract(5) ),
        onStoreResult: (ctr) => dispatch( actionTypes.storeResult(ctr) ),
        onDeleteResult: (id) => dispatch( actionTypes.deleteResult(id) )
    }
}

export default connect(mapStateToProps, mapDispatch)(Counter);