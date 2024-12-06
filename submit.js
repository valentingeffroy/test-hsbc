const nameMapping = {
  "full-name": "details[name]",
  email: "details[email]",
  "company-name": "details[company-name]",
  industry: "details[industry]",
  headcount: "details[headcount]",
  age: "details[avg-age]",
  "current-benefits-group-medical": "current-benefits[group-medical]",
  "current-benefits-gym---fitness": "current-benefits[gym-and-fitness]",
  "current-benefits-perks---discounts": "current-benefits[perks-discounts]",
  "current-benefits-dental": "current-benefits[dental]",
  "current-benefits-mental-health-support":
    "current-benefits[mental-health-support]",
  "current-benefits-learning---development":
    "current-benefits[learning-and-development]",
  "current-benefits-group-life-critical-illness":
    "current-benefits[group-life-critical-illness]",
  "current-benefits-flexible---remote-working":
    "current-benefits[flexible-and-remote-working]",
  "current-benefits-child-academic-support":
    "current-benefits[child-academic-support]",
  "current-benefits-accident": "current-benefits[accident]",
  "current-benefits-financial-wellbeing-education---tools":
    "current-benefits[financial-wellbeing-education-and-tools]",
  "current-benefits-child-care-support": "current-benefits[child-care-support]",
  "current-benefits-pension": "current-benefits[pension]",
  "current-benefits-banking-offers": "current-benefits[banking-offers]",
  "current-benefits-other": "current-benefits[other]",
  "current-benefits-content": "current-benefits[other-content]",
  "unmet-needs": "current-benefits[unmet-needs]",
  "renewal-date": "existing-group-insurance[renewal-date]",
  "insurer-name": "existing-group-insurance[insurer-name]",
  "broker-name": "existing-group-insurance[broker-name]",
  "price-estimate": "estimate[platform]",
  "price-estimate": "estimate[platform-plus-insurance]",
  "group-medical": "insurance-policies[group-medical]",
  "group-life": "insurance-policies[group-protection]",
  "personal-accident": "insurance-policies[personal-accident]",
  "employee-categories": "employee-categories[amount]",
  "employee-categories": "employee-categories[amount]",
  "employee-categories": "employee-categories[amount]",
  "member-group-1-dependents": "employee-category[1][dependents]",
  "member-group-1-dependents": "employee-category[1][dependents]",
  "Member-Group-1-Name": "employee-category[1][name]",
  headcount1: "employee-category[1][headcount]",
  "member-group-1-dependents": "employee-category[1][dependents]",
  "member-group-1-dependents": "employee-category[1][dependents]",
  "Member-Group-2-Name": "employee-category[2][name]",
  headcount2: "employee-category[2][headcount]",
  "member-group-2-dependents": "employee-category[2][dependents]",
  "member-group-2-dependents": "employee-category[2][dependents]",
  "Member-Group-3-Name": "employee-category[3][name]",
  headcount3: "employee-category[3][headcount]",
  "member-group-3-dependents": "employee-category[3][dependents]",
  "member-group-3-dependents": "employee-category[3][dependents]",
  GHS1: "employee-category[1][ghs][selected]",
  "1-GHS-Plan": "employee-category[1][ghs][plan]",
  "1-GHS-Hospital": "employee-category[1][ghs][hospital]",
  "1-GHS-Room": "employee-category[1][ghs][room]",
  GEMM1: "employee-category[1][gemm][selected]",
  "1-GEMM-Plan": "employee-category[1][gemm][plan]",
  "1-GEMM-Hospital": "employee-category[1][gemm][hospital]",
  "1-GEMM-Room": "employee-category[1][gemm][room]",
  GP1: "employee-category[1][gp][selected]",
  "1-GP-Benefit": "employee-category[1][gp][benefit]",
  SP1: "employee-category[1][sp][selected]",
  "1-SP-Benefit": "employee-category[1][sp][benefit]",
  "1-SP-Copay": "employee-category[1][sp][copay]",
  DT1: "employee-category[1][dt][selected]",
  "1-DT-Limit": "employee-category[1][dt][limit]",
  "1-DT-Copay": "employee-category[1][dt][copay]",
  "1-DT-Panel": "employee-category[1][dt][panel]",
  GHS2: "employee-category[2][ghs][selected]",
  "2-GHS-Plan": "employee-category[2][ghs][plan]",
  "2-GHS-Hospital": "employee-category[2][ghs][hospital]",
  "2-GHS-Room": "employee-category[2][ghs][room]",
  GEMM2: "employee-category[2][gemm][selected]",
  "2-GEMM-Plan": "employee-category[2][gemm][plan]",
  "2-GEMM-Hospital": "employee-category[2][gemm][hospital]",
  "2-GEMM-Room": "employee-category[2][gemm][room]",
  GP2: "employee-category[2][gp][selected]",
  "2-GP-Benefit": "employee-category[2][gp][benefit]",
  SP2: "employee-category[2][sp][selected]",
  "2-SP-Benefit": "employee-category[2][sp][benefit]",
  "2-SP-Copay": "employee-category[2][sp][copay]",
  DT2: "employee-category[2][dt][selected]",
  "2-DT-Limit": "employee-category[2][dt][limit]",
  "2-DT-Copay": "employee-category[2][dt][copay]",
  "2-DT-Panel": "employee-category[2][dt][panel]",
  GHS3: "employee-category[3][ghs][selected]",
  "3-GHS-Plan": "employee-category[3][ghs][plan]",
  "3-GHS-Hospital": "employee-category[3][ghs][hospital]",
  "3-GHS-Room": "employee-category[3][ghs][room]",
  GEMM3: "employee-category[3][gemm][selected]",
  "3-GEMM-Plan": "employee-category[3][gemm][plan]",
  "3-GEMM-Hospital": "employee-category[3][gemm][hospital]",
  "3-GEMM-Room": "employee-category[3][gemm][room]",
  GP3: "employee-category[3][gp][selected]",
  "3-GP-Benefit": "employee-category[3][gp][benefit]",
  SP3: "employee-category[3][sp][selected]",
  "3-SP-Benefit": "employee-category[3][sp][benefit]",
  "3-SP-Copay": "employee-category[3][sp][copay]",
  DT3: "employee-category[3][dt][selected]",
  "3-DT-Limit": "employee-category[3][dt][limit]",
  "3-DT-Copay": "employee-category[3][dt][copay]",
  "3-DT-Panel": "employee-category[3][dt][panel]",
  GTL1: "employee-category[1][gtl][selected]",
  "1-GTL-Sum": "employee-category[1][gtl][sum]",
  GCI1: "employee-category[1][gci][selected]",
  "1-GCI-Basis": "employee-category[1][gci][basis]",
  "1-GCI-Sum": "employee-category[1][gci][sum]",
  GPA1: "employee-category[1][gpa][selected]",
  "1-GPA-Sum": "employee-category[1][gpa][sum]",
  GTL2: "employee-category[2][gtl][selected]",
  "2-GTL-Sum": "employee-category[2][gtl][sum]",
  GCI2: "employee-category[2][gci][selected]",
  "2-GCI-Basis": "employee-category[2][gci][basis]",
  "2-GCI-Sum": "employee-category[2][gci][sum]",
  GPA2: "employee-category[2][gpa][selected]",
  "2-GPA-Sum": "employee-category[2][gpa][sum]",
  GTL3: "employee-category[3][gtl][selected]",
  "3-GTL-Sum": "employee-category[3][gtl][sum]",
  GCI3: "employee-category[3][gci][selected]",
  "3-GCI-Basis": "employee-category[3][gci][basis]",
  "3-GCI-Sum": "employee-category[3][gci][sum]",
  GPA3: "employee-category[3][gpa][selected]",
  "3-GPA-Sum": "employee-category[3][gpa][sum]",
  "dep-GHS1": "employee-category[1][dep][ghs][selected]",
  "dep-1-GHS-Plan": "employee-category[1][dep][ghs][plan]",
  "dep-1-GHS-Hospital": "employee-category[1][dep][ghs][hospital]",
  "dep-1-GHS-Room": "employee-category[1][dep][ghs][room]",
  "dep-GEMM1": "employee-category[1][dep][gemm][selected]",
  "dep-GP1": "employee-category[1][dep][gp][selected]",
  "dep-1-GP-Benefit": "employee-category[1][dep][gp][benefit]",
  "dep-SP1": "employee-category[1][dep][sp][selected]",
  "dep-1-SP-Benefit": "employee-category[1][dep][sp][benefit]",
  "dep-1-SP-Copay": "employee-category[1][dep][sp][copay]",
  "dep-DT1": "employee-category[1][dep][dt][selected]",
  "dep-1-DT-Limit": "employee-category[1][dep][dt][limit]",
  "dep-1-DT-Copay": "employee-category[1][dep][dt][copay]",
  "dep-1-DT-Panel": "employee-category[1][dep][dt][panel]",
  "dep-GTL1": "employee-category[1][dep][gtl][selected]",
  "dep-1-GTL-Sum": "employee-category[1][dep][gtl][sum]",
  "dep-GCI1": "employee-category[1][dep][gci][selected]",
  "dep-1-GCI-Basis": "employee-category[1][dep][gci][basis]",
  "dep-1-GCI-Sum": "employee-category[1][dep][gci][sum]",
  "dep-GPA1": "employee-category[1][dep][gpa][selected]",
  "dep-1-GPA-Sum": "employee-category[1][dep][gpa][sum]",
  "dep-GHS2": "employee-category[2][dep][ghs][selected]",
  "dep-2-GHS-Plan": "employee-category[2][dep][ghs][plan]",
  "dep-2-GHS-Hospital": "employee-category[2][dep][ghs][hospital]",
  "dep-2-GHS-Room": "employee-category[2][dep][ghs][room]",
  "dep-GEMM2": "employee-category[2][dep][gemm][selected]",
  "dep-GP2": "employee-category[2][dep][gp][selected]",
  "dep-2-GP-Benefit": "employee-category[2][dep][gp][benefit]",
  "dep-SP2": "employee-category[2][dep][sp][selected]",
  "dep-2-SP-Benefit": "employee-category[2][dep][sp][benefit]",
  "dep-2-SP-Copay": "employee-category[2][dep][sp][copay]",
  "dep-DT2": "employee-category[2][dep][dt][selected]",
  "dep-2-DT-Limit": "employee-category[2][dep][dt][limit]",
  "dep-2-DT-Copay": "employee-category[2][dep][dt][copay]",
  "dep-2-DT-Panel": "employee-category[2][dep][dt][panel]",
  "dep-GTL2": "employee-category[2][dep][gtl][selected]",
  "dep-2-GTL-Sum": "employee-category[2][dep][gtl][sum]",
  "dep-GCI2": "employee-category[2][dep][gci][selected]",
  "dep-2-GCI-Basis": "employee-category[2][dep][gci][basis]",
  "dep-2-GCI-Sum": "employee-category[2][dep][gci][sum]",
  "dep-GPA2": "employee-category[2][dep][gpa][selected]",
  "dep-2-GPA-Sum": "employee-category[2][dep][gpa][sum]",
  "dep-GHS3": "employee-category[3][dep][ghs][selected]",
  "dep-3-GHS-Plan": "employee-category[3][dep][ghs][plan]",
  "dep-3-GHS-Hospital": "employee-category[3][dep][ghs][hospital]",
  "dep-3-GHS-Room": "employee-category[3][dep][ghs][room]",
  "dep-GEMM3": "employee-category[3][dep][gemm][selected]",
  "dep-GP3": "employee-category[3][dep][gp][selected]",
  "dep-3-GP-Benefit": "employee-category[3][dep][gp][benefit]",
  "dep-SP3": "employee-category[3][dep][sp][selected]",
  "dep-3-SP-Benefit": "employee-category[3][dep][sp][benefit]",
  "dep-3-SP-Copay": "employee-category[3][dep][sp][copay]",
  "dep-DT3": "employee-category[3][dep][dt][selected]",
  "dep-3-DT-Limit": "employee-category[3][dep][dt][limit]",
  "dep-3-DT-Copay": "employee-category[3][dep][dt][copay]",
  "dep-3-DT-Panel": "employee-category[3][dep][dt][panel]",
  "dep-GTL3": "employee-category[3][dep][gtl][selected]",
  "dep-3-GTL-Sum": "employee-category[3][dep][gtl][sum]",
  "dep-GCI3": "employee-category[3][dep][gci][selected]",
  "dep-3-GCI-Basis": "employee-category[3][dep][gci][basis]",
  "dep-3-GCI-Sum": "employee-category[3][dep][gci][sum]",
  "dep-GPA3": "employee-category[3][dep][gpa][selected]",
  "dep-3-GPA-Sum": "employee-category[3][dep][gpa][sum]",
  "Naluri-digital": "lifestyle[naluri]",
  "Gym-subscription": "lifestyle[gym]",
};

