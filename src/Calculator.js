import React from 'react';
import CalculatorButton from './CalculatorButton.js'
import CalculatorHeader from './CalculatorHeader.js'

class Calculator extends React.Component{

    buttons = {
        0: 'AC',
        1: '±',
        2: '%',
        3: '÷',
        4: '7',
        5: '8',
        6: '9',
        7: 'x',
        8: '4',
        9: '5',
        10: '6',
        11: '-',
        12: '1',
        13: '2',
        14: '3',
        15: '+',
        16: '0',
        17: '.',
        18: '='
    };

    internalClassMap = {
        'buttonNumber': [4, 5, 6, 8, 9, 10, 12, 13, 14, 16],
        'buttonOp': [3, 7, 11, 15],
        'buttonEql': [18]
    }

    commandMap = {
        'COMMAND_CLR': [ 0 ],
        'COMMAND_NBR': [4, 5, 6, 8, 9, 10, 12, 13, 14, 16],
        'COMMAND_OPR': [3, 7, 11, 15, 2],
        'COMMAND_EQL': [18]
    }

    breaks = [ 3, 7, 11, 15 ];

    doubleWidth = [16];

    constructor(props) {
        super(props);
        this.state = {currentValue: 0, lastNum: null, currentOp: null, displayIsOld: false}
    }

    handleButtonClick(key, value){
        var command = '';

        for(const[cmdKey, cmdKeyVals] of Object.entries(this.commandMap)){
            if(cmdKeyVals.includes(Number(key))){
                command = cmdKey;
                break;
            }
        }

        switch(command){
            case 'COMMAND_CLR':
                this.commandClear();
                break;
            case 'COMMAND_NBR':
                this.commandAddNumber(Number(value));
                break;
            case 'COMMAND_OPR':
                this.commandOperation(key, value);
                break;
            case 'COMMAND_EQL':
                this.commandEqual();
                break;
            default:
                break;
        }
    }

    renderButton(key, value){
        const doubleWidth = this.doubleWidth.includes(Number(key));

        var  internalClass = "";
        for(const[cKey, cVal] of Object.entries(this.internalClassMap)){
            if(cVal.includes(Number(key))){
                internalClass = cKey;
                break;
            }
        }

        return <CalculatorButton key={key} value={value} doubleWidth={doubleWidth} currentOperation={this.state.currentOp} internalClass={internalClass} onClick={() => this.handleButtonClick(Number(key), value)}></CalculatorButton>
    }

    renderButtons(){
        const ret = [];
        for(const [key, value] of Object.entries(this.buttons)){
            ret.push(this.renderButton(key, value));
            if(this.breaks.includes(Number(key))){
                ret.push(<br key={"br" + key}/>);
            }
        }

        return ret;
    }

    commandClear(){
        this.setState({
            currentValue: 0,
            currentOp: null,
            displayIsOld: false,
            lastNum: null
        });
    }

    commandAddNumber(number){
        const currentVal = this.state.currentValue;
        if(this.state.displayIsOld || currentVal === 0){
            this.setState({currentValue: number, displayIsOld: false})
        }else{
            this.setState({currentValue: Number(String(currentVal) + String(number)) });
        }
    }

    commandOperation(key, value){
        this.setState({
            currentOp: value,
            displayIsOld: true,
            lastNum: this.state.currentValue
        });
    }

    commandEqual(){
        if(this.state.currentOp != null){
            var newVal = 0;

            switch(this.state.currentOp){
                case '+':
                    newVal = this.state.lastNum + this.state.currentValue;
                    break;
                case '-':
                    newVal = this.state.lastNum - this.state.currentValue;
                    break;
                case 'x':
                    newVal = this.state.lastNum * this.state.currentValue;
                    break;
                case '÷':
                    newVal = this.state.lastNum / this.state.currentValue;
                    break;
                case '%':
                    newVal = this.state.lastNum % this.state.currentValue;
                    break;
                default:
                    break;
            }
    
            this.setState({
                currentOp: null,
                currentValue: newVal,
                displayIsOld: true,
                lastNum: null
            });
        }
    }

    render(){
        return(
            <div className="calculatorContainer">
                <CalculatorHeader value={this.state.currentValue}></CalculatorHeader>
                {this.renderButtons()}
            </div>
        )
    }
}

export default Calculator;