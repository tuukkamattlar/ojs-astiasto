import React from "react"


export default function AboutPage(props) {
    let lan = props.language

    console.log('at about')
    return (
      <>
        <div>
        About Page {lan}
        </div>
        <h1>
            KUN
        </h1>
      </>
    )
  }
  