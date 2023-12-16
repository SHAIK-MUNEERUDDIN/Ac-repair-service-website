// js to initialize aos library
AOS.init({
  duration: 1200,
});

//javascript to navigate on home section on reload
window.onload = function () {
  window.setTimeout(function () {
    window.scrollTo(0, 0);
  }, 10);
};

const navBar = document.querySelector("nav");
const checkbox = document.getElementById("check");
const sticky = navBar.offsetTop;

// js Function to stick the nav bar starts
function myFunction() {
  if (window.pageYOffset > sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}

// Call myFunction() to initialize the navbar
myFunction();

// Attach the onscroll event to the window
window.onscroll = function () {
  myFunction();
};

// js function to make body overflow hidden when hamburger menu is opened in tablet or mobile view
function checkBoxStatus() {
  document.body.style.overflow = checkbox.checked ? "hidden" : "visible";
}
checkbox.addEventListener("click", checkBoxStatus);

//javascript to make nav link active on click
function clickSingleA(a) {
  items = document.querySelectorAll(".nav-link.active");

  if (items.length) {
    items[0].className = ".nav-link";
    checkbox.checked = false;
  }

  a.className = "nav-link active";

  checkBoxStatus();
}

// js to Highlight active section in navbar on scroll
window.addEventListener("scroll", function () {
  var sections = document.querySelectorAll("section");
  var scrollPosition = window.scrollY + 300; // Adjust the offset as needed

  sections.forEach(function (section) {
    if (scrollPosition >= section.offsetTop) {
      var id = section.id;
      document.querySelectorAll("nav li a").forEach(function (link) {
        link.classList.remove("active");
      });
      document
        .querySelectorAll('nav a[href="#' + id + '"]')
        .forEach(function (link) {
          link.classList.add("active");
        });
    }
  });
});

// js for slide show of testimonial section
("use strict");
var testim = document.getElementById("testim-container"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }
  });
};

//js to display order sumbission message

const orderMessage = document.getElementById("order-Submission-msg");

function orderSubmission() {
  orderMessage.style.display = "flex";
  setTimeout(function () {
    orderMessage.style.display = "none";
  }, 10000);
}

function closeMsg() {
  orderMessage.style.display = "none";
}

//js for submit event listener to the contact form

function contactInfoSubmission() {
  // Validate the form fields
  if (validateForm()) {
    // If validation passes, submit the form to record the Data of the bookings from Contact Form to Google Sheet

    const orderForm = document.forms["order-form"];
    const allInputs = document.querySelectorAll(".order-ip-field");
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyJ42YkSQ_FpkTgmcjyTyi8h7BXK9yAQuN_tH0EboWJfdNntMxEcPf4azfAmt-S64SJrQ/exec";

    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(scriptURL, {
        method: "POST",
        body: new FormData(orderForm),
        mode: "no-cors",
      })
        .then((response) => orderSubmission())
        .catch((error) =>
          alert("Unable to Submit the order, Please try again !")
        );
      allInputs.forEach((input) => {
        input.value = "";
      });
    });
  } else {
    event.preventDefault();
  }
}

//js to validate the contact form
function validateForm() {
  // Get form elements
  var nameInput = document.forms["order-form"]["name"];
  var emailInput = document.forms["order-form"]["email"];
  var phoneInput = document.forms["order-form"]["phone"];
  var servicesInput = document.forms["order-form"]["services"];
  var messageInput = document.forms["order-form"]["message"];

  // Validate Name
  if (nameInput.value.trim() === "") {
    alert("Please enter your name.");
    nameInput.focus();
    return false;
  }

  // Validate Email
  var email = emailInput.value.trim();
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    emailInput.focus();
    return false;
  }

  // Validate Phone
  if (phoneInput.value === "" || phoneInput.value.length !== 10) {
    alert("Please enter a valid phone number.");
    phoneInput.focus();
    return false;
  }

  // Validate Services
  if (servicesInput.value === "") {
    alert("Please select a service.");
    servicesInput.focus();
    return false;
  }

  // Validate Message
  if (messageInput.value.trim() === "") {
    alert("Please enter your message.");
    messageInput.focus();
    return false;
  }

  // If all validations pass, return true
  return true;
}
