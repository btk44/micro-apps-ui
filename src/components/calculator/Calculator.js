import './Calculator.css'

export default function Calculator() {
  const mathSymbols = ['/','x','-','+','=']
  const buttonsTable = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', 'C']
  ]

  function buttonClicked(event){
    console.log(event.target.innerHTML)
  }
  
  return (
    <div className='calculator-component'>
      <div className='numeric-buttons-column'>
        { buttonsTable.map(buttonRow =>
            <div className='buttons-row'>
              { buttonRow.map(buttonText => 
                  <button className='button numeric-button' onClick={buttonClicked}>
                    { buttonText }
                  </button>
                )
              }
            </div>
          )
        }
      </div>
      <div className='math-buttons-column'>
        { mathSymbols.map(buttonText => 
            <button className='button math-button' onClick={buttonClicked}>
              { buttonText }
            </button>
          )
        }
      </div>
    </div>
  )  
}