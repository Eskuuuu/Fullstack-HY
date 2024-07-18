import React from 'react';

const Part = (props) => {
  console.log('Part value is', props)
    return (
      <div>
        <li key={props.id}>
          Part "{props.part}" has {props.exercises} exercises
        </li>
      </div>
    )
  }

export default Part 