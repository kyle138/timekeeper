document.addEventListener("DOMContentLoaded", () => {

  // Get the elements
  const hrsWrkd = document.getElementById("inputHoursWorked");
  const clckdIn = document.getElementById("inputClockedIn");
  const timeBtn = document.getElementById("reckonTime");
  const msgArea = document.getElementById("messageArea");

  // Initialize
  var fieldsValid = {
    hrsWrkd: 0,
    clckdIn: 0
  };

  // Intercept button clicks
  timeBtn.addEventListener("click", () => {
    console.log("cleeeek");
    if(fieldsAreValid()) reckonTime();
  });

  // Intercept 'ENTER' key in fields
  clckdIn.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
      if(fieldsAreValid()) {
        reckonTime();
      }
    } else {
      validator();
    }
  });
  hrsWrkd.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
      if(fieldsAreValid()) {
        reckonTime();
      } 
    } else {
      validator();
    }
  });
  
  // Intercept touches
  clckdIn.addEventListener("touchend", () => {
    validator();
  });

  // Restrict hrsWrkd to 2 decimal places
  hrsWrkd.addEventListener("input", () => {
    var prev = hrsWrkd.getAttribute("data-prev");
    prev = (prev != '') ? prev : '';
    if(Math.round(hrsWrkd.value*100)/100!=hrsWrkd.value) hrsWrkd.value=prev;
    hrsWrkd.setAttribute("data-prev",hrsWrkd.value); 
  });

  // Function validator
  function validator() {
    // hrsWrkd should be a positive number
    // if the field is empty remove both validation classes
    if(hrsWrkd.value === '') {
      hrsWrkd.classList.remove("is-valid");
      hrsWrkd.classList.remove("is-invalid");
      fieldsValid.hrsWrkd = 0;
      enableButton();
    } else {
      // field has some value but is it a positive number?
      if(typeof(parseFloat(hrsWrkd.value)) === 'number' && hrsWrkd.value >= 0) {
        hrsWrkd.classList.remove("is-invalid");
        hrsWrkd.classList.add("is-valid");
        fieldsValid.hrsWrkd = 1;
        enableButton();
        if(hrsWrkd.value >=80) msgArea.value = "You are already over 80 hours. Go home, relax."; 
      } else {
        // field has some value but it is NOT a number
        console.log(typeof(hrsWrkd.value)); // DEBUG
        hrsWrkd.classList.remove("is-valid");
        hrsWrkd.classList.add("is-invalid");
        fieldsValid.hrsWrkd = 0;
        enableButton();
        msgArea.value = "Hours worked must be a positive number."
      }
    } // End if/else hrsWrkd
    
    // clckdIn should be a time value
    // if the field is empty remove both validation classes
    if(clckdIn.value === '') {
      console.log("Time is empty");
      clckdIn.classList.remove("is-valid");
      clckdIn.classList.remove("is-invalid");
      fieldsValid.clckdIn = 0;
      enableButton();
    } else {
      // field has some value but is it a time?
      if(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(clckdIn.value)) {
        clckdIn.classList.remove("is-invalid");
        clckdIn.classList.add("is-valid");
        fieldsValid.clckdIn = 1;
        enableButton();
      } else {
        // field has some value but it is not a time
        clckdIn.classList.remove("is-valid");
        clckdIn.classList.add("is-invalid");
        fieldsValid.clckdIn = 0;
        enableButton();
      }
    } // End if/else clckdIn
  } // End validator

  //
  // Function fieldsAreValid
  function fieldsAreValid() {
    return(fieldsValid.hrsWrkd === 1 && fieldsValid.clckdIn === 1);
  } // End fieldsAreValid

  //
  // Function enableButton
  function enableButton() {
    if(fieldsAreValid()) {
      timeBtn.removeAttribute("disabled");
    } else {
      timeBtn.setAttribute("disabled","true");
    }
  }

  // Function reckonTime
  function reckonTime() {
    console.log("Reckoning...");
    // var hrsWrkdRnd = Math.
    if(hrsWrkd.value >= 80) {
      console.log("Already over 80");
      msgArea.value = "You have already reached 80 hours.\r\nGo home, relax.";
    } else if(hrsWrkd.value < 0) {
      // This case shouldn't be possible due to validation but test for it anyways
      console.log("We've got a timetraveler over here.");
      msgArea.value="How you worked negative hours?";
    } else if(hrsWrkd.value < 28) {
      // Less than 28, assume user still has multiple days left to work.
      console.log("Less than 28 hours");
      msgArea.value = `You are ${Number(40-hrsWrkd.value).toFixed(2)} hours shy of 40.\r\n\r\nCannot calculate your clock out time, try again later.`;
    } else if(hrsWrkd.value >= 28 && hrsWrkd.value < 40) { 
      // Less than 40, assume user is targeting 40 hours.
      console.log("Assuming this is week one...");
      const cOut = reckonClkOut(Number(40-hrsWrkd.value).toFixed(2));
      msgArea.value = `Assuming this is week one.\r\n\r\nYou will have 40 hours at ${cOut}`;
    } else if(hrsWrkd.value >= 40 && hrsWrkd.value < 68) {
      // Less than 68, assume user still has multiple days left to work.
      console.log("Less than 68 hours.");
      msgArea.value = `You are ${Number(80-hrsWrkd.value).toFixed(2)} hours shy of 80.\r\n\r\nCannot calculate your clock out time, try again later.`;
    } else if(hrsWrkd.value >= 68 && hrsWrkd.value < 80) {
      // Between 40 and 80 hours, assume targeting 80 hours.
      console.log("Assuming this is week two...");  
      const cOut = reckonClkOut(Number(80-hrsWrkd.value).toFixed(2));
      msgArea.value = `Assuming this is week two.\r\n\r\nYou will have 80 hours at ${cOut}`;
    }
  } // End reckonTime

  // Function reckonClkOut
  function reckonClkOut(hours) {
    const cIn = new Date();
    const [h, m] = clckdIn.value.split(":");
    cIn.setHours(h);
    cIn.setMinutes(m);
    const hoursInMilliseconds = hours * 60 * 60 * 1000;
    const cOut = new Date(cIn.valueOf() + hoursInMilliseconds);
    return(humanTime(cOut));
  } // End addTime

  // Function humanTime
  function humanTime(date) {
    const ampm = date.getHours() > 11 ? "PM" : "AM";
    const h = ((date.getHours() + 11) % 12 + 1).toString().padStart(2, 0);
    const m = date.getMinutes().toString().padStart(2, 0);
    return(`${h}:${m} ${ampm}`);
  }

});