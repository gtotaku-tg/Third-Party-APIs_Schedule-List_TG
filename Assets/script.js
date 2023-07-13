// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(document).ready(function () {});

// Set variables to get the current date and time and display it in the header
var currentDayEl = $("#currentDay");
function displayDate() {
  var currentDate = dayjs().format("dddd, MMMM D, YYYY， HH:mm:ss a");
  currentDayEl.text(currentDate);
}
// displayDate function is called
displayDate();
// Set interval to update the current date and time every second
setInterval(displayDate, 1000);

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentHour = dayjs().hour();
  console.log("currentHour", currentHour);
  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    console.log("hour", hour);
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
  $("#clearBtn").on("click", function () {
    localStorage.clear();
    location.reload();
  });

  $(".saveBtn").on("click", function () {
    var time = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val();
    localStorage.setItem(time, text);
  });
  for (var i = 9; i < 18; i++) {
    $("#hour-" + i + " .description").val(localStorage.getItem("hour-" + i));
  }
});
