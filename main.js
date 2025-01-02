/* New main */
const validTables = [
  "GHS",
  "GEMM",
  "GP",
  "SP",
  "DT",
  "GPA",
  "GTL",
  "GCI",
  "GMM",
];

const categories = {
  GroupMedical: ["GHS", "GEMM", "GP", "SP", "DT"],
  GroupLifeInsurance: ["GTL", "GCI"],
  GroupPersonalAccident: ["GPA"],
};

const benefitsIdMap = {
  GroupMedical: "group-medical",
  GroupLifeInsurance: "group-life",
  GroupPersonalAccident: "personal-accident",
};

// After your initial constants (validTables, categories, etc.)

function addDependentEventListeners() {
  // For dependent checkboxes
  document.querySelectorAll('input[name^="dep-"]').forEach((element) => {
    if (element.type === "checkbox") {
      element.addEventListener("change", handleInputChange);
    }
  });

  // For dependent selects
  document.querySelectorAll('select[name^="dep-"]').forEach((element) => {
    element.addEventListener("change", handleInputChange);
  });

  // For dependent inputs
  document
    .querySelectorAll('input[name^="dep-"]:not([type="checkbox"])')
    .forEach((element) => {
      element.addEventListener("input", handleInputChange);
    });
}

function updateNumberOfGroups(radios) {
  return function () {
    for (const radio of radios) {
      if (radio.checked) {
        numberOfGroups = parseInt(radio.value, 10);
        break;
      }
    }
  };
}

let numberOfGroups = 1;
const groupTriggerRadios = document.getElementsByName("employee-categories");
groupTriggerRadios.forEach((radio) => {
  radio.addEventListener("change", updateNumberOfGroups(groupTriggerRadios));
});

groupTriggerRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    distributeHeadcount(selectedValue);
    updateHeadcounts();
  });
});

let headcounts = {
  overall: 1,
  group1: 0,
  group2: 0,
  group3: 0,
};

const numbers = [1, 2, 3];

function updateHeadcounts() {
  if (numberOfGroups > 1) {
    let overallHeadcount = 0;
    for (const number of numbers) {
      const headcountInput = document.getElementById(`headcount${number}`);
      if (headcountInput && headcountInput.value !== "") {
        const value = parseInt(headcountInput.value, 10);
        if (!isNaN(value)) {
          headcounts[`group${number}`] = value;
          overallHeadcount += value;
        } else {
          headcounts[`group${number}`] = 0;
        }
      }
    }
    headcounts.overall = overallHeadcount;

    const headcountWarning = document.getElementById("headcountWarning");
    const textElement = document.getElementById("headcountText1");
    const warningText = document.getElementById("headcountWarningText");
    const overallDisplayed = parseInt(textElement.textContent, 10);
    if (headcounts.overall > overallDisplayed) {
      for (const number of numbers) {
        const headcountInput = document.getElementById(`headcount${number}`);
        headcountInput.setCustomValidity("Invalid field.");
      }
      warningText.textContent =
        "The total of your employee categories is larger than your total headcount.";
      headcountWarning.style.display = "block";
    } else if (headcounts.overall < overallDisplayed) {
      for (const number of numbers) {
        const headcountInput = document.getElementById(`headcount${number}`);
        headcountInput.setCustomValidity("Invalid field.");
      }
      warningText.textContent =
        "The total of your employee categories is less than your total headcount.";
      headcountWarning.style.display = "block";
    } else {
      for (const number of numbers) {
        const headcountInput = document.getElementById(`headcount${number}`);
        headcountInput.setCustomValidity("");
      }
      headcountWarning.style.display = "none";
    }
  } else {
    const singleGroupHeadcount = document.getElementById("headcount");
    if (singleGroupHeadcount && singleGroupHeadcount.value !== "") {
      const value = parseInt(singleGroupHeadcount.value, 10);
      if (!isNaN(value)) {
        headcounts.overall = value;
        headcounts.group1 = value;
      } else {
        headcounts.overall = 0;
      }
    }
    headcounts.group2 = 0;
    headcounts.group3 = 0;
  }
}

updateHeadcounts();

numbers.forEach((number) => {
  const headcountInput = document.getElementById(`headcount${number}`);
  if (headcountInput) {
    headcountInput.addEventListener("input", updateHeadcounts);
  }
});

const headcountInput = document.getElementById("headcount");
if (headcountInput) {
  headcountInput.addEventListener("input", updateHeadcounts);
}

document.querySelectorAll("input, select").forEach((element) => {
  if (element.type === "checkbox") {
    element.addEventListener("change", handleInputChange);
  } else {
    element.addEventListener(
      element.tagName === "INPUT" ? "input" : "change",
      handleInputChange
    );
  }
});

document.querySelectorAll('input[name^="GHS"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    handleInputChange();
  });
});

