let allIssueData = [];
const allBtn = document.getElementById("all-tab-btn");
const openBtn = document.getElementById("open-tab-btn");
const closedBtn = document.getElementById("closed-tab-btn");
const issueContainer = document.getElementById("issue-container");
const loader = document.getElementById("loading-spinner");
let issueCount = document.getElementById("issue-count");

// button toggle functionality
const btnToggle = (id) =>{
    if(id === "all-tab-btn"){
        allBtn.classList.add("btn-primary", "text-white")
        closedBtn.classList.remove("btn-primary", "text-white")
        openBtn.classList.remove("btn-primary", "text-white")
        allIssues()

    }else if(id === "open-tab-btn"){
        openBtn.classList.add("btn-primary", "text-white")
        allBtn.classList.remove("btn-primary", "text-white")
        closedBtn.classList.remove("btn-primary", "text-white")
        allBtn.classList.add("text-[#64748B]")
        openIssues()
    
    }else if(id === "closed-tab-btn"){
        closedBtn.classList.add("btn-primary", "text-white")
        allBtn.classList.remove("btn-primary", "text-white")
        openBtn.classList.remove("btn-primary", "text-white")
        allBtn.classList.add("text-[#64748B]")
        closedIssues()
    }
}
// show loader
function showLoader(){
    loader.classList.remove("hidden");
}

// hide loader
function hideLoader(){
    loader.classList.add("hidden");
}

// all issues function
const allIssues = () => {
    showLoader()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
        const issueAll = json.data;

        allIssueData = issueAll;

        issueCount.innerText = issueAll.length;
        displayIssue(issueAll)
        hideLoader()
    })
};

// search functionality
document.getElementById("search-input").addEventListener("input", function(e){
    const searchText = e.target.value.toLowerCase();
    const filtered = allIssueData.filter(issue =>
        issue.title.toLowerCase().includes(searchText) ||
        issue.description.toLowerCase().includes(searchText)
    );
    issueCount.innerText = filtered.length;

    displayIssue(filtered);
})

// open issues function
const openIssues = () => {
    showLoader()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
        const open = json.data.filter(issue => issue.status === "open");
        issueCount.innerText = open.length;
        displayIssue(open);
        hideLoader()
    })
}

// closed issues function
const closedIssues = () => {
    showLoader()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
        const closed = json.data.filter(issue => issue.status === "closed");
        issueCount.innerText = closed.length;
        displayIssue(closed);
        hideLoader()
    })
}

// modal load
const loadIssueDetails = async(id) =>{
    const url = `
    https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetails(details.data);
};

// modal display
const displayIssueDetails = (issue) =>{
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                        <div>
                        <h2 class="text-2xl font-bold mb-2">${issue.title}</h2>
                        <div class="flex items-center space-x-1">
                            <span class=" text-white bg-[#00A96E] p-1 rounded-full text-center text-[12px] font-medium px-2">${issue.status}</span>
                            <div class="circle"></div>
                            <span class="text-[#64748B] text-[12px]">Opened by Fahim Ahmed</span>
                            <div class="circle"></div>
                            <span class="text-[#64748B] text-[12px]">22/02/2026</span>
                        </div>
                        <div class="my-6 flex gap-1 max-h-7">
                            <p class="uppercase text-red-500 bg-red-50 border min-w-14 p-1 border-solid rounded-full text-center text-[12px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                <i class="fa-solid fa-bug"></i>
                                <span>${issue.labels[0]}</span>
                            </p>
                            ${issue.labels[1] ? `
                                        <p class="uppercase text-yellow-600 bg-yellow-50 border min-w-28 p-1 border-solid rounded-full text-center text-[12px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                        <i class="fa-solid fa-bug"></i>
                                         <span>${issue.labels[1]}</span>
                                    </p>` : ""}   
                        </div>
                        <p class="text-[#64748B]">${issue.description}</p>
                        <div class="flex my-6 p-4">
                            <div class="flex-1">
                                <span class="text-[#64748B]">Assignee:</span>
                                <p>Fahim Ahmed</p>
                            </div>
                            <div class="w-52 m-auto">
                                <p class="text-[#64748B]">Priority:</p>
                                <span class=" text-white bg-[#00A96E] p-1 rounded-full text-center text-[12px] font-medium px-2">${issue.priority}</span>
                            </div>
                        </div>
                    </div>
    `;
    document.getElementById("issue_modal").showModal();
}

// issue display funcion
const displayIssue = (issues) => {
    // const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";

    for(let issue of issues){
        let statusImg;
        if(issue.status === "open"){
            statusImg = "./assets/Open-Status.png";
        }else if(issue.status === "closed"){
            statusImg = "./assets/Closed- Status .png";
        }
        const issueDiv = document.createElement("div");
        issueDiv.innerHTML = `
                    <div class="card ${issue.status === "open" ? "open-border" : "closed-border  "} bg-base-100 w-3xs h-72 shadow-sm">
                        <div class="btm-border p-4">
                            <div class="flex justify-between items-center">
                                <img src="${statusImg}" alt="">
                                <span onclick="loadIssueDetails(${issue.id})" class="uppercase text-red-600 bg-red-100 w-20 border-solid rounded-full text-center text-[12px] font-medium py-1 cursor-pointer">${issue.priority}</span>
                            </div>
                            <div>
                                <h2 class="text-[14px] font-semibold capitalize mt-3 line-clamp-2 min-h-11">${issue.title}</h2>
                                <p class="text-[#64748B] text-[12px] mt-2 min-h-14">${issue.description}</p>
                                <div class="mt-3 flex gap-1 max-h-7">
                                    <p class="uppercase text-red-500 bg-red-50 border min-w-14 p-1 border-solid rounded-full text-center text-[12px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                        <i class="fa-solid fa-bug"></i>
                                        <span>${issue.labels[0]}</span>
                                    </p>
                                    ${issue.labels[1] ? `
                                        <p class="uppercase text-yellow-600 bg-yellow-50 border min-w-28 p-1 border-solid rounded-full text-center text-[12px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                        <i class="fa-solid fa-bug"></i>
                                         <span>${issue.labels[1]}</span>
                                    </p>` : ""}
                                    
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <p class="text-[12px] text-[#64748B] mb-2">${issue.author}</p>
                            <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                        </div>
                    </div>
        `;
        issueContainer.append(issueDiv);
    }
};
allIssues()