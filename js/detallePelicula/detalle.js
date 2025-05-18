
(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    if (!id) {
      console.error("ID de película no especificado en la URL");
      const container = document.getElementById("detalle-pelicula");
      container.innerHTML = "<p>No se encontró la película especificada.</p>";
      return;
    }
  
    fetch("../assets/JSON/peliculas.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los datos");
        }
        return res.json();
      })
      .then((peliculas) => {
        const pelicula = peliculas.find((p) => p.id === id);
        if (!pelicula) {
          const container = document.getElementById("detalle-pelicula");
          container.innerHTML = "<p>No se encontró la película especificada.</p>";
          return;
        }
  
        const container = document.getElementById("detalle-pelicula");
  
        const horariosHtml = (pelicula.horarios || [])
          .map((h) => `<li>${h.fecha}: ${h.horas.join(", ")}</li>`)
          .join("");
  
        const castHtml = (pelicula.elenco || [])
          .map(persona => `<p><strong>${persona.nombre}</strong> / <span class="text-secondary-custom">${persona.rol}</span></p>`)
          .join("");
  
        const producersHtml = (pelicula.productores || [])
          .map(persona => `<p><strong>${persona.nombre}</strong> / <span class="text-secondary-custom">${persona.rol}</span></p>`)
          .join("");
  
        const galeriaHtml = (pelicula.imagenes || [])
          .map(img => `<img src="${img}" alt="Imagen de ${pelicula.nombre}" class="img-thumbnail me-2 mb-2" style="width:150px;height:auto;">`)
          .join("");
  
        container.innerHTML = `
          <div class="row g-4">
            <div class="col-12 col-lg-8">
              <nav class="mb-3">
                <a href="#" class="text-secondary-custom text-decoration-none">Inicio</a>
                <span class="mx-2 text-secondary-custom">></span>
                <span class="text-white">${pelicula.nombre}</span>
              </nav>
  
              <h2>${pelicula.nombre}</h2>
              <div class="mb-3 text-secondary-custom">
                ${pelicula.clasificacion} | ${pelicula.duracion} Horas | ${pelicula.formato} | ${pelicula.subtitulo}
              </div>
  
              <p>${pelicula.sinopsis}</p>
  
              <hr class="border-secondary" />
  
              <p><strong>Fecha de estreno:</strong> ${pelicula.fechaEstreno}</p>
              <p><strong>Título original:</strong> ${pelicula.nombre} Sub</p>
              <p><strong>Género:</strong> ${pelicula.genero}</p>
              <p><strong>Reparto:</strong> ${pelicula.elenco.map(e => e.nombre).join(", ")}</p>
              <p><strong>Director:</strong> ${pelicula.director}</p>
              <p><strong>Producción:</strong> ${pelicula.produccion}</p>
              <p><strong>Restricciones de edad:</strong> ${pelicula.restricciones}</p>
              <p><strong>En exhibición en:</strong> ${pelicula.formato} | ${pelicula.subtitulo}</p>
            </div>
  
           <div class="col-12 col-lg-4 d-flex flex-column align-items-center">
            <img src="${pelicula.imagen}" alt="${pelicula.nombre}" class="img-fluid rounded shadow mb-3" />
            <div class="w-100 d-flex justify-content-center">
              <a href="#" class="btn btn-warning fw-bold px-4">Comprar ahora</a>
            </div>
          </div>
  
  
          <hr class="my-5" />
          <div class="row">
            <div class="col-12 col-md-6">
              <h4>Elenco</h4>
              ${castHtml}
              <br>
              ${producersHtml}
            </div>
            <div class="col-12 col-md-6">
              <h4>Galería</h4>
              <div class="d-flex flex-wrap">${galeriaHtml}</div>
            </div>
          </div>
        `;
  
        const galeriaContainer = document.createElement("div");
        galeriaContainer.classList.add("mt-5");
        galeriaContainer.innerHTML = `
          <h3 class="mb-4">🎬 Otros títulos disponibles</h3>
          <div class="row g-3 flex-nowrap overflow-auto">
            ${peliculas.map(p => `
              <div class="col-8 col-sm-6 col-md-4 col-lg-3 col-xl-2 flex-shrink-0">
                <a href="../pages/detalles.html?id=${p.id}" class="text-decoration-none text-white d-block text-center">
                  <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid rounded mb-2 shadow-sm" style="height: 270px; object-fit: cover;">
                  <p class="mb-0 fw-semibold small">${p.nombre}</p>
                  <small class="text-secondary-custom">${p.duracion} | ${p.clasificacion}</small>
                </a>
              </div>
            `).join("")}
          </div>
        `;
        container.appendChild(galeriaContainer);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        const container = document.getElementById("detalle-pelicula");
        container.innerHTML = "<p>Error al cargar los detalles de la película.</p>";
      });
  })();
  