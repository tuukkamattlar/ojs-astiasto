import Head from 'next/head'
import Header from '@components/Header'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import firstPhoto from '../public/img/we.jpg'
import secPhoto from '../public/img/dish2.jpg'
import Image from 'next/image'


export default function About(props) {
  const [language, setLanguage] = useState('FI')
  const SiteName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}
  const HomeName = {'FI': 'Koti','EN': 'Home'}
  const AboutName = {'FI': 'Astiastosta','EN': 'About'}

  return (
    <div className='mainContentClass'>
    <h3>Kun tiskaat</h3>
    <p>
    {props.loremIpsum}
    </p>
    <Image src={firstPhoto} />
    <p>
    {props.loremIpsum}
    </p>
    <Image src={secPhoto} />
    <p>
    {props.loremIpsum}
    </p>
  </div>
  )
}
