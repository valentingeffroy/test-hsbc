document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.querySelector("[formski-form]");
  let stepOrder = Array.from(form.querySelectorAll("[formski-step]")).map(
    (stepElement) => {
      return {
        stepNumber: stepElement.getAttribute("formski-step"),
        show: !stepElement.hasAttribute("formski-hide"),
        group: stepElement.getAttribute("formski-group") || ""
      };
    }
  );
  //console.log("Initial stepOrder:", stepOrder); // Log initial stepOrder
  let currentStepIndex = 0;

  const getStepElement = (stepNumber) =>
    form.querySelector(`[formski-step="${stepNumber}"]`);

  const updateStepVisibility = () => {
    stepOrder.forEach((step, index) => {
      const element = getStepElement(step.stepNumber);
      if (element)
        element.style.display =
          index === currentStepIndex && step.show ? "" : "none";
    });
    // console.log("Updated stepOrder:", stepOrder); // Log updated stepOrder
    // Get the currently visible slide element
    const currentSlideElement = getStepElement(
      stepOrder[currentStepIndex].stepNumber
    );
    if (currentSlideElement) {
      manageRequiredInputsForSlide(currentSlideElement);
    }
    updateProgressIndicator();
  };

  const findNextStep = () => {
    for (let i = currentStepIndex + 1; i < stepOrder.length; i++) {
      if (stepOrder[i].show) return i;
    }
    return -1;
  };

  const findPreviousStep = () => {
    for (let i = currentStepIndex - 1; i >= 0; i--) {
      if (stepOrder[i].show) return i;
    }
    return -1;
  };

  const evaluateCondition = (condition, value, elementType, checked) => {
    const conditions = condition.split("||").map((cond) => cond.trim());
    for (let i = 0; i < conditions.length; i++) {
      const currentCondition = conditions[i].trim();
      if (currentCondition === "checked" || currentCondition === "selected") {
        if (checked) return true;
      } else if (
        currentCondition === "unchecked" ||
        currentCondition === "notselected"
      ) {
        if (!checked) return true;
      } else if (currentCondition.toLowerCase() === "empty") {
        if (value.trim() === "") return true;
      } else {
        let conditionParts = currentCondition.match(
          /([\u003c\u003e]=?|==|===|!==?|\s*[\u003c\u003e]\s*)(-?\d+(\.\d+)?)/
        );
        if (conditionParts) {
          let operator = conditionParts[1];
          let comparisonValue = Number(conditionParts[2]);
          switch (operator) {
            case "<":
              if (Number(value) < comparisonValue) return true;
              break;
            case "<=":
              if (Number(value) <= comparisonValue) return true;
              break;
            case ">":
              if (Number(value) > comparisonValue) return true;
              break;
            case ">=":
              if (Number(value) >= comparisonValue) return true;
              break;
            case "==":
            case "===":
              if (Number(value) === comparisonValue) return true;
              break;
            case "!=":
            case "!==":
              if (Number(value) !== comparisonValue) return true;
              break;
          }
        } else {
          console.error("Invalid condition: ", currentCondition);
        }
      }
    }
    return false;
  };

  const conditionElements = form.querySelectorAll("[formski-condition]");
  conditionElements.forEach((element) => {
    element.addEventListener("input", (event) => {
      const conditionData = event.target
        .getAttribute("formski-condition")
        .split(",");
      const condition = conditionData[0].trim();
      const stepNumber = conditionData[1].trim();
      const step = stepOrder.find((step) => step.stepNumber === stepNumber);
      if (step) {
        step.show = evaluateCondition(
          condition,
          event.target.value,
          event.target.type,
          event.target.checked
        );
        updateStepVisibility();
      }
    });
  });

  const evaluateInitialConditions = () => {
    conditionElements.forEach((element) => {
      const conditionData = element
        .getAttribute("formski-condition")
        .split(",");
      const condition = conditionData[0].trim();
      const stepNumber = conditionData[1].trim();
      const step = stepOrder.find((step) => step.stepNumber === stepNumber);
      if (step) {
        step.show = evaluateCondition(
          condition,
          element.value,
          element.type,
          element.checked
        );
      }
    });
  };

  const evaluateGroupCondition = (condition, value, elementType, checked) => {
    const conditions = condition.split("||").map((cond) => cond.trim());
    for (let i = 0; i < conditions.length; i++) {
      const currentCondition = conditions[i].trim();
      if (currentCondition === "checked" || currentCondition === "selected") {
        if (checked) return true;
      } else if (
        currentCondition === "unchecked" ||
        currentCondition === "notselected"
      ) {
        if (!checked) return true;
      } else if (currentCondition.toLowerCase() === "empty") {
        if (value.trim() === "") return true;
      } else {
        let conditionParts = currentCondition.match(
          /([\u003c\u003e]=?|==|===|!==?|\s*[\u003c\u003e]\s*)(-?\d+(\.\d+)?)/
        );
        if (conditionParts) {
          let operator = conditionParts[1];
          let comparisonValue = Number(conditionParts[2]);
          switch (operator) {
            case "<":
              if (Number(value) < comparisonValue) return true;
              break;
            case "<=":
              if (Number(value) <= comparisonValue) return true;
              break;
            case ">":
              if (Number(value) > comparisonValue) return true;
              break;
            case ">=":
              if (Number(value) >= comparisonValue) return true;
              break;
            case "==":
            case "===":
              if (Number(value) === comparisonValue) return true;
              break;
            case "!=":
            case "!==":
              if (Number(value) !== comparisonValue) return true;
              break;
          }
        } else {
          console.error("Invalid condition: ", currentCondition);
        }
      }
    }
    return false;
  };

  const conditionGroupElements = form.querySelectorAll(
    "[formski-condition-group]"
  );
  conditionGroupElements.forEach((element) => {
    element.addEventListener("input", (event) => {
      const conditionData = event.target
        .getAttribute("formski-condition-group")
        .split(",");
      const condition = conditionData[0].trim();
      const groupName = conditionData[1].trim();
      const steps = stepOrder.filter((step) => step.group === groupName);
      if (steps) {
        const show = evaluateGroupCondition(
          condition,
          event.target.value,
          event.target.type,
          event.target.checked
        );
        steps.forEach((step) => {
          step.show = show;
        });
        updateStepVisibility();
      }
    });
  });

  const evaluateInitialGroupConditions = () => {
    conditionGroupElements.forEach((element) => {
      const conditionData = element
        .getAttribute("formski-condition-group")
        .split(",");
      const condition = conditionData[0].trim();
      const groupName = conditionData[1].trim();
      const steps = stepOrder.filter((step) => step.group === groupName);
      if (steps) {
        const show = evaluateGroupCondition(
          condition,
          element.value,
          element.type,
          element.checked
        );
        steps.forEach((step) => {
          step.show = show;
        });
      }
    });
  };

  function evaluateStepCondition(step) {
    let conditionString = step.getAttribute("formski-step-condition");
    if (!conditionString) return true; // If no condition, the step is shown by default

    let finalResult = false;

    if (conditionString.includes("{{") && conditionString.includes("}}")) {
      const conditionMatch = conditionString.match(/\{\{(.+?)\}\}/);
      if (!conditionMatch) return true;

      const conditions = conditionMatch[1].split(/(\|\||&&)/);
      let orConditionsMet = false;
      let andConditionsMet = true;

      for (let i = 0; i < conditions.length; i += 2) {
        const condition = conditions[i].trim();
        const operator = conditions[i + 1];
        const result = evaluateSingleStepCondition(condition);

        if (operator === "||") {
          orConditionsMet = orConditionsMet || result;
          if (orConditionsMet) {
            finalResult = true;
            break;
          }
        } else if (operator === "&&") {
          andConditionsMet = andConditionsMet && result;
          if (!andConditionsMet) {
            finalResult = false;
            break;
          }
        } else {
          finalResult = result;
        }
      }
    } else {
      finalResult = evaluateSingleStepCondition(conditionString);
    }
    const stepNumber = step.getAttribute("formski-step");
    //console.log(stepNumber);
    //console.log(finalResult);
    const stepEl = stepOrder.find((stepEl) => stepEl.stepNumber === stepNumber);
    if (stepEl) {
      stepEl.show = finalResult;
    }

    return finalResult;
  }

  function evaluateSingleStepCondition(condition) {
    const [inputName, operator, expectedValue] = condition.split(
      /(==|!=|<=|>=|<|>)/
    );
    const inputElements = document.querySelectorAll(
      `[name="${inputName.trim()}"]`
    );
    if (!inputElements.length) return false;

    const inputType = inputElements[0].type;
    let actualValue;

    switch (inputType) {
      case "radio":
        for (let radio of inputElements) {
          if (radio.checked) {
            actualValue = radio.value;
            break;
          }
        }
        break;
      case "checkbox":
        actualValue = inputElements[0].checked ? "checked" : "unchecked";
        break;
      default:
        actualValue = inputElements[0].value;
        break;
    }

    switch (operator) {
      case "==":
        return actualValue == expectedValue;
      case "!=":
        return actualValue != expectedValue;
      case "<=":
        return Number(actualValue) <= Number(expectedValue);
      case ">=":
        return Number(actualValue) >= Number(expectedValue);
      case "<":
        return Number(actualValue) < Number(expectedValue);
      case ">":
        return Number(actualValue) > Number(expectedValue);
      default:
        return false;
    }
  }

  // After defining the evaluateStepCondition function...

  document
    .querySelectorAll("[formski-step-condition]")
    .forEach(evaluateStepCondition);

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      document
        .querySelectorAll("[formski-step-condition]")
        .forEach(evaluateStepCondition);
    });
  });

  document
    .querySelectorAll('input[type="checkbox"], input[type="radio"]')
    .forEach((input) => {
      input.addEventListener("change", () => {
        document
          .querySelectorAll("[formski-step-condition]")
          .forEach(evaluateStepCondition);
      });
    });

  function evaluateElementCondition(element) {
    let conditionString = element.getAttribute("formski-element-condition");
    if (!conditionString) return;

    let finalResult = false;

    if (conditionString.includes("{{") && conditionString.includes("}}")) {
      const conditionMatch = conditionString.match(/\{\{(.+?)\}\}/);
      if (!conditionMatch) return;

      const conditions = conditionMatch[1].split(/(\|\||&&)/);
      let orConditionsMet = false;
      let andConditionsMet = true;

      for (let i = 0; i < conditions.length; i += 2) {
        const condition = conditions[i].trim();
        const operator = conditions[i + 1];
        const result = evaluateSingleCondition(condition);

        if (operator === "||") {
          orConditionsMet = orConditionsMet || result;
          if (orConditionsMet) {
            finalResult = true;
            break; // If any OR condition is met, break out of the loop
          }
        } else if (operator === "&&") {
          andConditionsMet = andConditionsMet && result;
          if (!andConditionsMet) {
            finalResult = false;
            break; // If any AND condition is not met, break out of the loop
          }
        } else {
          finalResult = result;
        }
      }
    } else {
      finalResult = evaluateSingleCondition(conditionString);
    }

    if (finalResult) {
      element.style.display = ""; // Show the element
    } else {
      element.style.display = "none"; // Hide the element
    }
  }

  function evaluateSingleCondition(condition) {
    const [inputName, operator, expectedValue] = condition.split(
      /(==|!=|<=|>=|<|>)/
    );
    const inputElements = document.querySelectorAll(
      `[name="${inputName.trim()}"]`
    );
    if (!inputElements.length) return false;

    const inputType = inputElements[0].type;
    let actualValue;

    switch (inputType) {
      case "radio":
        for (let radio of inputElements) {
          if (radio.checked) {
            actualValue = radio.value;
            break;
          }
        }
        break;
      case "checkbox":
        actualValue = inputElements[0].checked ? "checked" : "unchecked";
        break;
      default:
        actualValue = inputElements[0].value;
        break;
    }

    switch (operator) {
      case "==":
        return actualValue == expectedValue;
      case "!=":
        return actualValue != expectedValue;
      case "<=":
        return Number(actualValue) <= Number(expectedValue);
      case ">=":
        return Number(actualValue) >= Number(expectedValue);
      case "<":
        return Number(actualValue) < Number(expectedValue);
      case ">":
        return Number(actualValue) > Number(expectedValue);
      default:
        return false;
    }
  }

  // After defining the evaluateElementCondition function...

  document
    .querySelectorAll("[formski-element-condition]")
    .forEach(evaluateElementCondition);

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      document
        .querySelectorAll("[formski-element-condition]")
        .forEach(evaluateElementCondition);
    });
  });

  document
    .querySelectorAll('input[type="checkbox"], input[type="radio"]')
    .forEach((input) => {
      input.addEventListener("change", () => {
        document
          .querySelectorAll("[formski-element-condition]")
          .forEach(evaluateElementCondition);
      });
    });

  const nextButtonElements = form.querySelectorAll("[formski-next]");
  // Existing code around line 225 (this might vary slightly based on the exact version of the script)
  nextButtonElements.forEach((element) => {
    element.addEventListener("click", () => {
      // Check if the button has the "disabled" class
      if (element.classList.contains("disabled")) {
        return; // If it's disabled, exit the function early, preventing the slide transition
      }
      let nextStepIndex = findNextStep();
      if (nextStepIndex !== -1) {
        currentStepIndex = nextStepIndex;
        updateStepVisibility();

        // Add this code to scroll to the top of the form or page
        window.scrollTo({
          top: form.offsetTop, // This scrolls to the top of the form. Replace with 0 to scroll to the top of the page.
          behavior: "smooth"
        });
      }
    });
  });

  const backButtonElements = form.querySelectorAll("[formski-back]");
  // back button function
  backButtonElements.forEach((element) => {
    element.addEventListener("click", () => {
      let previousStepIndex = findPreviousStep();
      if (previousStepIndex !== -1) {
        currentStepIndex = previousStepIndex;
        updateStepVisibility();

        // Add this code to scroll to the top of the form or page
        window.scrollTo({
          top: form.offsetTop, // This scrolls to the top of the form. Replace with 0 to scroll to the top of the page.
          behavior: "smooth"
        });
      }
    });
  });

  function updateProgressIndicator() {
    // Calculate the total number of steps that should be shown
    const totalStepsToShow = stepOrder.filter((step) => step.show).length;

    // Calculate the current progress based on the current step index
    const currentProgress = (currentStepIndex + 1) / totalStepsToShow;

    // Convert the progress to a percentage
    const progressPercentage = currentProgress * 100;

    // Find all progress indicators with the attribute "formski-progress"
    const progressIndicators = document.querySelectorAll("[formski-progress]");

    // Set the width of each progress indicator to the calculated percentage
    progressIndicators.forEach((indicator) => {
      setTimeout(() => {
        indicator.style.width = `${progressPercentage}%`;
      }, 10); // A slight delay to ensure the transition is recognized
    });
  }

  // Existing code where you set up event listeners for next and back buttons

  // Set up event listeners for input value changes on required inputs
  document
    .querySelectorAll(
      "[formski-step] input[required], [formski-step] select[required], [formski-step] textarea[required]"
    )
    .forEach((input) => {
      input.addEventListener("input", function () {
        const slideElement = input.closest("[formski-step]");
        if (slideElement) {
          manageRequiredInputsForSlide(slideElement);
        }
      });
    });

  function manageRequiredInputsForSlide(currentSlideElement) {
    const requiredInputs = currentSlideElement.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    for (let input of requiredInputs) {
      if (input.tagName === "INPUT" && input.type === "checkbox") {
        // Handle required checkboxes
        if (!input.checked) {
          disableNextButtons();
          return;
        }
      } else if (input.tagName === "INPUT" && input.type === "radio") {
        // Handle required radio buttons by group
        const radioGroupName = input.name;
        const checkedRadio = currentSlideElement.querySelector(
          `input[name="${radioGroupName}"]:checked`
        );
        if (!checkedRadio) {
          disableNextButtons();
          return;
        }
      } else {
        // Handle other required inputs
        if (!input.value.trim()) {
          disableNextButtons();
          return;
        }
      }
    }

    // If all required inputs are filled, enable the next button
    enableNextButtons();

    function disableNextButtons() {
      const nextButtons = currentSlideElement.querySelectorAll(
        "[formski-next]"
      );
      nextButtons.forEach((button) => button.classList.add("disabled"));
    }

    function enableNextButtons() {
      const nextButtons = currentSlideElement.querySelectorAll(
        "[formski-next]"
      );
      nextButtons.forEach((button) => button.classList.remove("disabled"));
    }
  }

  function mirrorInputValues() {
    // Listen for changes on any element with the "formski-mirror" attribute
    document.querySelectorAll("[formski-mirror]").forEach((inputElement) => {
      inputElement.addEventListener("change", function () {
        // Using 'change' to capture select field changes as well
        // Get the identifier from the "formski-mirror" attribute
        const identifier = this.getAttribute("formski-mirror");

        // Find all other elements with the same identifier
        const mirrorElements = document.querySelectorAll(
          `[formski-mirror="${identifier}"]`
        );

        // Determine the value based on the input type
        let newValue;
        if (this.type === "checkbox") {
          newValue = this.checked ? "Checked" : "Not Checked"; // For non-input elements
        } else {
          newValue = this.value;
        }

        // Update each mirror element with the new value
        mirrorElements.forEach((element) => {
          if (element.tagName === "INPUT" && element.type === "checkbox") {
            // Find the associated styled div for this checkbox
            const styledCheckboxDiv = element.previousElementSibling;
            if (
              styledCheckboxDiv &&
              styledCheckboxDiv.classList.contains("w-checkbox-input")
            ) {
              // Check if the styled div's state matches the source checkbox's state
              const isStyledCheckboxChecked = styledCheckboxDiv.classList.contains(
                "w--redirected-checked"
              );
              if (isStyledCheckboxChecked !== this.checked) {
                // If not, simulate a click on the styled div to toggle its state
                styledCheckboxDiv.click();
              }
            }
          } else if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA" ||
            element.tagName === "SELECT"
          ) {
            element.value = newValue;
          } else {
            // For other types of elements (e.g., a <div> or <span>), update its text content
            element.textContent = newValue;
          }
        });
      });
    });
  }

  function setDefaultValues() {
    // Handle checkboxes with the "checked" attribute or "formski-default"
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.hasAttribute("checked")) {
        checkbox.checked = true;
      }
      const defaultValue = checkbox.getAttribute("formski-default");
      if (defaultValue !== null) {
        checkbox.checked = defaultValue.toLowerCase() === "true";
      }
      // Trigger the input event to update mirrored values
      checkbox.dispatchEvent(new Event("input"));
    });

    // Handle radio buttons with the "formski-default" attribute
    const defaultRadios = document.querySelectorAll(
      'input[type="radio"][formski-default]'
    );
    defaultRadios.forEach((radio) => {
      if (radio.value === radio.getAttribute("formski-default")) {
        radio.checked = true;
        // Trigger the input event to update mirrored values
        radio.dispatchEvent(new Event("input"));
      }
    });

    // Handle other input types
    const defaultInputs = document.querySelectorAll(
      'input:not([type="checkbox"]):not([type="radio"])[formski-default], select[formski-default], textarea[formski-default]'
    );
    defaultInputs.forEach((inputElement) => {
      const defaultValue = inputElement.getAttribute("formski-default");
      inputElement.value = defaultValue;
      inputElement.dispatchEvent(new Event("input"));

      // Call the mirroring function directly for this input
      mirrorInputValues.call(inputElement);
    });
  }

  // Evaluate initial conditions and update step visibility when the page loads
  evaluateInitialConditions();
  evaluateInitialGroupConditions();
  updateStepVisibility();
  setDefaultValues(); // This should come before mirrorInputValues
  mirrorInputValues();
});