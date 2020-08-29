const form = document.querySelector("form");
const borderNorm = "0.125rem solid hsl(215, 13%, 18%)";
const thanks = document.querySelector(".form__thanks");
const inputIds = ["name", "email", "message"]
const formInputs = [
  {
    label: inputIds[0],
    element: form.getElementById(inputIds[0]),
    regex: /^[a-zA-Z-.' ]{2,}$/,
    valid: false,
    errorMessage: "Check your name doesn't contain odd characters.",
  },
  {
    label: inputIds[1],
    element: form.getElementById(inputIds[1]),
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    valid: false,
    errorMessage: "This needs to include an @ symbol and domain.",
  },
  {
    label: inputIds[2],
    element: form.getElementById(inputIds[2]),
    regex: /^(?!\s*$).+/,
    valid: false,
    errorMessage: "Please include some detail of why you are reaching out.",
  },
];

form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const anyInvalid =
    !formInputs[0].valid || !formInputs[1].valid || !formInputs[2].valid;
  if (anyInvalid) {
    for (input in formInputs) {
      if (!formInputs[input].valid) {
        const falseInput = document.getElementById(formInputs[input].label);
        const falseFlag = falseInput.nextElementSibling;
        falseInput.style.borderColor = "hsl(0, 100%, 45%)";
        falseFlag.textContent = formInputs[input].errorMessage;
        falseFlag.style.visibility = "initial";
        falseFlag.style.opacity = "1";
        falseFlag.setAttribute("role", "alert");
      }
    }
  } else {
    const formData = new FormData(form);
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
  }
});

function validate(input, test) {
  const inputFlag = input.nextElementSibling;
  thanks.style.visibility = "hidden"; // maybe all need to be in if?
  thanks.style.opacity = "0";
  inputFlag.textContent = "-";
  inputFlag.style.visibility = "hidden";
  inputFlag.style.opacity = "0";
  inputFlag.removeAttribute("role");
  if (test) {
    input.style.borderColor = "hsl(106, 100%, 30%)";
  } else {
    input.style.border = borderNorm;
  }
  return test;
}

for (input in formInputs) {
  let inputObj = formInputs[input];
  let inputElement = inputObj.element;
  inputElement.addEventListener("input", () => {
    inputObj.valid = validate(
      inputElement,
      inputObj.regex.test(inputElement.value)
    );
  });
}
