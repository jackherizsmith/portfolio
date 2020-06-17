// helpful DOM bits
const stack = document.querySelector(".portfolio__tech-stack");
const project0 = document.getElementById("project0");
const projectsFrame = document.querySelector(".portfolio__projects-frame");
const stackFocus = document.getElementsByClassName("stack--focus");
const mobileFrame = document.querySelector(".portfolio__mobile");

// set up project specs
let projectsEdge, projectWidth, project0PosX, projectNum;
const techNames = [
  html, //0
  css, //1
  sass, //2
  javascript, //3
  react, //4
  jest, //5
  postgres, //6
  node, //7
  restful, //8 
  , //9 - removed express
  netlify, //10
  eleventy, //11
  heroku, //12
  tape, //13
  eslint, //14
  prettier, //15
  codecov, //16
  travis, //17
  miro, //18
  airtable, //19
  figma, //20]
];

const projectStacks = [
  [
    //WIP
    4,
    5,
    6,
    7,
    8,
    10,
    12,
    14,
    15,
    16,
    17,
    18,
    20,
  ],
  [
    //CAF
    4,
    5,
    8,
    10,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ],
  [
    //SRVVRS
    0,
    1,
    3,
    6,
    7,
    8,
    12,
    13,
    15,
    18,
  ],
  [
    //Snakes
    1,
    4,
    5,
    8,
    10,
    15,
    18,
  ],
  [
    //Journalist
    0,
    2,
    3,
    10,
    11,
    18,
  ],
  [
    //Password
    0,
    1,
    3,
    6,
    7,
    8,
  ],
];

// functions
const setFrame = () => {
  projectWidth = project0.offsetWidth;
  projectsEdge = projectsFrame.getBoundingClientRect().left;
  projectsTop = projectsFrame.getBoundingClientRect().top;
  stackTop = stack.getBoundingClientRect().top;
};

const setStack = (techRefs) => {
  // if passed a project , focus the relevant tech otherwise focus all of them
  if (techRefs) {
    techRefs.forEach((ref) => {
      document.getElementById(techNames[ref].id).classList.add("stack--focus");
    });
  } else {
    techNames.forEach((name) => {
      document.getElementById(name.id).classList.add("stack--focus");
    });
  }
};

const updateStack = () => {
  if (projectsTop - stackTop < 300) {
    project0PosX = project0.getBoundingClientRect().left;
    // as project 0 moves left, find how far it has moved in (absolute) multiples of its own width
    projectNum = Math.abs((project0PosX - projectsEdge) / projectWidth);
    if (Number.isInteger(projectNum)) {
      // when integer update stack
      while (stackFocus.length) {
        // remove current project stack
        stackFocus[0].classList.remove("stack--focus");
      } // focus stack for incoming project
      setStack(projectStacks[projectNum]);
    }
  } else if (stackFocus.length < techNames.length) {
    setStack(); // focus all icons if wrapped
  }
};

// initialise window
setFrame();

// keep frame up to date
window.onresize = setFrame;

// set stack on scroll
projectsFrame.addEventListener("scroll", updateStack);

mobileFrame.addEventListener("click", () => {
  projectsFrame.focus();
});

// form validation
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");

const nameInput = form.querySelector("#name");
const nameRegex = /^[a-zA-Z-.' ]{2,}$/;

const emailInput = form.querySelector("#email");
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const messageInput = form.querySelector("#message");
const messageRegex = /^(?!\s*$).+/;

const thanks = document.querySelector(".form__thanks");

let valid = {
  name: false,
  email: false,
  message: false,
};

const errorMessage = {
  name: "Check your name doesn't contain odd characters.",
  email: "This needs to include an @ symbol and domain.",
  message: "Please include some detail of why you are reaching out.",
};

form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (Object.values(valid).includes(false)) {
    for (key in valid) {
      if (!valid[key]) {
        input = document.getElementById(key);
        input.style.borderColor = "hsl(0, 100%, 45%)";
        input.nextElementSibling.textContent = errorMessage[key];
        input.nextElementSibling.style.visibility = "initial";
        input.nextElementSibling.style.opacity = "1";
        input.nextElementSibling.setAttribute("role", "alert");
      }
    }
  } else {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        "form-name=contact&" +
          nameInput.name +
          "=" +
          nameInput.value +
          "&" +
          emailInput.name +
          "=" +
          emailInput.value +
          "&" +
          messageInput.name +
          "=" +
          messageInput.value
      ),
    })
      .then(() => {
        // need to refactor!
        nameInput.style.border = ".2rem solid hsl(223, 55%, 22%)";
        nameInput.value = "";
        emailInput.style.border = ".2rem solid hsl(223, 55%, 22%)";
        emailInput.value = "";
        messageInput.style.border = ".2rem solid hsl(223, 55%, 22%)";
        messageInput.value = "";
        thanks.style.visibility = "initial";
        thanks.style.opacity = "1";
      })
      .catch(console.error);
  }
});

function validate(input, test) {
  thanks.style.visibility = "hidden"; // maybe better in addeventlistener for user focus
  thanks.style.opacity = "0";
  input.nextElementSibling.textContent = "-";
  input.nextElementSibling.style.visibility = "hidden";
  input.nextElementSibling.style.opacity = "0";
  input.nextElementSibling.removeAttribute("role");
  if (test) {
    input.style.borderColor = "hsl(106, 100%, 30%)";
    return true;
  } else {
    input.style.border = ".2rem solid hsl(223, 55%, 22%)";
    return false;
  }
}

nameInput.addEventListener("input", () => {
  valid.name = validate(nameInput, nameRegex.test(nameInput.value));
});

emailInput.addEventListener("input", () => {
  valid.email = validate(emailInput, emailRegex.test(emailInput.value));
});

messageInput.addEventListener("input", () => {
  valid.message = validate(messageInput, messageRegex.test(messageInput.value));
});
