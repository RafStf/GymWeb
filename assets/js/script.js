"use strict";

// Add event

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// Navbar toggle

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
};

addEventOnElem(navLinks, "click", closeNavbar);

// back to top

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

//  BMI calculator

const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value) / 100;
  const bmi = (weight / (height * height)).toFixed(1);
  resultDiv.textContent = `Your BMI is ${bmi}`;
});

function calculate() {
  // Get user inputs
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const activityLevel = document.getElementById("activity-level").value;
  const goal = document.getElementById("goal").value;

  // Convert weight and height to metric units
  const weightKg = weight / 2.205;
  const heightCm = height * 2.54;

  // Calculate BMR using Mifflin-St Jeor equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Calculate TDEE based on activity level
  const tdee = bmr * activityLevel;

  // Calculate calorie target based on goal
  let calorieTarget;
  if (goal === "lose") {
    calorieTarget = tdee - 500;
  } else if (goal === "gain") {
    calorieTarget = tdee + 500;
  } else {
    calorieTarget = tdee;
  }

  // Calculate macronutrient targets
  const proteinTarget = weight * 2.2; // 1 gram per pound of bodyweight
  const proteinCalories = proteinTarget * 4;
  const fatCalories = calorieTarget * 0.25;
  const carbCalories = calorieTarget - proteinCalories - fatCalories;
  const carbTarget = carbCalories / 4;
  const fatTarget = fatCalories / 9;

  // Display results
  document.getElementById("protein").textContent = proteinTarget.toFixed(1);
  document.getElementById("carbs").textContent = carbTarget.toFixed(1);
  document.getElementById("fat").textContent = fatTarget.toFixed(1);
  document.getElementById("calories").textContent = calorieTarget.toFixed(0);
}
