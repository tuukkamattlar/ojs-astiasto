import Head from 'next/head'
import Header from '@components/Header'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import OrderForm from '../components/Form'
import HomePage from '@components/HomePage'
import AboutPage from '@components/AboutPage'


export default function Form(props) {
  let lan = props.language
  //const [language, setLanguage] = useState('FI')
  const SiteName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}
  const HomeName = {'FI': 'Koti','EN': 'Home'}
  const AboutName = {'FI': 'Astiastosta','EN': 'About'}
  const WelcomeName = {'FI': 'Tervetuloa!','EN': 'Welcome!'}
  const InfoName = {'FI': 'Tällä sivustolla voit tilata astiat','EN': 'By using this form you can order tableware'}

  return (
    <div className='mainContentClass'>
      <p>
        {props.loremIpsum}
      </p>
      <OrderForm language={lan}/>
    </div>
  )
}