function handleInputChange(event) {
  // Calculate all totals
  const totals = calculateTotals();
  const categoryTotals = totals.sumTotal;
  const group1totals = totals.cat1Total;
  const group2totals = totals.cat2Total;
  const group3totals = totals.cat3Total;

  // Update all displays
  updateDisplays(categoryTotals);
  updateGroupDisplays(group1totals, "1");
  updateGroupDisplays(group2totals, "2");
  updateGroupDisplays(group3totals, "3");
  updateOverallTotals(totals);
}


function calculateTotals() {
  const collectiveTotals = {
    sumTotal: {
      GroupMedical: 0,
      GroupLifeInsurance: 0,
      GroupPersonalAccident: 0,
    },
    cat1Total: {
      GroupMedical: 0,
      GroupLifeInsurance: 0,
      GroupPersonalAccident: 0,
    },
    cat2Total: {
      GroupMedical: 0,
      GroupLifeInsurance: 0,
      GroupPersonalAccident: 0,
    },
    cat3Total: {
      GroupMedical: 0,
      GroupLifeInsurance: 0,
      GroupPersonalAccident: 0,
    },
  };

  Object.entries(categories).forEach(([key, category]) => {
    const benefitsSelectedId = benefitsIdMap[key];
    const benefitSelectedCheckbox = document.getElementById(benefitsSelectedId);

    if (!benefitSelectedCheckbox) {
      return;
    }

    const benefitGroupSelected = benefitSelectedCheckbox.checked;

    for (let table of category) {
      const group1Inputs = gatherRelatedGroupInputs(table, "1");
      const group2Inputs = gatherRelatedGroupInputs(table, "2");
      const group3Inputs = gatherRelatedGroupInputs(table, "3");

      let g1check = document.getElementsByName(`${table}1`);
      let g2check = document.getElementsByName(`${table}2`);
      let g3check = document.getElementsByName(`${table}3`);

      let group1Price = 0;
      let group2Price = 0;
      let group3Price = 0;

      if (
        g1check.length > 0 &&
        g1check[0].checked &&
        benefitGroupSelected &&
        numberOfGroups >= 1
      ) {
        group1Price = calculateTablePrice(table, group1Inputs);
      }

      if (
        g2check.length > 0 &&
        g2check[0].checked &&
        benefitGroupSelected &&
        numberOfGroups >= 2
      ) {
        group2Price = calculateTablePrice(table, group2Inputs);
      }

      if (
        g3check.length > 0 &&
        g3check[0].checked &&
        benefitGroupSelected &&
        numberOfGroups === 3
      ) {
        group3Price = calculateTablePrice(table, group3Inputs);
      }

      collectiveTotals["cat1Total"][key] += group1Price || 0;
      collectiveTotals["cat2Total"][key] += group2Price || 0;
      collectiveTotals["cat3Total"][key] += group3Price || 0;

      let sumOfGroups =
        group1Price * headcounts.group1 +
        group2Price * headcounts.group2 +
        group3Price * headcounts.group3;

      collectiveTotals["sumTotal"][key] += sumOfGroups || 0;

      updateDisplay(group1Price, `[data-output-category=${table}1]`);
      updateDisplay(group2Price, `[data-output-category=${table}2]`);
      updateDisplay(group3Price, `[data-output-category=${table}3]`);
    }
  });

  return collectiveTotals;
}

function calculateTablePrice(table, inputs) {
  const pricingTable = window[table];
  if (!Array.isArray(pricingTable)) {
    return null;
  }

  const entry = pricingTable.find((row) => {
    return Object.keys(inputs).every(
      (key) => String(row[key]) === String(inputs[key])
    );
  });

  return entry ? entry.Price : null;
}

function gatherRelatedInputs(table) {
  let inputValues = {};
  const allElements = document.querySelectorAll("input, select");

  const ageInput = document.querySelector(
    'input[name^="age"], select[name^="age"]'
  );
  if (ageInput) {
    inputValues["Age"] = parseInt(ageInput.value, 10);
  }

  allElements.forEach((element) => {
    const { table: inputTable, heading } = parseInputName(element.name);

    if (inputTable === table) {
      inputValues[heading] = element.value;
    }
  });
  return inputValues;
}

function gatherRelatedGroupInputs(table, groupNumber) {
  let inputValues = {};
  const allElements = document.querySelectorAll("input, select");

  const ageInput = document.querySelector(
    'input[name^="age"], select[name^="age"]'
  );
  if (ageInput && table !== "GPA") {
    inputValues["Age"] = parseInt(ageInput.value, 10);
  }

  allElements.forEach((element) => {
    const { group, table: inputTable, heading } = parseInputName(element.name);

    // Include both regular inputs and dependent inputs
    if (
      (inputTable === table && group === groupNumber) ||
      element.name.startsWith(`dep-${groupNumber}-${table}`)
    ) {
      inputValues[heading] = element.value;
    }
  });
  return inputValues;
}

