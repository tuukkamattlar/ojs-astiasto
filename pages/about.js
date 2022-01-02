import { useState } from 'react'
import mainPhoto from '../public/img/we.jpg'
import Image from 'next/image'
import AstiastoData from "../astiasto.json"


export default function About(props) {

  const [astiastoItems, setAstiastoItems] = useState(AstiastoData)
  const lan = props.language

  const kplPc = {'FI': 'kpl','EN': 'item'}

  function itemCard(ind, val) {
    return(
      <div key={ind} className='aboutCard'>

        <Image src={mainPhoto} height='170' width='160' className='itemPic' />
        <h5>
          {astiastoItems[val][lan]} {astiastoItems[val].SIZE}
        </h5>
        <p>
          {astiastoItems[val].PRICE} €/{kplPc[lan]}, (max. {astiastoItems[val].MAXNRO})
        </p>
      </div>
    )
  }

  function itemClass(itemClassType) {
    return(
      <div className='itemGrid'>
      {Object.keys(astiastoItems).map((val,ind)=>(
                  astiastoItems[val].TYPE === itemClassType
                    ?
                    <>
                      {itemCard(ind, val)}
                    </>
                    :
                    <></>
        ))}
        </div>
    )
  }


  return (
    <div className='mainContentClass'>
      <div className='astiastoInfo'>
        <h1>
          Astiasto
        </h1>
        <p>
          Astiaston hintoihin kuuluu....
        </p>
      </div>
    <h1>Astiaston sisältö</h1>
    <div className='itemClass'>
      <h3>Lasit</h3>
      {itemClass('glass')}
    </div>

    <div className='itemClass'>
      <h3>Lautaset</h3>
      {itemClass('plate')}
    </div>

    <div className='itemClass'>
      <h3>Aterimet</h3>
      {itemClass('cutlery')}
    </div>

    <div className='itemClass'>
      <h3>Muut</h3>
      {itemClass('other')}
    </div>
  </div>
  )
}
