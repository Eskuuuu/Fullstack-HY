import React from 'react';

const Total = (props) =>{
    console.log(props)
    return (
    <div>
      Total of {props.course.parts.reduce((sum, part) =>
      sum + part.exercises, 0)} exercises
    </div>
    )
      
}

export default Total