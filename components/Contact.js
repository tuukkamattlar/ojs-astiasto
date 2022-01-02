import React from "react"


export default function Contact(props) {
    let lan = props.language
    const contactInfoRow1 = {'FI': 'OJS astiasto Oy todo','EN': 'OJS tableware Oy todo'}
    const contactInfoRow2 = {'FI': 'astiasto@ojs.fi','EN': 'OJS tableware Oy todo'}
    const contactInfoRow3 = {'FI': 'Otaniemen JS-Palvelu Oy','EN': 'Otaniemen JS-Palvelu Oy'}

    return (
    <div className='contactFooter'>
        <p>{contactInfoRow3[lan]} (2775054-9) </p>
        <p>{contactInfoRow2[lan]}</p>
        <p>astiasto@ojs.fi</p>
    </div>
    )
  }
  