import Head from 'next/head'
import Header from '@components/Header'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'


export default function Home() {
  const [language, setLanguage] = useState('FI')
  const SiteName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}
  const HomeName = {'FI': 'Koti','EN': 'Home'}
  const AboutName = {'FI': 'Astiastosta','EN': 'About'}

  return (
    <div>
      deezz nuts
    </div>
  )
}
