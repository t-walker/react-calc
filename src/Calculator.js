import React from 'react';
import CalculatorButton from './CalculatorButton.js'
import CalculatorHeader from './CalculatorHeader.js'

class Calculator extends React.Component{

    buttonData = {
        0: {
            value: 'AC',
            class: '',
            command: 'COMMAND_CLR',
            break: false,
            double: false
        },
        1: {
            value: '±',
            class: '',
            command: 'COMMAND_FLP',
            break: false,
            double: false
        },
        2: {
            value: '%',
            class: '',
            command: 'COMMAND_OPR',
            break: false,
            double: false
        },
        3: {
            value: '÷',
            class: 'buttonOp',
            command: 'COMMAND_OPR',
            break: true,
            double: false
        },
        4: {
            value: 7,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        5: {
            value: 8,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        6: {
            value: 9,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        7: {
            value: 'x',
            class: 'buttonOp',
            command: 'COMMAND_OPR',
            break: true,
            double: false
        },
        8: {
            value: 4,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        9: {
            value: 5,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        10: {
            value: 6,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        11: {
            value: '-',
            class: 'buttonOp',
            command: 'COMMAND_OPR',
            break: true,
            double: false
        },
        12: {
            value: 1,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        13: {
            value: 2,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        14: {
            value: 3,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: false
        },
        15: {
            value: '+',
            class: 'buttonOp',
            command: 'COMMAND_OPR',
            break: true,
            double: false
        },
        16: {
            value: 0,
            class: 'buttonNumber',
            command: 'COMMAND_NBR',
            break: false,
            double: true
        },
        17: {
            value: '.',
            class: '',
            command: 'COMMAND_DEC',
            break: false,
            double: false
        },
        18: {
            value: '=',
            class: 'buttonEql',
            command: 'COMMAND_EQL',
            break: false,
            double: false
        }
    }

    keyCodes = {
        48: 0,
        49: 1,
        50: 2,
        51: 3,
        52: 4,
        53: 5,
        54: 6,
        55: 7,
        56: 8,
        57: 9
    }

    constructor(props) {
        super(props);
        this.state = {
            currentValue: 0, 
            currentValueString: "0", 
            lastNum: null, 
            currentOp: null, 
            displayIsOld: false
        }
    }

    handleButtonClick(key){
        switch(this.buttonData[key].command){
            case 'COMMAND_CLR':
                this.commandClear();
                break;
            case 'COMMAND_NBR':
                this.commandAddNumber(key);
                break;
            case 'COMMAND_OPR':
                this.commandOperation(key);
                break;
            case 'COMMAND_EQL':
                this.commandEqual();
                break;
            case 'COMMAND_FLP':
                this.commandFlipSign();
                break;
            case 'COMMAND_DEC':
                this.commandDecimal();
                break;
            default:
                break;
        }
    }

    updateValue(value){
        this.setState({
            currentValue: Number(value),
            currentValueString: String(value)
        });
    }

    updateValue(value, displayIsOld){
        this.setState({
            currentValue: Number(value),
            currentValueString: String(value),
            displayIsOld: displayIsOld
        });
    }

    commandClear(){
        this.setState({
            currentValue: 0,
            currentValueString: "0",
            currentOp: null,
            displayIsOld: false,
            lastNum: null
        });
    }

    commandAddNumber(key){
        if(this.state.displayIsOld || this.state.currentValueString === "0"){
            this.updateValue(this.buttonData[key].value, false);
        }else{
            this.updateValue(Number(this.state.currentValueString + String(this.buttonData[key].value)));
        }
    }

    commandOperation(key){
        this.setState({
            currentOp: this.buttonData[key].value,
            displayIsOld: true,
            lastNum: Number(this.state.currentValueString),
            currentValue: 0,
            currentValueString: "0"
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
                currentValueString: String(newVal),
                displayIsOld: true,
                lastNum: null
            });
        }
    }

    commandFlipSign(data){
        this.setState({
            currentValue: this.state.currentValue * -1
        });
    }

    commandDecimal(data){
        this.setState({
            currentValueString: this.state.currentValueString + "."
        })
    }

    renderButtons(){
        const ret = [];
        for(const [key, value] of Object.entries(this.buttonData)){
            ret.push(<CalculatorButton key={key} value={value.value} doubleWidth={value.double} currentOperation={this.state.currentOp} internalClass={value.class} onClick={() => this.handleButtonClick(Number(key))}></CalculatorButton>);
            if(value.break){
                ret.push(<br key={"br" + key}/>);
            }
        }

        return ret;
    }

    render(){
        var givenLastNumber = null;
        if(this.state.lastNum != null){
            givenLastNumber = this.state.lastNum;
            if(this.state.currentOp != null){
                givenLastNumber += " " + this.state.currentOp;
            }
        }

        return(
            <div className="calculatorContainer">
                <CalculatorHeader value={this.state.currentValue} valueString={this.state.currentValueString} lastNumber={givenLastNumber}></CalculatorHeader>
                {this.renderButtons()}
            </div>
        )
    }
}

export default Calculator;