function setNestedValue(obj, keys, value) {
  let key = keys.shift();
  if (keys.length === 0) {
    obj[key] = value;
    return;
  }

  if (!obj[key]) {
    obj[key] = {};
  }

  setNestedValue(obj[key], keys, value);
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const prices = getPrices();
    const formData = createObjectFromForm(submitButton);
    // add prices globally to form data
    formData["pricing"] = prices;

    // reformat the data, create category array and add prices to it
    reformatObject(formData, prices);

    renamePrices(formData);

    console.log(formData);
    const formDataJSON = JSON.stringify(formData);
    console.log(formDataJSON);
    postForm(formDataJSON);
  });
});

function getPrices() {
  const pricingElements = document.querySelectorAll("[data-output-category]");
  const pricingArray = {};

  function addToArray(element) {
    const priceName = element.getAttribute("data-output-category");
    const priceValue = element.innerText;
    pricingArray[priceName] = priceValue;
  }

  pricingElements.forEach(addToArray);

  const groupedObject = {};

  for (const [key, value] of Object.entries(pricingArray)) {
    let match = key.match(/^(\d+)-(.+)$/) || key.match(/(.+?)(\d+)$/);

    if (match) {
      const [, prefix, suffix] = match;
      const number = isNaN(parseInt(prefix)) ? suffix : prefix;
      const newKey = isNaN(parseInt(prefix)) ? prefix : suffix;

      if (!groupedObject[number]) {
        groupedObject[number] = {};
      }

      groupedObject[number][newKey] = value;
    } else {
      groupedObject[key] = value;
    }
  }

  for (let i = 1; i <= 3; i++) {
    let newObject = {};
    for (let key in groupedObject[i]) {
      if (groupedObject[i].hasOwnProperty(key)) {
        if (key === "GroupLifeInsurance") {
          newObject["GroupProtection"] = groupedObject[i][key];
        } else {
          newObject[key] = groupedObject[i][key];
        }
      }
    }
    groupedObject[i] = newObject;
  }

  console.log(groupedObject);
  console.log(pricingArray);
  return groupedObject;
}

