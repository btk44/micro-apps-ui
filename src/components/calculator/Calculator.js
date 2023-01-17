import './Calculator.css'
import MathSybols from './MathSymbols'

export default function Calculator({result, resultChanged}) {
  const clearSymbol = 'C'
  const mathSymbols = [MathSybols.Obelus, MathSybols.Asterisk, MathSybols.Minus,
                       MathSybols.Plus, MathSybols.Equal]
  const mainButtonTexts = ['7','8','9','4','5','6','1','2','3',
                           MathSybols.Dot,MathSybols.Zero,clearSymbol]
  const numbers = ['7','8','9','4','5','6','1','2','3',MathSybols.Zero]

  //let currentOperation = MathSybols.Equal
  //let previousOperation = mathSymbols.Equal

  function buttonClicked(event){
    let value = event.target.innerHTML
    let localResult = result
    
    if(value === clearSymbol){
      localResult = 0
    }

    if(numbers.indexOf(value) !== -1){
      localResult = localResult === 0 ?
          value : 
          +(localResult.toString() + value.toString())
    }

    if(value === MathSybols.Dot && localResult.toString().indexOf(MathSybols.Dot) === -1){
      localResult = localResult + value;
    }

    resultChanged(localResult)  // problem wiht zero i.e. 0.0023
  }
  
  return (
    <div className='calculator-component'>
      <div className='display-text'>
        <input type='text' value={result} readOnly />
      </div>
      <div className='numeric-buttons'>
        { mainButtonTexts.map(buttonText =>
            <button key={buttonText} className='button numeric-button' onClick={buttonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
      <div className='math-buttons'>
        { mathSymbols.map(buttonText => 
            <button key={buttonText} className='button math-button' onClick={buttonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
    </div>
  )  
}