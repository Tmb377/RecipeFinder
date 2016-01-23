document.addEventListener('DOMContentLoaded', start);

function start(){
	var recid = document.getElementById("recid").innerHTML;
	

	var req = new XMLHttpRequest()
	var url = "http://api.yummly.com/v1/api/recipe/" + recid + "?_app_id=XXXX&_app_key=XXXX";

	req.open('GET', url, true);
	

	req.addEventListener('load', function(){
		
		if(req.status >= 200 && req.status < 400){
			var obj = JSON.parse(req.responseText);
			
			//add the recipe title to the page
			var title = document.getElementById("recName");
			title.appendChild(document.createTextNode(obj.name));
			//add the recipe image to the page if it exists
			var recImage = document.getElementById("recimg");
			if(obj.hasOwnProperty('images')){	
				if(obj.images[0].hasOwnProperty('hostedLargeUrl') != undefined){
					recImage.src = obj.images[0].hostedLargeUrl;
					recImage.classList.add("smallImage");
				}
				else if(obj.images[0].hasOwnProperty('hostedMediumUrl') != undefined){
					recImage.src = obj.images[0].hostedMediumUrl;
					recImage.classList.add("smallImage");
				}
				else if(obj.imgages.hasOwnProperty('hostedSmallUrl') != undefined){
					recImage.src = obj.images[0].hostedSmallUrl;
					recImage.classList.add("smallImage");
				}
			}
			//add all the ingredients to the page
			var allIngred = obj.ingredientLines;
			var list = document.getElementById('ingredientList');
			
			allIngred.forEach(function(ing){
				var para = document.createElement("p");
				para.classList.add("ingredientLine");
				var newLine = document.createElement("input");
				para.appendChild(newLine);
				newLine.type = "checkbox";
				newLine.name = "ingCheck";
				newLine.value = ing;
				
				var label = document.createElement('label');
				label.appendChild(document.createTextNode(ing));
			
				para.appendChild(label);
				list.appendChild(para);
				
			});
			//add button to add to favorites
			var favButton = document.getElementById("favForm");
			//add hidden input to pass to server of recipe name and id
			var hiddenFav = document.createElement("input");
			hiddenFav.type = "hidden"
			hiddenFav.value = obj.name;
			hiddenFav.name = "recipeName"
			favButton.appendChild(hiddenFav);
			var submitButton = document.createElement('input');
			submitButton.classList.add("btn");
			var hiddenInput = document.createElement('input');
			hiddenInput.type = "hidden";
			hiddenInput.name = "recipeName";
			hiddenInput.value = obj.name;
			submitButton.classList.add('subButton');
			submitButton.type = "submit";
			submitButton.value = "Add Checked Ingredients to List!";
			list.appendChild(hiddenInput);
			list.appendChild(submitButton);
			//add link to blog recipe
			var outDiv = document.getElementById("outlink")
			var outlink = document.createElement('a');
			outlink.target = "_blank";
			outlink.classList.add("blogLink");
			var linkText = "Get the whole recipe at " + obj.source.sourceDisplayName + "!";
			outlink.appendChild(document.createTextNode(linkText));
			outlink.href = obj.source.sourceRecipeUrl;
			outDiv.appendChild(outlink);
			document.getElementById("source").innerHTML = obj.attribution.html;
			

		}
	});

	req.send();
}