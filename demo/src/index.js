import React, {Component} from 'react'
import {render} from 'react-dom'

import CountDown, { CountdownContext } from '../../src'

class Demo extends Component {
  counterInit = 60000; // ms
  state = {
    counter: { hours: 0, minutes: 1, seconds: 0, millis: 0, totalMs: 0 }
  }

  updateCounter = ( time ) => {
    this.setState( {
      counter: {
        hours   : time.hours,
        minutes : time.minutes,
        seconds : time.seconds,
        millis  : time.millis,
        totalMs : time.totalMs
      }
    } );
  };

  render() {
    const { hours, minutes, seconds } = this.state.counter;
    return (
      <CountDown
        from        = { this.state.counter }
        updateEvery = { 1000 }
        leftPadding = { '0' }
        onStart     = { ( )   => console.log( 'start' ) }
        onPause     = { ( )   => console.log( 'pause' ) }
        onReset     = { ( )   => console.log( 'reset' ) }
        onUpdate    = { value => this.updateCounter( value ) }
        onFinish    = { ( )   => console.log( 'done' ) }
      >
        <CountdownContext.Consumer>
          { (counter) => (
            <React.Fragment>
              <progress
                value = { this.counterInit - this.state.counter.totalMs }
                max   = { this.counterInit }
              >
              </progress>
              <h1>{ hours }:{ minutes }:{ seconds }</h1>
              <button onClick = { counter.start } >Start Countdown</button> <br />
              <button onClick = { counter.pause } >Pause Countdown</button> <br />
              <button onClick = { counter.reset } >Reset Countdown</button> <br />
              <button onClick = { counter.playPause } >Play/Pause Countdown</button>
            </React.Fragment>
          ) }
        </CountdownContext.Consumer>
      </CountDown>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
