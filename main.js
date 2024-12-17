// Define valid tables and categories
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
// Define valid tables and categories
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

function updateNumberOfGroups(radios) {
  return function () {
    for (const radio of radios) {
      if (radio.checked) {
        numberOfGroups = parseInt(radio.value, 10);
        break;
      }
    }
    //console.log("NUMBER OF GROUPS", numberOfGroups);
  };
}

/**
 * PB: Move all declarations to the top of the file
 * followed by the function call in a flow
 */

let numberOfGroups = 1;
const groupTriggerRadios = document.getElementsByName("employee-categories");
groupTriggerRadios.forEach((radio) => {
  radio.addEventListener("change", updateNumberOfGroups(groupTriggerRadios));
});

// Listen for changes to the 'employee-categories' radio buttons
groupTriggerRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    // Get the selected value
    const selectedValue = event.target.value;

    // Distribute the headcount based on the selected value
    distributeHeadcount(selectedValue);

    // Check or uncheck checkboxes based on the selected value
    //handleCheckboxes(selectedValue);

    // Update headcounts after distributing the headcount
    updateHeadcounts();
  });
});

let headcounts = {
  overall: 1,
  group1: 0,
  group2: 0,
  group3: 0,
};

/**
 * PB: number is more generic and is used as a constant below
 * so, would recommend declaring it as "const NUMBER_OF_WHAT=3"
 * instead of using `for (const number of numbers) {...}`
 * you can do `for (let i=0; i<= NUMBER_OF_WHAT, i++){...}`
 */

// For the headcount inputs
const numbers = [1, 2, 3];

/**
 * the following piece of code is repeating multiple times in updateHeadcounts()
 * 
 * for (const number of numbers) {
        const headcountInput = document.getElementById(`headcount${number}`);
        headcountInput.setCustomValidity("Invalid field.");
      }
      warningText.textContent =
        "The total of your employee categories is less than your total headcount.";
      headcountWarning.style.display = "block";

 * it can be extracted into a tiny function with variables
 * function doWhatever(valididty, textContent, display) {...} 
 */

function updateHeadcounts() {
  if (numberOfGroups > 1) {
    let overallHeadcount = 0;
    for (const number of numbers) {
      // PB: Move this element getter as a tiny function as it's used in many other places
      const headcountInput = document.getElementById(`headcount${number}`);
      if (headcountInput && headcountInput.value !== "") {
        const value = parseInt(headcountInput.value, 10);
        if (!isNaN(value)) {
          headcounts[`group${number}`] = value;
          overallHeadcount += value;
        } else {
          headcounts[`group${number}`] = 0; // or some default value
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

    // console.log("headcounts", headcounts);
  } else {
    const singleGroupHeadcount = document.getElementById("headcount");
    if (singleGroupHeadcount && singleGroupHeadcount.value !== "") {
      const value = parseInt(singleGroupHeadcount.value, 10);
      if (!isNaN(value)) {
        headcounts.overall = value;
        headcounts.group1 = value;
      } else {
        headcounts.overall = 0; // or some default value
      }
    }
    headcounts.group2 = 0;
    headcounts.group3 = 0;

    //console.log("headcounts", headcounts);
  }
}

updateHeadcounts();

numbers.forEach((number) => {
  const headcountInput = document.getElementById(`headcount${number}`);
  if (headcountInput) {
    headcountInput.addEventListener("input", updateHeadcounts);
  }
});

// For the element with the ID "headcount"
const headcountInput = document.getElementById("headcount");
if (headcountInput) {
  headcountInput.addEventListener("input", updateHeadcounts);
}

// Add event listeners to all input fields
// Add event listeners to all input fields
document.querySelectorAll("input, select").forEach((element) => {
  if (element.type === "checkbox") {
    element.addEventListener("change", handleInputChange);
  } else {
    element.addEventListener(
      element.tagName === "INPUT" ? "input" : "change",
      handleInputChange
    );
  }

  // Debug
  if (element.name && element.name.includes("GHS")) {
    console.log("Added listener to:", element.name);
  }
});

// Ajouter spécifiquement pour les checkboxes GHS
document.querySelectorAll('input[name^="GHS"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    console.log("GHS checkbox changed:", checkbox.name, checkbox.checked);
    handleInputChange();
  });
});

function handleInputChange(event) {
  console.log(
    "🔄 Input change detected:",
    event?.target?.name || "Unknown input"
  );

  const totals = calculateTotals();
  console.log("📊 Calculated totals:", totals);

  const categoryTotals = totals.sumTotal;
  const group1totals = totals.cat1Total;
  const group2totals = totals.cat2Total;
  const group3totals = totals.cat3Total;

  updateDisplays(categoryTotals);
  updateGroupDisplays(group1totals, "1");
  updateGroupDisplays(group2totals, "2");
  updateGroupDisplays(group3totals, "3");
  updateOverallTotals(totals);
}

