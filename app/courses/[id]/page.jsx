import React from 'react'

const CourseList = ({params}) => {
    console.log(params)
    const id = params.id
  return (
    <div>Course {id}
    
    </div>
  )
}

export default CourseList