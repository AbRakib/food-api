// main data fetch
const mealdb = (searchText) => {
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
	fetch(url)
	.then(res => res.json())
	.then(data => displayMeal(data.meals))
	.catch((error) => {
		console.error('Error:', error);
	});	
}


// search dynamic 
const searchMeal = () => {
	const searchText = document.getElementById('inputText').value;
	mealdb(searchText);
}

const displayMeal = meals => {

	const mealContainer = document.getElementById('mealContainer');
	// clean data
	mealContainer.innerHTML = "";
	// console.log(meals);

	// error handle
	if(meals === null){
		const errorDiv = document.createElement('div');
		errorDiv.innerHTML = `
			<center>Sorry!!! Food not found!</center>
		`;
		mealContainer.appendChild(errorDiv);
	}

	meals.forEach(meal => {

		// create new div element
		const mealDiv = document.createElement('div');

		// add class for div 
		mealDiv.classList.add('col-md-6');
		
		// add HTML Card for show meals data
		mealDiv.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    	<a href=""><img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}"></a>
                    </div>
                    <div class="col-md-8">
	                    <div class="card-body">
	                        <h5 class="card-title">${meal.strMeal}</h5>
	                        <p class="card-text">
	                        	<span class="fw-bold text-danger">Recipe:</span> <span class="small">${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}, ${meal.strIngredient6}, ${meal.strIngredient7}, ${meal.strIngredient8}, ${meal.strIngredient9}, ${meal.strIngredient10}</span>
	                        	</br>
	                        	<span class="fw-bold text-danger">Youtube:</span> <a target="_blank" class="small" href="${meal.strYoutube}">Click Here For Cooking Video</a>
	                        </p>
	                        <p class="card-text"><small class="text-muted">Category: ${meal.strCategory}</small> | <small class="text-muted">Popular Area: ${meal.strArea}</small></p>
	                        <button onclick="mealDetails(${meal.idMeal})" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</button>
	                    </div>
                    </div>
                </div>
            </div>
        `;

        // append children class 
        mealContainer.appendChild(mealDiv);

	});	
}

const mealDetails = async(idMeal) => {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
	const res = await fetch(url);
	const data = await res.json();
	const meal = data.meals[0];
	// console.log(meal);
	const singleMealContainer = document.getElementById('singleMealContainer');
	singleMealContainer.innerHTML = `
		<div class="modal-header">
	        <h1 class="modal-title fs-5 fw-bold" id="staticBackdropLabel">${meal.strMeal}</h1>
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	    </div>
	    <div class="modal-body">
	    	<img src="${meal.strMealThumb}" class="img-fluid" />
	    	<div class="small mt-2">
	        	<p><span class="fw-bold">Popular in: </span>${meal.strArea}</p>
	        	<div class="small text-muted">${meal.strInstructions}</div>
	        </div>
	    </div>
	    <div class="modal-footer">
	        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
	        <a target="_blank" href="${meal.strYoutube}" type="button" class="btn btn-danger btn-sm">Watch Now</a>
	    </div>
	`;
}


mealdb('fish');