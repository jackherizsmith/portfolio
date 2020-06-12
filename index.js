// helpful DOM bits
const project0 = document.getElementById("project0");
const frame = document.querySelector(".portfolio__projects-frame");
const stackFocus = document.getElementsByClassName("stack--focus");
const anchors = document.querySelectorAll(".project__anchor");
// set up project specs
let projectsEdge, projectWidth, project0PosX, projectNum;
const projectStacks = [
  [
    //WIP
    react, jest, postgres, node, restful, express, netlify,
    heroku, eslint, prettier, codecov, travis, miro, figma,
  ],
  [
    //CAF
    react, jest, restful, netlify, eslint, prettier,
    codecov, travis, miro, figma, airtable,
  ],
  [
    //SRVVRS
    html, css, javascript, postgres, node, restful, heroku,
    tape, prettier, miro,
  ],
  [
    //Snakes
    css, react, jest, restful, netlify, prettier, miro,
  ],
  [
    //Journalist
    html, sass, javascript, netlify, eleventy, miro,
  ],
  [
    //Password
    html, css, javascript, postgres, node, restful,
  ],
];

// functions
const setFrame = () => {
  projectWidth = project0.offsetWidth;
  projectsEdge = frame.getBoundingClientRect().left;
};

const setStack = (tech) => {
  document.getElementById(tech.id).classList.add("stack--focus");
};

const updateStack = () => {
  project0PosX = project0.getBoundingClientRect().left;
   // as project 0 moves left, find how far it has moved in (absolute) multiples of its own width
  projectNum = Math.abs((project0PosX - projectsEdge) / projectWidth);
  if (Number.isInteger(projectNum)) { // when integer update stack
    while (stackFocus.length) { // remove current project stack
      stackFocus[0].classList.remove("stack--focus");
    } // focus stack for incoming project
    projectStacks[projectNum].forEach(setStack);
  }
};

// initialise window
setFrame();
projectStacks[0].forEach(setStack);

// keep frame up to date
window.onresize = setFrame;

// window.onscroll =  () => {
//     const newAnchor = frame.getBoundingClientRect().top;
//     anchors.forEach(anchor => anchor.style.top = newAnchor)
//     console.log(anchors, newAnchor)
// }

// set stack on scroll
frame.addEventListener("scroll", updateStack);