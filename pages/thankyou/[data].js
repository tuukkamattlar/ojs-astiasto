import React from 'react'
import {useRouter} from 'next/router';

export default function ThankYou() {
    const router = useRouter()

    return (
    <div className='mainContentClass'>
        <h2>Kiitos tilauksesta {decodeURI(router.asPath.split('thankyou/')[1])}!</h2>
    </div>
    )
}
