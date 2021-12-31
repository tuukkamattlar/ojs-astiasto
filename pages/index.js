import mainPhoto from '../public/img/we.jpg'
import Image from 'next/image'

export default function Home(props) {
  let lan = props.language
  //const [language, setLanguage] = useState('FI')
  const SiteName = {'FI': 'OJS astiasto','EN': 'OJS tableware'}
  const HomeName = {'FI': 'Koti','EN': 'Home'}
  const AboutName = {'FI': 'Astiastosta','EN': 'About'}
  const WelcomeName = {'FI': 'Tervetuloa!','EN': 'Welcome!'}
  const InfoName = {'FI': 'Tällä sivustolla voit tilata astiat','EN': 'By using this form you can order tableware'}

  return (
    <>
    <div className='mainContentClass contentIndex'>
      
      <h3>Kun tiskaat</h3>
      <p>
        {props.loremIpsum}
      </p>
      <Image src={mainPhoto} />
      <p>
        {props.loremIpsum}
      </p>
    </div>
    </>

  )
}
