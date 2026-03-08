const allBtn = document.getElementById("all-tab-btn");
const openBtn = document.getElementById("open-tab-btn");
const closedBtn = document.getElementById("closed-tab-btn");
const issueContainer = document.getElementById("issue-container");
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

// all issues function
const allIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
        const issueAll = json.data;
        issueCount.innerText = issueAll.length;
        displayIssue(issueAll)
    })
};

// open issues function
const openIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
        const open = json.data.filter(issue => issue.status === "open");
        issueCount.innerText = open.length;
        displayIssue(open);
    })
}

// closed issues function
const closedIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
        const closed = json.data.filter(issue => issue.status === "closed");
        issueCount.innerText = closed.length;
        displayIssue(closed);
    })
}
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
                    <div class="card bg-base-100 w-3xs h-72 shadow-sm">
                        <div class="btm-border p-4">
                            <div class="flex justify-between items-center">
                                <img src="${statusImg}" alt="">
                                <span class="uppercase text-red-600 bg-red-100 w-20 border-solid rounded-full text-center text-[12px] font-medium py-1">High</span>
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