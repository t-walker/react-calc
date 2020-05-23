import React from 'react';
import CalculatorButton from './CalculatorButton.js'
import CalculatorHeader from './CalculatorHeader.js'

class Calculator extends React.Component{
    /* 
      Anything that relates to the function of your calculator should be
      extracted into its own file. Things like key mappings and whatnot
      can be better organized in another class, and then have this React component
      utilize that class.

      Currently seeing this for: buttonData, keyCodes

      Does this need to be an object? It seems like it could be an array given that 
      your keys are indexes. It seems like if you use an array you can clean up your
      logic down below.

      If there are also operations that you can break out into those in sort of a "controller"
      I think that'd be cool too.

      Another thing to think about is your file structure:
      /src
        /components
          /__test__
          calculator.jsx
          calculatorHeader.jsx
          calculatorButton.jsx
        /style
          index.css
          app.css
        /images
          logo.svg
        app.js
        index.js
        serviceWorker.js
        setupTests.js
    */
    buttonData = {
        0: {
            value: 'AC',
            class: 'buttonClr',
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

    /*
      This is a valid way to instatiate a class. Another way is
      class MyComponent extends React.Component {
          state = {
              ...
          }
      }

      The constructor is very common in other strong OO languages, but JS
      is a lot of fun when you start thinking about it in terms of functional
      programming.
    */
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

    /* 
      These look good, it's not always clear immediately why
      you're setting these values; but after reading it makes sense
      if there's a way to break them into more clear functions that'd be rad
      but it's not something I can think of off the top of my head
    */
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
            /* global variable instead of let, let doesn't need to be initialized */
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
        /* 
          Ret is not a clear variable name. If this is a collection of buttons, 
          make that clear by naming it buttons. 
        */
        const ret = [];
        
        /* 
          This code smells to me.

          If you use an array for buttonData (which also isn't descriptively named) 
          you can do: 

          Assuming button follows the shape: 
          {
            value: '-',
            class: 'buttonOp',
            command: 'COMMAND_OPR',
            break: true,
            double: false
          }

          Something nifty is if CalculatorButton's props names are the same as the object
          you're mapping onto the component can be done like this:

          buttonData.map((button) => CalculatorButton)

          which is the same as: 
          <CalculatorButton
            value={button.value}
            class={button.class}
            command={button.command}
            break={button.break}
            double={button.double}
          />

          Since the props of CalculatorButton don't exactly match those names, you
          won't be able to do this automagically but you could massage it to work. 
          You don't actually need to use an iterator for the key, you can use key={button.value}
          to map it on as long as it's a unique value.

        */
        for(const [key, value] of Object.entries(this.buttonData)){
            ret.push(
                <CalculatorButton 
                    key={key}
                    value={value.value}
                    doubleWidth={value.double}
                    currentOperation={this.state.currentOp}
                    internalClass={value.class} 
                    onClick={() => this.handleButtonClick(Number(key))}
                >
                </CalculatorButton>
                );
            if(value.break){
                ret.push(<br key={"br" + key}/>);
            }
        }

        return ret;
    }

    render(){
        /* 
          var is used to declare global variable scope; this gets messy easy

          I'd recommend using let for something like this. Also, it's not obvious to me
          what this code is doing. Even after reading through it a few times quickly, it's not 
          super intuitive. This block can probably be extracted into its own function and variables
          renamed to add more clarity to what's happening. 

          Do not try to make this block more understandable by adding comments about what's happening
          the code should speak for itself. 
        */

        /*
          A note about ES6 destructuring.

          Currently you're using "this.state" and "this.props" a lot, it's a personal pet peeve of mine
          and it starts to look at lot like actual Java. 

          One of the language features is called destructuring.

          You can write: 
          const {
              lastNum
          } = this.state;

          const {
              prop1
          } = this.props

          and then access them within the body of the function as their variables names lastNum and prop1
        */
        var givenLastNumber = null;
        if(this.state.lastNum != null){
            givenLastNumber = this.state.lastNum;
            if(this.state.currentOp != null){
                givenLastNumber += " " + this.state.currentOp;
            }
        }

        return(
            <div className="calculatorContainer">
                {/* 
                  Below you're creating a container component <CalculatorHeader ...></CalculatorHeader> without providing a body. 
                  This component can be rendered as: <CalculatorHeader ... />

                  Anything that goes inside of that container will be available via this.props.children. 
                */}
                <CalculatorHeader value={this.state.currentValue} valueString={this.state.currentValueString} lastNumber={givenLastNumber}></CalculatorHeader>
                {this.renderButtons()}
            </div>
        )
    }
}

export default Calculator;