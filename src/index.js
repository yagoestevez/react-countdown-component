/**
 *  REACT COUNTDOWN COMPONENT
 *  @author  Yago Estévez.
 *  @license MIT.
 *  @version 0.0.1.
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
    this.resetTime       = this.TC.getMilliseconds( props.from );
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

  /**
   * If props.from has been changed by the parent component, resetTime
   * must re-evaluate with props so the reset method works properly.
   * The countdown is also updated to verify that it holds the updated
   * values from props.
   * Then updateCounter() is called to begin/continue the countdown and
   * onStart() event is triggered to be used by the parent component.
   */
  startCountdown = ( ) => {
    this.resetTime = this.resetTime !== this.countDown
      ? this.resetTime
      : this.TC.getMilliseconds( this.props.from );
    this.countDown = this.TC.getMilliseconds( this.props.from );
    this.updateCounter( );
    this.timerRunning = true;
    this.onStart( );
  }

  /**
   * onUpdate() event is triggered with the updated countdown so the parent
   * component can use the updated values.
   * Then, the countdown is updated through an interval (1000 by default).
   */
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

  /**
   * The countdown interval is stopped and onPause() event triggered
   * to be used by the parent component.
   */
  pauseCountdown = ( ) => {
    this.clearInterval( );
    this.timerRunning = false;
    this.onPause( );
  }

  /**
   * The countdown starts if it's not already running or it pauses if so.
   */
  playPauseCountdown = ( ) => {
    if ( !this.timerRunning ) this.startCountdown( );
    else this.pauseCountdown( );
  }
  
  /**
   * The countdown stops, clearing the interval, and 
   */
  resetCountdown = ( reset = true ) => {
    this.clearInterval( );
    this.countDown = this.TC.getMilliseconds( this.props.from );
    if ( !reset )
      this.onUpdate( this.TC.getFullTime( 0, this.leftPadding ) );
    else
      this.onUpdate( this.TC.getFullTime( this.resetTime, this.leftPadding ) );
    this.timerRunning = false;
    this.onReset( );
  }

  /**
   * The following methods call the event functions passed via props
   * from the parent component.
   */
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

  /**
   * Resets the intervalId to be reused.
   */
  clearInterval = ( ) => {
    if ( this.intervalId ) clearInterval( this.intervalId );
    this.intervalId = null;
  }

  render() {
    return (
      /**
       * Makes use of a context provider to pass the events to the parent.
       */
      <CountdownContext.Provider value = { {
          start     : this.startCountdown,
          pause     : this.pauseCountdown,
          reset     : this.resetCountdown,
          playPause : this.playPauseCountdown
        } }
      >
        { this.props.children }
      </CountdownContext.Provider>
    );
  }

  /**
   * Lifecycle methos.
   */
  componentDidMount = ( ) => {
    this.onUpdate( this.TC.getFullTime( this.countDown, this.leftPadding ) );
  }

  componentWillUnmount = ( ) => {
    this.clearInterval( );
  }

}