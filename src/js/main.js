import { courses } from "./courses.js";
import { remaincourse } from "./courses.js";

//
const cardsContainer = document.querySelector("._cards");
const cardcontiner2 = document.querySelector("._cards2");

if (cardsContainer) {
  courses.forEach((course) => {
    const html = `<article class="card">
            <h3 class="_cardH3">${course.courseCode}</h3>
            <p>${course.courseTitle}</p>
            <a href="${course.pdf}">Open &rarr;</a>
          </article>
  `;
    cardsContainer.insertAdjacentHTML("beforeend", html);
  });
}

if (cardcontiner2) {
  remaincourse.forEach((remaincourse) => {
    const html = `
  <article class="card">
            <h3 class="_cardH3">${remaincourse.courseCode}</h3>
            <p>${remaincourse.courseTitle}</p>
            <a href="${remaincourse.pdf}">Open &rarr;</a>
          </article>
  `;
    cardcontiner2.insertAdjacentHTML("beforeend", html);
  });
}

//navagation show
const navBar = document.querySelector(".navigation");
const navToggle = document.querySelector(".__navigation");

navToggle.addEventListener("click", function () {
  navBar.classList.toggle("navigation--open");
  navToggle.classList.toggle("__navigation--open");
});

///location
const flagElement = document.querySelector(".countryflag img");
navigator.geolocation.getCurrentPosition(
  function (position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat, long);
    async function getCountry(lat, long) {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
        );
        if (!response.ok) throw new Error("could not get country");
        const data = await response.json();
        const countryCode = data.countryCode.toLowerCase();

        flagElement.src = `https://flagcdn.com/w160/${countryCode}.png`;
        flagElement.alt = `${data.countryName} flag`;

        console.log(data.countryName, countryCode);
      } catch (err) {
        console.error(err);
      }
    }

    getCountry(lat, long);
  },

  function (err) {
    console.error(err);
  },
);
