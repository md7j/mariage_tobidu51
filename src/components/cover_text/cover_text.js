import Button from "../button/button"
import Input from "../input/input";
import './cover_text.css';
import { useEffect, useState } from 'react'

function Intro(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave, className } = props

  const done = () => {
    setLeave(true)
    onLeave()
  }

  return (
    <div key="intro" className={`step ${className}`}>
      <div className="title" key="intro_title">
        <div>Merci de venir à notre mariage !</div>
      </div>
      <div className="subtitle" key="intro_subtitle">
        <div>Nous avons quelques questions pour toi ...</div>
      </div>
      <br />
      <Button onClick={done} active={leave} key="done_intro">C'est parti</Button>
    </div>
  )
}


function Question1(props) {
  const { onLeave, className, data, backToRecap } = props
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState(data)

  const done = () => {
    setLeave(true)
    onLeave(answer)
  }

  const handleKeypress = e => e.keyCode === 13 && answer && done();

  return (
    <div key="q1" className={`step ${className}`}>
      <div className="title" key="q1_title">
        <div>Avant tout, qui es-tu ?</div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="fade-in">
        <br />
        <Input value={answer} onChange={setAnswer} onKeyPress={handleKeypress} placeholder="Prénom Nom" />
        <br />
        {answer && (
          <Button onClick={done} active={leave} key="done_q1">{backToRecap ? "Retour au recapitulatif" : "Suivant"}</Button>
        )}
      </div>
    </div>
  )
}

function Question2(props) {
  const { onLeave, className, data, backToRecap } = props
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState(data)

  const done = () => {
    setLeave(true)
    onLeave(answer)
  }

  const handleKeypress = e => e.keyCode === 13 && answer && done();

  return (
    <div key="q2" className={`step ${className}`}>
      {leave}
      <div className="title" key="q2_title">
        <div>Où souhaites-tu recevoir ton faire-part ? </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="quick-fade">
        <br />
        <Input value={answer} onChange={setAnswer} onKeyPress={handleKeypress} placeholder="Adresse" />
        <br />
        {answer && (
          <Button onClick={done} active={leave} key="done_q2">{backToRecap ? "Retour au recapitulatif" : "Suivant"}</Button>
        )}
      </div>
    </div>
  )
}

function Question3(props) {
  const { onLeave, className, data, backToRecap } = props
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState(data)

  const done = () => {
    setLeave(true)
    onLeave(answer)
  }

  return (
    <div key="q3" className={`step ${className}`}>
      {leave}
      <div className="title" key="q3_title">
        <div>Souhaites-tu participer à la chorale ?</div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="quick-fade">
        <br />
        <div style={{ display: "flex", columnGap: "10vw" }}>
          <Button onClick={() => setAnswer(true)} active={answer === true} key="done_q3_yes">Oui</Button>
          <Button onClick={() => setAnswer(false)} active={answer === false} key="done_q3_no">Non</Button>
        </div>
        <br />
        {answer !== undefined && (
          <Button onClick={done} active={leave} key="done_q3">{backToRecap ? "Retour au recapitulatif" : "Suivant"}</Button>
        )}
      </div>
    </div>
  )
}

