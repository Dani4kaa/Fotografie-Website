// js/feedback-display.js

// Hole Container
const feedbackList = document.getElementById("feedbackList");

// Feedbacks dynamisch einfügen
feedbacks.forEach(fb => {
  const li = document.createElement("li");
  li.classList.add("feedback-item");
  li.innerHTML = `<p>"${fb.text}"</p><strong>- ${fb.name}</strong>`;
  feedbackList.appendChild(li);
});

// Slider-Funktion (automatisch rotierend)
let index = 0;
const items = document.querySelectorAll(".feedback-item");
if(items.length > 0){
  items[0].style.display = "block"; // ersten Eintrag zeigen

  setInterval(() => {
    items[index].style.display = "none"; // aktuellen ausblenden
    index = (index + 1) % items.length;   // nächsten auswählen
    items[index].style.display = "block"; // nächsten einblenden
  }, 4000); // alle 4 Sekunden
}
