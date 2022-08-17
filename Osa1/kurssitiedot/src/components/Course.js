const Header = ({name}) => {
    return(
        <>
            <h2>{name}</h2>
        </>
    )
}

const Content = ({parts}) => {
    return(
      parts.map(part => 
        <Part key={part.id} name={part.name} vol={part.exercises}/>
      )
    )
}

const Total = ({parts}) => {
    const total = parts.reduce( (sum, part) => sum+part.exercises, 0)
    return(
        <h4>Total of {total} exercises</h4>
      )
}

const Part = ({name, vol}) => {
    return(
        <>
            <h4>{name} {vol}</h4>
        </>
    )
}


const Course = ({course}) => {
    return(
      <>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }

export default Course