function Question4(props) {
  const { onLeave, className, data, backToRecap } = props
  const [leave, setLeave] = useState(false)
  const [answer, setAnswer] = useState(data["answer"])
  const [instrument, setInstrument] = useState(data["instrument"])

  const done = () => {
    setLeave(true)
    onLeave({
      answer: answer,
      instrument: instrument
    })
  }

  const handleKeypress = e => e.keyCode === 13 && instrument && done();

  return (
    <div key="q4" className={`step ${className}`}>
      {leave}
      <div className="title" key="q4_title">
        <div>Souhaites-tu jouer d'un instrument à la messe ?</div>
      </div>
      <br />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="quick-fade">
        <div style={{ display: "flex", columnGap: "10vw" }}>
          <Button onClick={() => setAnswer(true)} active={answer === true} key="q4_yes">Oui</Button>
          <Button onClick={() => setAnswer(false)} active={answer === false} key="q4_no">Non</Button>
        </div>
        {
          answer === true && (
            <div style={{ width: "100%" }} className="fade-in">
              <br />
              <div>Quel instrument ?</div>
              <Input value={instrument} onChange={setInstrument} onKeyPress={handleKeypress} placeholder="Instrument" />
            </div>
          )
        }
        {
          (answer === false || (answer === true && instrument)) && (
            <>
              <br />
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="quick-fade">
                <Button onClick={done} active={leave} key="done_q4">{backToRecap ? "Retour au recapitulatif" : "Suivant"}</Button>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

function Recap(props) {
  const [leave, setLeave] = useState(false)
  const { onLeave, className, data } = props
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  const [show5, setShow5] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow1(true), 300)
    setTimeout(() => setShow2(true), 600)
    setTimeout(() => setShow3(true), 900)
    setTimeout(() => setShow4(true), 1200)
    setTimeout(() => setShow5(true), 1500)
  }, [])

  const done = () => {
    setLeave(true)
    onLeave()
  }

  return (
    <div key="recap" className={`step ${className}`}>
      <div className="title" key="recap_title">
        <div>Recapitulons :</div>
      </div>
      <div className="recap-instructions" key="recap_instructions">
        <div>Clique sur une ligne pour modifier</div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column", rowGap: "1vh" }}>
        {show1 && <div className="fade-in recap-item" onClick={() => onLeave(1)}>Tu es <b>{data[1]}</b>.</div>}
        {show2 && <div className="fade-in recap-item" onClick={() => onLeave(2)}>Ton adresse pour le faire-part est <b>{data[2]}</b>.</div>}
        {show3 && <div className="fade-in recap-item" onClick={() => onLeave(3)}>Tu <b>{data[3] ? "souhaites" : "ne souhaites pas"}</b> chanter dans la chorale.</div>}
        {show4 && (data[4]["answer"]
          ? <div className="fade-in recap-item" onClick={() => onLeave(4)}>Tu <b>souhaites</b> jouer d'un instrument à la messe (<b>{data[4]["instrument"]}</b>).</div>
          : <div className="fade-in recap-item" onClick={() => onLeave(4)}>Tu <b>ne souhaites pas</b> jouer d'un instrument à la messe.</div>
        )}
        <br />
        {show5 && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="fade-in">
            <Button onClick={done} active={leave} key="done_recap">Terminer</Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Thank(props) {
  const { className } = props

  return (
    <div key="thank" className={`step ${className}`}>
      <div className="title" key="thank_title">
        Merci ! Nous avons hâte de fêter ça avec toi !
      </div>
    </div>
  )
}

function Maintenance(props) {
  const { className } = props

  return (
    <div key="thank" className={`step ${className}`}>
      <div className="title" key="thank_title">
        Désolé, le site est en fermé pour la soirée.
      </div>
    </div>
  )
}


function CoverText({ onDone }) {
  const [stage, setStage] = useState(0)
  const [back, setBack] = useState(false)
  const [next, setNext] = useState(false)
  const [backToRecap, setBackToRecap] = useState(false)
  const [data, setData] = useState({
    1: "",
    2: "",
    3: undefined,
    4: {
      answer: undefined,
      instrument: ""
    },
  })

  const changeStage = (value = undefined, previous = false) => {
    if (value !== undefined && stage === 5) {
      setNext(true)
      setTimeout(() => {
        setBackToRecap(true)
        setStage(value)
        setNext(false)
      }, 1000)
      return
    }
    if (value !== undefined) {
      const new_data = data
      new_data[stage] = value
      setData(new_data)
    }
    if (stage === 5)
      onDone({
        name: data[1],
        adress: data[2],
        chorale: data[3] ? "Oui" : "Non",
        instrument: data[4]["answer"] ? data[4]["instrument"] : "Non"
      })
    setNext(true)
    setTimeout(() => {
      setBack(false)
      if (backToRecap) {
        setStage(5)
        setBackToRecap(false)
      }
      else
        setStage(previous ? stage - 1 : stage + 1)
      setNext(false)
    }, 1000)
    setTimeout(() => setBack(true), 2000)
  }

  const stages = [
    <Intro className={next ? "fade-out" : "fade-in"} key="00" onLeave={changeStage} />,
    <Question1 backToRecap={backToRecap} data={data[1]} className={next ? "fade-out" : "fade-in"} key="01" onLeave={changeStage} />,
    <Question2 backToRecap={backToRecap} data={data[2]} className={next ? "fade-out" : "fade-in"} key="02" onLeave={changeStage} />,
    <Question3 backToRecap={backToRecap} data={data[3]} className={next ? "fade-out" : "fade-in"} key="03" onLeave={changeStage} />,
    <Question4 backToRecap={backToRecap} data={data[4]} className={next ? "fade-out" : "fade-in"} key="04" onLeave={changeStage} />,
    <Recap className={next ? "fade-out" : "fade-in"} data={data} key="05" onLeave={changeStage} />,
    <Thank className={next ? "fade-out" : "fade-in"} key="06" />,
  ]

  return (
    <div className={`cover-text`}>
      {
        back && !backToRecap && stage > 1 && stage < 5 && (
          <div id="back-button" className={next ? "fade-out" : "fade-in"}>
            <Button onClick={() => changeStage(undefined, true)} active={false} key="previous">{"<"}</Button>
          </div>
        )
      }
      {stages[stage]}
      {/* <Maintenance className={"fade-in"}/> */}
    </div>
  );
}

export default CoverText;
