document.addEventListener("loadedScreen", () => {
  const expandButton = document.getElementById("expand-button");
  const sandwichButton = document.getElementById("sandwich-button");
  const sidebar = document.getElementById("sidebar");
  const header = document.getElementById("page-header");

  expandButton.addEventListener("click", () => {
    const sidebarIsCollapsed = !sandwichButton.classList.contains("active");
    const headerIsCollapsed = header.classList.contains("header-collapsed");

    if (sidebarIsCollapsed && !headerIsCollapsed) {
      header.classList.add("header-collapsed");
      expandButton.classList.add("active");
    }

    if (headerIsCollapsed) {
      header.classList.remove("header-collapsed");
    }

    if (!sidebarIsCollapsed && !headerIsCollapsed) {
      header.classList.add("header-collapsed");
      sidebar.classList.add("sidebar-collapsed");
    }

    if (!sidebarIsCollapsed && headerIsCollapsed) {
      header.classList.remove("header-collapsed");
      sidebar.classList.remove("sidebar-collapsed");
    }
  });
});
