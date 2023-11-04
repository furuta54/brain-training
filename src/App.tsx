import React from 'react'
import './App.scss'

const App = () => {
  const [question, setQuestion] = React.useState<string>('100+200')
  const [correctAnswer, setCorrectAnswer] = React.useState<number>(0)
  const [inputAnswer, setInputAnswer] = React.useState<number>(0)
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [correctCount, setCorrectCount] = React.useState<number>(0)

  const rand = (min: number, max: number) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }
  const genQuestion = () => {
    const sign = rand(0, 2)
    if (sign === 0) {
      const left = rand(10, 99)
      const right = rand(10, 99)
      setQuestion(left + '+' + right)
      setCorrectAnswer(left + right)
    } else if (sign === 1) {
      const left = rand(50, 99)
      const right = rand(10, 49)
      setQuestion(left + '-' + right)
      setCorrectAnswer(left - right)
    } else if (sign === 2) {
      const left = rand(11, 20)
      const right = rand(3, 9)
      setQuestion(left + '×' + right)
      setCorrectAnswer(left * right)
    } else {
      alert('設計上のミスが発覚したようです。')
    }
  }
  const onClickNumber = (i: number) => {
    setInputAnswer(prev => prev * 10 + i)
  }
  const onClickBack = () => {
    setInputAnswer(prev => Math.trunc(prev / 10))
  }
  const onClickOK = () => {
    setTotalCount(prev => prev + 1)
    setCorrectCount(prev => prev + (correctAnswer === inputAnswer ? 1 : 0))
  }
  const onClickRetry = () => {
    setTotalCount(() => 0)
    setCorrectCount(() => 0)
    genQuestion()
  }
  React.useEffect(() => {
    genQuestion()
  }, [])
  React.useEffect(() => {
    if (totalCount === 10) {

    } else {
      setInputAnswer(0)
      genQuestion()
    }
  }, [totalCount])

  return (
    <div className="App">
      <div className="container" style={{display: totalCount === 10 ? 'none' : ''}}>
        <div className="title">
          <span>Q{totalCount + 1}</span> <span className="correct">Correct: {correctCount}</span> <span className="incorrect">Incorrect: {totalCount - correctCount}</span>
        </div>
        <div className="question">
          {question}
        </div>
        <div className="answer">
          <div className="inputAnswer">
            {inputAnswer}
          </div>
          <div className="inputPanel">
            <div>
              <button onClick={() => onClickNumber(7)}>7</button>
              <button onClick={() => onClickNumber(8)}>8</button>
              <button onClick={() => onClickNumber(9)}>9</button>
            </div>
            <div>
              <button onClick={() => onClickNumber(4)}>4</button>
              <button onClick={() => onClickNumber(5)}>5</button>
              <button onClick={() => onClickNumber(6)}>6</button>
            </div>
            <div>
              <button onClick={() => onClickNumber(1)}>1</button>
              <button onClick={() => onClickNumber(2)}>2</button>
              <button onClick={() => onClickNumber(3)}>3</button>
            </div>
            <div>
              <button onClick={() => onClickNumber(0)}>0</button>
              <button onClick={() => onClickBack()}>×</button>
              <button onClick={() => onClickOK()}>OK</button>
            </div>
          </div>
        </div>
      </div>
      <div className="message" style={{display: totalCount === 10 ? '' : 'none'}}>
        <div className="resultMessage">Your Score is {correctCount} / {totalCount} !!</div>
        <button className="retryButton" onClick={() => onClickRetry()}>Retry !!</button>
      </div>
    </div>
  )
}

export default App
