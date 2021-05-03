import React, {useState, useEffect} from 'react';
import Job from "./Job";
import JobForm from "./JobForm";
import "bootstrap/dist/css/bootstrap.css";
const  Jobs = () => {

  const [state, setState] = useState({offers:[]});

  useEffect(() => {
    const url = "/offers";
    fetch(url)
      .then(res => {
        return res.json();
      }).then(offers => {
        setState({ offers })
      });
  },[])

  const formBuilder = [
    { type: "text", name: "name", placeholder: "Nombre", value: "", validators: { required: true, minLength: 5, maxLength: 64 } },
    { type: "text", name: "company", placeholder: "Company", value: "", validators: { required: true, minLength: 5 } },
    { type: "text", name: "salary", placeholder: "Salario", value: "", validators: { required: true, minLength: 5, isNumber:true} },
    { type: "text", name: "city", placeholder: "Ciudad", value: "", validators: { required: true, minLength: 5} },
  ];
    return (
      <div>
        {state.offers.map((e, i) => <Job key={i} offer={e} />)}
        <br />
        <br />
        <JobForm formBuilder={formBuilder} />
      </div>
    );
}

export default Jobs;