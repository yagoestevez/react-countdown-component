# React Countdown Component

### Description
Tiny, easy and customizable component providing you with an updated counter of **hours, minutes, seconds and/or milliseconds** –one, some or all of them– or just the total count of **milliseconds** remaining for a given lapse of time –in ms.

The updated counter may be displayed in your apps with **any tags, styles or any customization** you need to show it.

### Demo
You can dive into the example or review the code in the [GitHub repo](https://github.com/yagoestevez/react-countdown-component).

![react-countdown-component demo](https://raw.githubusercontent.com/yagoestevez/react-countdown-component/master/demo/ReactCountdownComponent-Example.gif)<br />

### Requirements
```
Node >= 6.x
React >= 16
React's Prop-Types >= 16
```

### Install
```
npm install --save react prop-types
npm install --save react-countdown-component
```

### Usage
You can use this counter in various ways. Check the demo directory in the repo for an in-depth example. This is one of the simplest implementation:

```js
import CountDown, {CountdownContext} from 'react-countdown-component';

render() {
  const { hours, minutes, seconds } = this.state.counter;
  return (
    <CountDown
      // Your state to hold counter's data.
      from     = { this.state.counter }
      // Triggered on each counter's update.
      onUpdate = { value => this.onUpdate( value ) }
    >
    <CountdownContext.Consumer>
      { ( counter ) => (
        <React.Fragment>
          // Use the countdown however you want, like this:
          <h2>{ hours }:{ minutes }:{ seconds }</h2>

          // You may use this toggler button to play/pause the counter and
          // also standalone controls to play, pause and/or reset.
          <button onClick = { counter.playPause } >Play/Pause Countdown</button>
        </React.Fragment>
      ) }
    </CountdownContext.Consumer>
    </CountDown>
  )
}
```

#### Props
These are the properties you may pass to the CountDown component:

| property | propType | required | default | description |
|  :---:  |  :---:  |  :---:  |  :---:  |  :---  |
| from | object | yes | null | Requires an object (see example). |
| updateEvery | number | no | 1000ms | Milliseconds between updates. |
| leftPadding | string | no | '0' | Number of zeroes on the left. |
| onStart | function | no | null | Callback on start. |
| onPause | function | no | null | Callback on pause. |
| onReset | function | no | null | Callback on reset. |
| onUpdate | function | yes | null | Callback on update. |
| onFinish | function | no | null | Callback on finish. |

#### RenderProps
These are the functions you can use to manipulate the generated counter (see example):

| property | propType | required | default | description |
|  :---:  |  :---:  |  :---:  |  :---:  |  :---  |
| start | function | yes* | null | Starts the countdown. |
| pause | function | no | null | Pauses the counter. |
| reset | function | no | null | Stops the counter and resets it. |
| playPause | function | yes* | null | Toggles between play and pause. |

### License
[MIT](https://github.com/yagoestevez/react-countdown-component/blob/master/LICENSE)

### Author
[Yago Estévez](https://twitter.com/yagoestevez)