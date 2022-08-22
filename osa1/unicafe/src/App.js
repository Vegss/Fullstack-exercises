import { useState } from 'react'

const StatisticLine = (props) => {
  return (
      <tr>
        <td valign="middle">{props.text}</td> 
        <td valign="middle">{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  if (props.all < 1) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={(props.good-props.bad)/props.all}/>
      <StatisticLine text="positive" value={props.good/props.all*100 + " %"}/>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App