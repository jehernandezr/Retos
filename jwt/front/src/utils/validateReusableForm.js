const validateReusableForm = (values) => {
    const err = {};
    values.forEach((item) => {
      if (item.validators) {
        if (item.validators.required && item.value.length === 0) {
          err[item.name] = "El campo " + item.name.toLowerCase() + " es necesario";
          return;
        }
        if (item.validators.minLength && item.value.length < item.validators.minLength) {
          err[item.name] = "El campo " + item.name.toLowerCase() + " es muy corto";
          return;
        }
        if (item.validators.maxLength && item.value.length > item.validators.maxLength) {
          err[item.name] = "El campo " + item.name.toLowerCase() + " es  muy largo";
          return;
        }
        if (item.validators.isNumber && /^$[a-zA-z0-9]*/.test(item.value) )
        {
            err[item.name] = "El campo " + item.name.toLowerCase() + " debe ser un número";
          return;
        }
      }
    });
    return err;
  };
  
  export default validateReusableForm;