function calculateTotals() {
  console.log("🧮 Starting calculations...");

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
    console.log(`📌 Processing category: ${key}`);

    const benefitsSelectedId = benefitsIdMap[key];
    const benefitSelectedCheckbox = document.getElementById(benefitsSelectedId);

    if (!benefitSelectedCheckbox) {
      console.error(`❌ Benefit checkbox not found for ${benefitsSelectedId}`);
      return;
    }

    const benefitGroupSelected = benefitSelectedCheckbox.checked;
    console.log(
      `✓ Benefit ${benefitsSelectedId} selected: ${benefitGroupSelected}`
    );

    for (let table of category) {
      console.log(`📋 Processing table: ${table}`);

      const group1Inputs = gatherRelatedGroupInputs(table, "1");
      const group2Inputs = gatherRelatedGroupInputs(table, "2");
      const group3Inputs = gatherRelatedGroupInputs(table, "3");

      console.log("📥 Gathered inputs:", {
        group1: group1Inputs,
        group2: group2Inputs,
        group3: group3Inputs,
      });

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
        if (group1Price === null) {
          console.error(
            `❌ No price found for ${table} group 1 with inputs:`,
            group1Inputs
          );
        } else {
          console.log(`💰 Group 1 ${table} price:`, group1Price);
        }
      }

      if (
        g2check.length > 0 &&
        g2check[0].checked &&
        benefitGroupSelected &&
        numberOfGroups >= 2
      ) {
        group2Price = calculateTablePrice(table, group2Inputs);
        if (group2Price === null) {
          console.error(
            `❌ No price found for ${table} group 2 with inputs:`,
            group2Inputs
          );
        } else {
          console.log(`💰 Group 2 ${table} price:`, group2Price);
        }
      }

      if (
        g3check.length > 0 &&
        g3check[0].checked &&
        benefitGroupSelected &&
        numberOfGroups === 3
      ) {
        group3Price = calculateTablePrice(table, group3Inputs);
        if (group3Price === null) {
          console.error(
            `❌ No price found for ${table} group 3 with inputs:`,
            group3Inputs
          );
        } else {
          console.log(`💰 Group 3 ${table} price:`, group3Price);
        }
      }

      collectiveTotals["cat1Total"][key] += group1Price || 0;
      collectiveTotals["cat2Total"][key] += group2Price || 0;
      collectiveTotals["cat3Total"][key] += group3Price || 0;

      let sumOfGroups =
        group1Price * headcounts.group1 +
        group2Price * headcounts.group2 +
        group3Price * headcounts.group3;

      console.log(`📊 Sum for ${table}:`, {
        group1: group1Price * headcounts.group1,
        group2: group2Price * headcounts.group2,
        group3: group3Price * headcounts.group3,
        total: sumOfGroups,
      });

      collectiveTotals["sumTotal"][key] += sumOfGroups || 0;

      updateDisplay(group1Price, `[data-output-category=${table}1]`);
      updateDisplay(group2Price, `[data-output-category=${table}2]`);
      updateDisplay(group3Price, `[data-output-category=${table}3]`);
    }
  });

  console.log("🏁 Final totals:", collectiveTotals);
  return collectiveTotals;
}

function calculateTablePrice(table, inputs) {
  console.log(`🔍 Looking up price for ${table} with inputs:`, inputs);

  const pricingTable = window[table];
  if (!Array.isArray(pricingTable)) {
    console.error(`❌ No pricing table found for ${table}`);
    return null;
  }

  const entry = pricingTable.find((row) => {
    return Object.keys(inputs).every(
      (key) => String(row[key]) === String(inputs[key])
    );
  });

  if (!entry) {
    console.error(
      `❌ No matching price entry found for ${table} with inputs:`,
      inputs
    );
    return null;
  }

  console.log(`✅ Found price for ${table}:`, entry.Price);
  return entry.Price;
}

function gatherRelatedInputs(table) {
  let inputValues = {};
  const allElements = document.querySelectorAll("input, select");

  // Automatically fetch the age input value
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

  // Automatically fetch the age input value
  const ageInput = document.querySelector(
    'input[name^="age"], select[name^="age"]'
  );
  if (ageInput && table !== "GPA") {
    inputValues["Age"] = parseInt(ageInput.value, 10);
  }

  allElements.forEach((element) => {
    const { group, table: inputTable, heading } = parseInputName(element.name);

    if (inputTable === table && group === groupNumber) {
      inputValues[heading] = element.value;
    }
  });
  return inputValues;
}

function updateDisplays(totals) {
  for (let category in totals) {
    //console.log("updating:", category);
    const sumOfCat = totals[category];

    //console.log(employeeCategories);
    const avgOfCat = sumOfCat / headcounts.overall;

    updateDisplay(avgOfCat, `[data-output-category="${category}"]`);
    updateDisplay(sumOfCat, `[data-output-category="sum-${category}"]`);
  }
}
function updateGroupDisplays(totals, group) {
  for (let category in totals) {
    //console.log("updating:", category);
    updateDisplay(
      totals[category],
      `[data-output-category="${group}-${category}"]`
    );
  }
}

function updateDisplay(price, selector) {
  console.log("updateDisplay called with:", { price, selector });

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
        console.error("Error formatting price:", error);
        displayValue = price;
      }
    }
    console.log("Setting display value:", displayValue);
    element.textContent = displayValue;
  });
}

// ... Existing functions for parseInputName and calculateTablePrice ...

