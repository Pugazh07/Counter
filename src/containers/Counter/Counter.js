import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import './Counter.css';

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
            default:
                console.log("default")
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubCounter}  />
                <hr />
                <button onClick={this.props.onStoreResult.bind(this,this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.strResults.map(strResult=>
                        <div key={strResult.id}>
                            <li>{strResult.value}</li>
                            <button  onClick={()=>this.props.onDelResult(strResult.id)}>Del</button>
                        </div>)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    ctr: state.ctr.counter,
    strResults: state.res.results
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIncrementCounter: () => dispatch({type:actionTypes.INCREMENT}),
        onDecCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, value:5}),
        onSubCounter: () => dispatch({type: actionTypes.SUB, value:5}),
        onStoreResult: (counter) => dispatch({type: actionTypes.STORE_RESULT, value: counter}),
        onDelResult: (id) => dispatch({type: actionTypes.DEL_RESULT, resultId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);