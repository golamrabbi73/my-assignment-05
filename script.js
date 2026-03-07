const allBtn = document.getElementById("all-toggle-btn");
const openBtn = document.getElementById("open-toggle-btn");
const closedBtn = document.getElementById("closed-toggle-btn");

// button toggle functionality
const btnToggle = (id) =>{
    if(id === "all-toggle-btn"){
        allBtn.classList.add("btn-primary", "text-white")
        closedBtn.classList.remove("btn-primary", "text-white")
        openBtn.classList.remove("btn-primary", "text-white")
    }else if(id === "open-toggle-btn"){
        openBtn.classList.add("btn-primary", "text-white")
        allBtn.classList.remove("btn-primary", "text-white")
        closedBtn.classList.remove("btn-primary", "text-white")
        allBtn.classList.add("text-[#64748B]")
    }else if(id === "closed-toggle-btn"){
        closedBtn.classList.add("btn-primary", "text-white")
        allBtn.classList.remove("btn-primary", "text-white")
        openBtn.classList.remove("btn-primary", "text-white")
        allBtn.classList.add("text-[#64748B]")
    }
}
