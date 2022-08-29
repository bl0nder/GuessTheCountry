import React from 'react'

export default function NextQuestion(props) {
    return (
        <div>
            {props.correct === 0 ?
                <div className="mt-[0.5rem] text-emerald-500 font-medium">
                    ☝️ Correct answer is: {props.randomCountry.name}
                </div> :
                <div></div>
            }
            <button 
            className="text-[#7877C5] w-full text-[1.5rem] p-1 mt-3 hover:bg-[#7877C5] hover:text-white font-medium rounded-md"
            onClick = {(event) => {
                event.preventDefault()
                props.setRound()
                props.setAnswer()
                props.setImgLoad()
            }}
            >
                Next Question ➜
            </button> 
        </div>
    )
}

