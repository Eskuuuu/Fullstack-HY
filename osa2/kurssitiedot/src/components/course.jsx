import React from 'react'
import Header from './course/header'
import Content from './course/content'
import Total from './course/total'

const Course = (props) => {
  console.log('course value is', props)
  return (
    <div>

      <Header course={props.course}/> 
      <ul>
      <Content course={props.course}/>
      <Total course={props.course}/>

      </ul>

      
      
       
      {/*<Total parts={course.parts} />  */} 
    </div>
  )
}
export default Course