function calculateTablePrice(table, inputs) {
  const pricingTable = window[table];

  if (!Array.isArray(pricingTable)) return null;

  // Find the matching entry in the pricing table
  const entry = pricingTable.find((row) => {
    return Object.keys(inputs).every(
      (key) => String(row[key]) === String(inputs[key])
    );
  });

  return entry ? entry.Price : null;
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

  // Vérifier si l'élément existe avant d'accéder à sa propriété checked
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
    console.warn("Headcount input not found!");
    headcount = null; // or some default value
  }

  return headcount;
}

// Function to check or uncheck checkboxes based on the radio value
function handleCheckboxes(radioValue) {
  // Loop through the possible values (1, 2, 3)
  for (let i = 1; i <= 3; i++) {
    // Get all the checkboxes within elements with the attribute [uncheck-these=i]
    const checkboxes = document.querySelectorAll(
      `[uncheck-these="${i}"] input[type="checkbox"]`
    );
    //console.log(checkboxes);

    // Determine whether to check or uncheck the checkboxes
    const shouldBeChecked = i <= radioValue;

    // Loop through the checkboxes and check or uncheck them as needed
    checkboxes.forEach((checkbox) => {
      if (shouldBeChecked && !checkbox.checked) {
        checkbox.previousElementSibling.click(); // Check the checkbox
        // console.log("checking from HandleCHeckboxes", checkbox);
      } else if (!shouldBeChecked && checkbox.checked) {
        checkbox.previousElementSibling.click(); // Uncheck the checkbox
        //console.log("checking from HandleCHeckboxes", checkbox);
      }
    });
  }
}

// divide headcount Get the "headcount" input element
// Function to distribute the headcount among the employee groups
function distributeHeadcount(groups) {
  // Get the overall headcount value
  const totalHeadcount =
    parseInt(document.getElementsByName("headcount")[0].value, 10) || 0;
  const groupNumber = parseInt(groups, 10);
  const groupHeadcount = Math.floor(totalHeadcount / groupNumber);
  const remainder = totalHeadcount % groupNumber;
  // Distribute the headcount based on the number of groups
  for (let i = 1; i <= groupNumber; i++) {
    const loopNumber = i === 1 ? groupHeadcount + remainder : groupHeadcount;
    document.getElementsByName(`headcount${i}`)[0].value = loopNumber;
    document.querySelector(`span[formski-mirror=headcount${i}]`).innerText =
      loopNumber;
  }
}

// Function to handle changes to the specified checkboxes
function handleGroupCheckboxes(event) {
  // Store the element that triggered the event
  const triggeredElement = event.target;

  // Get the name of the changed checkbox (e.g., "group-medical")
  const groupName = event.target.name;

  // Get the checked state of the changed checkbox
  const isChecked = event.target.checked;

  // Find all the elements with the matching [uncheck-these] attribute
  const elements = document.querySelectorAll(`[uncheck-these="${groupName}"]`);

  // Loop through the elements and check or uncheck all the checkboxes within them
  elements.forEach((element) => {
    const checkboxes = element.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (isChecked !== checkbox.checked) {
        checkbox.previousElementSibling.click(); // Check the checkbox
        //console.log("checking from handle group", checkbox);
      }
    });
  });

  // Refocus on the element that triggered the event
  triggeredElement.focus();
}

// List of checkbox names to handle
const checkboxNames = [
  /*"group-medical",
  "personal-accident",
  "group-life",*/
  "GHS1",
  "GHS2",
  "GHS3",
];

// Add event listeners to the specified checkboxes
checkboxNames.forEach((name) => {
  const checkboxes = document.getElementsByName(name);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleGroupCheckboxes);
  });
});

function handleRiderCheckboxes(event) {
  // Store the element that triggered the event
  const triggeredElement = event.target;

  // Get the name of the changed checkbox (e.g., "group-medical")
  const mainCheckboxName = event.target.name;

  // Get the checked state of the changed checkbox
  const isChecked = event.target.checked;

  // Find all the checkboxes with the matching [rider-of] attribute
  const riderCheckboxes = document.querySelectorAll(
    `input[type="checkbox"][rider-of="${mainCheckboxName}"]`
  );

  // Loop through the checkboxes and enable/disable and check/uncheck them
  riderCheckboxes.forEach((checkbox) => {
    const parentElement = checkbox.closest("label"); // Assuming the parent is a <label> element

    if (!isChecked && checkbox.checked) {
      checkbox.previousElementSibling.click(); // Uncheck the checkbox
      // console.log("checking from riders", checkbox);
      // console.log("checking this", checkbox);
    }

    checkbox.disabled = !isChecked; // Disable or enable the checkbox

    // Add or remove the 'disabled' class to the parent label
    if (checkbox.disabled) {
      parentElement.classList.add("disabled");
    } else {
      parentElement.classList.remove("disabled");
    }
  });

  // Refocus on the element that triggered the event
  triggeredElement.focus();
}

// List of main checkbox names to handle
const riderMainCheckboxNames = [
  "GP1",
  "GP2",
  "GP3",
  "GTL1",
  "GTL2",
  "GTL3",
  "GHS1",
  "GHS2",
  "GHS3",
];

// Add event listeners to the main checkboxes
riderMainCheckboxNames.forEach((name) => {
  const checkboxes = document.getElementsByName(name);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleRiderCheckboxes);
  });
});

