import Link from "next/link"
import React, {useState, useEffect} from 'react'
import useWindowDimensions from "functions/windowSize"
import ReactCSSTransitionGroup from 'react-transition-group'


export default function NaviBar(props) {
  let lan = props.language
  const [toggleMenu, setToggleMenu] = useState(false)

  const SiteName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}
  const AboutName = {'FI': 'Info','EN': 'Info'}
  const FormName = {'FI': 'Tilaa','EN': 'Order'}
  //const OtherName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}


  const { height, width } = useWindowDimensions();
  function setLanguage(newLang) {
    props.setLanguage(newLang)
    setToggleMenu(false)
  }

  function burgerButton(){
      return(
        <div onClick={() => setToggleMenu(true)} className='navButton'>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      )
  }
  function burgerButtonClose(){
    return(
      <div onClick={() => setToggleMenu(false)} className='navButton'>
        <div className="bar1C"></div>
        <div className="bar3C"></div>
      </div>
    )
}

  function langButton(){
    return(
        <a className='langMain'>
            <a className='langOpt' onClick={() => setLanguage('FI')}>FI</a>
            <a className='langOpt' onClick={() => setLanguage('EN')}>EN</a>
        </a>
    )
}
  
  function showNavBar(){
      if(width > 1000){
          return(
            <ul className='NaviList'>
              <Link href="/" >
                {SiteName[lan]}
              </Link>
              <Link href="/about" >
                {AboutName[lan]}
              </Link>
              <Link href="/order" >
                {FormName[lan]}
              </Link>
              {langButton()}
          </ul>
          )
      }
    if (toggleMenu) {
          return(
              <div>
                <ul className='NaviList' onClick={()=>setToggleMenu(false)}>
                  <Link href="/" >
                      {SiteName[lan]}
                  </Link>
                  <Link href="/about" onClick={()=>setToggleMenu(false)} >
                      {AboutName[lan]}
                  </Link>
                  <Link href="/order" onClick={()=>setToggleMenu(false)} >
                      {FormName[lan]}
                  </Link>
                  {langButton()}
                  <a>
                      {burgerButtonClose()}
                  </a>
              </ul>
            </div>
          )
      }
      if (!toggleMenu) {
        return(
            <>
                <div className='togglerBar'>
                  <Link href="/" >
                    {SiteName[lan]}
                  </Link>
                    <a className='burgerButton'>
                    {burgerButton()}
                    </a>
                </div>
            </>
        )
    }
  }


  return (
    <nav className='naviBar'>
        {showNavBar()}
    </nav>
  )
}
