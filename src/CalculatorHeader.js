import React from 'react';

class CalculatorHeader extends React.Component{
    
    render(){
        var pClassName = this.props.lastNumber != null ? 'lastNumActive' : '';
        var dLastNumber = this.props.lastNumber != null ? this.props.lastNumber : '0';

        return(
            <div className="calculatorHeader">
                <p className={pClassName}>{dLastNumber}</p>
                <h1>
                    {this.props.value}
                </h1>
            </div>
        );
    }
}

export default CalculatorHeader;