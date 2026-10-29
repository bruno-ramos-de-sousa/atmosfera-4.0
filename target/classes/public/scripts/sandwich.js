const sandwichButton = document.getElementById("sandwich-button");
const sandwichBars = Array.from(sandwichButton.querySelectorAll("span"));
const initialBarPositions = sandwichBars.map(
  (bar) => getComputedStyle(bar).top,
);
const sidebar = document.getElementById("sidebar");

sandwichButton.addEventListener("click", () => {
  const isActive = sandwichButton.classList.toggle("active");
  const centerPosition = `${(sandwichButton.clientHeight - sandwichBars[0].offsetHeight) / 2}px`;

  sandwichBars.forEach((bar, index) => {
    const currentStyle = getComputedStyle(bar);
    const from = {
      top: currentStyle.top,
      transform: currentStyle.transform,
      opacity: currentStyle.opacity,
    };

    bar.getAnimations().forEach((animation) => animation.cancel());

    let to;
    if (index === 1) {
      to = { opacity: isActive ? 0 : 1 };
    } else {
      to = {
        top: isActive ? centerPosition : initialBarPositions[index],
        transform: isActive
          ? `rotate(${index === 0 ? 45 : -45}deg)`
          : "rotate(0deg)",
      };
    }

    bar.animate([from, to], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    });
  });

  sidebar.classList.toggle("sidebar-collapsed", !isActive);
});
