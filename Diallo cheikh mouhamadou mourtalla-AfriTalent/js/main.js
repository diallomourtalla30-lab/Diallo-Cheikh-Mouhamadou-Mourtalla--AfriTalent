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
// const fadeSections = document.querySelectorAll(".fade-section");

// const fadeObserver = new IntersectionObserver((entries) => {

//     entries.forEach(entry => {

//         if(entry.isIntersecting){
//             entry.target.classList.add("show");
//         }

//     });

// },{
//     threshold: 0.2
// });

// fadeSections.forEach(section => {
//     fadeObserver.observe(section);
// });