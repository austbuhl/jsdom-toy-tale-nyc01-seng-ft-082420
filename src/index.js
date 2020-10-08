let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => {
        for (const toy of toys) {
          renderToy(toy)
        }
      })

    function renderToy(toy){
      const toyCollection = document.querySelector('#toy-collection')

      const cardDiv = document.createElement('div')
      cardDiv.classList.add('card')
  
      cardDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      `
      toyCollection.append(cardDiv)
    }

    const addToyForm = document.querySelector('.add-toy-form')

    addToyForm.addEventListener("submit", function(e){
      e.preventDefault()
      let newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }
      
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newToy)
      }
      
      fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(newToy => renderToy(newToy))
      
      addToyForm.reset()
    })

});
