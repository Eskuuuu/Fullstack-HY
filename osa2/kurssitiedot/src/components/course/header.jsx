import React from 'react';

const Header = (props) => {
  console.log('otsikko value is', props)
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }

export default Header