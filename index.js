document.addEventListener("DOMContentLoaded", () => {
//   scroll  
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";

  /* hellpers */
  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const qs = (sel, parent = document) => parent.querySelector(sel);
  const qsa = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

//   peliculas 
  const MOVIES = {
    "jurassic park": {
      desc: "Un parque con dinosaurios clonados se convierte en una pesadilla cuando la seguridad falla.",
      year: "1993",
      duration: "2h 7m",
      age: "+13",
      rating: "4.8",
      tags: ["Aventura", "Ciencia ficción", "Acción"],
      trailer: "https://www.youtube.com/watch?v=QWBKEmWWL38",
    },
    "rapido y furioso 5": {
      desc: "Dom y Brian planean un gran golpe en Río mientras un agente implacable los persigue.",
      year: "2011",
      duration: "2h 10m",
      age: "+13",
      rating: "4.6",
      tags: ["Acción", "Crimen", "Suspenso"],
      trailer: "https://www.youtube.com/watch?v=mw2AqdB5EVA",
    },
    transformers: {
      desc: "La guerra entre Autobots y Decepticons llega a la Tierra y cambia el destino de la humanidad.",
      year: "2007",
      duration: "2h 24m",
      age: "+13",
      rating: "4.4",
      tags: ["Acción", "Ciencia ficción", "Aventura"],
      trailer: "https://www.youtube.com/watch?v=dxQxgAfNzyE",
    },
    avatar: {
      desc: "En Pandora, un ex-marine conecta con un avatar y descubre un mundo que vale la pena defender.",
      year: "2009",
      duration: "2h 42m",
      age: "+13",
      rating: "4.7",
      tags: ["Aventura", "Ciencia ficción", "Drama"],
      trailer: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
    },
    "el rey leon": {
      desc: "Simba huye tras una tragedia, pero debe volver para reclamar su lugar en el ciclo de la vida.",
      year: "1994",
      duration: "1h 28m",
      age: "ATP",
      rating: "4.9",
      tags: ["Animación", "Aventura", "Drama"],
      trailer: "https://www.youtube.com/watch?v=4CbLXeGSDxg",
    },
    "la monja": {
      desc: "Una entidad demoníaca atormenta un convento. Un sacerdote investiga el origen del horror.",
      year: "2018",
      duration: "1h 36m",
      age: "+16",
      rating: "4.1",
      tags: ["Terror", "Misterio", "Suspenso"],
      trailer: "https://www.youtube.com/watch?v=zwAM5UnGd2s",
    },
    "la mascara": {
      desc: "Un hombre tímido encuentra una máscara mágica que libera su lado más caótico y divertido.",
      year: "1994",
      duration: "1h 41m",
      age: "+13",
      rating: "4.5",
      tags: ["Comedia", "Fantasía", "Acción"],
      trailer: "https://www.youtube.com/watch?v=hOqVRwGVUkA",
    },
    "que paso ayer": {
      desc: "Despiertan sin recuerdos y con un caos total: deben reconstruir la noche para encontrar al novio.",
      year: "2009",
      duration: "1h 40m",
      age: "+16",
      rating: "4.3",
      tags: ["Comedia", "Aventura"],
      trailer: "https://www.youtube.com/watch?v=tcdUhdOlz9M",
    },
    spiderman: {
      desc: "Peter Parker obtiene poderes y aprende que ser héroe también implica grandes sacrificios.",
      year: "2002",
      duration: "2h 1m",
      age: "+13",
      rating: "4.6",
      tags: ["Acción", "Aventura", "Superhéroes"],
      trailer: "https://www.youtube.com/watch?v=t06RUxPbp_c",
    },
    "el conjuro": {
      desc: "Los Warren ayudan a una familia aterrorizada por una presencia oscura en su casa.",
      year: "2013",
      duration: "1h 52m",
      age: "+16",
      rating: "4.7",
      tags: ["Terror", "Misterio", "Suspenso"],
      trailer: "https://www.youtube.com/watch?v=k10ETZ41q5o",
    },
    "vaya vacaciones": {
      desc: "Unas vacaciones familiares se vuelven un desastre divertido lleno de situaciones inesperadas.",
      year: "2023",
      duration: "1h 38m",
      age: "ATP",
      rating: "4.0",
      tags: ["Comedia", "Familiar"],
      trailer: "https://www.youtube.com/results?search_query=vaya+vacaciones+trailer",
    },
    batman: {
      desc: "Batman enfrenta una amenaza que pone a Gotham contra las cuerdas mientras prueba sus límites.",
      year: "2008",
      duration: "2h 32m",
      age: "+13",
      rating: "4.9",
      tags: ["Acción", "Crimen", "Drama"],
      trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    },
    deadpool: {
      desc: "Un antihéroe irreverente busca venganza con humor negro y acción sin reglas.",
      year: "2016",
      duration: "1h 48m",
      age: "+16",
      rating: "4.6",
      tags: ["Acción", "Comedia", "Superhéroes"],
      trailer: "https://www.youtube.com/watch?v=ONHBaC-pfsk",
    },
    "cazando fastama": {
      desc: "Un grupo enfrenta sucesos paranormales y se mete en una misión peligrosa para capturar entidades.",
      year: "—",
      duration: "—",
      age: "+13",
      rating: "4.0",
      tags: ["Terror", "Comedia"],
      trailer: "https://www.youtube.com/results?search_query=cazando+fantasmas+trailer",
    },
  };

  function getMovieDataByTitle(title) {
    const key = normalize(title);
    const data = MOVIES[key] || {};
    return {
      key,
      title,
      desc: data.desc || "Sin descripción todavía.",
      year: data.year || "—",
      duration: data.duration || "—",
      age: data.age || "—",
      rating: data.rating || "—",
      tags: Array.isArray(data.tags) ? data.tags : ["—"],
      trailer:
        data.trailer ||
        `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} trailer`)}`,
    };
  }

  /* galerias */
  const galleryImgsAuto = qsa(".contenedorGrid img");
  galleryImgsAuto.forEach((img) => img.classList.add("galeria-img"));

  const galeriaImgs = qsa(".galeria-img");

  if (galeriaImgs.length > 0) {
    let currentIndex = 0;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox__content" role="dialog" aria-modal="true" aria-label="Vista ampliada">
        <button class="lightbox__close" aria-label="Cerrar">✕</button>
        <button class="lightbox__nav lightbox__prev" aria-label="Anterior">‹</button>
        <img class="lightbox__img" alt="">
        <button class="lightbox__nav lightbox__next" aria-label="Siguiente">›</button>
      </div>
    `;
    document.body.appendChild(lightbox);

    const lbImg = qs(".lightbox__img", lightbox);
    const lbClose = qs(".lightbox__close", lightbox);
    const lbPrev = qs(".lightbox__prev", lightbox);
    const lbNext = qs(".lightbox__next", lightbox);

    function openLightbox(index) {
      currentIndex = index;
      const img = galeriaImgs[currentIndex];
      lbImg.src = img.src;
      lbImg.alt = img.alt || "Imagen ampliada";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lbImg.src = "";
    }

    function next() {
      openLightbox((currentIndex + 1) % galeriaImgs.length);
    }

    function prev() {
      openLightbox((currentIndex - 1 + galeriaImgs.length) % galeriaImgs.length);
    }

    galeriaImgs.forEach((img, i) => img.addEventListener("click", () => openLightbox(i)));
    lbClose.addEventListener("click", closeLightbox);
    lbNext.addEventListener("click", next);
    lbPrev.addEventListener("click", prev);

//    click fuera del contenido para cerrar
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  }

  /* buscador de peliculas */
  const peliculasSection = qs("#peliculas");
  if (!peliculasSection) return;

  const buscadorInput = qs("form input", peliculasSection);
  const cards = qsa(".contenedorPelis article", peliculasSection);

  // Mensaje "no results"
  const noResults = document.createElement("p");
  noResults.textContent = "No se encontraron películas 😕";
  noResults.style.marginTop = "18px";
  noResults.style.opacity = "0.85";
  noResults.style.display = "none";
  peliculasSection.appendChild(noResults);

  // Favoritos (localStorage)
  const LS_KEY = "rollingpelis_favs";
  const loadFavs = () => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const saveFavs = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));
  let favs = loadFavs();

  let onlyFavs = false;

  // Filtros (búsqueda + solo favs)
  function applyFilters() {
    const q = normalize(buscadorInput?.value || "");
    let visibleCount = 0;

    cards.forEach((card) => {
      const title = normalize(card.dataset.title || qs("p", card)?.textContent);
      const key = normalize(card.dataset.title || "");
      const isFav = favs.includes(key);

      const matchSearch = title.includes(q);
      const matchFav = onlyFavs ? isFav : true;

      const show = matchSearch && matchFav;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Guardar data en las cards + botón fav + dataset.desc/meta
  cards.forEach((card) => {
    const titleEl = qs("p", card);
    const imgEl = qs("img", card);

    const title = titleEl ? titleEl.textContent.trim() : "Película";
    const data = getMovieDataByTitle(title);

    card.dataset.title = data.title;
    card.dataset.img = imgEl ? imgEl.src : "";
    card.dataset.desc = data.desc;
    card.dataset.year = data.year;
    card.dataset.duration = data.duration;
    card.dataset.age = data.age;
    card.dataset.rating = data.rating;
    card.dataset.tags = JSON.stringify(data.tags);
    card.dataset.trailer = data.trailer;

    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.className = "favBtn";
    favBtn.setAttribute("aria-label", "Agregar a favoritos");
    favBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    if (favs.includes(data.key)) favBtn.classList.add("is-fav");

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isFav = favBtn.classList.toggle("is-fav");

      if (isFav) {
        if (!favs.includes(data.key)) favs.push(data.key);
      } else {
        favs = favs.filter((x) => x !== data.key);
      }

      saveFavs(favs);
      applyFilters();
    });

    card.appendChild(favBtn);
  });

  /* barra de solo favs + limpiar búsqueda */
  const form = qs("form", peliculasSection);
  const favBar = document.createElement("div");
  favBar.className = "favBar";
  favBar.innerHTML = `
    <button type="button" class="favToggle" aria-pressed="false">
      <i class="fa-solid fa-heart"></i>
      <span>Mostrar solo favoritos</span>
    </button>
    <button type="button" class="clearSearch" title="Limpiar búsqueda" aria-label="Limpiar búsqueda">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;
  if (form) form.insertAdjacentElement("afterend", favBar);

  const favToggle = qs(".favToggle", favBar);
  const clearSearch = qs(".clearSearch", favBar);

  /* modal de película */
  const modal = document.createElement("div");
  modal.className = "movieModal";
  modal.innerHTML = `
    <div class="movieModal__overlay" aria-hidden="true"></div>

    <div class="movieModal__content" role="dialog" aria-modal="true" aria-label="Detalle de película" tabindex="-1">
      <button class="movieModal__close" aria-label="Cerrar">✕</button>

      <div class="movieModal__media">
        <img class="movieModal__img" alt="">
        <span class="movieModal__badge">HD</span>
      </div>

      <div class="movieModal__info">
        <div class="movieModal__top">
          <h3 class="movieModal__title"></h3>

          <button type="button" class="movieModal__fav" aria-label="Agregar a favoritos">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>

        <div class="movieModal__meta">
          <span class="movieModal__rating"><i class="fa-solid fa-star"></i> <b class="movieModal__ratingValue"></b></span>
          <span class="movieModal__year"></span>
          <span class="movieModal__duration"></span>
          <span class="movieModal__age"></span>
        </div>

        <div class="movieModal__tags"></div>

        <p class="movieModal__desc"></p>

        <div class="movieModal__actions">
          <button type="button" class="movieModal__btn movieModal__btn--primary">
            <i class="fa-solid fa-play"></i> Ver trailer
          </button>
          <button type="button" class="movieModal__btn movieModal__btn--share">
            <i class="fa-solid fa-share-nodes"></i> Compartir
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = qs(".movieModal__img", modal);
  const modalTitle = qs(".movieModal__title", modal);
  const modalClose = qs(".movieModal__close", modal);
  const modalOverlay = qs(".movieModal__overlay", modal);
  const favBtnModal = qs(".movieModal__fav", modal);

  const ratingValueEl = qs(".movieModal__ratingValue", modal);
  const yearEl = qs(".movieModal__year", modal);
  const durationEl = qs(".movieModal__duration", modal);
  const ageEl = qs(".movieModal__age", modal);
  const tagsWrap = qs(".movieModal__tags", modal);
  const descEl = qs(".movieModal__desc", modal);

  const trailerBtn = qs(".movieModal__btn--primary", modal);
  const shareBtn = qs(".movieModal__btn--share", modal);

  let lastOpenedCard = null;

  function setTags(tags) {
    tagsWrap.innerHTML = "";
    (tags || []).forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagsWrap.appendChild(span);
    });
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  function openMovieModal(card) {
    lastOpenedCard = card;

    const title = card.dataset.title || "Película";
    const img = card.dataset.img || "";
    const key = normalize(title);

    modalTitle.textContent = title;
    modalImg.src = img;
    modalImg.alt = title;

    // Descripción REAL
    descEl.textContent = card.dataset.desc || "Sin descripción todavía.";

    // Meta REAL
    ratingValueEl.textContent = card.dataset.rating || "—";
    yearEl.textContent = card.dataset.year ? `📅 ${card.dataset.year}` : "📅 —";
    durationEl.textContent = card.dataset.duration ? `⏱ ${card.dataset.duration}` : "⏱ —";
    ageEl.textContent = card.dataset.age ? `🔞 ${card.dataset.age}` : "🔞 —";

    // Tags reales
    let tags = [];
    try {
      tags = JSON.parse(card.dataset.tags || "[]");
    } catch {
      tags = [];
    }
    setTags(tags.length ? tags : ["—"]);

    // Trailer
    const trailerUrl =
      card.dataset.trailer ||
      `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} trailer`)}`;

    trailerBtn.onclick = () => {
      window.open(trailerUrl, "_blank", "noopener,noreferrer");
    };

    // Compartir (copia link del trailer)
    shareBtn.onclick = async () => {
      const ok = await copyToClipboard(trailerUrl);
      if (ok) {
        shareBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copiado`;
        setTimeout(() => {
          shareBtn.innerHTML = `<i class="fa-solid fa-share-nodes"></i> Compartir`;
        }, 1200);
      } else {
        window.open(trailerUrl, "_blank", "noopener,noreferrer");
      }
    };

    // Estado fav en modal
    favBtnModal.classList.toggle("is-fav", favs.includes(key));

    favBtnModal.onclick = () => {
      const isFav = favBtnModal.classList.toggle("is-fav");

      if (isFav) {
        if (!favs.includes(key)) favs.push(key);
      } else {
        favs = favs.filter((x) => x !== key);
      }

      saveFavs(favs);

      // sincroniza el botón de la card
      const cardFavBtn = qs(".favBtn", card);
      if (cardFavBtn) cardFavBtn.classList.toggle("is-fav", isFav);

      applyFilters();
    };

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    qs(".movieModal__content", modal)?.focus();
  }

  function closeMovieModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    modalImg.src = "";
    lastOpenedCard = null;
  }

  // abrir modal al click en card
  cards.forEach((card) => card.addEventListener("click", () => openMovieModal(card)));

  // cerrar modal
  modalClose.addEventListener("click", closeMovieModal);
  modalOverlay.addEventListener("click", closeMovieModal);
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeMovieModal();
  });

  /* buscador + favs */
  if (buscadorInput) buscadorInput.addEventListener("input", applyFilters);

  favToggle.addEventListener("click", () => {
    onlyFavs = !onlyFavs;
    favToggle.classList.toggle("is-on", onlyFavs);
    favToggle.setAttribute("aria-pressed", String(onlyFavs));
    qs("span", favToggle).textContent = onlyFavs ? "Mostrando favoritos" : "Mostrar solo favoritos";
    applyFilters();
  });

  clearSearch.addEventListener("click", () => {
    if (buscadorInput) buscadorInput.value = "";
    onlyFavs = false;
    favToggle.classList.remove("is-on");
    favToggle.setAttribute("aria-pressed", "false");
    qs("span", favToggle).textContent = "Mostrar solo favoritos";
    applyFilters();
  });

  // estado inicial
  applyFilters();
});