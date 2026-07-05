
const root = document.documentElement;

/* ======================
   PAGE SWITCHING (FIXED)
====================== */

function showPage(id){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    const target = document.getElementById(id);

    if(target){
        target.classList.add("active");
    }

    // Animate skills ONLY on about page
    if(id === "about"){
        animateSkills();
    }
}

/* ======================
   COLOR SWITCHER
====================== */

function changeColor(color){
    root.style.setProperty("--main", color);
}
/* ======================
   SETTINGS TOGGLE
====================== */

const gear = document.getElementById("gear");
const colors = document.querySelector(".colors");

gear.addEventListener("click", ()=>{
    colors.classList.toggle("show");
});

/* ======================
   DARK / LIGHT MODE
====================== */

const themeBtn = document.getElementById("theme");

themeBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("light");

    themeBtn.textContent =
    document.body.classList.contains("light") ? "☀️" : "🌙";
});

/* ======================
   SKILLS ANIMATION
====================== */

function animateSkills(){

    document.querySelectorAll(".skill-fill").forEach(bar=>{

        const target = bar.getAttribute("data-width");

        bar.style.width = "0%";

        setTimeout(()=>{
            bar.style.width = target;
        }, 200);

    });

    document.querySelectorAll(".percent").forEach(counter=>{

        const target = parseInt(counter.getAttribute("data-target"));

        let count = 0;

        counter.innerText = "0%";

        const interval = setInterval(()=>{

            count++;

            counter.innerText = count + "%";

            if(count >= target){
                clearInterval(interval);
            }

        }, 15);

    });
}

/* ======================
   TYPING EFFECT (FIXED SAFE)
====================== */

const words = [
    "Web Developer",
    "UI Designer",
    "Freelancer",
    "Frontend Expert"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type(){

    current = words[i];

    if(!isDeleting){

        document.getElementById("typing").textContent =
        current.substring(0, j++);

        if(j > current.length){
            isDeleting = true;
            setTimeout(type, 800);
            return;
        }

    }else{

        document.getElementById("typing").textContent =
        current.substring(0, j--);

        if(j < 0){
            isDeleting = false;
            i = (i + 1) % words.length;
        }
    }

    setTimeout(type, isDeleting ? 80 : 120);
}

type();


/* =========================
   Contributions Heatmap (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const heatmap = document.getElementById("heatmap");

    if (!heatmap) return;

    // Clear old data
    heatmap.innerHTML = "";

    const totalDays = 364;

    let totalContributions = 0;
    let activeDays = 0;
    let bestDay = 0;

    for (let i = 0; i < totalDays; i++) {

        const day = document.createElement("div");
        day.classList.add("day");

        const rand = Math.random();

        let level = 0;
        let contributions = 0;

        // FIXED LOGIC (more realistic + stable)
        if (rand > 0.85) {
            level = 4;
            contributions = Math.floor(Math.random() * 25) + 40;
        }
        else if (rand > 0.70) {
            level = 3;
            contributions = Math.floor(Math.random() * 18) + 20;
        }
        else if (rand > 0.50) {
            level = 2;
            contributions = Math.floor(Math.random() * 10) + 8;
        }
        else if (rand > 0.30) {
            level = 1;
            contributions = Math.floor(Math.random() * 5) + 1;
        }

        // empty day safe fix
        if (level === 0) {
            contributions = 0;
        }

        // stats calculation
        if (contributions > 0) {
            activeDays++;
        }

        totalContributions += contributions;

        if (contributions > bestDay) {
            bestDay = contributions;
        }

        // IMPORTANT FIX (CSS MATCH)
        day.classList.add("lvl" + level);

        // tooltip
        day.title = `${contributions} contributions`;

        heatmap.appendChild(day);
    }

    // =========================
    // STATS UPDATE (SAFE)
    // =========================

    const totalEl = document.getElementById("totalContributions");
    const activeEl = document.getElementById("activeDays");
    const bestEl = document.getElementById("bestDay");
    const avgEl = document.getElementById("dailyAverage");

    if (totalEl) totalEl.textContent = totalContributions;
    if (activeEl) activeEl.textContent = activeDays;
    if (bestEl) bestEl.textContent = bestDay;

    if (avgEl) {
        avgEl.textContent = Math.round(totalContributions / totalDays);
    }

});

const modal = document.querySelector(".portfolio-modal");
const modalImg = document.getElementById("modalImage");
const buttons = document.querySelectorAll(".view-btn");
const closeBtn = document.querySelector(".close-modal");

buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        modal.classList.add("active");
        modal.classList.remove("closing");
        modalImg.src = btn.dataset.img;
    });
});

closeBtn.addEventListener("click", ()=>{
    modal.classList.add("closing");

    setTimeout(()=>{
        modal.classList.remove("active");
    },500);
});


document.querySelector(".close-modal").onclick=()=>{

modal.classList.remove("active");

};

modal.onclick=(e)=>{

if(e.target===modal){

modal.classList.remove("active");

}

};

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

modal.classList.remove("active");

}

});

const sidebar = document.getElementById("sidebar");

// Open/Close sidebar
function toggleSidebar(){
    sidebar.classList.toggle("active");
}

// Navigation function + auto close on mobile
function navigate(page){

    showPage(page); // tumhara existing function

    // mobile pe sidebar close
    if(window.innerWidth <= 768){
        sidebar.classList.remove("active");
    }
}

// Optional: click outside to close
document.addEventListener("click", function(e){

    if(window.innerWidth <= 768){

        if(!sidebar.contains(e.target) && !e.target.closest(".menu-btn")){
            sidebar.classList.remove("active");
        }

    }

});

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("active");
}