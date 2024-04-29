//scripts.js
const socket = io();

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
  let formData = {
    name: $("#name").val(),
    nickname: $("#nickname").val(),
    picture_url: $("#picture_url").val(),
    description: $("#description").val(),
  };

  console.log("Form Data Submitted: ", formData);

  // Send form data to the server
  $.ajax({
    url: "/api/cats",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (response) {
      console.log(response.message);
      alert("Cat Posted successfully!");
      socket.emit("catPosted", formData);
    },
    error: function (xhr, status, error) {
      console.error("Error sending form data:", error);
      alert("Error saving cat!");
    },
  });
};

const addCards = (items) => {
  console.log("Items received:", items);
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      item.picture_url +
      '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.name +
      '<i class="material-icons right">more_vert</i></span><p><a href="#">' +
      item.nickname +
      "</a></p></div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.name +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.description +
      "</p>" +
      "</div></div></div>";
    $("#card-section").append(itemToAppend);
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();

  $("#formSubmit").click(() => {
    submitForm();
  });

  getProjects();
  $(".modal").modal();
});

const getProjects = () => {
  $.get("/api/cats", (response) => {
    console.log("Received data from server:", response.data);
    addCards(response.data);
  });
};
