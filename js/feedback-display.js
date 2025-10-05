// js/feedback-display.js
const feedbackList = document.getElementById("feedbackList");

// Feedbacks dynamisch einfügen
function renderFeedbacks() {
  feedbackList.innerHTML = ""; // Liste leeren

  feedbacks.forEach(fb => {
    const li = document.createElement("li");
    li.classList.add("feedback-item");
    li.innerHTML = `<p>"${fb.text}"</p><strong>- ${fb.name}</strong>`;
    feedbackList.appendChild(li);
  });
}

renderFeedbacks();

// Slider Animation von oben nach unten
let index = 0;
function startFeedbackSlider() {
  const items = document.querySelectorAll(".feedback-item");
  if(items.length === 0) return;

  const itemHeight = items[0].offsetHeight;
  feedbackList.style.transform = `translateY(0px)`;

  setInterval(() => {
    index++;
    if(index >= items.length) index = 0;
    feedbackList.style.transition = "transform 0.5s ease-in-out";
    feedbackList.style.transform = `translateY(-${index * itemHeight}px)`;
  }, 4000);
}

startFeedbackSlider();
