const gallery = document.querySelector('#gallery');
const overlay = document.querySelector('#overlay');
const cards = document.querySelectorAll('.employee-card');


// ------------------------------------
// EVENT LISTENERS
// ------------------------------------

// Adds listener to each individual card to avoid slow response from event bubbling
for (let i = 0; i < cards.length; i += 1) {
  cards[i].addEventListener('click', (event) => {
    overlay.style.display = 'flex';
  });
}

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// ------------------------------------
// FETCH FUNCTIONS
// ------------------------------------

// Fetches employee data from randomuser website,
// parses it from JSON into JS,
// and sends the results to the makeGallery function.
// CONSIDER: also calling a makeOverlay function and putting brackets around both function calls?
// The makeOverlay function would be called from a click event listener on the gallery cards?
fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(response => {
    makeGallery(response.results);
    // addOverlayDetails(response.results)
  })

// ------------------------------------
// HELPER FUNCTIONS
// ------------------------------------

// Creates the gallery grid of employee cards
// function makeGallery(results) {
//   let employeeCards = '';
//   for (let i = 0; i < results.length; i += 1) {
//     employeeCards += `
//       <div class="employee-card">
//         <img class="profile-pic" alt="profile picture" src="${results[i].picture.large}">
//         <div class="employee-info">
//           <h4>${results[i].name.first + ' ' + results[i].name.last}</h4>
//           <p>${results[i].email}</p>
//           <p class="city">${results[i].location.city}</p>
//         </div>
//       </div>
//     `;
//     gallery.innerHTML = employeeCards;
//   };
// }
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
