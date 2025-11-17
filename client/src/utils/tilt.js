export function enableTilt(element) {
  const strength = 12;

  function onMove(e) {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    const rx = (-y * strength).toFixed(2);
    const ry = (x * strength).toFixed(2);
    element.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  function onLeave() {
    element.style.transform = `none`;
  }

  element.addEventListener("mousemove", onMove);
  element.addEventListener("mouseleave", onLeave);
}