function handleTabInputGroup(event) {
  // Get the checkbox that triggered the event
  const checkbox = event.target;

  // First, try to find the closest ancestor with the class "tab_input-group"
  let tabInputGroup = checkbox.closest(".tab_input-group");

  // If a "tab_input-group" is found, either directly or within "related-select_wrapper"
  if (tabInputGroup) {
    let groupSelects = tabInputGroup.querySelectorAll("select");

    // Check the state of the checkbox
    if (checkbox.checked) {
      // Remove the "disabled-group" class if the checkbox is checked
      tabInputGroup.classList.remove("disabled-group");
      groupSelects.forEach((select) => {
        select.disabled = false;
      });
    } else {
      // Add the "disabled-group" class if the checkbox is unchecked
      tabInputGroup.classList.add("disabled-group");
      groupSelects.forEach((select) => {
        select.disabled = true;
      });
    }
  }
}

function handleTabInputGroupOnLoad(checkbox) {
  // First, try to find the closest ancestor with the class "tab_input-group"
  let tabInputGroup = checkbox.closest(".tab_input-group");

  // If a "tab_input-group" is found, either directly or within "related-select_wrapper"
  if (tabInputGroup) {
    let groupSelects = tabInputGroup.querySelectorAll("select");

    // Check the state of the checkbox
    if (checkbox.checked) {
      // Remove the "disabled-group" class if the checkbox is checked
      tabInputGroup.classList.remove("disabled-group");
      groupSelects.forEach((select) => {
        select.disabled = false;
      });
    } else {
      // Add the "disabled-group" class if the checkbox is unchecked
      tabInputGroup.classList.add("disabled-group");
      groupSelects.forEach((select) => {
        select.disabled = true;
      });
    }
  }
}

// Grab all checkboxes on the page
const allCheckboxesGrey = document.querySelectorAll('input[type="checkbox"]');

// Attach the event listener to each checkbox
allCheckboxesGrey.forEach((checkbox) => {
  checkbox.addEventListener("change", handleTabInputGroup);
});
// trigger after page load
document.addEventListener("DOMContentLoaded", function () {
  allCheckboxesGrey.forEach((checkbox) => {
    handleTabInputGroupOnLoad(checkbox);
  });
});

function groupDependentsNext() {
  const groupsSelected = {
    "member-group-1-dependents": false,
    "member-group-2-dependents": false,
    "member-group-3-dependents": false,
  };

  const allGroupRadios = [
    "member-group-1-dependents",
    "member-group-2-dependents",
    "member-group-3-dependents",
  ];

  for (const group of allGroupRadios) {
    const groupRadios = document.getElementsByName(group);
    for (const radio of groupRadios) {
      if (radio.checked) {
        groupsSelected[group] = true;
        break;
      }
    }
  }

  const nxtBtn = document.getElementById("groupNxt");
  const disabledBtn = document.getElementById("groupDis");

  //console.log("amount ", amountOfGroups);
  //console.log("group selected ", groupsSelected["member-group-1-dependents"]);

  if (numberOfGroups === 1 && groupsSelected["member-group-1-dependents"]) {
    nxtBtn.style.display = "block";
    disabledBtn.style.display = "none";
  } else if (
    numberOfGroups === 2 &&
    groupsSelected["member-group-1-dependents"] &&
    groupsSelected["member-group-2-dependents"]
  ) {
    nxtBtn.style.display = "block";
    disabledBtn.style.display = "none";
  } else if (
    numberOfGroups === 3 &&
    groupsSelected["member-group-1-dependents"] &&
    groupsSelected["member-group-2-dependents"] &&
    groupsSelected["member-group-3-dependents"]
  ) {
    nxtBtn.style.display = "block";
    disabledBtn.style.display = "none";
  } else {
    nxtBtn.style.display = "none";
    disabledBtn.style.display = "block";
  }
}

groupDependentsNext();

const triggerGroupRadios = [
  "member-group-1-dependents",
  "member-group-2-dependents",
  "member-group-3-dependents",
  "employee-categories",
];

// Add event listeners to the main checkboxes
triggerGroupRadios.forEach((name) => {
  const radios = document.getElementsByName(name);
  radios.forEach((radio) => {
    radio.addEventListener("change", groupDependentsNext);
  });
});

function getNoOfGroups() {
  let selectedValue = parseInt(getRadioValue("employee-categories"), 10);
  return selectedValue;
}

function getRadioValue(groupName) {
  const radios = document.getElementsByName(groupName);
  let selectedValue = "";
  for (const radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }
  return selectedValue;
}

// Set the default value for life insurance ect -- before syncing of deps and none dependent fields
const fieldNames = [
  "1-GTL-Sum",
  "2-GTL-Sum",
  "3-GTL-Sum",
  "1-GCI-Sum",
  "2-GCI-Sum",
  "3-GCI-Sum",
  "1-GPA-Sum",
  "2-GPA-Sum",
  "3-GPA-Sum",
];

const defaultValue = "100k";

fieldNames.forEach((name) => {
  const selectElement = document.querySelector(`select[name="${name}"]`);
  if (selectElement) {
    // Check if the element exists
    selectElement.value = defaultValue;
  }
});

