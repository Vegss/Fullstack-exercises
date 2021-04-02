import React, { useState } from 'react'

const Header = (props) => {
  return(
    <h1>{props.header}</h1>
  )
}

const StatisticsLine = (props) =>{
  const text = props.text 
  const value = props.value
  if (text=="positive") {
    return(
      <p>{text} {value}%</p>
    )
  }
  return(
    <p>{text} {value}</p>
  )  
}

const Statistics = (props) =>{

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all
  let avg = ((good*1)+(bad*-1))/all
  let pos = (good/all)*100

  if (all==0)
    return(
      <div>
        <p>No feedback given</p>
        </div>
        )
  return(
    <tr>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={all}/>
      <StatisticsLine text="average" value={avg}/>
      <StatisticsLine text="positive" value={pos}/>
    </tr>
    
  )
}


const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
      setGood(good+1)
      setAll(all+1)
  }
  
  const handleNeutralClick = () => {
      setNeutral(neutral+1)
      setAll(all+1)
  }
  
  const handleBadClick = () => {
      setBad(bad+1)
      setAll(all+1)
  }

  return (
    <div>
      <Header header="give feedback"/>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Header header="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App
