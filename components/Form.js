import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import AstiastoData from "../astiasto.json"

export default function OrderForm(props) {
  let lan = props.language
  const HeadName = {'FI': 'Tilaa astiat','EN': 'Order tableware'}
  const nameField = {'FI': 'Nimi','EN': 'Name'}
  const kilta = {'FI': 'Kilta/Yhdistys','EN': 'Guild/Association'}
  const emailField = {'FI': 'Sähköposti','EN': 'Email'}
  const laskutusEmailField = {'FI': 'Sähköposti laskutukseen','EN': 'Email for invoice'}
  const dateField = {'FI': 'Päivämäärä ja tarpeen aikaväli','EN': 'Date and time period'}
  const telepuhField = {'FI': 'Telegram/puhelin','EN': 'Telegram/Phone number'}
  const addressField = {'FI': 'Toimitusosoite ja tarvittaessa toimitusohjeet','EN': 'Delivery address and instructions'}
  const automaticField = {'FI': 'Täytä osallistujamäärän mukaan','EN': 'Fill by participant number'}
  const automaticDescript = {'FI': 'Tässä voit täyttää formin alustavasti osallistujamäärän mukaan. Muista kuitenkin tarkistaa, että tilauksesi on mieluisa',
  'EN': 'You may fill the form automatically with the number of participants. However, remember to check that your order is as desired.'}
  const autoInput = {'FI': 'Osallistujanmäärä','EN': 'Participants'}
  const autoInputCalc = {'FI': 'Laske','EN': 'Compute'}
  const kplPc = {'FI': 'kpl','EN': 'item'}
  const priceEstimate = {'FI': 'Hinta-arvio','EN': 'Estimated price'}
  const priceDescription = {'FI': 'Hinta saattaa vaihtua mm. mahdollisen pidemmän kuljetuksen takia.','EN': 'The price may alter e.g. due to long transportation.'}
  const sendField = {'FI': 'Lähetä','EN': 'Send'}
  const contactField = {'FI': 'Yhteystiedot','EN': 'Contact'}
  const glassField = {'FI': 'Lasit','EN': 'Glass'}
  const plateField = {'FI': 'Lautaset','EN': 'Plates'}
  const cutleryField = {'FI': 'Aterimet','EN': 'Cutlery'}
  const coffeeField = {'FI': 'Kahvi ja muut','EN': 'Coffee and other'}
  
  const [outputOrder, setOutputOrder] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [totPrice, setTotPrice] = useState(0)

  const [ordererName, setOrdererName] = useState('')
  const [email, setEmail] = useState('')
  const [invEmail, setInvEmail] = useState('')
  const [kiltaYhdistys, setKiltaYhdistys] = useState('')
  const [telePuh, setTelePuh] = useState('')
  const [address, setAddress] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [preCalc, setPreCalc] = useState(0)
  


  const [order, setOrder] = useState(AstiastoData)


  const handleSubmit = (e) => {
    const newMessage = outputOrder;
    if (isValid) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: { "form-name": "contactForm", ...outputOrder }
      })
        .then()
        .catch(error => alert(error));
      e.preventDefault();
    };
  };

  const totalPrice = () => {
    let summa = 0.0
    Object.keys(order).forEach( function(val){
      summa = summa + order[val].ORDER * order[val].PRICE
    })
    if (summa >= 0.0){
      setTotPrice(Math.round(summa*100)/100)
    }else{
      setTotPrice(0)
    }
  }

  function setPreset(nro) {
    if(nro>0){
      Object.keys(order).forEach( function(val){
        // TODO: suosittele optimimäärää vesikannuja
        let newSet = order[val]
        if(nro<=order[val].MAXNRO){
          newSet.ORDER = nro
          setOrder(prevState => ({
            ...prevState,
            [val]: newSet
          }))        
        } else if (nro>order[val].MAXNRO){
            newSet.ORDER = order[val].MAXNRO
            setOrder(prevState => ({
              ...prevState,
              [val]: newSet
            })) 
          }
      })
    }

  }

  function setValue(typeOf, e) {
    let newSet = order[typeOf]
    newSet.ORDER = e.target.value
    if(newSet.ORDER>=0.0 && newSet.ORDER <= order[typeOf].MAXNRO){
      setOrder(prevState => ({
        ...prevState,
        [typeOf]: newSet
      }))
    } else if (newSet.ORDER > order[typeOf].MAXNRO){
      newSet.ORDER = order[typeOf].MAXNRO
      setOrder(prevState => ({
        ...prevState,
        [typeOf]: newSet
      }))
    }
    validateSubmit()
  }

  function validateSubmit() {
    let output = {}
    output["Nimi"] = String(ordererName);
    output["E-mail"] = String(email);
    output["Telegram/puh"] = String(telePuh);
    output["Kilta"] = String(kiltaYhdistys);
    output["Osoite"] = String(address);
    output["Aika"] = String(dateTime);
    output["Ilmoitettu hinta"]= parseFloat(totPrice);
    Object.keys(order).forEach( function(val){
      output[order[val].FI] = parseInt(order[val].ORDER)
    })
    setOutputOrder({...{}, output})
    if(output["Nimi"].length > 1 && output["E-mail"].length > 1 && output["Telegram/puh"].length > 1 && output["Osoite"].length > 1 && output["Ilmoitettu hinta"] > 0.0){
      setIsValid(true)
    }
  }


  useEffect(() => {
    totalPrice()
  });

  useEffect(() => {
    validateSubmit()
  }, [ordererName,email,telePuh,kiltaYhdistys,address,dateTime,totPrice])


  return (
    <>
      <h2>{HeadName[lan]}</h2>
      <Form name="contact" netlify method="POST" netlify-honeypot="bot-field" data-netlify="true" >
      <div className='contact'>
        <h5>{contactField[lan]}</h5>
        <p>
          <Form.Label>{nameField[lan]}
            <Form.Control type="name" value={ordererName} onInput={e => setOrdererName(e.target.value)}/>
          </Form.Label>
          </p>
          <p>
          <Form.Label>{emailField[lan]}
          <Form.Control type="email" value={email} onInput={e => setEmail(e.target.value)}/>
          </Form.Label>
          </p>
          <p>
          <Form.Label>{laskutusEmailField[lan]}
          <Form.Control type="email" value={invEmail} onInput={e => setInvEmail(e.target.value)}/>
          </Form.Label>
          </p>
          <p>
          <Form.Label>{telepuhField[lan]}
          <Form.Control type="text" value={telePuh} onInput={e => setTelePuh(e.target.value)}/>
          </Form.Label>
        </p>
        <p>
          <Form.Label>{kilta[lan]}
          <Form.Control type="text" value={kiltaYhdistys} onInput={e => setKiltaYhdistys(e.target.value)}/>
          </Form.Label>
        </p>
        <p>
          <Form.Label>{dateField[lan]}
          <Form.Control as="textarea" rows={1} value={dateTime} onInput={e => setDateTime(e.target.value)}/>
          </Form.Label>
        </p>
        <p>
          <Form.Label>{addressField[lan]}
          <Form.Control as="textarea" rows={2} value={address} onInput={e => setAddress(e.target.value)}/>
          </Form.Label>
        </p>
      </div>
      <div className="autoFill">
          <h5>{automaticField[lan]}</h5>
            {automaticDescript[lan]}
          <p>
          <Form.Label>{autoInput[lan]}
            <Form.Control type="number" name="precalc" value={preCalc} onInput={e => setPreCalc(e.target.value)}/>
          </Form.Label>
          <Button onClick={() => setPreset(preCalc)}>{autoInputCalc[lan]}</Button>
          </p>
        </div>
        <div className="formAndSubmit">
          <div className="formClass">
            <div>
              <h3>{glassField[lan]}</h3>
              {Object.keys(order).map((val,ind)=>(
                order[val].TYPE === "glass"
                  ?
                  <p key={ind} className="formRow">
                  <div className="formInput">
                    <Form.Control type="number" name={val} value={order[val].ORDER} onInput={e => setValue(val,e)}/>
                  </div>
                  <div className="formName">
                    <h6>{order[val][lan]}, {order[val].SIZE}</h6> {order[val].PRICE} €/{kplPc[lan]}, (max. {order[val].MAXNRO})
                  </div>
                </p>
                  :
                  <></>

              ))}
            </div>
            <div>
              <h3>{plateField[lan]}</h3>
              {Object.keys(order).map((val,ind)=>(
                order[val].TYPE === "plate"
                  ?
                  <p key={ind} className="formRow">
                  <div className="formInput">
                    <Form.Control type="number" name={val} value={order[val].ORDER} onInput={e => setValue(val,e)}/>
                  </div>
                  <div className="formName">
                    <h6>{order[val][lan]}</h6> {order[val].PRICE} €/{kplPc[lan]}, (max. {order[val].MAXNRO})
                  </div>
                </p>
                  :
                  <></>
              ))}
            </div>
            <div>
              <h3>{cutleryField[lan]}</h3>
              {Object.keys(order).map((val,ind)=>(
                order[val].TYPE === "cutlery"
                  ?
                  <p key={ind} className="formRow">
                  <div className="formInput">
                    <Form.Control type="number" name={val} value={order[val].ORDER} onInput={e => setValue(val,e)}/>
                  </div>
                  <div className="formName">
                    <h6>{order[val][lan]}</h6> {order[val].PRICE} €/{kplPc[lan]}, (max. {order[val].MAXNRO})
                  </div>
                </p>
                  :
                  <></>
              ))}
            </div>
            <div>
              <h3>{coffeeField[lan]}</h3>
              {Object.keys(order).map((val,ind)=>(
                order[val].TYPE === "other"
                  ?
                  <p key={ind} className="formRow">
                  <div className="formInput">
                    <Form.Control type="number" name={val} value={order[val].ORDER} onInput={e => setValue(val,e)}/>
                  </div>
                  <div className="formName">
                    <h6>{order[val][lan]}</h6> {order[val].PRICE} €/{kplPc[lan]}, (max. {order[val].MAXNRO})
                  </div>
                </p>
                  :
                  <></>
              ))}
            </div>
          </div>
          <div className="submitClass">
            <h3>{priceEstimate[lan]} {totPrice} €</h3>
            <p>{priceDescription[lan]}</p>
            <p>
            {
              isValid ?
              <Button type="submit" variant="success" onClick={() => handleSubmit()}>{sendField[lan]}</Button>
              :
              <Button type="submit" variant="danger" onClick={() => handleSubmit()} disabled>{sendField[lan]}</Button>
            }
            </p>
          </div>
        </div>
      </Form>
      <div className="bottom">

      </div>
    </>
  )
}
