import NaviBar from '@components/NaviBar'
import Contact from '@components/Contact'
import { useState } from 'react'
import Head from 'next/head'
import frontPhoto from '../public/img/astiat_main.jpg'
import Image from 'next/image'
import useWindowDimensions from "functions/windowSize"

import '../styles/globals.css'
import '../styles/navibar.css'
import '../styles/form.css'

function Application({ Component, pageProps }) {

  const [language, setLanguage] = useState('FI')

  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const { height, width } = useWindowDimensions();

  return (
    <>
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
      <div className='allContent'>
        <div className='NaviClassMain'>
          <NaviBar setLanguage={setLanguage} language={language} loremIpsum={loremIpsum} />
        </div>
        <Component {...pageProps} language={language} loremIpsum={loremIpsum}/>
        <Contact language={language} loremIpsum={loremIpsum} />
      </div>
    </>
  )
}

export default Application
