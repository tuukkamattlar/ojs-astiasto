import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AstiastoData from "../astiasto.json"
import makeXML from "functions/xml-tool"

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
  const automaticField = {'FI': 'Esitäytä osallistujamäärän mukaan','EN': 'Pre-fill by participant number'}
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
  const [invType, setInvType] = useState('email')
  const [invEmail, setInvEmail] = useState('')
  const [kiltaYhdistys, setKiltaYhdistys] = useState('')
  const [telePuh, setTelePuh] = useState('')
  const [address, setAddress] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [preCalc, setPreCalc] = useState(0)
  const [startDate, setStartDate] = useState('')
  
  function clearAll() {
    setOrder(AstiastoData)
    setOrdererName('')
    setEmail('')
    setInvEmail('')
    setKiltaYhdistys('')
    setTelePuh('')
    setAddress('')
    setDateTime('')
    setPreCalc('')
    alert('Success!')
  }


  const [order, setOrder] = useState(AstiastoData)

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const handleSubmit = e => {
    const bodySend = encode({ "form-name": "contact", ...outputOrder.output })
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bodySend
    })
      .then(
        )// THEN TODO
      .catch(error => alert(error));
      window.location = '/thankyou/'.concat(encodeURIComponent(kiltaYhdistys.replace('/', '')));
    e.preventDefault();
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
        const nroInput = nro
        if(val === 'creamItem' || val === 'WaterJug'){
          nroInput  = 1+parseInt(nro/7)
        }
        let newSet = order[val]
        if(nroInput<=order[val].MAXNRO){
          newSet.ORDER = nroInput
          setOrder(prevState => ({
            ...prevState,
            [val]: newSet
          }))        
        } else if (nroInput>order[val].MAXNRO){
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
    output["Laskutus-maili"] = String(invEmail);
    output["Telegram/puh"] = String(telePuh);
    output["Yhdistys"] = String(kiltaYhdistys);
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

function ItemLister(val, ind){
  return(
    <li key={val}>
      <input type="number" name={order[val].FI} value={order[val].ORDER} onInput={e => setValue(val,e)}/>
      <a>{order[val][lan]} {order[val].SIZE}</a>
  </li>
  )
}

function setInvTypeF(input) {
  setInvType(input)
}

function invTypeField() {
  if(invType === 'email'){
    return(
      <>
        <label>{laskutusEmailField[lan]}</label>
        <input type="email" name="Laskutus-maili" value={invEmail} onInput={e => setInvEmail(e.target.value)}/>
      </>
    )
  } else {
    return(
      <>
        <label>TODO</label>
        <input name="Laskutus-maili" value={invEmail} onInput={e => setInvEmail(e.target.value)}/>
        <label>TODO 2</label>
        <input name="Laskutus-maili" value={invEmail} onInput={e => setInvEmail(e.target.value)}/>
      
      </>
    )
  }

}

function printXML() {
  const orderClone = JSON.parse(JSON.stringify(order))
  Object.keys(orderClone).forEach(key => {if(orderClone[key].ORDER === 0) delete orderClone[key]})
  let xmlData = makeXML(orderClone)
  alert('Hienosti testattu')
}

  useEffect(() => {
    totalPrice()
  });

  useEffect(() => {
    validateSubmit()
  }, [ordererName,email,telePuh,kiltaYhdistys,address,dateTime,totPrice])


  return (
    <div className='formClass'>
      <h2>{HeadName[lan]}</h2>
      <Form name="contact" action="/" onSubmit={event => handleSubmit(event)} method="POST" data-netlify="true" >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" value={totPrice} name="Ilmoitettu hinta"/>

    <div className='formWrapper'>
      <div className='formContact'>
      
        <h5>{contactField[lan]}</h5>

        <label>{nameField[lan]}</label>
        <input type="name" name="Nimi" value={ordererName} onInput={e => setOrdererName(e.target.value)}/>

        <label>{emailField[lan]}</label>
        <input type="email" name="E-mail" value={email} onInput={e => setEmail(e.target.value)}/>

        <label>Laskutustapa TODO</label>
        <p className='InvSelector'>
          <a onClick={() => setInvTypeF('email')} className={ invType === 'email' ? 'InvSelected ' : 'InvNOTSelected'}>E-mail</a>
          <a onClick={() => setInvTypeF('einv')} className={ invType === 'einv' ? 'InvSelected ' : 'InvNOTSelected'}>E-inv</a>
          <a onClick={() => setInvTypeF('fax')} className={ invType === 'fax' ? 'InvSelected' : 'InvNOTSelected'}>Faksi</a>
        </p>

        {invTypeField()}

        <label>{telepuhField[lan]}</label>
          <input type="text" name="Telegram/puh" value={telePuh} onInput={e => setTelePuh(e.target.value)}/>

        <label>{kilta[lan]}</label>
        <input type="text"  name="Yhdistys" value={kiltaYhdistys} onInput={e => setKiltaYhdistys(e.target.value)}/>

        <label>{dateField[lan]}</label>
        <input as="textarea"  name="Aika" rows={1} value={dateTime} onInput={e => setDateTime(e.target.value)}/>

        <label>{addressField[lan]}</label>
        <textarea as="textarea"  name="Osoite" rows="3" value={address} onInput={e => setAddress(e.target.value)}/>

      </div>

      <div className='formOther'>
        <div className="autoFill">
            <h5>{automaticField[lan]}</h5>
              {automaticDescript[lan]}
              <p>
                <label>{autoInput[lan]}</label>
                <input type="number" value={preCalc} onInput={e => setPreCalc(e.target.value)}/>
                <a className="greenButton" onClick={() => setPreset(preCalc)}>{autoInputCalc[lan]}</a>
              </p>
        </div>


        <div className="formAndSubmit formAmountClass">
              <div className="formContact formInputsNumber">
                <h3>{glassField[lan]}</h3>
                <ul className='formRow'>
                {Object.keys(order).map((val,ind)=>(
                  order[val].TYPE === "glass"
                    ?
                    <>
                      {ItemLister(val, ind)}
                    </>
                    :
                    <></>
                ))}
                </ul>
              </div>
              <div className="formContact formInputsNumber">
                <h3>{plateField[lan]}</h3>
                <ul className='formRow'>
                {Object.keys(order).map((val,ind)=>(
                  order[val].TYPE === "plate"
                    ?
                    <>
                      {ItemLister(val, ind)}
                    </>
                    :
                    <></>
                ))}
                </ul>
              </div>
              <div className="formContact formInputsNumber">
                <h3>{cutleryField[lan]}</h3>
                <ul className='formRow'>
                {Object.keys(order).map((val,ind)=>(
                  order[val].TYPE === "cutlery"
                    ?
                    <>
                      {ItemLister(val, ind)}
                    </>
                    :
                    <></>
                ))}
                </ul>
              </div>
              <div className="formContact formInputsNumber">
                <h3>{coffeeField[lan]}</h3>
                <ul className='formRow'>
                {Object.keys(order).map((val,ind)=>(
                  order[val].TYPE === "other"
                    ?
                    <>
                      {ItemLister(val, ind)}
                    </>
                    :
                    <></>
                ))}
                </ul>
              </div>
            </div>
        </div>
      </div>
      <div className="submitClass">
        <div>
          <h2>{priceEstimate[lan]}</h2>
        </div>
              <h5> {Math.round(totPrice*100/0.76)/100} € (vat 24 %)</h5>
              <h5> {totPrice} € (vat 0 %)</h5>
              <p>{priceDescription[lan]}</p>
              <p className='submitButton'>
              {
                isValid ?
                <button type="submit greenButton"  >{sendField[lan]}</button>
                :
                <h3 className='alertInfo redButton'>Täytä vaadittavat tiedot</h3>
              }
              </p>
            </div>
      </Form>
      <button onClick={() => printXML()}>TESTINAPPULA :D</button>
    </div>
  )
}
