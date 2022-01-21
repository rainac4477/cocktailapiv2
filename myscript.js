var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
let mainDiv;

/*
Because of how there is no array in the JSON the api provided,
the code is full of if statement and very ugly.
*/


window.onload = function (){
	//default setting
	document.getElementById("sb-name").classList.add("special");
	
	mainDiv = document.getElementById("main");
	 
	 fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list")
    .then(response => response.json())
    .then(data => console.log(data) 
    );	
}
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
*/0
const toSearch = function (event) {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
         fetchSearch();
         event.preventDefault();
    }
}

function openSide() {
	
	const mediaQuery = window.matchMedia('(min-width: 768px)')
	if (mediaQuery.matches) { //for destop
		document.getElementById("main").style.marginLeft = "15%";
		document.getElementById("main").style.setProperty("width", "calc(100vw - 15vw - 10%)");
	}
	else { //for mobile
		document.getElementById("wrap").style.opacity = "0";
		document.getElementById("wrap").style.visibility = "hidden";
	}
	document.getElementById("sidebar").style.boxShadow = "0px 50px 30px rgba(0,0,0,0.7)";
	document.getElementById("sidebar").style.left = "0";
	document.getElementById("openNav").style.opacity = "0";
	document.getElementById("openNav").style.visibility = 'hidden';
}

function closeSide() {
	
	const mediaQuery = window.matchMedia('(min-width: 768px)')
	if (mediaQuery.matches) {
		document.getElementById("main").style.margin = "0";
		document.getElementById("sidebar").style.left = "-15%";
		document.getElementById("hero-screen").style.width = "100vw";
		document.getElementById("main").style.setProperty("width", "calc(100vw - 10%)");
	}
	else {
		document.getElementById("wrap").style.opacity = "1";
		
		document.getElementById("wrap").style.visibility = "visible";
		document.getElementById("sidebar").style.left = "-100%";
	}
	document.getElementById("sidebar").style.boxShadow = "none";
	document.getElementById("openNav").style.opacity = "1";
	document.getElementById("openNav").style.visibility = "visible";
}

function returnOriSetup() {
	mainDiv.innerHTML = "";
	document.getElementById("hero-screen").style.height = "100vh";
	document.getElementById("hero-screen").innerHTML = "<div><h1 id='big-title' >Alcohol You Later - Cocktail Recipes</h1> <hr> <p>We provide all kinds of drinks recipes, not only it is free, it is also wide-range.<br>Sweet hot chocolates to cocktails, we’ve got it.</p></div>";
}

function fetchSearch() {
  document.getElementById("hero-screen").style.height = "0";
  document.getElementById("hero-screen").innerHTML = "";
  document.getElementById("main").innerHTML = "";
	
  var search = document.getElementById("search").value;  
  
  if (search == "" || search == undefined || search == null){
	  alert ("empty search");
  }
  
  else {
  fetch(url + search)
    .then(response => response.json())
    .then(data => showData(data) 
    );
  }
}

function fetchUrl() {
  document.getElementById("hero-screen").style.height = "0";
  document.getElementById("hero-screen").innerHTML = "";
  document.getElementById("main").innerHTML = "";
  fetch(url2)
    .then(response => response.json())
    .then(data => showData(data) 
    );
}

function showData(data) {
	console.log(data);
	if (data.drinks == null){
		searchRan();
		mainDiv.innerHTML = "Sorry, no result found!<br>Maybe try out this one?";
		return;
	}
	let drinkCounter = 0;
	while (drinkCounter < data.drinks.length) {

		var elemDrink = document.createElement("div");
		elemDrink.classList.add("drinkList");
		elemDrink.setAttribute("id", data.drinks[drinkCounter].idDrink );
		var elemDrinkName = document.createElement("h2");
		var elemDrinkImg = document.createElement("img");
		elemDrinkImg.classList.add("drinkImage");
		var elemDrinkId = document.createElement("h6");
		elemDrinkId.classList.add("drinkId");
		
		
		elemDrinkName.innerHTML = data.drinks[drinkCounter].strDrink;
		elemDrinkImg.src = data.drinks[drinkCounter].strDrinkThumb + "/preview";
		elemDrinkId.innerHTML = data.drinks[drinkCounter].idDrink;
	
		//Add onclick on Drink List
		elemDrink.addEventListener("click", getDrinkDetailInfo);
		
		
		drinkCounter ++;
		mainDiv.appendChild(elemDrink);
		elemDrink.appendChild(elemDrinkName);
		elemDrink.appendChild(elemDrinkImg);
		elemDrink.appendChild(elemDrinkId);
		
		
	}
	
}

