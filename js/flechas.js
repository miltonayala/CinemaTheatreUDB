function scrollScrollContainer(direction) {
  const container = document.getElementById("scrollContainer");
  const scrollAmount = 300; // píxeles a mover

  if (container) {
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  }
}