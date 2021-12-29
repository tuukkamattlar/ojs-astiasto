import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function OrderForm(props) {
  let lan = props.language
  const HeadName = {'FI': 'Tilaa astiat','EN': 'Order tableware'}
  const nameField = {'FI': 'Nimi','EN': 'Name'}
  const emailField = {'FI': 'Sähköposti','EN': 'Email'}
  const sendField = {'FI': 'Lähetä','EN': 'Send'}


  const [isValid, setIsValid] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  //const [address, setAddress] = useState('')

  const handleSubmit = e => {
    const newMessage = {
      fullName: name,
      email: email
    };
    if (isValid) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contactForm", newMessage })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));
      e.preventDefault();
    };
  };

  return (
    <>
      <h2>{HeadName[lan]}</h2>
      <Form name="contact" netlify method="POST" netlify-honeypot="bot-field" data-netlify="true" >
      <input type="hidden" name="form-name" value="contact"/>
        <p>
          <Form.Label>
            {nameField[lan]}
            <Form.Control type="text" name="name" value={name} onInput={e => setName(e.target.value)}/>
            </Form.Label>
        </p>
        <p>
          <Form.Label>{emailField[lan]} 
            <Form.Control type="email" name="email" value={email} onInput={e => setEmail(e.target.value)}/>
            </Form.Label>
        </p>

        <p>
          <Button type="submit" onClick={() => handleSubmit()}>{sendField[lan]}</Button>
        </p>
      </Form>
    </>
  )
}
