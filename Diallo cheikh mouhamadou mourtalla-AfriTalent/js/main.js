const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const updateCounter = () => {

            const increment = target / 100;

            if(count < target){

                count += increment;

                counter.textContent =
                    Math.floor(count).toLocaleString();

                requestAnimationFrame(updateCounter);

            }else{

                counter.textContent =
                    target.toLocaleString();

            }

        };

        updateCounter();

    });

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            startCounter();
            observer.disconnect();

        }

    });

});

const statsSection = document.querySelector(".stats");
 

if (statsSection) {
    observer.observe(statsSection);
}

//  DARK MODE

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    
}

if(themeToggle){

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }

});
}


//  NAVBAR + BOUTON RETOUR EN HAUT

const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

// RETOUR EN HAUT
if(backToTop){
backToTop.addEventListener("click", () => { 

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
}

// footer
const currentYear = document.getElementById("currentYear");

if(currentYear){
    currentYear.textContent = new Date().getFullYear();
}
   



const fadeSections = document.querySelectorAll(".fade-section");

if (fadeSections.length > 0) {

    const fadeObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.2
    });

    fadeSections.forEach(section => {

        if (section instanceof Element) {
            fadeObserver.observe(section);
        }

    });

}
//  const fadeSections = document.querySelectorAll(".fade-section");

const fadeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold: 0.2
});

fadeSections.forEach(section => {
    fadeObserver.observe(section);
});

// FILTRE FREELANCES

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".categorie-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

 });

    // Contact

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        document.querySelectorAll(".text-danger").forEach(error => {
            error.textContent = "";
        });

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        // Vérification des champs obligatoires

        if (nom.value.trim() === "") {
            document.getElementById("nomError").textContent =
                "Le nom est obligatoire";
            valid = false;
        }

        if (prenom.value.trim() === "") {
            document.getElementById("prenomError").textContent =
                "Le prénom est obligatoire";
            valid = false;
        }

        // Vérification email avec Regex

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(email.value.trim())) {
            document.getElementById("emailError").textContent =
                "Email invalide";
            valid = false;
        }

        if (sujet.value === "") {
            document.getElementById("sujetError").textContent =
                "Veuillez choisir un sujet";
            valid = false;
        }

        // Message minimum 20 caractères

        if (message.value.trim().length < 20) {
            document.getElementById("messageError").textContent =
                "Le message doit contenir au moins 20 caractères";
            valid = false;
        }

        // Message de succès

        if (valid) {
            document.getElementById("successMessage")
                .classList.remove("d-none");

            form.reset();
        }

    });

}