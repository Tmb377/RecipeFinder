function start(){function e(e){for(var a=document.getElementById("recipes");a.hasChildNodes();)a.removeChild(a.childNodes[0]);var d=new XMLHttpRequest,t=document.getElementById("searchBox").value,s=t.replace(" ","%20"),c="http://api.yummly.com/v1/api/recipes?_app_id=XXXX&_app_key=XXXXX&q="+s;d.open("GET",c,!0),d.addEventListener("load",function(){if(d.status>=200&&d.status<400){var e=JSON.parse(d.responseText),t=e.matches;t.forEach(function(e){var d=document.createElement("div");d.classList.add("recipeDiv"),d.classList.add("col-md-6");var t=document.createElement("a"),s=document.createTextNode(e.recipeName),c=document.createElement("p");c.classList.add("recipeInfo"),c.classList.add("small-4"),c.classList.add("columns"),c.classList.add("col-md-4");var i,n=Math.floor(e.totalTimeInSeconds/60);i=n>=60?Math.floor(n/60)+" h "+n%60+" min":n+" min",c.appendChild(document.createTextNode(i)),t.classList.add("recipeName"),t.classList.add("col-md-4"),t.classList.add("small-4"),t.classList.add("columns"),t.appendChild(s),t.href="/search/"+e.id,d.appendChild(t);var l=document.createElement("img");l.classList.add("recipeImg"),l.classList.add("col-md-3");for(key in e.imageUrlsBySize)if(e.imageUrlsBySize.hasOwnProperty(key)){var r=e.imageUrlsBySize[key];l.src=r}d.appendChild(l),d.appendChild(c),a.appendChild(d)})}}),d.send()}document.getElementById("searchButton").addEventListener("click",e)}document.addEventListener("DOMContentLoaded",start);