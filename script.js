const allBtn = document.getElementById("all-tab-btn");
const openBtn = document.getElementById("open-tab-btn");
const closedBtn = document.getElementById("closed-tab-btn");

// button toggle functionality
const btnToggle = (id) =>{
    if(id === "all-tab-btn"){
        allBtn.classList.add("btn-primary", "text-white")
        closedBtn.classList.remove("btn-primary", "text-white")
        openBtn.classList.remove("btn-primary", "text-white")
    }else if(id === "open-tab-btn"){
        openBtn.classList.add("btn-primary", "text-white")
        allBtn.classList.remove("btn-primary", "text-white")
        closedBtn.classList.remove("btn-primary", "text-white")
        allBtn.classList.add("text-[#64748B]")
    }else if(id === "closed-tab-btn"){
        closedBtn.classList.add("btn-primary", "text-white")
        allBtn.classList.remove("btn-primary", "text-white")
        openBtn.classList.remove("btn-primary", "text-white")
        allBtn.classList.add("text-[#64748B]")
    }
}


