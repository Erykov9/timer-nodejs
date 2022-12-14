import React from 'react';
import { render } from 'react-dom';

import { useState,  useEffect } from 'react'


const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const start = () => {
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() =>  {
      setTime((time) => time - 1)
    }, 1000))
  };

  const rest = () => {
    setTime(20);
    setStatus('rest');
    setTimer(setInterval(() =>  {
      setTime((time) => time - 1)
    }, 1000))
  }

  useEffect(() =>  {
    if(status === 'work') {
      if(time === 0) {
        clearInterval(timer);
        playBell();
        setStatus('rest');
        rest();
      }
    }
    if(status === 'rest') {
      if(time === 0) {
        clearInterval(timer);
        playBell();
        setStatus('work');
        start();
      }
    }
  });

  const stop = () => {
    setStatus('off');
    clearInterval(timer);
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  

  let minutes = (Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60));
  let seconds = (Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60));

  const close = () => {
    window.close();
  }

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ? <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div> : null}
        {status === 'work' ? <img src="./images/work.png" /> : null}
        {status === 'rest' ? <img src="./images/rest.png" /> : null}
        {status !== 'off' ? <div className="timer">
          {minutes}:{seconds}
        </div> : null}
        {status === 'off' ? <button className="btn" onClick={start}>Start</button> : null}
        {status !== 'off'? <button className="btn" onClick={stop}>Stop</button> : null}
        <button className="btn btn-close" onClick={close}>X</button>
      </div>
    )
  }


render(<App />, document.querySelector('#app'));
