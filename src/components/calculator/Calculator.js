import { useEffect, useState } from 'react'
import './Calculator.css'
import MathSymbols from './MathSymbols'
import MathSybols from './MathSymbols'

export default function Calculator({initialValue, updateValue}) {
  const clearSymbol = 'C'
  const mathOperators = [MathSybols.Obelus, MathSybols.Asterisk, MathSybols.Minus,
                         MathSybols.Plus, MathSybols.Equal]
  const numericButtonTexts = ['7','8','9','4','5','6','1','2','3',
                              MathSybols.Dot,MathSybols.Zero,clearSymbol]
  
  const [calculatorState, setCalculatorState] = useState({
    result: +initialValue,
    resultText: initialValue,
    lastOperation: MathSymbols.Equal,
    operatorActivated: false,
    isInitialValue: true
  })

  useEffect(() => { updateValue(calculatorState.result); console.log('test') }, [updateValue, calculatorState.result])

  function numericButtonClicked(event){
    event.preventDefault()
    const buttonText = event.target.innerHTML
    const lastResultText = calculatorState.operatorActivated ? '0' : calculatorState.resultText
    let newResultText = '0'
    let newResult = 0

    switch(buttonText){
      case clearSymbol: break
      case MathSybols.Dot:
        newResultText = lastResultText + (lastResultText.indexOf(MathSybols.Dot) === -1 ? MathSybols.Dot : '')
        newResult = calculatorState.result
        break
      default: 
        newResultText = lastResultText === MathSybols.Zero || calculatorState.isInitialValue ? buttonText : lastResultText + buttonText
        newResult = calculatorState.lastOperation !== MathSybols.Equal ? calculatorState.result : +newResultText
        break
    }

    setCalculatorState({
      result: newResult,
      resultText: newResultText,
      lastOperation: calculatorState.lastOperation,
      operatorActivated: false,
      isInitialValue: false
    })
  }

  function operatorButtonClicked(event){
    event.preventDefault()
    const operator = event.target.innerHTML
    let newResult = 0
    
    switch(calculatorState.lastOperation){
      case MathSymbols.Equal: newResult = +calculatorState.resultText; break
      case MathSymbols.Plus: newResult = calculatorState.result + +calculatorState.resultText; break
      case MathSymbols.Minus: newResult = calculatorState.result - +calculatorState.resultText; break
      case MathSymbols.Asterisk: newResult = calculatorState.result * +calculatorState.resultText; break
      case MathSymbols.Obelus: newResult = calculatorState.result / +calculatorState.resultText; break
      default: return
    }

    newResult = newResult > 0 ? newResult : 0

    setCalculatorState({
      result: newResult,
      resultText: isFinite(newResult) ? newResult.toString() : MathSybols.Infinity,
      operatorActivated: true,
      lastOperation: operator,
      isInitialValue: false
    })
  }

  return (
    <div className='calculator-component'>
      <input type='text' value={calculatorState.resultText} readOnly className='display-text'/>
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