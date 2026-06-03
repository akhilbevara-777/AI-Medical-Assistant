async function diagnose() {

const symptoms = document.getElementById("symptoms").value;
const language = document.getElementById("language").value;

const response = await fetch("http://localhost:5678/webhook-test/medical-ai", {
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
symptoms:symptoms,
language:language
})

});

const data = await response.json();

let clean = data.output
.replace(/```json/g,'')
.replace(/```/g,'')
.trim();

const result = JSON.parse(clean);

/* Disease */
document.getElementById("disease").innerText = result.disease;

/* Disease Image */
const diseaseImage = document.getElementById("diseaseImage");

if(result.diseaseImage){
diseaseImage.src = result.diseaseImage;
} else {
diseaseImage.src =
"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
}

/* Explanation */
document.getElementById("explanation").innerText =
result.explanation;

/* Medicines */
let medicinesHTML = "";

result.medicines.forEach(med => {

medicinesHTML += `
<div style="margin-bottom:20px">

<p><b>${med.name}</b></p>

<img
src="${med.image}"
width="150"

onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">

</div>
`;

});

document.getElementById("medicines").innerHTML =
medicinesHTML;

/* Suggestions */
let suggestionsHTML = "";

result.suggestions.forEach(s => {

suggestionsHTML += `<li>${s}</li>`;

});

document.getElementById("suggestions").innerHTML =
suggestionsHTML;

}