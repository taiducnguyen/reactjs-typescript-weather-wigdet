import React, { useEffect, useCallback, useState, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'

/* eslint-disable no-unused-vars */
enum TimerState {
    Initial = 'Initial',
    Start = 'Start',
    Pause = 'Pause',
    Resume = 'Resume',
}
/* eslint-disable no-unused-vars */
enum TimerAction {
    Start = 'Start',
    PauseResume = 'Pause/Resume',
}

const Timer = () => {
  const inputMinutes = useRef<HTMLInputElement>(null)
  const inputSeconds = useRef<HTMLInputElement>(null)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutesText, setMinutesText] = useState('00')
  const [secondsText, setSecondsText] = useState('00')
  const [duration, setDuration] = useState(0)
  const [timerInterval, setTimerInterval] = useState(undefined)
  const [running, setRunning] = useState(false)
  const [timerState, setTimerState] = useState(TimerState.Initial)

  const countDown = (duration: number): any => {
    let timer = duration
    function countTimer () {
      const currentMinutes = parseInt((timer / 60).toString(), 10)
      const currentSeconds = parseInt((timer % 60).toString(), 10)
      setMinutesText(currentMinutes < 10 ? '0' + currentMinutes : currentMinutes.toString())
      setSecondsText(currentSeconds < 10 ? '0' + currentSeconds : currentSeconds.toString())
      timer = timer - 1
      setDuration(timer)
      if (timer < 0) {
        setTimerState(TimerState.Initial)
        setRunning(false)
      }
    }
    if (timerState === TimerState.Start) {
      countTimer()
    }
    return setInterval(countTimer, 1000)
  }

  useEffect(() => {
    if (running) {
      setTimerInterval(countDown(duration) as any)
    } else {
      clearInterval(timerInterval)
    }
  }, [running])

  const calculateTimer = (minutes: number = 0, seconds: number = 0) => {
    const timer = (minutes * 60) + seconds
    setDuration(timer)
  }

  const handleMinutesInputChange = useCallback((value) => {
    if (value) {
      setMinutes(+value)
      calculateTimer(+value, seconds)
    }
  }, [seconds])

  const handleSecondsInputChange = useCallback((value) => {
    if (value) {
      setSeconds(+value)
      calculateTimer(minutes, +value)
    }
  }, [minutes])

  const handlePlayTimer = useCallback((action: TimerAction) => {
    if (action === TimerAction.Start) {
      calculateTimer(minutes, seconds)
      setTimerState(TimerState.Start)
      setRunning(true)
      return
    }

    if (duration <= 0) {
      return
    }

    if (timerState === TimerState.Start || timerState === TimerState.Resume) {
      setRunning(false)
      setTimerState(TimerState.Pause)
    }

    if (timerState === TimerState.Pause) {
      setRunning(true)
      setTimerState(TimerState.Resume)
    }
  }, [running, minutes, seconds, timerState])

  const handleResetTimer = useCallback(() => {
    setMinutes(0)
    setSeconds(0)
    setDuration(0)
    setMinutesText('00')
    setSecondsText('00')
    setTimerState(TimerState.Initial)
    if (inputMinutes.current) {
      inputMinutes.current.value = ''
    }
    if (inputSeconds.current) {
      inputSeconds.current.value = ''
    }
    setRunning(false)
  }, [])

  return (
        <Fragment>
            <div>
                <Link to={'/'}>
                    Back to home
                </Link>
            </div>
            <label><input type="number" aria-label="minute-input" ref={inputMinutes} onChange={(e) => handleMinutesInputChange(e.target.value)} />Minutes</label>
            <label><input type="number" aria-label="second-input" ref={inputSeconds} onChange={(e) => handleSecondsInputChange(e.target.value)} />Seconds</label>
            <button onClick={() => handlePlayTimer(TimerAction.Start)}>START</button>
            <button onClick={() => handlePlayTimer(TimerAction.PauseResume)}>PAUSE / RESUME</button>
            <button onClick={handleResetTimer}>RESET</button>
            <h1 data-testid="running-clock">{minutesText}:{secondsText}</h1>
        </Fragment>
  )
}

export default Timer
