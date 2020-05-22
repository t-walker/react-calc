import React from 'react';

class CalculatorButton extends React.Component{
    render(){
        let className = 'calculatorButton';
        if(this.props.doubleWidth){
            className += ' double';
        }
        if(this.props.currentOperation === this.props.value){
            className += ' opActive';
        }

        if(this.props.internalClass !== ""){
            className += ' ' + this.props.internalClass;
        }

        return(
            <button 
                className={className}
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

export default CalculatorButton;