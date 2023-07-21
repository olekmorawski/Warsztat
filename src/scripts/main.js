const selectorInputRef = document.querySelector(".select__input");
const selectDropdownRef = document.querySelector(".select__dropdown");
const listItemRefs = document.querySelectorAll(".select__dropdown li");

selectorInputRef.addEventListener("click", () => {
  selectDropdownRef.style.display = "block";
  listItemRefs.forEach((item) => {
    item.addEventListener("click", () => {
      selectDropdownRef.style.display = "none";

      const selectedValue = item.getAttribute("data-value");

      selectorInputRef.textContent =
        selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);

      updateSummary(selectedValue);
    });
  });
});

function updateSummary(selectedPackage) {
  const packageItem = document.querySelector(
    ".list__item[data-id='package'] .item__calc"
  );
  const totalPrice = document.querySelector(".total__price");

  if (selectedPackage === "basic") {
    packageItem.textContent = "Basic";
  } else if (selectedPackage === "professional") {
    packageItem.textContent = "Professional";
  } else if (selectedPackage === "premium") {
    packageItem.textContent = "Premium";
  }
}
