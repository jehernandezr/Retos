import React from "react";
import useReusableForm from "../customHooks/useReusableForm";
import validateReusableForm from "../utils/validateReusableForm";

const JobForm = (props) => {
    const { handleChange, handleSubmit, errors } = useReusableForm(
      validateReusableForm,
      props.formBuilder.map((item) => {
        return { name: item.name, value: item.value, validators: item.validators };
      })
    );
  
    const fieldHTML = props.formBuilder.map((field) => (
      <div key={field.name} className="form-group">
        <label htmlFor={field.name}>{field.name}</label>
        <input type={field.type} name={field.name} className="form-control" id={field.name} onChange={handleChange} />
        {errors[field.name] && <p style={{ color: "red" }}>{errors[field.name]}</p>}
      </div>
    ));
  
    return (
      <div className="container-fluid">
        <div className="row justify-content-center justify-content-sm-start align-items-center">
          <div className="col-lg-4 col-md-7 col-sm-12">
            <div className="card bg-light p-3">
              <div className="card-body">
                <h1 className="text-center">
                  <span className="badge badge-gray-dark">Formulario de trabajos</span>
                </h1>
                <div>
                  <form onSubmit={handleSubmit} className="mt-5">
                    {fieldHTML}
                    <button type="submit" className="btn btn-block btn-lg btn-primary rounded-pill mt-5">
                      <strong>Enviar</strong>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default JobForm;