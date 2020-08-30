const form = document.querySelector("form");
const borderNorm = "0.125rem solid hsl(215, 13%, 18%)";
const thanks = document.querySelector(".form__thanks");
const inputIds = ["name", "email", "message"];
const formInputs = [
  {
    label: inputIds[0],
    element: document.getElementById(inputIds[0]),
    regex: /^[a-zA-Z-.' ]{2,}$/,
    valid: false,
    errorMessage: "Check your name doesn't contain odd characters.",
  },
  {
    label: inputIds[1],
    element: document.getElementById(inputIds[1]),
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    valid: false,
    errorMessage: "This needs to include an @ symbol and domain.",
  },
  {
    label: inputIds[2],
    element: document.getElementById(inputIds[2]),
    regex: /^(?!\s*$).+/,
    valid: false,
    errorMessage: "Please include some detail of why you are reaching out.",
  },
];

const sendMessage = (formData) => {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      for (input in formInputs) {
        const inputElement = document.getElementById(formInputs[input].label);
        inputElement.style.border = borderNorm;
        inputElement.value = "";
      }
      thanks.style.visibility = "initial";
      thanks.style.opacity = "1";
    })
    .catch(console.error);
};

const validate = (input, test) => {
  const inputFlag = input.nextElementSibling;
  // if there's an error message reset the element's state
  if (inputFlag.textContent != "-") {
    thanks.style.visibility = "hidden";
    thanks.style.opacity = "0";
    inputFlag.textContent = "-";
    inputFlag.style.visibility = "hidden";
    inputFlag.style.opacity = "0";
    inputFlag.removeAttribute("role");
  }
  if (test) {
    input.style.borderColor = "hsl(106, 100%, 30%)";
  } else {
    input.style.border = borderNorm;
  }
  return test;
};

const updateValidity = (inputObj) => {
  inputObj.valid = validate(
    inputObj.element,
    inputObj.regex.test(inputObj.element.value)
  );
};

formInputs.forEach((input) => {
  input.element.addEventListener("input", () => {
    updateValidity(input);
  });
});

const handleSubmit = (event) => {
  event.preventDefault();
  const anyInvalid =
    !formInputs[0].valid || !formInputs[1].valid || !formInputs[2].valid;
  if (anyInvalid) {
    formInputs.forEach((input) => {
      if (!input.valid) {
        const falseInput = document.getElementById(input.label);
        const falseFlag = falseInput.nextElementSibling;
        // error message styling for each invalid input
        falseInput.style.borderColor = "hsl(0, 100%, 45%)";
        falseFlag.textContent = input.errorMessage;
        falseFlag.style.visibility = "initial";
        falseFlag.style.opacity = "1";
        falseFlag.setAttribute("role", "alert");
      }
    });
  } else sendMessage(new FormData(form));
};

form.setAttribute("novalidate", "");

form.addEventListener("submit", handleSubmit);
