import './Calculator.css'

export default function Calculator() {
  const buttonsTable = [
    ['C', '?', '?', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['?', '0', '.', '=']
  ]

  function buttonClicked(event){
    console.log(event.target.innerHTML)
  }
  
  return (
    <div className="calculator-component">
    { buttonsTable.map(buttonRow =>
        <div className="buttons-row">
          { buttonRow.map(buttonText => 
              <button className="button" onClick={buttonClicked}>
                { buttonText }
              </button>
            )
          }
        </div>
      )
    }
    </div>
  )  
}