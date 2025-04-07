const MAX_SIZE = 10;
let window = [];

function updateWindow(newNumbers) {
  const prev = [...window];

  newNumbers.forEach(num => {
    if (!window.includes(num)) {
      window.push(num);
      if (window.length > MAX_SIZE) {
        window.shift(); 
      }
    }
  });

  return {
    windowPrevState: prev,
    windowCurrState: [...window]
  };
}

function getAverage() {
  if (window.length === 0) return 0;
  const sum = window.reduce((a, b) => a + b, 0);
  return parseFloat((sum / window.length).toFixed(2));
}

module.exports = { updateWindow, getAverage };