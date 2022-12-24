import React from 'react'

const Title = ({title, heading, className}) => {
  return (
    <div className={`${className ? className : ''}`}>
        {
            title ?
            <h3 className="fs--14 font--bold">{title}</h3>
            :
            null
        }
        {
            heading ?
            <h2 className="fs--25 font--bold mt--10">{heading}</h2>
            :
            null
        }
    </div>
  )
}

export default Title