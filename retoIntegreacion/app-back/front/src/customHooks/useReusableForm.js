import { useState } from "react";

const useReusableForm = (validateReusableForm, props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(props);

  const handleChange = (evt) => {
    values.forEach((item, index) => {
      if (item.name === evt.target.name) values[index].value = evt.target.value;
    });
    setValues(values);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrors(validateReusableForm(values));
    if (Object.keys(validateReusableForm(values)).length === 0) {
      let obj = {};
      values.forEach((item) => {
        obj[item.name] = item.value
      })
      fetch('offers', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
       
        body: JSON.stringify(
          obj
        ) // body data type must match "Content-Type" header
      }).then((response) =>response.json().then(res=>{
        alert("se creó : " +JSON.stringify(res));
        console.log(res);
    
    })).catch(err=> alert(err));
    }
  };

  return { handleChange, handleSubmit, errors };
};

export default useReusableForm;