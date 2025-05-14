// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem("recipes")) || []; // a9 -> get recipes from localStorage
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	const main = document.querySelector("main"); // a10 -> get ref to main element

	recipes.forEach((recipe) => {
		const recipeCard = document.createElement("recipe-card"); 	// a11 -> create a recipe card
		recipeCard.data = recipe; 									// a11 -> set data to recipe
		main.append(recipeCard); 									// a11 -> append each element to main
	});
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	localStorage.setItem("recipes", JSON.stringify(recipes)); // b1 -> save recipes to localStorage
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	const form = document.querySelector("form"); 			// b2 -> get ref to form element
	form.addEventListener("submit", (event) => { 			// b3 -> add event listener to form
		event.preventDefault();
		const formData = new FormData(form);				// b4 -> create new FormData object
		const recipeObject = {}; 							// b5 -> create empty object
		for (let [key, value] of formData.entries()) {		// b5 -> extract keys and values
			recipeObject[key] = value;
		}

		const recipeCard = document.createElement("recipe-card"); 	// b6 -> create new recipe card
		recipeCard.data = recipeObject; 						 	// b7 -> add data to recipe card
		document.querySelector("main").append(recipeCard); 			// b8 -> append recipe card to main
		const recipes = getRecipesFromStorage(); 					// b9 -> get recipes from localStorage
		recipes.push(recipeObject); 								
		saveRecipesToStorage(recipes);
		form.reset();						
	});

	const clearButton = document.querySelector("button.danger"); 	// b10 -> get ref to clear button
	clearButton.addEventListener("click", () => { 					// b11 -> add event listener to clear button
		localStorage.clear(); 										// b12 -> clear localStorage
		document.querySelector("main").innerHTML = ""; 				// b13 -> delete contents of main
	});
}