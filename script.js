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
