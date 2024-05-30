"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects();
  console.log(projects);
  displayProjects(projects);
  displayProjectsList(projects);
}

async function getProjects() {
  const response = await fetch(
    "https://projects.lmichalska.dk/wp-json/wp/v2/project?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayProjects(projects) {
  const projectsList = document.querySelector("nav");
  for (const project of projects) {
    projectsList.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <article class="nav">
      <a href="#${project.acf.id}"><p>${project.acf.name}</p></a>
    </article>
  `
    );
  }
}

function displayProjectsList(projects) {
  const projectsList = document.querySelector("#projects");

  for (const project of projects) {
    projectsList.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <article class="list-item" id="${project.acf.id}">
      <img src="${project.acf.image}" alt="${project.acf.name}" />
      <h2>${project.acf.name}</h2>
      <p class="bold">${project.acf.type}</p>  
      <p class="bold">Duration: ${project.acf.duration}</p>    
      <p class="bold">Type: ${project.acf.people}</p>
      <p>${project.acf.short}</p>
      <div id="button">
      <button class="button"><a href="${project.acf.link}">View project</a></button> 
      </div>
    </article>
  `
    );
  }
}
