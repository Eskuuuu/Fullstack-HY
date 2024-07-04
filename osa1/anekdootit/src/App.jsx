import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    const newMax = Math.max(...copy)
    setMaxPoints(newMax)
    setMaxIndex(copy.indexOf(newMax))
    console.log(points)
    
  }

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  return (
    <div>
      <Button handleClick={handleRandomClick} text='next anecdote' />
      <Button handleClick={handleVoteClick} text='vote' />
      <p>{anecdotes[selected]} has {points[selected]} points</p>
      <h1>Anecdote with most votes:</h1>
      <p>{anecdotes[maxIndex]} has {maxPoints} points </p>

    </div>
  )
}

export default App