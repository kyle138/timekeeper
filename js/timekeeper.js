document.addEventListener("DOMContentLoaded", () => {

  // Get the elements
  const hrsWrkd = document.getElementById("inputHoursWorked");
  const clckdIn = document.getElementById("inputClockedIn");
  const timeBtn = document.getElementById("reckonTime");

  // Initialize
  var fieldsValid = {
    hrsWrkd: 0,
    clckdIn: 0
  };

  // Intercept password button clicks
  timeBtn.addEventListener("click", () => {
    console.log("cleeeek");
    if(fieldsAreValid()) reckonTime();
  });

  // Intercept 'ENTER' key in fields
  hrsWrkd.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
      if(fieldsAreValid()) {
        reckonTime();
      } 
    } else {
      validator();
    }
  });
  clckdIn.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
      if(fieldsAreValid()) {
        reckonTime();
      }
    } else {
      validator();
    }
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
        console.log(typeof(hrsWrkd.value)); // DEUBG
        hrsWrkd.classList.remove("is-invalid");
        hrsWrkd.classList.add("is-valid");
        fieldsValid.hrsWrkd = 1;
        enableButton();
        console.log(`fieldsValid: ${JSON.stringify(fieldsValid,null,2)}`); // DEBUG
      } else {
        // field has some value but it is NOT a number
        console.log(typeof(hrsWrkd.value)); // DEBUG
        hrsWrkd.classList.remove("is-valid");
        hrsWrkd.classList.add("is-invalid");
        fieldsValid.hrsWrkd = 0;
        enableButton();
        console.log(`fieldsValid: ${JSON.stringify(fieldsValid,null,2)}`); // DEBUG
      }
    } // End if/else hrsWrkd
    
    // clckdIn should be a time value
    // if the field is empty remove both validation classes
    if(clckdIn.value === '') {
      console.log("time is empty");
      clckdIn.classList.remove("is-valid");
      clckdIn.classList.remove("is-invalid");
      fieldsValid.clckdIn = 0;
      enableButton();
    } else {
      // field has some value but is it a time?
      if(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(clckdIn.value)) {
        console.log(clckdIn.value); // DEBUG
        clckdIn.classList.remove("is-invalid");
        clckdIn.classList.add("is-valid");
        fieldsValid.clckdIn = 1;
        enableButton();
        console.log(`fieldsValid: ${JSON.stringify(fieldsValid,null,2)}`); // DEBUG
      } else {
        // field has some value but it is not a time
        clckdIn.classList.remove("is-valid");
        clckdIn.classList.add("is-invalid");
        fieldsValid.clckdIn = 0;
        enableButton();
        console.log(`fieldsValid: ${JSON.stringify(fieldsValid,null,2)}`); // DEBUG
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
    if(hrsWrkd.value > 80) {
      console.log("Already over 80");
    } else {
      // ********************* do something here
      console.log("something about missing fields");
    }
  } // End reckonTime

});