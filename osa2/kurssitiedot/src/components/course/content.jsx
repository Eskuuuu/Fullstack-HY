import React from 'react'
import Part from './content/part'

const Content = (props) => {
    console.log('content value is', props);
    return(
      <div>
          <ul>
              {props.course.parts.map( course =>
              <Part key={course.id} part={course.name} exercises={course.exercises} />
          )}
          </ul>

      </div>
  )
  }

export default Content