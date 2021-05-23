import React, { useState } from 'react';
import garbage from '../../assets/icons/garbage.svg'
import pencil from '../../assets/icons/pencil.svg'
import garbageHover from '../../assets/icons/garbage-hover.svg'
import pencilHover from '../../assets/icons/pencil-hover.svg'

const Card = (props) => {

  const [statePencil, setStatePencil] = useState(<img src={pencil} alt="pencil" />);
  const [stateGarbage, setStateGarbage] = useState(<img src={garbage} alt="pencil" />);



  const pencilEnter = _ => {
    setStatePencil(<img src={pencilHover} alt="pencil" />)
  }

  const pencilLeave = _ => {
    setStatePencil(<img src={pencil} alt="pencil" />)
  }
  const garbageEnter = _ => {
    setStateGarbage(<img src={garbageHover} alt="pencil" />)
  }
  const garbageLeave = _ => {
    setStateGarbage(<img src={garbage} alt="pencil" />)
  }




  return (
    <div className="card">
      <div className="name">
        <div className="empImg">
          <img alt="emp" src={props.img}></img>
        </div>
        <div className="empName">
          <span>{props.name}</span>
          <span>{props.job}</span>
        </div>
      </div>
      <div className="salary">
        <span>{props.salary}&nbsp;EGP</span>
        <span>{props.jobTime}</span>
      </div>
      <div className="status">
        <span>{props.jobType}</span>
        <span>{props.jobDate}</span>
      </div>
      <div className="manage">
        <div onMouseEnter={pencilEnter} onMouseLeave={pencilLeave} onClick={props.editFun} >
          {statePencil}
        </div>
        <span className="vLine"></span>
        <div onMouseEnter={garbageEnter} onMouseLeave={garbageLeave} onClick={props.deleteFun} >
          {stateGarbage}
        </div>
      </div>
    </div>

  );
}

export default Card;
