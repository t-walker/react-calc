import React from 'react';

class CalculatorButton extends React.Component{
    render(){
        /*
          Your props are:
            doubleWidth
            value
            internalClass <- I don't like how this one is named. If you're putting another class on this,
                             I think you can still provide "className" as a prop and access it via props.
            onClick
            currentOperation
        */ 
        let className = 'calculatorButton';

        if(this.props.doubleWidth){
            className += ' double';
        }


        if(this.props.currentOperation === this.props.value) {
            className += ' opActive';
        }


        if(this.props.internalClass !== "") {
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