// Function to sync select options
function syncSelectOptions(mainSelectID) {
  const mainSelect = document.getElementById(mainSelectID);
  const depSelectID = `dep-${mainSelectID}`;
  const depSelect = document.getElementById(depSelectID);
  if (!depSelect) {
    return;
  }
  const secondaryArray = [
    "1-GPA-Sum",
    "1-GCI-Sum",
    "1-GTL-Sum",
    "2-GPA-Sum",
    "2-GCI-Sum",
    "2-GTL-Sum",
    "3-GPA-Sum",
    "3-GCI-Sum",
    "3-GTL-Sum",
  ];

  const isSecondary = secondaryArray.includes(mainSelectID);

  // Function to update a select element

  function createOption(option, selectElement) {
    const newOption = document.createElement("option");
    newOption.value = option.value;
    newOption.textContent = option.textContent;
    selectElement.appendChild(newOption);
  }

  function updateSelect(selectElement) {
    selectElement.innerHTML = "";
    let foundSelected = false;
    for (const option of mainSelect.options) {
      if (option.selected) {
        foundSelected = true;
      }
      if (
        foundSelected &&
        option.value !== "Plan 5" &&
        option.value !== "Plan 6"
      ) {
        createOption(option, selectElement);
      }
    }
  }

  function updateSecondarySelect(selectElement) {
    selectElement.innerHTML = "";
    let foundSelected = false;
    for (const option of mainSelect.options) {
      // Use a regular expression to extract the numeric part
      let numericPart = option.value.match(/\d+/);
      // Parse the numeric string to an integer
      let optionValue = parseInt(numericPart, 10);

      if (option.selected) {
        foundSelected = true;
      }

      if (foundSelected && optionValue <= 100) {
        createOption(option, selectElement);
      }
    }
  }

  // Update depSelect and editSelect

  if (isSecondary) {
    updateSecondarySelect(depSelect);
  } else {
    updateSelect(depSelect);
  }

  //updateSelect(editSelect);
}

// Function to mirror select options between two select elements
function mirrorSelects(selectID1, selectID2) {
  const select1 = document.getElementById(selectID1);
  const select2 = document.getElementById(selectID2);

  if (select1 && select2) {
    select1.addEventListener("change", function () {
      if (this.id === selectID1 || this.id === selectID2) {
        select2.value = select1.value;
      }
    });

    select2.addEventListener("change", function () {
      if (this.id === selectID1 || this.id === selectID2) {
        select1.value = select2.value;
      }
    });
  }
}

// Bind the change event to each main select element
document.querySelectorAll("select").forEach((mainSelect) => {
  mainSelect.addEventListener("change", function () {
    syncSelectOptions(this.id);
  });

  // Initialize by running the function once
  syncSelectOptions(mainSelect.id);

  // Check if the select is a depSelect or editSelect before mirroring
  if (mainSelect.id.startsWith("dep-")) {
    const depSelectID = `dep-${mainSelect.id}`;
    const editSelectID = `${depSelectID}-2`;
    mirrorSelects(depSelectID, editSelectID);
  }
});

// Function to sync checkboxes
function syncCheckboxes(mainCheckboxID) {
  const mainCheckbox = document.getElementById(mainCheckboxID);
  const depCheckboxID = `dep-${mainCheckboxID}`;
  const depCheckbox = document.getElementById(depCheckboxID);

  // Check if dependent checkbox exists
  if (depCheckbox) {
    if (mainCheckbox.checked !== depCheckbox.checked) {
      depCheckbox.previousElementSibling.click();
      // console.log("checking from dep", depCheckbox);
    }
  }
}

// Bind the change event to each main checkbox element
document.querySelectorAll('input[type="checkbox"]').forEach((mainCheckbox) => {
  mainCheckbox.addEventListener("click", function () {
    syncCheckboxes(this.id);
  });

  // Initialize by running the function once
  syncCheckboxes(mainCheckbox.id);
});

// Function to disable all options except one
const disableAllOptionsBut = (selectId, valueToKeep) => {
  const selectElement = document.getElementById(selectId);
  for (const option of selectElement.options) {
    if (option.value !== valueToKeep) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  }
};

// Function to enable all options
const enableAllOptions = (selectId) => {
  const selectElement = document.getElementById(selectId);
  for (const option of selectElement.options) {
    option.disabled = false;
  }
};

