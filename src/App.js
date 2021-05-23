import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import Card from './component/card/card'
import axios from './axios-orders'


const App = _ => {

  console.log("App")

  //#region - comments - URL Imgs
  // URL Imgs
  //w https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-07.jpg
  //w https://media.istockphoto.com/photos/young-woman-portrait-in-the-city-picture-id1009749608?k=6&m=1009749608&s=612x612&w=0&h=ckLkBgedCLmhG-TBvm48s6pc8kBfHt7Ppec13IgA6bo=
  //m https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=6&m=1007763808&s=612x612&w=0&h=Js1VDBulbaNw_CF7fghP_nhUPCC-DQTqb7Wym1CdTOI=
  //w https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWmL5ygM8t230-ySn-YkzbkRxt_zu5cI35IyUkRceIQvMNVY8UWefKOv3D7H2PXP5Fbws&usqp=CAU
  //w https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdp_YxBn7pxjA5UnYfcPcuRyGfOnSJ_mjmLuUxhzZteHZhTGOD2q8IF8aMy3EGArlZWtQ&usqp=CAU
  //m https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8YU1MpzRMHrMEs49-KPU6dt2YAyfrUMgLfQ&usqp=CAU
  //m https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80
  //m https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80
  //m https://media.istockphoto.com/photos/happy-smiling-man-looking-away-picture-id1158245623?k=6&m=1158245623&s=612x612&w=0&h=y0LbpRFMHMj_9YC_kpKvLYcijEunxP27KyjXBrDHcFg=
  //#endregion

  //#region - variables

  // value on inputs
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [salary, setSalary] = useState('')
  const [jobTime, setJobTime] = useState('')
  const [jobType, setJobType] = useState('')
  const [jobDate, setJobDate] = useState('')

  // to know iam start edit process , between click on pencil svg until press editButton
  const [edit, setEdit] = useState(false)

  // whole obj return form firebase // {-as{name:1,job:"developer"}, -fr{...}, -hy{..}}
  const [getData, setGetData] = useState()
  // the obj that i need to edit // {name:1,job:"developer"}
  const [dataWillEdit, setDataWillEdit] = useState()
  // the obj key i need to edit // -as
  const [dataWillEditKey, setDataWillEditKey] = useState()

  // need re-request the data
  const [needReRequest, setNeedReRequest] = useState(true)

  // contain many of <Card/>
  let cards = [];

  //#endregion

  useEffect(_ => {
    axios.get('https://web-services-cb472-default-rtdb.firebaseio.com/employees.json')
      .then(response => {
        setGetData(response.data)
      })
    // refresh when changes of cards that contain many <Card/>
  }, [])

  //* when click on addEmployee button
  const addEmployee = e => {
    console.log("addEmployee")
    e.preventDefault();
    const employee = {
      img,
      name,
      job,
      salary,
      jobTime,
      jobType,
      jobDate
    }
    axios.post('/employees.json', employee)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  //* when click on garbage svg (remove)
  const deleteEmployee = key => {
    console.log("deleteEmployee")
    axios.delete(`https://web-services-cb472-default-rtdb.firebaseio.com/employees/${key}.json`)
  }

  //* when click on pencil svg (open edit form)
  const pressEditSvg = (key) => {
    console.log("pressEditSvg")
    if (dataWillEdit) {
      setEdit(true);
    }

    axios.get(`https://web-services-cb472-default-rtdb.firebaseio.com/employees/${key}.json`)
      .then(response => {
        setDataWillEdit(response.data)
        setDataWillEditKey(key)
      })
  }

  //* when click on editEmployee button (apply changes on form)
  const pressEditButton = key => {
    console.log("pressEditButton")
    // all values the user change it, if user didn't change any one, the value is empty
    const editingEmployee = {
      img, //empty
      name, // saif => saifuddin
      job, //empty
      salary, //empty
      jobTime, //empty
      jobType, //empty
      jobDate, //empty
    }
    // if user didn't change value, take the value from the server, and resend it
    for (let x in editingEmployee) {
      if (!editingEmployee[x]) {
        //if img = empty, Take his value from server(dataWillEdit)
        editingEmployee[x] = dataWillEdit[x]
      }
    }

    //update employees[Key].json
    axios.put(`https://web-services-cb472-default-rtdb.firebaseio.com/employees/${key}.json`, editingEmployee)
    setEdit(false);
  }

  //#region - Change Button base on AddEmployee or EditEmployee
  let button = <button onClick={addEmployee}>add employee</button>
  if (edit) {
    button = <button onClick={_ => pressEditButton(dataWillEditKey)} className="edit">edit employee</button>
  }
  //#endregion

  //#region - generate <Card/> based on getData obj
  for (let key in getData) {
    cards.push(
      <Card
        key={key}
        img={getData[key].img}
        name={getData[key].name}
        job={getData[key].job}
        salary={getData[key].salary}
        jobTime={getData[key].jobTime}
        jobType={getData[key].jobType}
        jobDate={getData[key].jobDate}
        deleteFun={_ => deleteEmployee(key)}
        editFun={_ => pressEditSvg(key)}
      />
    )
  }

  //#endregion

  return (
    <div className="App">
      <header>
        <h1>employee</h1>
      </header>
      <main>
        <section className="addEmp">
          <form action="#">
            {edit ? <Fragment>
              <input type="text" placeholder="Name00" defaultValue={dataWillEdit.name} onChange={event => setName(event.target.value)} />
              <input type="text" placeholder="URL Img" defaultValue={dataWillEdit.img} onChange={event => setImg(event.target.value)} />
              <input type="text" placeholder="Job Title" defaultValue={dataWillEdit.job} onChange={event => setJob(event.target.value)} />
              <input type="number" placeholder="Salary" defaultValue={dataWillEdit.salary} onChange={event => setSalary(event.target.value)} />
              <input type="text" placeholder="Job Time" defaultValue={dataWillEdit.jobTime} onChange={event => setJobTime(event.target.value)} />
              <input type="text" placeholder="Job Type" defaultValue={dataWillEdit.jobType} onChange={event => setJobType(event.target.value)} />
              <input type="text" placeholder="Job Date" defaultValue={dataWillEdit.jobDate} onChange={event => setJobDate(event.target.value)} />
            </Fragment>
              :
              <Fragment>
                <input type="text" placeholder="Name" onChange={event => setName(event.target.value)} />
                <input type="text" placeholder="URL Img" onChange={event => setImg(event.target.value)} />
                <input type="text" placeholder="Job Title" onChange={event => setJob(event.target.value)} />
                <input type="number" placeholder="Salary" onChange={event => setSalary(event.target.value)} />
                <input type="text" placeholder="Job Time" onChange={event => setJobTime(event.target.value)} />
                <input type="text" placeholder="Job Type" onChange={event => setJobType(event.target.value)} />
                <input type="text" placeholder="Job Date" onChange={event => setJobDate(event.target.value)} />
              </Fragment>}
            {button}
          </form>

        </section>
        <section className="empCards">
          <div className="empTitle">
            <span>Employee</span>
            <span>Salary</span>
            <span>Status</span>
            <span>Manage</span>
          </div>

          <div className="cards">
            {cards}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
