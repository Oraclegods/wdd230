const baseURL = "https://yourgithubusername.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.weeks);
}

function displayLinks(weeks) {
  const container = document.getElementById("activityLinks");
  container.innerHTML = ''; // Clear static content

  weeks.forEach(week => {
    const section = document.createElement("section");
    const heading = document.createElement("h3");
    heading.textContent = week.week;
    section.appendChild(heading);

    const list = document.createElement("ul");
    week.links.forEach(link => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.setAttribute("href", baseURL + link.url);
      anchor.textContent = link.title;
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

getLinks();
