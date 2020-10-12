import React from 'react'

export default function NewsBrief(props) {
    const {title, content} = props.data
    return (
        <div className="newsbrief">
            <h1>{title}</h1>
            <p>{content}</p>
        </div> 
    )
}
