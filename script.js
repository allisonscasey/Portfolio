const year = document.querySelector("#year");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

if (year) {
  year.textContent = new Date().getFullYear();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));

    projectCards.forEach((card) => {
      // Split space-separated tags (e.g. "mechanical electrical")
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);

      card.classList.toggle("is-hidden", !shouldShow);

      // Swap card content view if a discipline-specific view exists
      if (shouldShow) {
        const views = card.querySelectorAll(".card-view");
        if (views.length > 0) {
          const hasMatchingView = card.querySelector(`.card-view[data-view="${filter}"]`);
          const activeView = hasMatchingView ? filter : "all";

          views.forEach((view) => {
            view.hidden = view.dataset.view !== activeView;
          });
        }
      }
    });
  });
});
