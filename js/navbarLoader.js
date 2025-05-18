// navbar.js
fetch('../pages/navbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('menu-container').innerHTML = data;

    // Esperamos a que el DOM del navbar cargue antes de añadir el listener
    const waitForToggle = () => {
      const toggle = document.getElementById('menu-toggle');
      const menu = document.getElementById('menu');

      if (toggle && menu) {
        toggle.addEventListener('click', () => {
          menu.classList.toggle('show');
        });
      } else {
        // Si no está disponible aún, lo intentamos de nuevo pronto
        setTimeout(waitForToggle, 50);
      }
    };

    waitForToggle();
  });
