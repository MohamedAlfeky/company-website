let secColor = localStorage.getItem("color-option");

// Start Local Storage
// i don not know why we used if
if (secColor !== null) {
  // get item
  document.documentElement.style.setProperty("--second-color", secColor);
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.color === secColor) {
      e.classList.add("active");
    }
  });
}

//
let backgroundOption = true;

// to hold inteval and put it in
let backgroundInterval;

// if there is random backgrond item in local storage
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
  // Remove all active class from all span
  document.querySelectorAll(".random-background span").forEach((e) => {
    e.classList.remove("active");
  });

  if (backgroundLocalItem === `true`) {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }
}
// End Local Storage

/* start setting box */
let box = document.querySelector(".setting-box");
let gear = document.querySelector(".fa-gear");
gear.onclick = function () {
  this.classList.toggle("fa-spin");
  box.classList.toggle("open");
};
// change colors
let liList = document.querySelectorAll(".colors-list li");
handleActive(liList);
liList.forEach((li) => {
  li.addEventListener("click", function (e) {
    document.body.style.setProperty("--second-color", e.target.dataset.color);
    // set item
    localStorage.setItem("color-option", e.target.dataset.color);
  });
});

// remove active from spans
let randomBackEl = document.querySelectorAll(".random-background span");
handleActive(randomBackEl);
randomBackEl.forEach((span) => {
  span.addEventListener("click", function (e) {
    // yes or No Option
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// start change Background Image Rondmly
let landPg = document.querySelector(".landing-page");

// background imgs array
let imgsArr = ["03.jpg", "04.jpg", "07.jpg", "08.jpg"];

// change the background image
landPg.style.backgroundImage = 'url("/imgs/03.jpg")';

/* get random imaage to put it inside imgsArr[randomNumber]
 let randomNumber = Math.floor(Math.random() * imgsArr.length);*/

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // put it here to make it generate every 5sec becouse if i put it out it will store only one Number
      let randomNumber = Math.floor(Math.random() * imgsArr.length);
      landPg.style.backgroundImage =
        'url("/imgs/' + imgsArr[randomNumber] + '")';
    }, 5000);
  }
}
randomizeImgs();
// end change Background Image Rondmly
/* End setting box */

// Start Our Skills
let skillsSection = document.querySelector(".skills");
let spanProgress = document.querySelectorAll(".skill-prgoress span");
let presentage = document.querySelectorAll(".presentage");

presentage.forEach((e) => {
  e.innerHTML = e.dataset.progress;
});

window.onscroll = function () {
  if (window.scrollY >= skillsSection.offsetTop - 300) {
    spanProgress.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};

// End Our Skills

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay and add class and append it to the body
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create popup Box and add class
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // create alt text
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);

      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    // Create image and append it to the body
    let popupImage = document.createElement("img");
    popupImage.style.maxWidth = "100%";
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // create close tab
    let closebutton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");

    closebutton.className = "close-button";

    closebutton.appendChild(closeButtonText);
    popupBox.appendChild(closebutton);

    // remove function
    closebutton.addEventListener("click", () => {
      overlay.remove();
      popupBox.remove();
    });
    overlay.addEventListener("click", () => {
      overlay.remove();
      popupBox.remove();
    });
  });
});

// Bullets
let allbullets = document.querySelectorAll(".nav-bullets .bullet");
handleActive(allbullets);
// Heading Links
let alllinks = document.querySelectorAll(".links a");
handleActive(alllinks);
// function to scroll to the section for bullets and links
function scrollToSection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      // prevent the behavior of the links
      e.preventDefault();

      // to scroll to the section
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(alllinks);
scrollToSection(allbullets);

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    bulletsSpan.forEach((e) => {
      e.classList.remove("active");
    });
    // add class
    e.target.classList.add("active");

    if (e.target.dataset.display === "block") {
      navBullets.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      navBullets.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }
  });
});

// reset option
document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("background-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("bullets_option");
  // OR
  // localStorage.clear();

  window.location.reload();
};

// Start Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links-container .links");
let landingPage = document.querySelector(".landing-page");

toggleMenu.onclick = function (e) {
  // stop Propagation
  e.stopPropagation();
  // add classes
  this.classList.toggle("toggle-active");
  links.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  // target all documents that is not toggleMenu and links
  if (e.target !== toggleMenu && e.target !== links) {
    // to remove the classes from the menu if its opened
    if (
      links.classList.contains("open") &&
      toggleMenu.classList.contains("toggle-active")
    ) {
      toggleMenu.classList.remove("toggle-active");
      links.classList.remove("open");
    }
  }
});

// stop Propagation on menu
links.onclick = function (e) {
  e.stopPropagation();
};

// End Toggle Menu

// handle active
function handleActive(element) {
  element.forEach((e) => {
    e.addEventListener("click", (e) => {
      element.forEach((e) => {
        e.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}