function getDrinkDetailInfo(){
	let DrinkId = this.id;
	console.log(DrinkId);
	
	let drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
	
	 fetch(drinkUrl + DrinkId)
    .then(response => response.json())
    .then(data => showDetailDrinkInfo(data) 
    );
}

function showDetailDrinkInfo(data)  {
	let main2Div = document.getElementById("main-drink");
	
	document.getElementById("detailInfo").innerHTML = "<h2 id='drinkTitle'>Drink title not found </h2> <h6 id='drinkId'>Drink Id not found</h6> <p id='drinkDate'>Last modified date: </p> <p id='drinkType'>Category:<br></p> <p id='drinkGlass'>Drink glass:<br></p> <p id='alcho'>Alcholic:<br></p>";
	
	let drinkTitleH2 = document.getElementById("drinkTitle");
	let drinkIdH6 = document.getElementById("drinkId");
	let drinkDateP = document.getElementById("drinkDate");
	let detailInfoDiv = document.getElementById("detailInfo");
	var elemDrinkThumb = document.createElement("img");
	elemDrinkThumb.classList.add("drinkImage-info");
	elemDrinkThumb.id = ("drinkImage");
  let drinkTypeP = document.getElementById("drinkType");
  let alchoP = document.getElementById("alcho");
  let drinkGlassP = document.getElementById("drinkGlass");
  let drinkInstruDiv = document.getElementById("instru");
  let instruLangSelecUl = document.getElementById("instruLangSelec");
	
	console.log(data);
	
	drinkTitleH2.innerHTML = data.drinks[0].strDrink;
	elemDrinkThumb.src = data.drinks[0].strDrinkThumb;
	detailInfoDiv.appendChild(elemDrinkThumb);
	drinkIdH6.innerHTML = data.drinks[0].idDrink;
	drinkDateP.innerHTML += data.drinks[0].dateModified;
	drinkTypeP.innerHTML += data.drinks[0].strCategory;
	
	if (data.drinks[0].strInstructions != null){
	instruLangSelecUl.innerHTML += "<li id='englang' >English</li>";
	
	
	//default
	let instru = data.drinks[0].strInstructions;
	drinkInstruDiv.innerHTML = data.drinks[0].strInstructions;
	drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
	
	document.getElementById("englang").addEventListener("click", function() {
		drinkInstruDiv.innerHTML = data.drinks[0].strInstructions.replaceAll(". ", ". <br>");
	});
	}
	if (data.drinks[0].strInstructionsDE != null){
		var DEInstruBtn = document.createElement("li");
		DEInstruBtn.innerHTML = "German";
		instruLangSelecUl.appendChild(DEInstruBtn);
		DEInstruBtn.onclick = function () {
			instru = data.drinks[0].strInstructionsDE;
			drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
		};
	}
	
	if (data.drinks[0].strInstructionsES != null){
		var ESInstruBtn = document.createElement("li");
		DEInstruBtn.innerHTML = "Spanish";
		instruLangSelecUl.appendChild(ESInstruBtn);
		ESInstruBtn.onclick = function () {
			instru = data.drinks[0].strInstructionsES;
			drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
		};
	}
	
	if (data.drinks[0].strInstructionsFR != null){
		var FRInstruBtn = document.createElement("li");
		FRInstruBtn.innerHTML = "French";
		instruLangSelecUl.appendChild(FRInstruBtn);
		FRInstruBtn.onclick = function () {
			instru = data.drinks[0].strInstructionsFR;
			drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
		}
	}
	
	if (data.drinks[0].strInstructionsIT != null){
		var ITInstruBtn = document.createElement("li");
		ITInstruBtn.innerHTML = "Italian";
		instruLangSelecUl.appendChild(ITInstruBtn);
		ITInstruBtn.onclick = function () {
			instru = data.drinks[0].strInstructionsIT;
			drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
		}
	}
	
	if ( data.drinks[0]['strInstructionsZH-HANS'] != null){
		var ZHHANSInstruBtn = document.createElement("li");
		ZHHANSInstruBtn.innerHTML = "Simplified Chinese";
		instruLangSelecUl.appendChild(ZHHANSInstruBtn);
		ZHHANSInstruBtn.onclick = function () {
			instru = data.drinks[0]['strInstructionsZH-HANS'];
			drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
		}
	}
	
	if (data.drinks[0]['strInstructionsZH-HANT'] != null){
		var ZHHANTInstruBtn = document.createElement("li");
		ZHHANTInstruBtn.innerHTML = "Traditional Chinese";
		instruLangSelecUl.appendChild(ZHHANTInstruBtn);
		ZHHANTInstruBtn.onclick = function () {
			instru = data.drinks[0]['strInstructionsZH-HANT'];
			drinkInstruDiv.innerHTML = instru.replaceAll(". ", ".<br>");
		}
	}
 

 if (data.drinks[0].strAlcoholic == "Alocholic"){
  alchoP.innerHTML = "Alocholic";
}
  else {
    alchoP.innerHTML = "Not alocholic";
  }
  drinkGlassP.innerHTML += data.drinks[0].strGlass;
  
  openDrink();
  
  if (data.drinks[0].strIngredient1 != null && data.drinks[0].strIngredient1 != ""){
	var elemDrinkIng1 = document.createElement("div");
	elemDrinkIng1.classList.add("drinkIngredient");
	var elemDrinkIng1Img = document.createElement("img");
	elemDrinkIng1Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient1 + "-Small.png";
	elemDrinkIng1Img.classList.add("drinkIngredientImage");
	elemDrinkIng1.appendChild(elemDrinkIng1Img);
	elemDrinkIng1.innerHTML += data.drinks[0].strIngredient1;
	if (data.drinks[0].strMeasure1 != null){
	elemDrinkIng1.innerHTML += "<b>" + data.drinks[0].strMeasure1 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng1);
  }else {
	  return;
  }
  
    if (data.drinks[0].strIngredient2 != null && data.drinks[0].strIngredient2 != ""){
	var elemDrinkIng2 = document.createElement("div");
	elemDrinkIng2.classList.add("drinkIngredient");
	var elemDrinkIng2Img = document.createElement("img");
	elemDrinkIng2Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient2 + "-Small.png";
	elemDrinkIng2Img.classList.add("drinkIngredientImage");
	elemDrinkIng2.appendChild(elemDrinkIng2Img);
	elemDrinkIng2.innerHTML += data.drinks[0].strIngredient2;
	if (data.drinks[0].strMeasure2 != null){
	elemDrinkIng2.innerHTML += "<b>" + data.drinks[0].strMeasure2 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng2);
  }else {
	  return;
  }
	
	if (data.drinks[0].strIngredient3 != null && data.drinks[0].strIngredient3 != ""){
	var elemDrinkIng3 = document.createElement("div");
	elemDrinkIng3.classList.add("drinkIngredient");
	var elemDrinkIng3Img = document.createElement("img");
	elemDrinkIng3Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient3 + "-Small.png";
	elemDrinkIng3Img.classList.add("drinkIngredientImage");
	elemDrinkIng3.appendChild(elemDrinkIng3Img);
	elemDrinkIng3.innerHTML += data.drinks[0].strIngredient3;
	if (data.drinks[0].strMeasure3 != null){
	elemDrinkIng3.innerHTML += "<b>" + data.drinks[0].strMeasure3 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng3);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient4 != null && data.drinks[0].strIngredient4 != ""){
	var elemDrinkIng4 = document.createElement("div");
	elemDrinkIng4.classList.add("drinkIngredient");
	var elemDrinkIng4Img = document.createElement("img");
	elemDrinkIng4Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient4 + "-Small.png";
	elemDrinkIng4Img.classList.add("drinkIngredientImage");
	elemDrinkIng4.appendChild(elemDrinkIng4Img);
	elemDrinkIng4.innerHTML += data.drinks[0].strIngredient4;
	if (data.drinks[0].strMeasure4 != null){
	elemDrinkIng4.innerHTML += "<b>" + data.drinks[0].strMeasure4 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng4);
  }else {
	  
	  return;
  }
  
  if (data.drinks[0].strIngredient5 != null && data.drinks[0].strIngredient5 != ""){
	  
	var elemDrinkIng5 = document.createElement("div");
	elemDrinkIng5.classList.add("drinkIngredient");
	var elemDrinkIng5Img = document.createElement("img");
	elemDrinkIng5Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient5 + "-Small.png";
	elemDrinkIng5Img.classList.add("drinkIngredientImage");
	elemDrinkIng5.appendChild(elemDrinkIng5Img);
	elemDrinkIng5.innerHTML += data.drinks[0].strIngredient5;
	if (data.drinks[0].strMeasure5 != null){
	elemDrinkIng5.innerHTML += "<b>" + data.drinks[0].strMeasure5 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng5);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient6 != null && data.drinks[0].strIngredient6 != ""){
	var elemDrinkIng6 = document.createElement("div");
	elemDrinkIng6.classList.add("drinkIngredient");
	var elemDrinkIng6Img = document.createElement("img");
	elemDrinkIng6Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient6 + "-Small.png";
	elemDrinkIng6Img.classList.add("drinkIngredientImage");
	elemDrinkIng6.appendChild(elemDrinkIng6Img);
	elemDrinkIng6.innerHTML += data.drinks[0].strIngredient6;
	if (data.drinks[0].strMeasure6 != null){
	elemDrinkIng6.innerHTML += "<b>" + data.drinks[0].strMeasure6 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng6);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient7 != null && data.drinks[0].strIngredient7 != ""){
	var elemDrinkIng7 = document.createElement("div");
	elemDrinkIng7.classList.add("drinkIngredient");
	var elemDrinkIng7Img = document.createElement("img");
	elemDrinkIng7Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient7 + "-Small.png";
	elemDrinkIng7Img.classList.add("drinkIngredientImage");
	elemDrinkIng7.appendChild(elemDrinkIng7Img);
	elemDrinkIng7.innerHTML += data.drinks[0].strIngredient7;
	if (data.drinks[0].strMeasure7 != null){
	elemDrinkIng7.innerHTML += "<b>" + data.drinks[0].strMeasure7 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng7);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient8 != null && data.drinks[0].strIngredient8 != ""){
	var elemDrinkIng8 = document.createElement("div");
	elemDrinkIng8.classList.add("drinkIngredient");
	var elemDrinkIng8Img = document.createElement("img");
	elemDrinkIng8Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient8 + "-Small.png";
	elemDrinkIng8Img.classList.add("drinkIngredientImage");
	elemDrinkIng8.appendChild(elemDrinkIng8Img);
	elemDrinkIng8.innerHTML += data.drinks[0].strIngredient8;
	if (data.drinks[0].strMeasure8 != null){
	elemDrinkIng8.innerHTML += "<b>" + data.drinks[0].strMeasure8 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng8);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient9 != null && data.drinks[0].strIngredient9 != ""){
	var elemDrinkIng9 = document.createElement("div");
	elemDrinkIng9.classList.add("drinkIngredient");
	var elemDrinkIng9Img = document.createElement("img");
	elemDrinkIng9Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient9 + "-Small.png";
	elemDrinkIng9Img.classList.add("drinkIngredientImage");
	elemDrinkIng9.appendChild(elemDrinkIng9Img);
	elemDrinkIng9.innerHTML += data.drinks[0].strIngredient9;
	if (data.drinks[0].strMeasure9 != null){
	elemDrinkIng9.innerHTML += "<b>" + data.drinks[0].strMeasure9 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng9);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient10 != null && data.drinks[0].strIngredient10 != ""){
	var elemDrinkIng10 = document.createElement("div");
	elemDrinkIng10.classList.add("drinkIngredient");
	var elemDrinkIng10Img = document.createElement("img");
	elemDrinkIng10Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient1 + "-Small.png";
	elemDrinkIng10Img.classList.add("drinkIngredientImage");
	elemDrinkIng10.appendChild(elemDrinkIng10Img);
	elemDrinkIng10.innerHTML += data.drinks[0].strIngredient10;
	if (data.drinks[0].strMeasure10 != null){
	elemDrinkIng10.innerHTML += "<b>" + data.drinks[0].strMeasure10 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng10);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient11 != null && data.drinks[0].strIngredient11 != ""){
	var elemDrinkIng11 = document.createElement("div");
	elemDrinkIng11.classList.add("drinkIngredient");
	var elemDrinkIng11Img = document.createElement("img");
	elemDrinkIng11Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient11 + "-Small.png";
	elemDrinkIng11Img.classList.add("drinkIngredientImage");
	elemDrinkIng11.innerHTML += data.drinks[0].strIngredient11;
	if (data.drinks[0].strMeasure11 != null){
	elemDrinkIng11.innerHTML += "<b>" + data.drinks[0].strMeasure11 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng11);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient12 != null && data.drinks[0].strIngredient12 != ""){
	var elemDrinkIng12 = document.createElement("div");
	elemDrinkIng12.classList.add("drinkIngredient");
	var elemDrinkIng12Img = document.createElement("img");
	elemDrinkIng12Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient12 + "-Small.png";
	elemDrinkIng12Img.classList.add("drinkIngredientImage");
	elemDrinkIng12.innerHTML += data.drinks[0].strIngredient12;
	if (data.drinks[0].strMeasure12 != null){
	elemDrinkIng12.innerHTML += "<b>" + data.drinks[0].strMeasure12 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng12);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient13 != null && data.drinks[0].strIngredient13 != ""){
	var elemDrinkIng13 = document.createElement("div");
	elemDrinkIng13.classList.add("drinkIngredient");
	var elemDrinkIng13Img = document.createElement("img");
	elemDrinkIng13Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient13 + "-Small.png";
	elemDrinkIng13Img.classList.add("drinkIngredientImage");
	elemDrinkIng13.innerHTML += data.drinks[0].strIngredient13;
	if (data.drinks[0].strMeasure13 != null){
	elemDrinkIng13.innerHTML += "<b>" + data.drinks[0].strMeasure13 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng13);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient14 != null && data.drinks[0].strIngredient14 != ""){
	var elemDrinkIng14 = document.createElement("div");
	elemDrinkIng14.classList.add("drinkIngredient");
	var elemDrinkIng14Img = document.createElement("img");
	elemDrinkIng14Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient14 + "-Small.png";
	elemDrinkIng14Img.classList.add("drinkIngredientImage");
	elemDrinkIng14.innerHTML += data.drinks[0].strIngredient14;
	if (data.drinks[0].strMeasure14 != null){
	elemDrinkIng14.innerHTML += "<b>" + data.drinks[0].strMeasure14 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng14);
  }else {
	  return;
  }
  
  if (data.drinks[0].strIngredient15 != null && data.drinks[0].strIngredient15 != ""){
	var elemDrinkIng15 = document.createElement("div");
	elemDrinkIng15.classList.add("drinkIngredient");
	var elemDrinkIng15Img = document.createElement("img");
	elemDrinkIng15Img.src = "https://www.thecocktaildb.com/images/ingredients/" + data.drinks[0].strIngredient15 + "-Small.png";
	elemDrinkIng15Img.classList.add("drinkIngredientImage");
	elemDrinkIng15.innerHTML += data.drinks[0].strIngredient15;
	if (data.drinks[0].strMeasure15 != null){
	elemDrinkIng15.innerHTML += "<b>" + data.drinks[0].strMeasure15 + "</b>";
	}
	main2Div.appendChild(elemDrinkIng15);
  }else {
	  return;
  }
  
}
/*
function sendToIng (currentIng) {
  console.log("sending to Ing");
  console.log(currentIng);
  
  
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + currentIng)
    .then(response => response.json())
    .then(ingData => showIngData(ingData, currentIng) 
    );
}

function showIngData(ingData, currentIng) {
	console.log(ingData);
	document.getElementById("drink-wrap").innerHTML = "";
	
	var detailIngInfo = document.createElement("div");
	detailIngInfo.classList.add("detailIngInfo");
	document.getElementById("drink-wrap").appendChild(detailIngInfo);
	var elemDrinkThumb = document.createElement("img");
	elemDrinkThumb.classList.add("drinkImage-info");
	elemDrinkThumb.id = ("drinkImage");
	elemDrinkThumb.src = "https://www.thecocktaildb.com/images/ingredients/" + currentIng + "-Medium.png";
	detailIngInfo.appendChild(elemDrinkThumb);
	
	detailIngInfo
	
}*/

