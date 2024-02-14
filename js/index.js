document.addEventListener("DOMContentLoaded", () => {
    const monsterForm = document.getElementById("monster-form");
    const monsterContainer = document.getElementById("monster-container");
    const loadMoreButton = document.getElementById("load-more");
    
    let currentPage = 1;
  
    monsterForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
      createMonster(name, age, description);
    });
  
    loadMoreButton.addEventListener("click", () => {
      currentPage++;
      loadMonsters(currentPage);
    });
  
    loadMonsters(currentPage);
  
    function loadMonsters(page) {
      const limit = 50;
      const url = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`;
      fetch(url)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => displayMonster(monster));
        })
        .catch(error => console.error("Error loading monsters:", error));
    }
  
    function createMonster(name, age, description) {
      const url = "http://localhost:3000/monsters";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ name, age, description })
      })
      .then(response => response.json())
      .then(monster => {
        displayMonster(monster);
        monsterForm.reset();
      })
      .catch(error => console.error("Error creating monster:", error));
    }
  
    function displayMonster(monster) {
      const monsterCard = document.createElement("div");
      monsterCard.innerHTML = `
        <h3>${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);
    }
  });
  