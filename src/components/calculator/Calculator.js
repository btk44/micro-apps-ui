import { useState } from 'react'
import './Calculator.css'
import MathSymbols from './MathSymbols'
import MathSybols from './MathSymbols'

export default function Calculator({result, resultChanged}) {
  const clearSymbol = 'C'
  const mathOperators = [MathSybols.Obelus, MathSybols.Asterisk, MathSybols.Minus,
                         MathSybols.Plus, MathSybols.Equal]
  const numericButtonTexts = ['7','8','9','4','5','6','1','2','3',
                              MathSybols.Dot,MathSybols.Zero,clearSymbol]

  const [calculatorInput, setCalculatorInput] = useState(result)

  //let currentOperation = MathSybols.Equal
  //let previousOperation = mathSymbols.Equal

  function numericButtonClicked(event){
    let value = event.target.innerHTML
    
    if(value === clearSymbol){
      setCalculatorInput(MathSymbols.Zero)
    } 
    else if(value === MathSybols.Dot && calculatorInput.indexOf(MathSybols.Dot) === -1){
      setCalculatorInput(calculatorInput + value)
    } else {
      setCalculatorInput(calculatorInput === MathSymbols.Zero ? value : calculatorInput + value)
    }

    resultChanged(calculatorInput)
  }

  function operatorButtonClicked(event){

  }
  
  return (
    <div className='calculator-component'>
      <div className='display-text'>
        <input type='text' value={calculatorInput} readOnly />
      </div>
      <div className='numeric-buttons'>
        { numericButtonTexts.map(buttonText =>
            <button key={buttonText} className='button numeric-button' onClick={numericButtonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
      <div className='math-buttons'>
        { mathOperators.map(buttonText => 
            <button key={buttonText} className='button math-button' onClick={operatorButtonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
    </div>
  )  
}