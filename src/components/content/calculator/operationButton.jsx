import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class OperationButton extends Component {
    state = {  } 
    render() { 
        return ( 
            <button onClick={() => {
                this.props.choose_operations(this.props.operation);
            }}>
                {this.props.operation}
            </button>
        );
    }
}

const mapDispatchToProps = {
    choose_operations: operation => ({
        type: ACTIONS.CHOOSE_OPERATION,
        operation,
    })
}

export default connect(null, mapDispatchToProps)(OperationButton);