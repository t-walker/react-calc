import React from 'react';

class CalculatorHeader extends React.Component{
    render(){
        return(
            <div className="calculatorHeader">
                <h1>
                    {this.props.value}
                </h1>
            </div>
        );
    }
}

export default CalculatorHeader;