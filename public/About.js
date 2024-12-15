// Animate the navigation bar on page load
gsap.from("#nav", { y: -100, duration: 1, opacity: 0 });

// Animate the "About Us" header
gsap.from("h4", { x: -200, duration: 1, opacity: 0, delay: 0.5 });

// Animate the description box
gsap.from("#description-box", { y: 100, duration: 1, opacity: 0, delay: 1 });

// Animate the creator boxes
gsap.from(".box", {
  scale: 0,
  duration: 1,
  opacity: 0,
  delay: 1.5,
  stagger: 0.3, // Animates each box with a slight delay
});