// locomotive smooth scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

const elementContainer = document.querySelector("#elem-container");
const fixedImageContainer = document.querySelector("#fixed-image");

// Create a single video element outside the loop
const fixedVideo = document.createElement("video");
fixedVideo.loop = true;
fixedVideo.muted = true;
fixedVideo.autoplay = true;
fixedVideo.style.width = "100%";
fixedVideo.style.height = "100%";
fixedVideo.style.objectFit = "cover";

// Event listener for mouseenter on elementContainer
elementContainer.addEventListener("mouseenter", () => {
  fixedImageContainer.style.display = "block";
  fixedVideo.currentTime = 0; // Reset video playback on each enter
});

// Event listener for mouseleave on elementContainer
elementContainer.addEventListener("mouseleave", () => {
  fixedImageContainer.style.display = "none";
  fixedImageContainer.removeChild(fixedVideo); // Remove the video element on leave
});

let allElements = document.querySelectorAll(".elem");
allElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (element.hasAttribute("data-image")) {
      let image = element.getAttribute("data-image");
      fixedImageContainer.style.backgroundImage = `url(${image})`;
      fixedImageContainer.removeChild(fixedVideo); // Remove video if image is present
    } else if (element.hasAttribute("data-video")) {
      let video = element.getAttribute("data-video");
      fixedImageContainer.style.backgroundImage = "none"; // Remove background image for video
      fixedVideo.src = video;
      fixedImageContainer.appendChild(fixedVideo);
      fixedVideo.play(); // Play the video
    }
  });
});
