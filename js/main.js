const gallery = document.querySelector('#gallery');
const overlay = document.querySelector('#overlay');
const employeeDetails = document.querySelector('#employee-details');
const cards = document.querySelectorAll('.employee-card');
let results = [];

// ------------------------------------
// FETCH FUNCTIONS
// ------------------------------------

// Fetches employee data from random user website, parses it from JSON into JS, and sends the results to the makeGallery function.
// CONSIDER: also calling a makeOverlay function and putting brackets around both function calls?
// The makeOverlay function would be called from a click event listener on the gallery cards?
fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response => response.json())
.then(response => {
  makeGallery(response.results);
  results = response.results;
})

// ------------------------------------
// EVENT LISTENERS
// ------------------------------------

// Adds listener to each individual card (to avoid slow response from event bubbling),
// captures card id, shows the overlay, then calls addDetails() and passes it
// the fetch results and the card id to build the overlay details.
for (let i = 0; i < cards.length; i += 1) {
  cards[i].addEventListener('click', (event) => {
    let id = event.target.id;
    if (id == null || id == '') {
      id = event.target.parentNode.id;
      if (id == null || id == '') {
        id = event.target.parentNode.parentNode.id;
      }
    }
    overlay.style.display = 'flex';
    // console.log(id);
    addDetails(results, id);
  });
}





// ------------------------------------
// HELPER FUNCTIONS
// ------------------------------------

// Creates the intial gallery of employee cards
function makeGallery(results) {
  for (let i = 0; i < results.length; i += 1) {
    let employeeCard = '';
    employeeCard += `
      <img class="profile-pic" alt="profile picture" src="${results[i].picture.large}">
      <div class="employee-info">
        <h4>${results[i].name.first + ' ' + results[i].name.last}</h4>
        <p>${results[i].email}</p>
        <p class="city">${results[i].location.city}</p>
      </div>
    `;
    cards[i].innerHTML = employeeCard;
  };
}

// Adds the details of the clicked employee to the overlay
function addDetails(results, id) {
  let index = parseInt(id.slice(4, id.length)) - 1;
  let details = `
    <button class="x">&times;</button>
    <img class="profile-pic-lg" alt="profile picture" src="${results[index].picture.large}">
    <h4>${results[index].name.first + ' ' + results[index].name.last}</h4>
    <p>${results[index].email}</p>
    <p class="city">${results[index].location.city}</p>
    <hr>
    <p class="phone">${results[index].cell}</p>
    <p class="address">
      ${results[index].location.street + ', ' +
      results[index].location.state + ' ' +
      results[index].location.postcode}</p>
    <p class="birthday">${results[index].dob.date}</p>
  `;
  employeeDetails.innerHTML = details;

  // Hides the overlay when the x is clicked
  let x = document.querySelector('.x');
  x.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}