// Loop through each version (1, 2, 3)
for (let i = 1; i <= 3; i++) {
  // Get GHS elements
  const ghsPlan = document.getElementById(`${i}-GHS-Plan`);
  const ghsHospital = document.getElementById(`${i}-GHS-Hospital`);
  const ghsRoom = document.getElementById(`${i}-GHS-Room`);

  // Get GEMM elements
  const gemmCheckbox = document.getElementById(`GEMM${i}`);
  const gemmPlan = document.getElementById(`${i}-GEMM-Plan`);
  const gemmHospital = document.getElementById(`${i}-GEMM-Hospital`);
  const gemmRoom = document.getElementById(`${i}-GEMM-Room`);

  gemmCheckbox.disabled = false;
  // Get spans to update
  const gemmPlanSpan = document.querySelector(
    `span[show-text="${i}-GEMM-Plan"]`
  );
  const gemmHospitalSpan = document.querySelector(
    `span[show-text="${i}-GEMM-Hospital"]`
  );
  const gemmRoomSpan = document.querySelector(
    `span[show-text="${i}-GEMM-Room"]`
  );

  // Function to enforce rules
  const enforceRules = () => {
    const selectedGhsPlan = ghsPlan.value;

    // Rule: Match GEMM and GHS values

    if (selectedGhsPlan !== "Plan 6" && selectedGhsPlan !== "Plan 5") {
      gemmPlan.value = selectedGhsPlan;
    }

    gemmHospital.value = ghsHospital.value;
    gemmRoom.value = ghsRoom.value;

    // Rule: Update spans
    gemmPlanSpan.textContent = gemmPlan.options[gemmPlan.selectedIndex].text;
    gemmHospitalSpan.textContent =
      gemmHospital.options[gemmHospital.selectedIndex].text;
    gemmRoomSpan.textContent = gemmRoom.options[gemmRoom.selectedIndex].text;

    // Special conditions for "S$15,000 (S Pass & Work Permit)"
    if (selectedGhsPlan === "Plan 6" || selectedGhsPlan === "Plan 5") {
      if (gemmCheckbox.checked) {
        gemmCheckbox.previousElementSibling.click(); // Turn off GEMM
      }
      gemmCheckbox.disabled = true;
      ghsHospital.value = "Government Restructured Hospital"; // Set Hospital
      ghsRoom.value = "4 Bed"; // Set Room

      // Disable all other options
      disableAllOptionsBut(
        `${i}-GHS-Hospital`,
        "Government Restructured Hospital"
      );
      disableAllOptionsBut(`${i}-GHS-Room`, "4 Bed");
    } else {
      // Enable all options back
      enableAllOptions(`${i}-GHS-Hospital`);
      enableAllOptions(`${i}-GHS-Room`);
      gemmCheckbox.disabled = false;
    }

    // Add or remove the 'disabled' class to the parent label
    if (gemmCheckbox.disabled) {
      gemmCheckbox.parentElement.classList.add("disabled");
    } else {
      gemmCheckbox.parentElement.classList.remove("disabled");
    }
    handleInputChange();
  };

  // Attach event listeners to enforce rules whenever GHS fields change
  ghsPlan.addEventListener("change", enforceRules);
  ghsHospital.addEventListener("change", enforceRules);
  ghsRoom.addEventListener("change", enforceRules);
  enforceRules();
}

// Get all radio buttons with names that start with "member-group"
const radioButtons = document.querySelectorAll("input[name^='member-group']");

// Add a change event listener to each radio button
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    let selectedTab = null;

    // Check each group in order
    if (
      document.querySelector("input[name='member-group-1-dependents']:checked")
        ?.value === "yes"
    ) {
      selectedTab = document.getElementById("w-tabs-2-data-w-tab-0");
    } else if (
      document.querySelector("input[name='member-group-2-dependents']:checked")
        ?.value === "yes"
    ) {
      selectedTab = document.getElementById("w-tabs-2-data-w-tab-1");
    } else if (
      document.querySelector("input[name='member-group-3-dependents']:checked")
        ?.value === "yes"
    ) {
      selectedTab = document.getElementById("w-tabs-2-data-w-tab-2");
    }

    // If a tab was selected, trigger a click event on it
    if (selectedTab) {
      selectedTab.click();
    }
  });
});

function setupLinkedSelects(gtlId, gciId) {
  const gtlSelect = document.getElementById(gtlId);
  const gciSelect = document.getElementById(gciId);

  // Vérifier que les deux éléments existent
  if (!gtlSelect || !gciSelect) {
    return; // Sortir de la fonction si un des éléments n'existe pas
  }

  function updateGciOptions() {
    const selectedGtlValue = parseInt(gtlSelect.value.replace("k", "000"), 10);
    let highestAvailableValue = 0;

    for (const option of gciSelect.options) {
      const optionValue = parseInt(option.value.replace("k", "000"), 10);
      if (optionValue > selectedGtlValue) {
        option.disabled = true;
      } else {
        option.disabled = false;
        if (optionValue > highestAvailableValue) {
          highestAvailableValue = option.value;
        }
      }
    }

    const selectedGciValue = parseInt(gciSelect.value.replace("k", "000"), 10);
    if (selectedGciValue > selectedGtlValue) {
      gciSelect.value = highestAvailableValue;
    }
  }

  updateGciOptions();
  gtlSelect.addEventListener("change", updateGciOptions);
}

// Entourer les appels de setupLinkedSelects dans un try/catch pour éviter les erreurs
try {
  setupLinkedSelects("1-GTL-Sum", "1-GCI-Sum");
  setupLinkedSelects("2-GTL-Sum", "2-GCI-Sum");
  setupLinkedSelects("3-GTL-Sum", "3-GCI-Sum");
  setupLinkedSelects("dep-1-GTL-Sum", "dep-1-GCI-Sum");
  setupLinkedSelects("dep-2-GTL-Sum", "dep-2-GCI-Sum");
  setupLinkedSelects("dep-3-GTL-Sum", "dep-3-GCI-Sum");
} catch (error) {
  console.log("Some GTL/GCI elements not found:", error);
}