function updateDisplays(totals) {
  for (let category in totals) {
    const sumOfCat = totals[category];
    const avgOfCat = sumOfCat / headcounts.overall;

    updateDisplay(avgOfCat, `[data-output-category="${category}"]`);
    updateDisplay(sumOfCat, `[data-output-category="sum-${category}"]`);
  }
}

function updateGroupDisplays(totals, group) {
  for (let category in totals) {
    updateDisplay(
      totals[category],
      `[data-output-category="${group}-${category}"]`
    );
  }
}

function updateDisplay(price, selector) {
  document.querySelectorAll(selector).forEach((element) => {
    let displayValue;
    if (price === 0 || price === null || price === undefined || isNaN(price)) {
      displayValue = " - Not selected";
    } else {
      try {
        const roundedPrice = Math.round(Number(price));
        displayValue = roundedPrice.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        });
      } catch (error) {
        displayValue = price;
      }
    }
    element.textContent = displayValue;
  });
}

function parseInputName(name) {
  const parts = name.split("-");
  return { group: parts[0], table: parts[1], heading: parts[2] };
}

function updateOverallTotals(finalTotals) {
  let grandTotal = 0;
  for (const key in finalTotals.sumTotal) {
    grandTotal += finalTotals.sumTotal[key];
  }
  let groupDiscount = finalTotals.sumTotal.GroupMedical / 0.95;
  let platformFees = 42 * headcounts.overall;

  const lifestyleTotal = calulateLifestyleBenefits();
  grandTotal += lifestyleTotal;

  updateDisplay(lifestyleTotal, "[data-output-category=lifestyle-total]");
  updateDisplay(grandTotal, "[data-output-category=grand-total]");
  updateDisplay(groupDiscount, "[data-output-category=discount]");
  updateDisplay(platformFees, "[data-output-category=platform-fees]");
}

function calulateLifestyleBenefits() {
  let lifestyleTotal = 0;
  let nauri = document.getElementsByName("Naluri-digital");

  if (nauri && nauri.length > 0 && nauri[0].checked) {
    lifestyleTotal += 53;
  }

  lifestyleTotal = lifestyleTotal * headcounts.overall;

  return lifestyleTotal;
}

function getHeadcount(group) {
  let headcount;
  let headcountInputs;

  if (group) {
    headcountInputs = document.getElementsByName(`headcount${group}`);
  } else {
    headcountInputs = document.getElementsByName("headcount");
  }

  if (headcountInputs.length > 0) {
    headcount = headcountInputs[0].value;
  } else {
    headcount = null;
  }

  return headcount;
}

function handleCheckboxes(radioValue) {
  for (let i = 1; i <= 3; i++) {
    const checkboxes = document.querySelectorAll(
      `[uncheck-these="${i}"] input[type="checkbox"]`
    );

    const shouldBeChecked = i <= radioValue;

    checkboxes.forEach((checkbox) => {
      if (shouldBeChecked && !checkbox.checked) {
        checkbox.previousElementSibling.click();
      } else if (!shouldBeChecked && checkbox.checked) {
        checkbox.previousElementSibling.click();
      }
    });
  }
}

function distributeHeadcount(groups) {
  const totalHeadcount =
    parseInt(document.getElementsByName("headcount")[0].value, 10) || 0;
  const groupNumber = parseInt(groups, 10);
  const groupHeadcount = Math.floor(totalHeadcount / groupNumber);
  const remainder = totalHeadcount % groupNumber;

  for (let i = 1; i <= groupNumber; i++) {
    const loopNumber = i === 1 ? groupHeadcount + remainder : groupHeadcount;
    document.getElementsByName(`headcount${i}`)[0].value = loopNumber;
    document.querySelector(`span[formski-mirror=headcount${i}]`).innerText =
      loopNumber;
  }
}

// Initialize event listeners and default values
document.addEventListener("DOMContentLoaded", function () {
  const basicPlans = [
    "GHS1",
    "GHS2",
    "GHS3",
    "GPA1",
    "GPA2",
    "GPA3",
    "GTL1",
    "GTL2",
    "GTL3",
  ];

  basicPlans.forEach((planId) => {
    const checkbox = document.getElementById(planId);
    if (checkbox && !checkbox.checked) {
      checkbox.checked = true;
      const toggleDiv = checkbox.previousElementSibling;
      if (toggleDiv?.classList.contains("form_checkbox-toggle")) {
        toggleDiv.classList.add("w--redirected-checked");
      }

      const tabInputGroup = checkbox.closest(".tab_input-group");
      if (tabInputGroup) {
        tabInputGroup.classList.remove("disabled-group");
        tabInputGroup.querySelectorAll("select").forEach((select) => {
          select.disabled = false;
        });
      }
    }
  });
  // Add event listeners for dependent fields
  addDependentEventListeners();
});