function createObjectFromForm(button) {
  const form = button.closest("form");
  const formData = {};

  function mapElement(element) {
    const ogName = element.name;
    const newName = nameMapping[ogName];
    let elementValue = element.value;
    if (element.type === "checkbox") {
      elementValue = element.checked;
    }
    if (element.type === "select-one") {
      elementValue = element.selectedOptions[0].text;
    }

    if (newName) {
      const keys = newName.split(/[\[\]]+/).filter(Boolean);
      setNestedValue(formData, keys, elementValue);
    }
  }

  const elements = form.querySelectorAll("input, select, textarea");
  const checkedRadios = document.querySelectorAll(
    'input[type="radio"]:checked'
  );

  // Assuming nameMapping and formData are defined in a higher scope
  elements.forEach(mapElement);
  checkedRadios.forEach(mapElement);

  return formData;
}

function renamePrices(formData) {
  const keyMapping = {
    "platform-fees": "PlatformFeesBeforeDiscount",
    "lifestyle-total": "NaluriTotal",
    discount: "GroupMedicalTotalBeforeDiscount",
    "sum-GroupMedical": "GroupMedicalTotalAfterDiscount",
    "sum-GroupLifeInsurance": "GroupProtectionTotal",
    "sum-GroupPersonalAccident": "GroupPATotal",
    "grand-total": "GrandTotalPerYear",
  };

  const newObj = {};

  Object.keys(keyMapping).forEach((key) => {
    const newKey = keyMapping[key];
    newObj[newKey] = formData.pricing[key];
  });

  formData.pricing = newObj;
}

