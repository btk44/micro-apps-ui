import { useState } from 'react'
import './Calculator.scss'
import MathSymbols from './MathSymbols'
import MathSybols from './MathSymbols'

interface CalculatorProps{
    initialValue: number
    updateValue(value: number): void
}

export default function Calculator(props: CalculatorProps) {
  const clearSymbol = 'C'
  const mathOperators = [MathSybols.Obelus, MathSybols.Asterisk, MathSybols.Minus,
                         MathSybols.Plus, MathSybols.Equal]
  const numericButtonTexts = ['7','8','9','4','5','6','1','2','3',
                              MathSybols.Dot,MathSybols.Zero,clearSymbol]
  
  const [calculatorState, setCalculatorState] = useState({
    result: +props.initialValue,
    resultText: props.initialValue.toString(),
    lastOperation: MathSymbols.Equal,
    operatorActivated: false,
    isInitialValue: true
  })

  function numericButtonClicked(event: any){
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
    props.updateValue(newResult)
  }

  function operatorButtonClicked(event: any){
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
    props.updateValue(newResult)
  }

  return (
    <div className='calculator-component'>
      <div className='numeric-buttons'>
        { numericButtonTexts.map(buttonText =>
            <button key={buttonText} onClick={numericButtonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
      <div className='operation-buttons'>
        { mathOperators.map(buttonText => 
            <button key={buttonText} onClick={operatorButtonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
    </div>
  )  
}