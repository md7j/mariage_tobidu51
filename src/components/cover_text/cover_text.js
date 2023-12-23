import { Fade } from "react-awesome-reveal";
import Button from "../button/button"
import Input from "../input/input";
import './cover_text.css';
import { useState } from 'react'

function Intro(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 1500)
  }

  return (
    <div key="intro" className={`step ${leave ? "  leave" : ""}`}>
      <div className="title" key="intro_title">
        <Fade className="fade-item" cascade duration={100} delay={300}>Merci de venir à notre mariage !</Fade>
      </div>
      <div className="subtitle" key="intro_subtitle">
        <Fade cascade duration={100} delay={2500}>Nous avons quelques questions pour toi</Fade>
        <Fade cascade duration={500} delay={4600}>...</Fade>
      </div>
      <br/>
      <Fade duration={1000} delay={6000}>
        <Button onClick={done} active={leave} key="done_intro">C'est parti</Button>
      </Fade>
    </div>
  )
}


function Question1(props) {
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState("")
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 1500)
  }

  const handleKeypress = e => e.keyCode === 13 && answer && done();

  return (
    <div key="q1" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q1_title">
        <Fade className="fade-item" cascade duration={150} delay={300}>Avant tout, qui es-tu ?</Fade>
      </div>
      <br/>
        <Fade className="fade-item" duration={1000} delay={2000}>
          <Input value={answer} onChange={setAnswer} onKeyPress={handleKeypress}/>
        </Fade>
      <br/>
      {answer && (
        <Fade duration={1000}>
          <Button onClick={done} active={leave} key="done_q1">Suivant</Button>
        </Fade>
      )}
    </div>
  )
}

function Question2(props) {
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState("")
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 1500)
  }

  const handleKeypress = e => e.keyCode === 13 && answer && done();

  return (
    <div key="q2" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q2_title">
      <Fade className="fade-item" cascade duration={150} delay={300}>Où souhaites-tu recevoir ton faire-part ? </Fade>
      </div>
      <br/>
      <Fade className="fade-item" duration={1000} delay={3500}>
          <Input value={answer} onChange={setAnswer} onKeyPress={handleKeypress}/>
        </Fade>
      <br/>
      {answer && (
        <Fade duration={1000}>
          <Button onClick={done} active={leave} key="done_q2">Suivant</Button>
        </Fade>
      )}
    </div>
  )
}

function Question3(props) {
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState()
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 1500)
  }

  return (
    <div key="q3" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q3_title">
      <Fade className="fade-item" cascade duration={150} delay={300}>Souhaites-tu participer à la chorale ?</Fade>
      </div>
      <br/>
      <div style={{display: "flex", columnGap: "10vw"}}>
        <Fade duration={1000} delay={3600}>
          <Button onClick={() => setAnswer(true)} active={answer === true} key="done_q3_yes">Oui</Button>
        </Fade>
        <Fade duration={1000} delay={3600}>
          <Button onClick={() => setAnswer(false)} active={answer === false} key="done_q3_no">Non</Button>
        </Fade>
      </div>
      <br/>
      {answer !== undefined && (
        <Fade duration={1000}>
          <Button onClick={done} active={leave} key="done_q1">Suivant</Button>
        </Fade>
      )}
    </div>
  )
}

function Question4(props) {
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState()
  const [instrument, setInstrument] = useState("")
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 2000)
  }

  const handleKeypress = e => e.keyCode === 13 && instrument && done();

  return (
    <div key="q4" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q4_title">
        <Fade className="fade-item" cascade duration={150} delay={300}>Souhaites-tu jouer d'un instrument à la messe ?</Fade>
      </div>
      <br/>
      <div style={{display: "flex", columnGap: "10vw"}}>
        <Fade duration={1000} delay={4000}>
          <Button onClick={() => setAnswer(true)} active={answer === true} key="q4_yes">Oui</Button>
        </Fade>
        <Fade duration={1000} delay={4000}>
          <Button onClick={() => setAnswer(false)} active={answer === false} key="q4_no">Non</Button>
        </Fade>
      </div>

      {
      answer === true && (
          <>
            <br/>
            <Fade duration={150} delay={500}>Quel instrument ?</Fade>
            <Input value={instrument} onChange={setInstrument} onKeyPress={handleKeypress} />
         </>
        )
      }
      {
      (answer === false || (answer === true && instrument)) && (
        <>
          <br/>
          <Fade duration={1000}>
            <Button onClick={done} active={leave} key="done_q4">Suivant</Button>
          </Fade>
        </>
      )
      }

    </div>
  )
}


function CoverText(props) {
    const [stage, setStage] = useState(0)

    const stages = [
      <Intro key="00" onLeave={() => setStage(stage+1)} />,
      <Question1 key="01" onLeave={() => setStage(stage+1)} />,
      <Question2 key="02" onLeave={() => setStage(stage+1)} />,
      <Question3 key="03" onLeave={() => setStage(stage+1)} />,
      <Question4 key="04" onLeave={() => setStage(stage+1)} />,
    ]
 
    return (
        <div className={`cover-text`}>
          {stages[stage]}
          {/* {stages[stage]({"onLeave": () => setStage(stage + 1)})} */}
        </div>
    );
  }
  
  export default CoverText;
  