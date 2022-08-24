import styles from '../styles/Home.module.css'

export default function Homepage() {
  return (
    <div className="h-screen bg-[#11161E] flex justify-center">
      <h1 className = {`${styles.heading} text-7xl text-white font-medium mt-9`}>
        Guess the country
      </h1>
    </div>
  )
}
