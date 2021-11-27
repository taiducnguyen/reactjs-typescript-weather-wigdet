import React from 'react'
import style from '../styles/style.scss'

const Home = () => {
  return (
    <div className={style.normal}>
      <h1>Test</h1>
      <h2 className="text"></h2>
      <img src={require('../assets/images/sunny.png').default} />
    </div>
  )
}

export default Home