function reformatObject(formData, prices) {
  // Initialiser l'objet estimate s'il n'existe pas
  if (!formData.estimate) {
    formData.estimate = {};
  }

  const isPlatformPlusInsurance =
    formData.estimate["platform-plus-insurance"] === "platform plus insurance";
  formData.estimate["platform-plus-insurance"] = isPlatformPlusInsurance;

  //new way
  let newCategoriesArray = [];

  if (isPlatformPlusInsurance) {
    const employeeAmount = formData["employee-categories"]["amount"];
    for (let i = 1; i <= employeeAmount; i++) {
      formData["employee-category"][`${i}`]["pricing"] = prices[`${i}`];
      newCategoriesArray.push(formData["employee-category"][`${i}`]);
    }
    formData["employee-category"] = newCategoriesArray;

    const employeeCategories = formData["employee-category"];
    checkDependents(employeeCategories);
  } else {
    formData["employee-category"] = [];
  }
}

function checkDependents(employeeCategoriesArray) {
  employeeCategoriesArray.forEach(function (categoryObject) {
    const hasDependents = categoryObject["dependents"];
    const dependentAnwsers = categoryObject["dep"];
    if (hasDependents === "no") {
      for (let key in dependentAnwsers) {
        dependentAnwsers[key]["selected"] = false;
      }
    }
  });
}

