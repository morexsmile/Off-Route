// Filtros de aventuras
document.addEventListener("DOMContentLoaded", function () {

  const filterGroups = document.querySelectorAll(".filter-group");
  const filterButtons = document.querySelectorAll(".filter-button");
  const levelButtons = document.querySelectorAll(".level-button");
  const adventureCards = document.querySelectorAll(".adventure-card");
  const resultsNumber = document.querySelector(".results-header strong");

  // Información de cada aventura
  const adventures = [
    {
      card: adventureCards[0],
      region: "Europa",
      types: ["Naturaleza", "Road trip", "Noche", "Experiencias únicas"],
      level: 3
    },
    {
      card: adventureCards[1],
      region: "Asia",
      types: ["Cultura", "Experiencias únicas"],
      level: 2
    },
    {
      card: adventureCards[2],
      region: "Europa",
      types: ["Adrenalina", "Agua", "Montaña"],
      level: 4
    },
    {
      card: adventureCards[3],
      region: "África",
      types: ["Cultura", "Noche", "Experiencias únicas"],
      level: 3
    },
    {
      card: adventureCards[4],
      region: "Asia",
      types: ["Adrenalina", "Montaña", "Experiencias únicas"],
      level: 5
    },
    {
      card: adventureCards[5],
      region: "América",
      types: ["Naturaleza", "Agua", "Experiencias únicas"],
      level: 2
    }
  ];

  // Filtros seleccionados

  let selectedRegion = "Todos";
  let selectedType = "Todos";
  let selectedLevel = 5;

  // Identificar a qué filtro pertenece cada botón

  filterGroups.forEach(function (group) {
    const label = group.querySelector(".filter-label");
    if (!label) {
      return;
    }

    const filterName = label.textContent.trim();
    const buttons = group.querySelectorAll(".filter-button");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {

        // Quitar active de los botones del mismo grupo
        buttons.forEach(function (item) {
          item.classList.remove("active");
        });

        // Activar botón pulsado
        button.classList.add("active");
        const value = button.textContent.trim();
        if (filterName === "Destino") {
          selectedRegion = value;
        }

        if (filterName === "Tipo de aventura") {
          selectedType = value;
        }

        applyFilters();
      });
    });
  });

  // Botones de nivel

  levelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      levelButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
      selectedLevel = Number(button.textContent.trim());
      applyFilters();
    });
  });

  // Aplicar filtros
  function applyFilters() {
    let visibleCards = 0;
    adventures.forEach(function (adventure) {

      const matchesRegion =
        selectedRegion === "Todos" ||
        adventure.region === selectedRegion;

      const matchesType =
        selectedType === "Todos" ||
        adventure.types.includes(selectedType);

      const matchesLevel =
        adventure.level <= selectedLevel;

      if (matchesRegion && matchesType && matchesLevel) {
        adventure.card.style.display = "";
        visibleCards++;
      } else {
        adventure.card.style.display = "none";
      }
    });

    // Actualizar número de resultados
    if (resultsNumber) {
      resultsNumber.textContent = visibleCards;
    }
  }

  // Estado inicial
  applyFilters();
});
