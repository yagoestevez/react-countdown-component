/**
 *  REACT COUNTDOWN COMPONENT
 *  @author  Yago Estévez.
 *  @license MIT.
 *  @version 0.0.1.
 *  @license MIT License.
 */
import React, { Component, Fragment } from 'react';
import PropTypes                      from 'prop-types';
import TimeConverter                  from './TimeConverter';

/**
 *  REACT COUNTDOWN COMPONENT
 *  This little library provides the users with an easy to use and
 *  customizable interface, so that a countdown in hours, minutes,
 *  seconds and/or milliseconds (their choice) may be displayed in
 *  their apps with any tags, styles or any options to show it.
 * 
 *  @param {object} from (required)
 *    The actual time to start counting from. The object structure
 *    is is: { hours: #, minutes: #, seconds: #, millis: # }.
 *  @param {number} updateEvery
 *    The time interval, in milliseconds, taken into account to do
 *    the update to the onUpdate event. Default is 1000ms.
 *  @event onUpdate (required)
 *    Event required for the actual countdown to be displayed.
 *    A callback function will returns an object like this:
 *    { hours: #, minutes: #, seconds: #, millis: # }.
 */
export const CountdownContext = React.createContext();

export default class CountDown extends Component {

  constructor( props ) {
    super( props );
    this.TC = new TimeConverter( );
    this.initTime       = this.TC.getMilliseconds( props.from );
    this.countDown      = this.TC.getMilliseconds( props.from );
    this.leftPadding    = props.leftPadding || 0;
    this.timerRunning   = false;
    this.updateInterval = props.updateEvery || 1000;
    this.intervalId     = null;
  }

  static propTypes = {
    from        : PropTypes.object.isRequired,
    updateEvery : PropTypes.number,
    leftPadding : PropTypes.string,
    onStart     : PropTypes.func,
    onPause     : PropTypes.func,
    onReset     : PropTypes.func,
    onUpdate    : PropTypes.func.isRequired,
    onFinish    : PropTypes.func.isRequired,
    children    : PropTypes.node
  }

  startCountdown = ( ) => {
    this.onStart( );
    this.updateCounter( );
    this.timerRunning = true;
  }

  updateCounter = ( ) => {
    this.onUpdate( this.TC.getFullTime( this.countDown, this.leftPadding ) );
    if ( !this.intervalId ) {
      this.intervalId = setInterval( ( ) => {
        if ( this.countDown <= this.updateInterval )
          return this.onFinish( );
        this.countDown -= this.updateInterval;
        this.onUpdate( this.TC.getFullTime( this.countDown, this.leftPadding ) );
      }, this.updateInterval );
    }
  }

  pauseCountdown = ( ) => {
    this.onPause( );
    this.clearInterval( );
    this.timerRunning = false;
  }

  playPauseCountdown = ( ) => {
    if ( !this.timerRunning ) this.startCountdown( );
    else this.pauseCountdown( );
  }
  
  resetCountdown = ( reset = true ) => {
    this.onReset( );
    this.clearInterval( );
    this.countDown = this.initTime;
    if ( !reset )
      this.onUpdate( this.TC.getFullTime( 0, this.leftPadding ) );
    else
      this.onUpdate( this.TC.getFullTime( this.initTime, this.leftPadding ) );
    this.timerRunning = false;
  }

  onStart = ( ) => {
    return this.props.onStart( );
  }

  onPause = ( ) => {
    return this.props.onPause( );
  }

  onReset = ( ) => {
    return this.props.onReset( );
  }

  onUpdate = ( newValue ) => {
    return this.props.onUpdate( newValue );
  }

  onFinish = ( ) => {
    this.onUpdate( this.TC.getFullTime( 0, this.leftPadding ) );
    this.resetCountdown( false );
    return this.props.onFinish( );
  }

  clearInterval = ( ) => {
    if ( this.intervalId ) clearInterval( this.intervalId );
    this.intervalId = null;
  }

  render() {
    return (
      <CountdownContext.Provider value = { {
          start: ( ) => this.startCountdown( ),
          pause: ( ) => this.pauseCountdown( ),
          reset: ( ) => this.resetCountdown( ),
          playPause: ( ) => this.playPauseCountdown( )
        } }
      >
        { this.props.children }
      </CountdownContext.Provider>
    );
  }

  componentWillMount = ( ) => {
    this.onUpdate( this.TC.getFullTime( this.countDown, this.leftPadding ) );
  }

  componentWillUnmount = ( ) => {
    this.clearInterval( );
  }

}