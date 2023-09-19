function Validation(values) {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.name === "") {
    errors.name = "Name should not be empty";
  } else {
    errors.name = "";
  }

  if (values.email === "") {
    errors.email = "E-mail should not be empty";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Email is invalid";
  } else {
    errors.email = "";
  }

  if (values.password === "") {
    errors.password = "Password should not be empty";
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      "Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit";
  } else {
    errors.password = "";
  }

  return errors;
}
export default Validation;
