import './Calculator.css'

export default function Calculator() {
  const mathSymbols = ['÷','×','−','+','=']
  const numbers = ['7','8','9','4','5','6','1','2','3','.','0','C']

  function buttonClicked(event){
    console.log(event.target.innerHTML)
  }
  
  return (
    <div className='calculator-component'>
      <div className='display-text'>
        <input type='text'></input>
      </div>
      <div className='numeric-buttons'>
        { numbers.map(buttonText =>
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