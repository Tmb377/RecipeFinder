


document.addEventListener('DOMContentLoaded', start);


function start(){
	document.getElementById('searchButton').addEventListener('click', handleSearch);

	function handleSearch(param){
		var div = document.getElementById('recipes');
		while(div.hasChildNodes()){
					div.removeChild(div.childNodes[0]);
				}

		var req = new XMLHttpRequest();
		var searchTerm = document.getElementById('searchBox').value;
		var searchFormat = searchTerm.replace(" ", "%20")
		var url = 'http://api.yummly.com/v1/api/recipes?_app_id=XXXX&_app_key=XXXX&q=' + searchFormat;

		req.open('GET', url, true);

		req.addEventListener('load', function(){

			if (req.status >= 200 && req.status < 400){

				var obj = JSON.parse(req.responseText);
				var matches = obj.matches;
				matches.forEach(function(rec){
					//create a block for each matching recipe from returned JSON
					var newDiv = document.createElement('div');
					newDiv.classList.add('recipeDiv');
					newDiv.classList.add('col-md-6');
					
					//add link to recipe page
					var a = document.createElement('a');
					var name = document.createTextNode(rec.recipeName);
					//add cooking time info
					var p = document.createElement('p');
					p.classList.add('recipeInfo');
					p.classList.add('small-4');
					p.classList.add('columns');
					p.classList.add('col-md-4');
					var time = Math.floor(rec.totalTimeInSeconds /60);
		
					//if time is longer than an hour 
					var totaltime;
					if(time >= 60 ){
						totaltime = Math.floor(time/60) + " h " + time%60 + " min";
					}
					else{
						totaltime = time +  " min";
					}
					p.appendChild(document.createTextNode(totaltime));
					a.classList.add('recipeName');
					a.classList.add('col-md-4');
					a.classList.add('small-4');
					a.classList.add('columns');
					
					a.appendChild(name);
					a.href = "/search/" + rec.id;
					newDiv.appendChild(a);
					var img = document.createElement('img');
					img.classList.add('recipeImg');
					img.classList.add('col-md-3');
		
					for(key in rec.imageUrlsBySize){
						if(rec.imageUrlsBySize.hasOwnProperty(key)){
							var value = rec.imageUrlsBySize[key];
							img.src = value;
						}
					}
					newDiv.appendChild(img);
					newDiv.appendChild(p);
					//add to html doc
					div.appendChild(newDiv);
				});
				
				
			}
		});

		


		req.send();
	}
}

