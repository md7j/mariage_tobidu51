import { Fade } from "react-awesome-reveal";
import Button from "../button/button"
import Input from "../input/input";
import './cover_text.css';
import { useState, useEffect } from 'react'

function Intro(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 2000)
  }

  return (
    <div key="intro" className={`step ${leave ? "  leave" : ""}`}>
      <div className="title" key="intro_title">
        <Fade cascade duration={100} delay={300}>Merci de venir a notre mariage !</Fade>
      </div>
      <div className="subtitle" key="intro_subtitle">
        <Fade cascade duration={100} delay={2500}>Nous avons quelques questions pour toi</Fade>
        <Fade cascade duration={500} delay={4600}>...</Fade>
      </div>
      <br/>
      <Fade duration={1000} delay={6000}>
        <Button onClick={done} key="done_intro">C'est parti</Button>
      </Fade>
    </div>
  )
}


function Question1(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 2000)
  }

  return (
    <div key="q1" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q1_title">
      <Fade cascade duration={150} delay={300}>Avant tout, </Fade>
      <Fade cascade duration={150} delay={1550}>qui est tu ?</Fade>
      </div>
      <br/>
        <Input />
      <br/>
      <Fade duration={1000} delay={4000}>
        <Button onClick={done} key="done_q1">Suivant</Button>
      </Fade>
    </div>
  )
}

function Question2(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 2000)
  }

  return (
    <div key="q2" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q2_title">
      <Fade cascade duration={150} delay={300}>A quelle addresse veux-tu recevoir ton faire-part ? </Fade>
      </div>
      <br/>
        <Input />
      <br/>
      <Fade duration={1000} delay={4000}>
        <Button onClick={done} key="done_q2">Suivant</Button>
      </Fade>
    </div>
  )
}

function Question3(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 2000)
  }

  return (
    <div key="q3" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q3_title">
      <Fade cascade duration={150} delay={300}>Souhaites tu participer a la chorale ?</Fade>
      </div>
      <br/>
      <div style={{display: "flex", columnGap: "10vw"}}>
        <Fade duration={1000} delay={4000}>
          <Button onClick={done} key="done_q3_yes">Oui</Button>
        </Fade>
        <Fade duration={1000} delay={4000}>
          <Button onClick={done} key="done_q3_no">Non</Button>
        </Fade>
      </div>
    </div>
  )
}

function Question4(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave } = props

  const done = () => {
    setLeave(true)
    setTimeout(onLeave, 2000)
  }

  return (
    <div key="q4" className={`step ${leave ? "  leave" : ""}`}>
      {leave}
      <div className="title" key="q4_title">
      <Fade cascade duration={150} delay={300}>Souhaites tu jouer d'un instrument à la messe ?</Fade>
      </div>
      <br/>
      <div style={{display: "flex", columnGap: "10vw"}}>
        <Fade duration={1000} delay={4000}>
          <Button onClick={done} key="done_q4_yes">Oui</Button>
        </Fade>
        <Fade duration={1000} delay={4000}>
          <Button onClick={done} key="done_q4_no">Non</Button>
        </Fade>
      </div>
    </div>
  )
}


function CoverText(props) {
    const [stage, setStage] = useState(0)

    const stages = [
      <Intro onLeave={() => setStage(stage+1)} />,
      <Question1 onLeave={() => setStage(stage+1)} />,
      <Question2 onLeave={() => setStage(stage+1)} />,
      <Question3 onLeave={() => setStage(stage+1)} />,
      <Question4 onLeave={() => setStage(stage+1)} />,
    ]
 
    return (
        <div className={`cover-text`}>
          {stages[stage]}
          {/* {stages[stage]({"onLeave": () => setStage(stage + 1)})} */}
        </div>
    );
  }
  
  export default CoverText;
  