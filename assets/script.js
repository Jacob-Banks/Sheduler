const now = moment().hour();
const day = moment().format("dddd, MMMM Do YYYY");
let schedTask = [];

$("#currentDay").text(day);
$(".time-block").each(function (index) {
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

$(".saveBtn").on("click", function () {
  //get id
  let time = $(this).parent().attr("id");

  //get  values from description class
  let value = $(this).siblings(".description").val();

  // save values in local storage
  localStorage.setItem(`${time}`, value);
});

$(".time-block").each(function () {
  let timeId = $(this).attr("id");
  $(this)
    .children("textarea")
    .val(localStorage.getItem(`${timeId}`));
});
