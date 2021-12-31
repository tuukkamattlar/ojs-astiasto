import { useState } from 'react'
import firstPhoto from '../public/img/we.jpg'
import secPhoto from '../public/img/dish2.jpg'
import Image from 'next/image'


export default function About(props) {

  return (
    <div className='mainContentClass'>
    <h3>Kun me tiskaan</h3>
    <p>
    {props.loremIpsum}
    </p>
    <Image src={firstPhoto} className='wihii' />
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
