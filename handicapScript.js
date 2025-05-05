document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("handicapForm");
    const roundsList = document.getElementById("roundList");
    const handicapDisplay = document.getElementById("handicapIndex");
  
    let rounds = [];
  
    function calculateDifferential(score, rating, slope) {
      return ((score - rating) * 113) / slope;
    }
  
    function updateDisplay() {
      roundsList.innerHTML = "";
  
      rounds.forEach((round, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `Round ${index + 1}: ${round.score} (${round.holes}) - Differential: ${round.differential.toFixed(1)}`;
        roundsList.appendChild(li);
      });
  
      const diffs = rounds.map(r => r.differential).sort((a, b) => a - b);
      let handicap = 0;
  
      if (diffs.length === 0) {
        handicapDisplay.innerText = "N/A";
      } else if (diffs.length < 3) {
        handicap = diffs[0];
      } else {
        const bestDiffs = diffs.slice(0, Math.min(3, diffs.length));
        const avg = bestDiffs.reduce((a, b) => a + b, 0) / bestDiffs.length;
        handicap = avg * 0.96;
      }
  
      handicapDisplay.innerText = handicap.toFixed(1);
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const score = parseInt(document.getElementById("score").value);
      const holes = document.getElementById("holes").value;
      let rating = parseFloat(document.getElementById("courseRating").value);
      let slope = parseInt(document.getElementById("slopeRating").value);
  
      if (isNaN(rating)) rating = 72.0;
      if (isNaN(slope)) slope = 113;
  
      if (holes === "9") {
        rating /= 2;
        slope = slope ? slope : 113;
      }
  
      const differential = calculateDifferential(score, rating, slope);
  
      rounds.push({ score, holes, rating, slope, differential });
  
      updateDisplay();
      form.reset();
    });
  });
