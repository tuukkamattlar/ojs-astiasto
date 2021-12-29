import Head from 'next/head'
import Header from '@components/Header'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import OrderForm from '../components/Form'


export default function Home() {
  const [language, setLanguage] = useState('FI')
  const SiteName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}
  const HomeName = {'FI': 'Koti','EN': 'Home'}
  const AboutName = {'FI': 'Astiastosta','EN': 'About'}
  const WelcomeName = {'FI': 'Tervetuloa!','EN': 'Welcome!'}
  const InfoName = {'FI': 'Tällä sivustolla voit tilata astiat','EN': 'By using this form you can order tableware'}

  return (
    <div className="container">
      <Head>
        <title>OJS astiastotilaus</title>
        <link rel="icon" href="/ojsicon.ico" />
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossorigin></script>
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin></script>
        <script>var Alert = ReactBootstrap.Alert;</script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </Head>
      <main>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">{SiteName[language]}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">{HomeName[language]}</Nav.Link>
            <Nav.Link href="/about">{AboutName[language]}</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={language} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => setLanguage('EN')}>EN</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLanguage('FI')}>FI</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        <Header title={WelcomeName[language]} />
        <p>
          Get started by editing indez nuts bios boi
        </p>
        <p>
          {InfoName[language]}
        </p>
      
        <OrderForm language={language}/>
      </main>

    </div>
  )
}