// Add this code to set up the event listener for the "estimate-back" button
document.getElementById("estimate-back").addEventListener("click", function () {
  // Find all containers currently in edit mode
  const editableContainers = document.querySelectorAll('[edit-status="true"]');

  editableContainers.forEach((container) => {
    const displayButton = container.querySelector('[edit-btn="display"]');
    if (displayButton) {
      toggleEditStatus(displayButton);
    }
  });
});

function toggleEditStatus(button) {
  if (!button) return;

  // Get the closest parent container with edit-status attribute
  let container = button.closest("[edit-status]");
  if (!container) return;

  const editGroup = container.getAttribute("for-edit-group");
  const groupInputs = document.querySelectorAll(`[edit-group=${editGroup}`);
  const editInputsWrapper = container.querySelector("[edit-inputs-wrapper]");

  if (button.getAttribute("edit-btn") === "edit") {
    // Switch to edit mode
    container.setAttribute("edit-status", "true");
    hideShowEditElements(container, true);

    groupInputs.forEach((input) => {
      const inputsWrapper = input.firstChild;
      editInputsWrapper.appendChild(inputsWrapper);
    });
  } else if (button.getAttribute("edit-btn") === "display") {
    // Switch to display mode
    container.setAttribute("edit-status", "false");
    hideShowEditElements(container, false);
    const groupWrappers = editInputsWrapper.querySelectorAll(
      ".edit_transfer-wrapper"
    );
    groupInputs.forEach((input, index) => {
      const matchingGroup = groupWrappers[index];
      input.appendChild(matchingGroup);
    });
    allCheckboxesGrey.forEach((checkbox) => {
      handleTabInputGroupOnLoad(checkbox);
    });
  }
}

// Toggle the edit status of a container
function hideShowEditElements(container, isEditing) {
  // Hide/show elements based on their edit-show-when attribute
  let elementsToShow = container.querySelectorAll(
    `[edit-show-when="${isEditing ? "true" : "false"}"]`
  );
  let elementsToHide = container.querySelectorAll(
    `[edit-show-when="${isEditing ? "false" : "true"}"]`
  );

  elementsToShow.forEach((elem) => (elem.style.display = ""));
  elementsToHide.forEach((elem) => (elem.style.display = "none"));

  // Manage the visibility of edit and display buttons
  let editButton = container.querySelector('[edit-btn="edit"]');
  let displayButton = container.querySelector('[edit-btn="display"]');

  if (isEditing) {
    if (editButton) editButton.style.display = "none";
    if (displayButton) displayButton.style.display = "";
  } else {
    if (editButton) editButton.style.display = "";
    if (displayButton) displayButton.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  otherCheckboxes();
  // Grab all buttons with the edit-btn attribute
  let editButtons = document.querySelectorAll("[edit-btn]");

  // Add event listeners to those buttons
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleEditStatus(button);
    });
  });

  // Set default statuses on page load
  let containers = document.querySelectorAll("[edit-status]");
  containers.forEach((container) => {
    let status = container.getAttribute("edit-status") === "true";
    hideShowEditElements(container, status);
  });
});

