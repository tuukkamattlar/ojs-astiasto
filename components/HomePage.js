import OrderForm from "./Form"

export default function HomePage(props) {
  let lan = props.language
  const InfoName = {'FI': 'Tällä sivustolla voit tilata astiat','EN': 'By using this form you can order tableware'}

  return (
    <>
     <p>
        {InfoName[lan]}
    </p>
    <OrderForm language={lan}/>
    </>
  )
}
