import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function OrderForm(props) {
  let lan = props.language
  const HeadName = {'FI': 'Tilaa astiat','EN': 'Order tableware'}
  const nameField = {'FI': 'Nimi','EN': 'Name'}
  const emailField = {'FI': 'Sähköposti','EN': 'Email'}
  const sendField = {'FI': 'Lähetä','EN': 'Send'}
  const addressField = {'FI': 'Toimitusosoite','EN': 'Delivery address'}
  const glassK = {'FI': 'Kuohuviinilasi','EN': 'Sparkling wine glass'}


  const [isValid, setIsValid] = useState(true)
  const [totPrice, setTotPrice] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [preCalc, setPreCalc] = useState(0)
  const [glassSkumppa, setGlassSkumppa] = useState(0)

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

  const totalPrice = () => {
    let summa = 0
    summa += glassSkumppa*1
    setTotPrice(summa)
  }

  const setPreset = (nro) => {
    setGlassSkumppa(nro)
  }

  useEffect(() => {
    totalPrice()
  });

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
          <Form.Label>{addressField[lan]} 
          <Form.Control as="textarea" rows={2} value={address} onInput={e => setAddress(e.target.value)}/>
          </Form.Label>
        </p>
        <div>
          Automaattinen täyttö
          <p>
          <Form.Label>{emailField[lan]} 
            <Form.Control type="number" name="precalc" value={preCalc} onInput={e => setPreCalc(e.target.value)}/>
          </Form.Label>
          <Button onClick={() => setPreset(preCalc)}>Laske</Button>
          </p>
        </div>
        <div className="lasit">
          <h4>Lasit</h4>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
        </div>
        <div className="lautaset">
          <h4>Lautaset</h4>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
        </div>
        <div className="aterimet">
          <h4>Aterimet</h4>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
            <p>
              <Form.Label>{glassK[lan]} 
              <Form.Control type="number" value={glassSkumppa} onInput={e => setGlassSkumppa(e.target.value)}/>
              </Form.Label>
            </p>
        </div>




        <h3>Arvioitu hinta {totPrice} €</h3>
        <p>
          <Button type="submit" onClick={() => handleSubmit()}>{sendField[lan]}</Button>
        </p>
      </Form>
    </>
  )
}
