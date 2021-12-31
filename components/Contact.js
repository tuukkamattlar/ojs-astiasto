import React from "react"


export default function Contact(props) {
    let lan = props.language
    const contactInfoRow1 = {'FI': 'OJS astiasto Oy todo','EN': 'OJS tableware Oy todo'}
    const contactInfoRow2 = {'FI': 'astiasto@ojs.fi','EN': 'OJS tableware Oy todo'}

    return (
    <div className='contactFooter'>
        <p>{contactInfoRow1[lan]}</p>
        <p>{contactInfoRow2[lan]}</p>
        <p>astiasto@ojs.fi</p>
    </div>
    )
  }
  