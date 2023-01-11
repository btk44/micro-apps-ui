import './Calculator.css'

export default function Calculator() {
  const buttonsTable = [
    ['C', '?', '?', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['?', '0', '.', '=']
  ]
  
  const button = (text) => ( 
    <div className="button">
      { text }
    </div>
  )

  const buttonRow = (buttons) => (
    <div className="buttons-row">
      { buttons.map(x => button(x)) }
    </div>
  )

  return (
    <div className="calculator-component">
      { buttonsTable.map(x => buttonRow(x)) }
    </div>
  )  
}