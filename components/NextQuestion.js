import React from 'react'

export default function NextQuestion(props) {
    return (
        <div>
            {props.correct === 0 ?
                <div className="mt-[0.5rem] text-emerald-500 text-[1.2rem] font-medium">
                    ☝️ Correct answer is: {props.randomCountry.name}
                </div> :
                <div></div>
            }
            <button 
            className="text-white w-full text-[1.5rem] p-1 mt-3 hover:bg-white hover:text-[#11161E] hover:text-white font-medium rounded-md"
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

