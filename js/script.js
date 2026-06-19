// Accordion
const accordion = document.querySelector(".accordion");
const panel = document.querySelector(".panel");

document.addEventListener("DOMContentLoaded", function(){
    const accordions = document.querySelectorAll(".accordion");
    
    accordions.forEach(function (accordion) {
      accordion.addEventListener("click", function(){

        const panel = this.nextElementSibling;

        if(panel.style.display === "block"){
            panel.style.display = "none";
        } else{
            panel.style.display = "block";
        }
    });
  });
});

// Modal
function openModal(){
    document.getElementById("myModal").style.display="block";
}

function closeModal(){
    document.getElementById("myModal").style.display="none";
}

// Lightbox
function showImage(src){
    document.getElementById("lighbox").style.display="block";
    document.getElementById("lightbox-img").src=src;
}

function closeLightbox(){
    document.getElementById("lightbox").style.display="none";
};

// Content + Search
const services = [
    "Return",
    "Curbside Pickup",
    "Pharmacy and Health",
    "Money Center",
];

document.addEventListener("DOMContentLoaded", function(){

const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

if (search && suggestions){
search.addEventListener("focus", function (){
    let ouput = "";

    services.forEach(services => {
        output += `<div>${services}</div>`;
    });

    suggestions.innerHTML = output;
    suggestions.style.display = "block";
});

}

});

//Leaflet 
const map = L.map('map').setView([-33.9249, 18.4241], 13);

//Load map titles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Add marker
L.marker([-33.9249, 18.4241])
.addTo(map)
.bindPopup('MTC Holdings')
.openPopup();

// Enquiry Form submission
function validationForm(event){
    event.preventDefault();

const enquiryForm = document.getElementById("enquiryForm");

    // Clear previous errors
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("typeError").innerHTML = "";
    document.getElementById("messageError").innerHTML = "";

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let type = document.getElementById("type").value.trim();
    let message = document.getElementById("message").value.trim();

    let valid = true;

    // Validation
    if (enquiryForm){
        enquiryForm.addEventListener("submit", validationForm);
    }

    if(name === "") {
        document.getElementById("nameError").innerText = "Name is required";
        valid = false;
    }

    if(email === "" || !email.includes("@")) {
        document.getElementById("emailError").innerText = "Valid email required";
        valid = true;
    }

    if(type === ""){
        document.getElementById("typeError").innerText = "Please select an option";
        vaild = false;
    }

    if(message.lenght < 5){
        document.getElementById("messageError").innerText = "Message too short";
        valid = false;
    }

    // If valid = process request
    if(valid){
        let cost = "";
        let availability = "";

        // Simple "Processing logic"
        switch(type){
            case "Clothing":
                cost = "R250 - R600";
                availability = "In stock (limited clothing)";
                break;

            case "Home essentials":
                cost = "R2,000 - R5,000";
                availability = "Available";
                break;

            case "Delivery Service":
                cost = "R50 - R200 per delivery";
                availability = "Same day available in selected areas";
                break;

            case "repair":
                cost = "R150 - R2,000 depending issue";
                availability = "Booking required (1-3 days waiting time)";
                break;
        }

        // Output response
        document.getElementById("responseBox").style.display = "block";
        document.getElementById("responseBox").innerHTML = `
        <h3>Enquiry Response</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Product / Services:</strong> ${type}</p>
        <p><strong>Estimated cost:</strong> ${cost}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        <p>Thank you ${name}, we will contact you at ${email}.</p>
        `;
    }
}

//AJAX Engine
document.addEventListener("DOMContentLoaded", function(){
const enquiryForm = document.getElementById("enquiryForm");
const responseBox = document.getElementById("responseBox");

// Listen for form response paragraph element
if(enquiryForm){
enquiryForm.addEventListener("submit", function(event){

    //Prevent the page from refreshing
    event.preventDefault();

    fetch("submit.php",{
        method: "POST",
        body: new FormData(enquiryForm)
    })
    .then(response => response.text())
    .then(data => {
        responseBox.textContent = "Enquiry submitted successfully.";
        enquiryForm.reset();
    })
    .catch(error => {
        responseBox.textContent = "Error submitting enquiry. Please try again.";
    });
});
}
});


// Contact Us Form
function validationForm(){
    // Get form elements and error container
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const error = document.getElementById("errorMsg");

    // Clear previous errors
    errorMsg.textContent = "";
    errorMsg.style.color = "red";

    // Client-Side validation
    if(name.lenght<2){
        errorMsg.textContent = "Name must be at least 2 charachters.";
        return false;
    }

    const emailRegex = /^[^\s@]+@[\s@]+\.[^\s@]+$/;
    if(!emailRegex.text(email)){
        errorMsg.textContent = "Please enter a valid email address.";
        return false;
    }
    
    const ageNum = parseInt(age,10);
    if(isNaN(ageNum)|| ageNum < 1 || ageNum>100) {
        errorMsg.textContent = "Age must be a number between 1 and 100.";
        return false;
    }

    // AJAX submission
    errorMsg.textContent = "Submitting asynchronously";
    errorMsg.style.color = "blue";

    const formData = new
    FormData(document.getElementById("sampleform"));

    fetch("submit.php",{
        method: "POST",
        body: new FormData(sampleform)
    })
    .then(response =>{
        if(response.ok){
            errorMsg.textContent = "Form submitted successfully via AJAX!";
            errormsg.style.color = "green";

        document.getElementById("sampleform").reset();
        }else{
            throw new Error("Server error");
        }
        
    })

    .catch(error => {
        errorMsg.textContent = "Submission failed. Please try again.";
        errorMsg.style.color = "red";
    });

    return false;
}