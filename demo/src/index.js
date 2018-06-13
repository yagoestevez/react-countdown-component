import React, {Component} from 'react'
import {render} from 'react-dom'

import CountDown, { CountdownContext } from '../../src'

class Demo extends Component {
  counterInit = 5000;
  state = {
    counter: { hours: 0, minutes: 0, seconds: 5, millis: 0, totalMs: 0 }
  }

  handleCounterUpdate = ( time ) => {
    this.setState( {
      counter   : {
        hours   : time.hours,
        minutes : time.minutes,
        seconds : time.seconds,
        millis  : time.millis,
        totalMs : time.totalMs
      },
      event    : ''
    } );
  };

  handleNewEvent = ( event ) => {
    this.setState( { event } );
  }

  render() {
    const { hours, minutes, seconds } = this.state.counter;
    const styles = {
      position       : 'absolute',
      width          : '50vh',
      height         : '50vh',
      top            : '50%',
      left           : '50%',
      transform      : 'translate(-50%,-50%)',
      display        : 'flex',
      flexDirection  : 'column',
      justifyContent : 'center',
      textAlign      : 'center'
    }

    return (
      <CountDown
        from        = { this.state.counter }
        updateEvery = { 1000 }
        leftPadding = { '0' }
        onStart     = { ( )   => this.handleNewEvent(     'start'   ) }
        onPause     = { ( )   => this.handleNewEvent(     'pause'   ) }
        onReset     = { ( )   => this.handleNewEvent(     'reset'   ) }
        onUpdate    = { value => this.handleCounterUpdate( value    ) }
        onFinish    = { ( )   => this.handleNewEvent(     'done'    ) }
      >
        <CountdownContext.Consumer>
          { (counter) => (
            <div style={styles}>
              <h1>React Countdown Component</h1>
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
              <h5>{this.state.event}</h5>
            </div>
          ) }
        </CountdownContext.Consumer>
      </CountDown>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
