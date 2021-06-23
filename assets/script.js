const setTargetHour = moment().hour() + 1; //find the next hour
const nextHour = moment().hour(setTargetHour).minute(0).second(0); // save next hour

const day = moment().format("dddd, MMMM Do YYYY"); // get current time
let schedTask = []; //empty array for saved todos
let merideim = ""; //
let time = 9; //start time

$("#currentDay").text(day); //set the date at top of page

// fill time blocks with 9 blocks
for (let i = 0; i < 9; i++) {
  //set 12 hour clock
  if (time > 12) {
    time = 1;
  }
  //set whether am or pm //bad logic but it works for this.
  if (time > 8 && time < 12) {
    meridiem = "AM";
  } else {
    meridiem = "PM";
  }
  //html content for time blocks //set the id to the 24 hour moment hour clock//
  let textBlock = `<div id="${i + 9}" class="row time-block">
                   <div class="col-2 col-md-1 hour para"><p>${time}${meridiem}</p></div>
                   <textarea class="col-8 col-md-10 description"></textarea>
                   <button class="btn saveBtn col-2 col-md-1"><i class="far fa-save fa-2x"></i></button>
                   </div>`;
  $(".container").append(textBlock);
  time++;
}

// add the class that controls task despcription background
const addTimeClass = function () {
  $(".time-block").each(function (index) {
    const now = moment().hour();
    if (now == this.id) {
      $(this).children("textarea").addClass("present");
      $(this).children("textarea").removeClass("past");
      $(this).children("textarea").removeClass("future");
    } else if (now > this.id) {
      $(this).children("textarea").addClass("past");
      $(this).children("textarea").removeClass("present");
      $(this).children("textarea").removeClass("future");
    } else {
      $(this).children("textarea").addClass("future");
      $(this).children("textarea").removeClass("past");
      $(this).children("textarea").removeClass("present");
    }
  });
};

addTimeClass(); // run

// save  tasks description to local storage
$(".saveBtn").on("click", function () {
  //get id
  let time = $(this).parent().attr("id");

  //get  values from description class
  let value = $(this).siblings(".description").val();

  // save values in local storage
  localStorage.setItem(`${time}`, value);
});

// go through time blocks get id // check storage for saved task fill description if theres a value
$(".time-block").each(function () {
  let timeId = $(this).attr("id");
  $(this)
    .children("textarea")
    .val(localStorage.getItem(`${timeId}`));
});

// refresh description every hour
const refreshTaskClass = function () {
  addTimeClass();
  let hour = 60 * (1000 * 60);
  console.log("test");
  setTimeout(refreshTaskClass, hour);
};
// refresh description background once a first new hour has been reached
setTimeout(refreshTaskClass, nextHour.diff(moment()));
