import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/SoloGame.module.css'
import NextQuestion from '../components/NextQuestion'
import ResultsPageSolo from '../components/ResultsPageSolo'

export default function Solo() {

    const [countryData, setCountryData] = useState([])
    const [randomCountry, setRandomCountry] = useState({})
    const [round, setRound] = useState(0)
    const [answer, setAnswer] = useState('')
    const [correct, setCorrect] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imgLoad, setImgLoad] = useState(true)
    const [score, setScore] = useState(0)

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((data) => {
            setRound(1)  
            setCountryData(data)
            // console.log("Data fetched from api")
        })
    }, [])
    
    useEffect(() => {
        if (countryData.length > 0) {
            const randomNum = Math.floor(Math.random()*countryData.length)
            
            setRandomCountry({
                name: countryData[randomNum].name.common,
                officialName: countryData[randomNum].name.official,
                countryCode: countryData[randomNum].ccn3,
                flagEmoji: countryData[randomNum].flag
            })
            setCorrect(null)
            setLoading(false)
            console.log(countryData[randomNum].ccn3)
        }
    }, [round])
     
    // console.log(randomCountry)

    //Take care of Svalbard and Jan Mayen & Norway since both of them have the same flag0
    // console.log(answer)

    return (
        
        <main className={`${styles.main} flex flex-col justify-center items-center text-white bg-[#11161E] min-h-screen h-full`}>
            {round > 10 ? 
            <ResultsPageSolo 
            score = {score}
            setRound = {() => setRound(1)}
            setScore = {() => setScore(0)}
            />:
            <>
            {loading ? 
            <span className={styles.whirlyLoader}>
                Loading
            </span>
            : 
            <>
            <div className="text-white text-[3rem] mb-[2rem]">
                Round {round}/10
            </div>
            <div className="flag text-white">
                {imgLoad && 
                    <div className="bg-slate-400 animate-pulse text-white w-[25rem] h-2 rounded-full">
                    </div>
                }
                <img src = {`https://countryflagsapi.com/svg/${randomCountry.countryCode}`} className={imgLoad ? 'w-[0rem]' : 'w-[25rem]'}
                onLoad= {() => setImgLoad(false)}
                />
            </div>
            <div className="text-white text-[1.2rem] mt-[0.7rem]">
                {randomCountry.name === "Svalbard and Jan Mayen" ? "👀 Hint: It's not Norway!" : ""}
            </div>
            <form className="answer flex flex-col">
                <div className={`${styles.answer} ${correct===1 ? styles.correct : ''} ${correct===0 ? styles.wrong : ''} rounded-md mt-[4rem]`}>
                    <input 
                    placeholder= "Type your answer" 
                    className={`bg-transparent p-3 pl-5 text-white focus:outline-none placeholder:text-[#7877C5]`}
                    onChange = {(event) => {
                        setAnswer(event.target.value)
                    }}
                    value = {answer}
                    disabled = {(correct === 0 || correct === 1) ? 'disabled' : ''}
                    />
                    {(correct === 0 || correct === 1) ? 
                    <button 
                    className="bg-transparent text-emerald-500 submit rounded p-3 pr-5"
                    disabled='disabled'
                    
                    >
                        {correct === 1 ? '✔' : '❌'}
                    </button> : 
                    <button 
                    className='bg-transparent text-[#7877C5] submit rounded p-3 pr-5' 
                    type='submit'
                    onClick={(event) => {
                        event.preventDefault()
                        if (answer.toLowerCase() === randomCountry.name.toLowerCase() || answer.toLowerCase() === randomCountry.officialName.toLowerCase()) {
                            setCorrect(1)
                            setScore(prev => prev + 1)
                        }
                        else {
                            setCorrect(0)
                        }
                    }}
                    >
                        ➜
                    </button>
                    }
                </div>
                {
                    correct === 0 || correct === 1 ? 
                    <NextQuestion 
                    correct = {correct} 
                    randomCountry= {randomCountry}
                    setRound = {() => setRound(prev => prev + 1)}
                    setAnswer = {() => setAnswer('')}
                    setImgLoad = {() => setImgLoad(true)}
                    /> :
                    <div></div>
                }
            </form>
            </>
            }
            </>}
        </main>
    )
}
