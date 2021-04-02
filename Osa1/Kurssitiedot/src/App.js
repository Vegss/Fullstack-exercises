import React from 'react'

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}


const Content = (props) => {
  const pn1 = props.p1
  const pn2 = props.p2
  const pn3 = props.p3
  
  const pe1 = props.e1
  const pe2 = props.e2
  const pe3 = props.e3
  
  return(
    <div>
      <Parts p1_name={pn1} p2_name={pn2} p3_name={pn3} p1_exercise={pe1} p2_exercise={pe2} p3_exercise={pe3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
  )
}

const Parts = (props) => {
  const part1_name = props.p1_name
  const part2_name = props.p2_name
  const part3_name = props.p3_name

  const part1_ex = props.p1_exercise
  const part2_ex = props.p2_exercise
  const part3_ex = props.p3_exercise

  return(
    <div>
      <p>{part1_name} {part1_ex}</p>
      <p>{part2_name} {part2_ex}</p>
      <p>{part3_name} {part3_ex}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course['name']}/>

      <Content p1={course['parts'][0]['name']} p2={course['parts'][1]['name']} p3={course['parts'][2]['name']} e1={course['parts'][0]['exercises']} e2={course['parts'][1]['exercises']} e3={course['parts'][2]['exercises']}/>

      <Total exercise1={course['parts'][0]['exercises']} exercise2={course['parts'][1]['exercises']} exercise3={course['parts'][2]['exercises']}/>

    </div>
  )
}

export default App