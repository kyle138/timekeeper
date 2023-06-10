document.addEventListener("DOMContentLoaded", () => {

  // Get the elements
  const timeBtn = document.getElementById("reckonTime");
  const hrsWrkd = document.getElementById("inputHoursWorked");
  const clckdIn = document.getElementById("inputClockedIn");

  // Intercept password button clicks
  timeBtn.addEventListener("click", () => {
    console.log("cleeeek");
    reckonTime();
  });

  // Intercept 'ENTER' key in fields
  hrsWrkd.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') reckonTime();
  });
  clckdIn.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') reckonTime();
  });

  // Function getValues
  function gotValues() {
    return (hrsWrkd.value && clckdIn.value) 
  } // end getValues

  // Function reckonTime
  function reckonTime() {
    console.log("Reckoning...");
    if(hrsWrkd.value && clckdIn.value) {
      console.log("values are in");
    } else {
      console.log("something about missing fields");
    }
  } // End reckonTime

});