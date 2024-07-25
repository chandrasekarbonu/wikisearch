let displayData = document.getElementById("display");
let inputele = document.getElementById("search-box");
let spinnerele = document.getElementById("spinner");

function createAndAppend(result){
    let divele = document.createElement("div");
    divele.classList.add("result-display");
    displayData.appendChild(divele);

    let { link, title, description } = result;

    let titleele = document.createElement("a");
    titleele.classList.add("title");
    titleele.href = link;
    title.target = "_blank";
    titleele.textContent = title;
    divele.appendChild(titleele);

    let brele = document.createElement("br");
    divele.appendChild(brele);

    let linkele = document.createElement("a");
    linkele.classList.add("link");
    linkele.href = link;
    linkele.target = "_blank";
    linkele.textContent = link;
    divele.appendChild(linkele);

    let br2 = document.createElement("br");
    divele.appendChild(br2);

    let descele = document.createElement("p");
    descele.classList.add("description");
    descele.textContent = description;
    divele.appendChild(descele);
}

function displaySearchedData(searchresultdata){
    spinnerele.classList.toggle("d-none");
    for(let result of searchresultdata){
        createAndAppend(result);
    }
}

function searchData(event){
    if(event.key === "Enter"){
        spinnerele.classList.toggle("d-none");
        displayData.textContent = "";
        let searchval = inputele.value;
        let url = "https://apis.ccbp.in/wiki-search?search="+searchval;
        let option={
            method: "GET"
        };
        fetch(url,option)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            displaySearchedData(search_results);
        });
    }
}

inputele.addEventListener("keydown",searchData);