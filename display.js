function displayResult(data){

document.getElementById("disease").innerText = data.disease;

document.getElementById("explanation").innerText = data.explanation;

let medsHTML = "";

data.medicines.forEach(m => {

medsHTML += `
<div style="margin-bottom:10px;">
<p>${m.name}</p>
<img src="${m.image}" width="100">
</div>
`;

});

document.getElementById("medicines").innerHTML = medsHTML;

}