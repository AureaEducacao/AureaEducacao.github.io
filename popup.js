let hasShownPopup = false;
let lastScrollY = window.scrollY;
const urlParams = new URLSearchParams(window.location.search);

history.pushState(null, null, window.location.href)


//Show pop up when trying to return
window.addEventListener('popstate', () => {
    if (hasShownPopup) {
        history.back();
    };
    hasShownPopup = true;
    history.pushState(null, null, window.location.href)

    if (urlParams.get('interest') == 'student') {
        showStudentPopup()
    };
}); 


//Show pop up if user scrolls too much
window.addEventListener('scroll', () => {
    if (hasShownPopup) {
        return;
    }
    let currentScrollY = window.scrollY;

    // If user scrolls up slightly and popup hasn't shown yet
    if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 40) {
      hasShownPopup = true;
      
      if (urlParams.get('interest') == 'student') {
        showStudentPopup()
    };
    }

    lastScrollY = currentScrollY;
})



document.getElementById("close-student-popup").addEventListener("click", hideStudentPopup)



document.getElementById("student-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    fetch("https://api.sheetmonkey.io/form/hpG2fipVpN9jz1pCVGhyAL", {
      method: "POST",
      body: data
    })
    .then(response => {
      if (response.ok) {
        hideStudentPopup()
      } else {
        alert("Algo deu errado. Tente novamente!");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Submission failed.");
    });
})



function showStudentPopup() {
    document.getElementsByClassName("navbar")[0].style.display = "none";

    document.getElementById("overlay").style.display = "block";
    document.getElementById("student-popup").style.display = "block";
}

function hideStudentPopup() {
    document.getElementsByClassName("navbar")[0].style.display = "";

    document.getElementById("overlay").style.display = "none";
    document.getElementById("student-popup").style.display = "none";
}