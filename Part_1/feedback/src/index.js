import React from 'react';
import ReactDOM, { render } from 'react-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      negatiivinen: 0,
      neutraali: 0,
      positiivinen: 0
    }
  }
  
  napVas = () => () => {
    this.setState({negatiivinen: this.state.negatiivinen +1})
  }

  napKes = () => () => {
    this.setState({neutraali: this.state.neutraali +1})
  }
  
  napOik = () => () => {
    this.setState({positiivinen: this.state.positiivinen +1})
  }

  render() { 
    const style = {
      margin: '10px', 
    }
    return (
      <div style={style}>
        <Display counter={this.state.counter} />
        <h1>Mikä on ollut kokemuksesi sivustolla?</h1>
        <div >
          <Button
            onClick={this.napOik(this.state.counter+1)}
            text="Positiivinen"
          />
          <Button
            onClick={this.napKes(this.state.counter+1)}
            text="Neutraali"
          />
          <Button
            onClick={this.napVas(this.state.counter+1)}
            text="Negatiivinen"
          />
        </div>
        <h1>statistiikka</h1>
        <Statistics tila={this.state} />
      </div>
    )
  }
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}> {text} </button>
  )
}

const Statistics = (props) => {
  var count = (props.tila.negatiivinen+props.tila.neutraali+props.tila.positiivinen)
  if(count == 0){
    return(
      <p>ei annettua palautetta</p>
    )
  } else {
    var pospros = (props.tila.positiivinen/count)*100
    var keskiarvo = ((props.tila.positiivinen-props.tila.negatiivinen)/count)
    return(
      <table>
        <tbody>
          <Statistic name='Positiivinen ' value={props.tila.positiivinen} />
          <Statistic name='Neutraali ' value={props.tila.neutraali} />
          <Statistic name='Negatiivinen ' value={props.tila.negatiivinen} />
          <Statistic name='Keskiarvo ' value={keskiarvo.toFixed(1)} />
          <Statistic name='Positiivisen palautteen prosentti ' value={pospros.toFixed(1)+" %"} />
        </tbody>
      </table>
    )
  }
}

const Statistic = (props) => {
  return(
  <tr><td>{props.name}</td><td>: {props.value}</td></tr>
  )
}

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)