function openDrink() {
  document.getElementById("drink-wrap").classList.add("visible");
  document.getElementById("wrap").style.overflow = "hidden";
  document.getElementById("wrap").style.maxHeight = "80vh";
  document.getElementById("wrap").style.height = "80vh";
}

function closeDrink() {
  document.getElementById("drink-wrap").classList.remove("visible");
  document.getElementById("wrap").style.overflow = "auto";
  document.getElementById("wrap").style.maxHeight = "none";
  document.getElementById("wrap").style.height = "auto";
  
  document.getElementById("detailInfo").innerHTML = "";
  document.getElementById("instruLangSelec").innerHTML = "";
  document.getElementById("instru").innerHTML = "";
  document.getElementById("main-drink").innerHTML = "";
  
  
}

function searchBName () {

	document.getElementById("sb-ing").classList.remove("special");
	document.getElementById("sb-id").classList.remove("special");
	document.getElementById("sb-name").classList.add("special");
	
	var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
}

function searchBIng () {
	
	document.getElementById("sb-name").classList.remove("special");
	document.getElementById("sb-id").classList.remove("special");
	document.getElementById("sb-ing").classList.add("special");

	var url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
	
}

function searchBId() {
	
	document.getElementById("sb-name").classList.remove("special");
	document.getElementById("sb-ing").classList.remove("special");
	document.getElementById("sb-id").classList.add("special");
	
	var url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
}

function searchRan() {
    url2 = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

	const mediaQuery = window.matchMedia('(max-width: 768px)')
	if (mediaQuery.matches) { //for mobile
		closeSide();
	}
    fetchUrl();
}

function allAlco() {
	url2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
	
	const mediaQuery = window.matchMedia('(max-width: 768px)')
	if (mediaQuery.matches) { //for mobile
		closeSide();
	}
	fetchUrl();
}

function allNonAl() {
	url2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
	
	const mediaQuery = window.matchMedia('(max-width: 768px)')
	if (mediaQuery.matches) { //for mobile
		closeSide();
	}
	fetchUrl();
}

function allCoc() {
	url2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
	
	const mediaQuery = window.matchMedia('(max-width: 768px)')
	if (mediaQuery.matches) { //for mobile
		closeSide();
	}
	fetchUrl();
}

function allOrd() {
	url2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
	
	const mediaQuery = window.matchMedia('(max-width: 768px)')
	if (mediaQuery.matches) { //for mobile
		closeSide();
	}
	fetchUrl();
}

/*
function createInstru (data) {
	
	var 
	
}

*/