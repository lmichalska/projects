"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function


async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects();
  console.log(projects);
  displayProjects(projects);
  displayProjectsGrid(projects);
}

async function getProjects() {
  const response = await fetch(
    "https://projects.lmichalska.dk/wp-json/wp/v2/project?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayProjects(projects) {
  const projectsList = document.querySelector("#projects-list");
  for (const project of projects) {
    projectsList.insertAdjacentHTML("beforeend", `<li>${project.acf.name}</li>`);
  }
}

function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-grid");

  for (const project of projects) {
    projectsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <article class="grid-item">
      <img src="${project.acf.image}" alt="${project.acf.name}" />
      <h2>${project.acf.name}</h2>
      <p>${project.acf.title}</p>
      <a href="${project.acf.link}">See the project</a> 
    </article>
  `
    );
  }
}
