const cards = document.querySelectorAll(".card");
//entries that are being observed for making changes or not making changes on screen
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      //in below line we are writing if my element now came on my screen and it is visible on the unobserve it , leave it then dont do anything with it
      //like in lazy loading as soon we download imageon screen then after that we  dont do  anything later.
      //imp:-- you can comment it if u dont want
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
    // console.log("entries:", entries);
  },
  {
    //if it is 0 means we will start animation just before it is being shown on the screen
    //but if it is 1 then after whole element shown on screen then only wil will start animation
    threshold: 0.5,
    //it decreases our screen size by -100px now, root is our screen size
    // but if u want to pre load ur images then u can do 100pz means ur images will load when they are 100px away from screen to reach
    //imp:-- you can comment it if u dont want
    rootMargin: "100px",
  }
);

const lastcardobserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadnewcards();
  //unobserver last card after end of scroll bcause now our last card is not last card
  //so it should not observe that card, now we have new last card that we just added with for loop
  lastcardobserver.unobserve(lastCard.target);
  lastcardobserver.observe(document.querySelector(".card:last-child"));
}, {});

lastcardobserver.observe(document.querySelector(".card:last-child"));

// gives us the whole detailds about this element which being observed
cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelector(".container");

function loadnewcards() {
  for (let i = 0; i < 15; i++) {
    const card = document.createElement("div");
    card.textContent = "New card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