function postForm(formDataJSON) {
  fetch("https://thrivebenefits.hsbc.com.sg/submit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: formDataJSON,
    keepalive: true,
  })
    .then((response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? response.json() : null;

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      console.error("Error Submitting Estimate", error);
      document.querySelector(".w-form-fail").style.display = "block";
    });
}

/*
 take employee catergories
 Loop through all three 
 turn all dependents false if dependents is no
 formData["employee-categories"] = checkDependents(formData["employee-categories"])
 */

/* old function - made more effecient
function reformatObject(formData, prices) {
  const isPlatformPlusInsurance =
    formData["estimate"]["platform-plus-insurance"] ===
    "platform plus insurance";
  formData["estimate"]["platform-plus-insurance"] = isPlatformPlusInsurance;

  const cat1 = formData["employee-category"]["1"];
  cat1["pricing"] = prices["1"];
  const cat2 = formData["employee-category"]["2"];
  cat2["pricing"] = prices["2"];
  const cat3 = formData["employee-category"]["3"];
  cat3["pricing"] = prices["3"];

  formData["employee-category"] = [];

  console.log(formData["estimate"]["platform-plus-insurance"]);

  if (isPlatformPlusInsurance) {
    formData["employee-category"].push(cat1);

    const employeeAmount = formData["employee-categories"]["amount"];
    if (employeeAmount === "2" || employeeAmount === "3") {
      formData["employee-category"].push(cat2);
    }
    if (employeeAmount === "3") {
      formData["employee-category"].push(cat3);
    }

    const employeeCategories = formData["employee-category"];
    checkDependents(employeeCategories);
  }
}




function postForm(formDataJSON, actionURL, method) {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Initialize the request
  xhr.open(method, actionURL, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("done");
      } else {
        console.log("failed");
      }
    }
  };

  // Send the JSON data
  xhr.send(formDataJSON);
}
*/
