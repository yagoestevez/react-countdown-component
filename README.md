# React Countdown Component

###Description
Tiny, easy and customizable component providing you with an updated counter of **hours, minutes, seconds and/or milliseconds** –one, some or all of them– or just the total count of **milliseconds** remaining for a given lapse of time –in ms.

The updated counter may be displayed in your apps with **any tags, styles or any customization** you need to show it.

###Demo
You can dive into the examples' code in this URL **URL*** or review the code in its GitHub repo. **URL**

**PONER GIF ANIMADO**

###Features

###Requirements

###Install
**CHANGE THIS TO THE REAL COMMAND**
```
npm install --save react prop-types
npm install --save react-countdown-component
```

###Usage
You can use this counter in various ways. This is just an example.

**import CountDown, { CountdownContext } from '../../src'**
```
<CountDown
  from        = { this.state.counter }            // Your state.
  updateEvery = { 1000 }                          // Interval (in ms).
  onUpdate    = { time => this.onUpdate( time ) } // Tasks on update.
  onFinish    = { ( )  => this.onFinish(  )     } // Tasks on finish.
>
  <CountdownContext.Consumer>
    { ( counter ) => (
      <React.Fragment>
        // Use the countdown wherever you want, like:
        <h1>{ hours }:{ minutes }:{ seconds }:{ millis }</h1>
        // or...
        // <h2>{ hours }.{ minutes }.{ seconds }</h2>
        // <p>{ minutes }.{ seconds }</p>
        // <span>{ totalMs }</span> ...

        // You can use any of this buttons –or whatever you want– to
        // play, pause, reset or a play/pause toggler the counter.
        <button onClick = { counter.start }     >Start Countdown</button>
        <button onClick = { counter.pause }     >Pause Countdown</button>
        <button onClick = { counter.reset }     >Reset Countdown</button>
        <button onClick = { counter.playPause } >Play/Pause Countdown</button>
      </React.Fragment>
    ) }
  </CountdownContext.Consumer>
</CountDown>
```
####Props
These are the properties you may pass to the CountDown component:
| property | propType | required | default | description |
| -------- |:--------:|:--------:|:-------:| ----------- |
| from | object | yes | null | Requires an object (see example). |
| updateEvery | number | no | 1000ms | Milliseconds between updates. |
| leftPadding | string | no | '0' | Number of zeroes on the left. |
| onStart | function | no | null | Callback on start. |
| onPause | function | no | null | Callback on pause. |
| onReset | function | no | null | Callback on reset. |
| onUpdate | function | yes | null | Callback on update. |
| onFinish | function | yes | null | Callback on finish. |

####RenderProps
These are the functions you can use to manipulate the generated counter (see example).
| property | propType | required | default | description |
| -------- |:--------:|:--------:|:-------:| ----------- |
| start | function | yes* | null | Starts the countdown. |
| pause | function | no | null | Pauses the counter. |
| reset | function | no | null | Stops the counter and resets it. |
| playPause | function | yes* | null | Toggles between play and pause. |

###License
[MIT](CHANGE)

###Author
[Yago Estévez](https://github.com/SpaniardDev)


<!-- [![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe React-Countdown-Component here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo -->
