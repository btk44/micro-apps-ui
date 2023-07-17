import { useRef } from 'react'
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
  
  const calculatorState = useRef({
    result: +props.initialValue,
    resultText: props.initialValue.toString(),
    lastOperation: MathSymbols.Equal,
    operatorActivated: false,
    isInitialValue: true
  })

  function numericButtonClicked(event: any){
    event.preventDefault()
    const currentState = calculatorState.current
    const buttonText = event.target.innerHTML
    const lastResultText = currentState.operatorActivated ? '0' : currentState.resultText
    let newResultText = '0'
    let newResult = 0

    switch(buttonText){
      case clearSymbol: break
      case MathSybols.Dot:
        newResultText = lastResultText + (lastResultText.indexOf(MathSybols.Dot) === -1 ? MathSybols.Dot : '')
        newResult = currentState.result
        break
      default: 
        newResultText = lastResultText === MathSybols.Zero || currentState.isInitialValue ? buttonText : lastResultText + buttonText
        newResult = currentState.lastOperation !== MathSybols.Equal ? currentState.result : +newResultText
        break
    }

    calculatorState.current = {
      result: newResult,
      resultText: newResultText,
      lastOperation: currentState.lastOperation,
      operatorActivated: false,
      isInitialValue: false
    }
    props.updateValue(newResult)
  }

  function operatorButtonClicked(event: any){
    event.preventDefault()
    const currentState = calculatorState.current
    const operator = event.target.innerHTML
    let newResult = 0
    
    switch(currentState.lastOperation){
      case MathSymbols.Equal: newResult = +currentState.resultText; break
      case MathSymbols.Plus: newResult = currentState.result + +currentState.resultText; break
      case MathSymbols.Minus: newResult = currentState.result - +currentState.resultText; break
      case MathSymbols.Asterisk: newResult = currentState.result * +currentState.resultText; break
      case MathSymbols.Obelus: newResult = currentState.result / +currentState.resultText; break
      default: return
    }

    newResult = newResult > 0 ? newResult : 0

    calculatorState.current = {
      result: newResult,
      resultText: isFinite(newResult) ? newResult.toString() : MathSybols.Infinity,
      operatorActivated: true,
      lastOperation: operator,
      isInitialValue: false
    }
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