/**
 * IDC Toggle Module
 * 
 * Manages the visibility toggle for IDC (International Diagnostic Code) elements.
 * Saves user preference to localStorage for persistence across sessions.
 */

export function initIDCToggle() {
  const toggleBtn = document.getElementById("idcToggleBtn");
  const subNavContainer = document.getElementById("subNavContainer");
  const idcToggleTargets = document.querySelectorAll(".idc-toggle-target");

  // Check localStorage for saved state, default to hidden (false)
  const savedState = localStorage.getItem("idcCodesVisible");
  let isVisible = savedState === "true";

  // Apply initial state
  updateIDCVisibility(isVisible);

  // Toggle button click handler
  toggleBtn.addEventListener("click", function () {
    isVisible = !isVisible;
    updateIDCVisibility(isVisible);
    // Save state to localStorage
    localStorage.setItem("idcCodesVisible", isVisible);
    console.log("IDC codes visibility toggled:", isVisible);
  });

  function updateIDCVisibility(visible) {
    if (visible) {
      // Show IDC elements
      subNavContainer.classList.remove("hidden");
      idcToggleTargets.forEach(function (el) {
        el.classList.remove("hidden");
      });
      toggleBtn.classList.add("active");
      toggleBtn.textContent = "Hide IDC Codes";
    } else {
      // Hide IDC elements
      subNavContainer.classList.add("hidden");
      idcToggleTargets.forEach(function (el) {
        el.classList.add("hidden");
      });
      toggleBtn.classList.remove("active");
      toggleBtn.textContent = "Show IDC Codes";
    }
  }
}