function otherCheckboxes() {
  const otherCheckboxesWrapper = document.querySelectorAll(
    ".checkbox-other-wrapper"
  );
  otherCheckboxesWrapper.forEach((checkboxWrapper) => {
    const checkbox = checkboxWrapper.querySelector("input[type='checkbox']");
    const otherInput = checkboxWrapper.querySelector("textarea");
    checkbox.addEventListener("change", function () {
      if (checkbox.checked === true) {
        otherInput.style.display = "block";
      } else {
        otherInput.style.display = "none";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const GPSelects = ["1-SP-Benefit", "2-SP-Benefit", "3-SP-Benefit"];
  GPSelects.forEach((selectID) => {
    const select = document.getElementById(selectID);
    changeSelectIndex(select, 1);
    syncSelectOptions(select.id);
  });
});

function changeSelectIndex(select, index) {
  select.selectedIndex = index;
}

// Loop through each version (1, 2, 3) for DEPENDENTS
for (let i = 1; i <= 3; i++) {
  // Get GHS elements
  const ghsPlan = document.getElementById(`dep-${i}-GHS-Plan`);
  const ghsHospital = document.getElementById(`${i}-GHS-Hospital`);
  const ghsRoom = document.getElementById(`${i}-GHS-Room`);
  const ghsPlanNormal = document.getElementById(`${i}-GHS-Plan`);

  // Get GEMM elements
  const gemmCheckbox = document.getElementById(`dep-GEMM${i}`);
  const gemmPlan = document.getElementById(`${i}-GEMM-Plan`);
  const gemmHospital = document.getElementById(`dep-${i}-GEMM-Hospital`);
  const gemmRoom = document.getElementById(`dep-${i}-GEMM-Room`);

  gemmCheckbox.disabled = false;
  // Get spans to update
  const gemmPlanSpan = document.querySelector(
    `span[show-text="dep-${i}-GEMM-Plan"]`
  );

  // Function to enforce rules
  const enforceRules = () => {
    // Rule: Match GEMM and GHS values
    const valueToFind = ghsPlan.value;
    const gemmIndex = Array.from(ghsPlanNormal.options).findIndex(
      (option) => option.value === valueToFind
    );

    // Vérifier que l'index est valide et que l'option existe
    if (
      gemmPlanSpan &&
      gemmPlan &&
      gemmPlan.options &&
      gemmIndex !== -1 &&
      gemmPlan.options[gemmIndex]
    ) {
      gemmPlanSpan.textContent = gemmPlan.options[gemmIndex].text;
    }

    // Add or remove the 'disabled' class to the parent label
    if (gemmCheckbox.disabled) {
      gemmCheckbox.parentElement.classList.add("disabled");
    } else {
      gemmCheckbox.parentElement.classList.remove("disabled");
    }
    handleInputChange();
  };

  // Attach event listeners to enforce rules whenever GHS fields change
  ghsPlan.addEventListener("change", enforceRules);
  ghsPlanNormal.addEventListener("change", enforceRules);
  ghsHospital.addEventListener("change", enforceRules);
  ghsRoom.addEventListener("change", enforceRules);
  enforceRules();
}

//check insurance types if selected
const insuranceTypeIds = {
  "personal-accident": ["GPA", "dep-GPA"],
  "group-life": ["GTL", "dep-GTL"],
  "group-medical": ["GHS", "dep-GHS"],
};

// Modifier cette partie pour vérifier l'existence des éléments
for (let insuranceType of Object.keys(insuranceTypeIds)) {
  const typeCheckbox = document.getElementById(`${insuranceType}`);

  // Vérifier si l'élément existe avant d'ajouter l'event listener
  if (typeCheckbox) {
    typeCheckbox.addEventListener("change", () =>
      checkInsuranceType(typeCheckbox)
    );
  }
}

function checkInsuranceType(typeCheckbox) {
  if (!typeCheckbox) return;

  const insuranceisChecked = typeCheckbox.checked;

  for (let checkboxId of insuranceTypeIds[`${typeCheckbox.id}`]) {
    for (let i = 1; i <= 3; i++) {
      const checkbox = document.getElementById(`${checkboxId}${i}`);
      // Vérifier si le checkbox existe
      if (checkbox) {
        let checkboxIsChecked = checkbox.checked;

        if (insuranceisChecked !== checkboxIsChecked) {
          checkbox.previousElementSibling.click();
          checkboxIsChecked = checkbox.checked;
        }
      }
    }
  }
}

//Dependent - change "Selected" or "Not slected"

// List of main checkbox names to handle
const dependentCheckboxes = [
  "dep-GHS",
  "dep-GEMM",
  "dep-GP",
  "dep-SP",
  "dep-DT",
  "dep-GTL",
  "dep-GCI",
  "dep-GPA",
];

let checkboxArray = [];

getAllDepCheckboxIds();

function getAllDepCheckboxIds() {
  for (let i = 1; i <= 3; i++) {
    dependentCheckboxes.forEach((id) => {
      const checkbox = document.getElementById(`${id}${i}`);
      // Ajouter à l'array seulement si le checkbox existe
      if (checkbox) {
        const object = {
          checkbox: checkbox,
          group: i,
        };
        checkboxArray.push(object);
      }
    });
  }
}

// Ajouter les event listeners seulement pour les checkboxes qui existent
checkboxArray.forEach((object) => {
  if (object.checkbox) {
    object.checkbox.addEventListener("change", updateDependentSelectStatus);
  }
});

// Modifier aussi la partie qui gère les radios des dépendants
for (let i = 1; i <= 3; i++) {
  const dependentRadios = document.getElementsByName(
    `member-group-${i}-dependents`
  );
  if (dependentRadios.length > 0) {
    dependentRadios.forEach((radio) => {
      radio.addEventListener("change", updateDependentSelectStatus);
    });
  }
}

function updateDependentSelectStatus() {
  checkboxArray.forEach((object) => {
    if (object.checkbox) {
      // Vérifier que le checkbox existe
      const isSelected = object.checkbox.checked;
      const selectedText = document.getElementById(`sel-${object.checkbox.id}`);
      const groupHasDependents =
        getRadioValue(`member-group-${object.group}-dependents`) === "yes";
      if (selectedText) {
        selectedText.innerText =
          isSelected && groupHasDependents ? "Selected" : "Not selected";
      }
    }
  });
}

// Initialiser seulement si des éléments existent
if (checkboxArray.length > 0) {
  updateDependentSelectStatus();
}

document.addEventListener("DOMContentLoaded", function () {
  // Activer les Basic Plan par défaut
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
    if (checkbox) {
      // Activer le checkbox s'il n'est pas déjà activé
      if (!checkbox.checked) {
        checkbox.checked = true;
      }

      // Ajouter la classe pour le style visuel du toggle
      const toggleDiv = checkbox.previousElementSibling;
      if (toggleDiv && toggleDiv.classList.contains("form_checkbox-toggle")) {
        toggleDiv.classList.add("w--redirected-checked");
      }

      // Retirer la classe disabled-group du groupe parent
      const tabInputGroup = checkbox.closest(".tab_input-group");
      if (tabInputGroup) {
        tabInputGroup.classList.remove("disabled-group");

        // Activer tous les selects dans ce groupe
        const groupSelects = tabInputGroup.querySelectorAll("select");
        groupSelects.forEach((select) => {
          select.disabled = false;
        });
      }
    }
  });
});

// Initialize for each checkbox
updateDependentSelectStatus();
