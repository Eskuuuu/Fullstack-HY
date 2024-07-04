import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticsLine text="Good" value={props.good}/>
        <StatisticsLine text="Neutral" value={props.neutral}/>
        <StatisticsLine text="Bad" value={props.bad}/>
        <StatisticsLine text="All" value={props.all}/>
        <StatisticsLine text="Average" value={(props.count/props.all)}/>
        <StatisticsLine text="Positive" value={(100*props.positive/props.all)+" %"}/>
      </tbody>
    </table>
    
  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [count, setCount] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setCount(count +1)
    setPositive(positive + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setCount(count)

  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setCount(count - 1)
  }

  return (
    <div>
      <div>
        <h1>Give Feedback!</h1>

        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <Statistics good={good} neutral={neutral} bad={bad} count={count} positive={positive} all={all} />
        

      </div>
    </div>
  )
}

export default App