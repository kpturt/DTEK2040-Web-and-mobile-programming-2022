import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Superadvanced web and mobile programming',
    parts: [
      {
          name: 'Basics of react',
          exercises: 8
      },
      {
          name: 'Using props',
          exercises: 10
      },
      {
          name: 'Component states',
          exercises: 12
      }
  ]
}
  return (
    <div>
      <Header course={course} />
      <Contents course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Contents = (props) => {
    return (
      <div>
        <Part part={props.course.parts[0]} />
        <Part part={props.course.parts[1]} />
        <Part part={props.course.parts[2]} />
      </div>
    )
  }

  const Part = (props) => {
    return(
    <p>{props.part.name} {props.part.exercises}</p>
    )
  }

  const Total = (props) => {
    return(
      <p>Total {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises} exercises</p>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)