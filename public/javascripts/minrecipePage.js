function start(){var e=document.getElementById("recid").innerHTML,t=new XMLHttpRequest,a="http://api.yummly.com/v1/api/recipe/"+e+"?_app_id=XXXX&_app_key=XXXX";t.open("GET",a,!0),t.addEventListener("load",function(){if(t.status>=200&&t.status<400){var e=JSON.parse(t.responseText),a=document.getElementById("recName");a.appendChild(document.createTextNode(e.name));var d=document.getElementById("recimg");e.hasOwnProperty("images")&&(void 0!=e.images[0].hasOwnProperty("hostedLargeUrl")?(d.src=e.images[0].hostedLargeUrl,d.classList.add("smallImage")):void 0!=e.images[0].hasOwnProperty("hostedMediumUrl")?(d.src=e.images[0].hostedMediumUrl,d.classList.add("smallImage")):void 0!=e.imgages.hasOwnProperty("hostedSmallUrl")&&(d.src=e.images[0].hostedSmallUrl,d.classList.add("smallImage")));var n=e.ingredientLines,i=document.getElementById("ingredientList");n.forEach(function(e){var t=document.createElement("p");t.classList.add("ingredientLine");var a=document.createElement("input");t.appendChild(a),a.type="checkbox",a.name="ingCheck",a.value=e;var d=document.createElement("label");d.appendChild(document.createTextNode(e)),t.appendChild(d),i.appendChild(t)});var r=document.getElementById("favForm"),s=document.createElement("input");s.type="hidden",s.value=e.name,s.name="recipeName",r.appendChild(s);var c=document.createElement("input");c.classList.add("btn");var m=document.createElement("input");m.type="hidden",m.name="recipeName",m.value=e.name,c.classList.add("subButton"),c.type="submit",c.value="Add Checked Ingredients to List!",i.appendChild(m),i.appendChild(c);var l=document.getElementById("outlink"),o=document.createElement("a");o.target="_blank",o.classList.add("blogLink");var p="Get the whole recipe at "+e.source.sourceDisplayName+"!";o.appendChild(document.createTextNode(p)),o.href=e.source.sourceRecipeUrl,l.appendChild(o),document.getElementById("source").innerHTML=e.attribution.html}}),t.send()}document.addEventListener("DOMContentLoaded",start);