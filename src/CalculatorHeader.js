import React from 'react';

class CalculatorHeader extends React.Component{
    render(){
        /* 
          1) consider destructuring and accessing that way
          2) p and d in front of variables make them less clear 
        */ 
    
        var pClassName = this.props.lastNumber != null ? 'lastNumActive' : '';
        var dLastNumber = this.props.lastNumber != null ? this.props.lastNumber : '0';

        return(
            <div className="calculatorHeader">
                <p className={pClassName}>{dLastNumber}</p>
                <h1>
                    {this.props.valueString}
                </h1>
            </div>
        );
    }
}

export default CalculatorHeader;