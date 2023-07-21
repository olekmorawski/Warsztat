let selectedPackage = "";
let packagePrice = 0;
let accountingPrice = 0;
let terminalPrice = 0;

const selectorInputRef = document.querySelector(".select__input");
const selectDropdownRef = document.querySelector(".select__dropdown");
const listItemRefs = document.querySelectorAll(".select__dropdown li");
const productsInput = document.querySelector(".form__input#products");
const ordersInput = document.querySelector(".form__input#orders");
const packageInput = document.querySelector("#packageValue");
const packageWindow = document.querySelector("#packageWindow");

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

  // Przykład:
  const productsValue = parseInt(productsInput.value) || 0;
  const ordersValue = parseInt(ordersInput.value) || 0;
  const productsPrice = productsValue * 0.5;
  const ordersPrice = ordersValue * 0.25;

  updateSummaryLine("products", `${productsValue} * $0.5`, `$${productsPrice}`);
  updateSummaryLine("orders", `${ordersValue} * $0.25`, `$${ordersPrice}`);

  const totalPriceValue =
    productsPrice +
    ordersPrice +
    packagePrice +
    accountingPrice +
    terminalPrice;
  totalPrice.textContent = `$${totalPriceValue}`;
}

function updateSummaryLine(id, calculation, price) {
  const line = document.querySelector(`.list__item[data-id="${id}"]`);
  line.style.display = "flex";
  line.querySelector(".item__calc").textContent = calculation;
  line.querySelector(".item__price").textContent = price;
}

function hideSummaryLine(id) {
  const line = document.querySelector(`.list__item[data-id="${id}"]`);
  line.style.display = "none";
}

selectorInputRef.addEventListener("click", () => {
  selectDropdownRef.style.display = "block";
  listItemRefs.forEach((item) => {
    item.addEventListener("click", () => {
      selectDropdownRef.style.display = "none";

      const selectedValue = item.getAttribute("data-value");

      selectorInputRef.textContent =
        selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);

      if (selectedPackage === "basic" || selectedPackage === "professional") {
        hidePackageWindow();
        packagePrice = 0;
      } else if (selectedPackage === "premium") {
        showPackageWindow();
        packagePrice = 60;
      }

      updateSummary(selectedValue);
    });
  });
});

productsInput.addEventListener("input", () => {
  const value = parseInt(productsInput.value);
  if (Number.isInteger(value) && value > 0) {
    updateSummary();
  } else {
    hideSummaryLine("products");
  }
});

ordersInput.addEventListener("input", () => {
  const value = parseInt(ordersInput.value);
  if (Number.isInteger(value) && value > 0) {
    updateSummary();
  } else {
    hideSummaryLine("orders");
  }
});

function showPackageWindow() {
  packageWindow.style.display = "block";
}

function hidePackageWindow() {
  packageWindow.style.display = "none";
}

hidePackageWindow();
