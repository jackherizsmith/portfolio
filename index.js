// helpful DOM bits
const stack = document.querySelector(".portfolio__tech-stack")
const project0 = document.getElementById("project0");
const projectsFrame = document.querySelector(".portfolio__projects-frame");
const stackFocus = document.getElementsByClassName("stack--focus");
const anchors = document.querySelectorAll(".project__anchor");

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
    4,5,6,7,8,10,12,14,15,16,17,18,20,
  ],
  [
    //CAF
    4,5,8,10,14,15,16,17,18,19,20,
  ],
  [
    //SRVVRS
    0,1,3,6,7,8,12,13,15,18,
  ],
  [
    //Snakes
    1,4,5,8,10,15,18,
  ],
  [
    //Journalist
    0,2,3,10,11,18,
  ],
  [
    //Password
    0,1,3,6,7,8,
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
  if (techRefs){
    techRefs.forEach(ref => {
      document.getElementById(techNames[ref].id).classList.add("stack--focus");
      
    })
  } else {
    techNames.forEach(name => {
      document.getElementById(name.id).classList.add("stack--focus");      
    })
  }
};

const updateStack = () => {
  if (projectsTop-stackTop < 300){
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
  } else if (stackFocus.length<techNames.length) {
      setStack(); // focus all icons if wrapped
    }
  }

// initialise window
setFrame();

// keep frame up to date
window.onresize = setFrame;

window.onscroll =  () => {
    const newAnchor = projectsFrame.getBoundingClientRect().top;
    anchors.forEach(anchor => {
      anchor.style.top = newAnchor
    })
    console.log(anchors, newAnchor)
}

// set stack on scroll
projectsFrame.addEventListener("scroll", updateStack);
