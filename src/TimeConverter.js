/**
 * @class TimeConverter
 * @author Yago Estévez
 * @description A tiny class to convert a given time into different units.
 */
export default class TimeConverter {

  /**
   * @function getFullTime() Gets the time in milliseconds and returns its
   *  equivalent in hours, minutes, seconds and milliseconds. 
   * @param {number} ms - a time expressed in milliseconds. 
   * @returns The function returns an object with the following structure:
   *  { hours: ##, minutes: ##, seconds: ##, millis: # }.
   */
  getFullTime ( ms, leftPadding ) {
    let millis  = parseInt( ( ms % 1000 ) / 100              );
    let seconds = parseInt( ( ms / 1000 ) % 60               );
    let minutes = parseInt( ( ms / ( 1000 * 60 ) ) % 60      );
    let hours   = parseInt(   ms / ( 1000 * 60 * 60 )        );
  
    if ( leftPadding )
      return this.getLeftPadding( leftPadding, hours, minutes, seconds, millis, ms );

    return { hours, minutes, seconds, millis, totalMs: ms }
  }

  getMilliseconds ( time ) {
    return Number(
        time.hours   * 3600000
      + time.minutes * 60000
      + time.seconds * 1000
      + time.millis
    );
  }

  getLeftPadding ( leftPadding, hours, minutes, seconds, millis, ms ) {
    hours   = ( hours   < 10 ) ? leftPadding + hours   : hours;
    minutes = ( minutes < 10 ) ? leftPadding + minutes : minutes;
    seconds = ( seconds < 10 ) ? leftPadding + seconds : seconds;

    return { hours, minutes, seconds, millis, totalMs: ms }
  }
}