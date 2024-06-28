//selects the back to repo gallery button
const backToRepoGallButton = document.querySelector(".view-repos")
//selects the input with the “Search by name” placeholder
const filterInput = document.querySelector(".filter-repos")
//selects the section with a class of “repos” where all your repo information appears
const totalRepoData = document.querySelector(".repos");
//selects the section with a class of “repo-data” where the individual repo data will appear
let individualRepoData = document.querySelector(".repo-data")
//select the div with the class "overview" - where your profile information will appear
const profileInformation = document.querySelector(".overview");
//select unordered list that will display repos
const unorderedListOfRepos = document.querySelector(".repo-list");
//global variable called username with the value of GitHub username
const username = "mjosephson5";





//Create and name an async function to fetch information from your GitHub profile/fetch API JSON Data -
const getData = async function () {
//Target the 'users' endpoint and use a template literal to add the global username variable to the endpoint: users/${username}
const res = await fetch (`https://api.github.com/users/${username}`);
//transform JSON data into JS object
const data = await res.json();
//console.log(data)
//fetch your GitHub user data, call the function displaying the user information, and pass it the JSON data as an argument.
displayUserInformation(data);
};
getData();

//Fetch & display user information - 
//create a new function to display the fetched user information on the page with JSON data as parameter
function displayUserInformation (jsonData) {
//create a new div and give it a class of "user-info"
let divOfUserInfo = document.createElement("div");
divOfUserInfo.classList.add("user-info");
//populate the div with the following elements for figure, image, and paragraphs
divOfUserInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${jsonData.name}</p>
      <p><strong>Bio:</strong> ${jsonData.bio}</p>
      <p><strong>Location:</strong> ${jsonData.location}</p>
      <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div> 
`;
//Append the div to the overview element
profileInformation.append(divOfUserInfo);
getRepos();
}


//Create a new async function to fetch your repos -
const getRepos = async function () {
  //grab API URL and add endpoints to fetch list of repos - sort by most recently updated and have 100 to a page
  const resRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  //transform JSON repo data intp JS object
  const repoData = await resRepos.json()
  // console.log(repoData)
  displayRepoData(repoData)
};



//Display info about your repos - 
//create a function to display information about each repo 
function displayRepoData (repos) {
  //loop through each element in repoData/ repos
  //console.log(repos)
  //show the filterInput element
  filterInput.classList.remove('hide')

  for( let i = 0; i < repos.length; i+=1) {
    let currentRepo = repos[i]
    let currentName = currentRepo.name
    //console.log(currentRepo)
    //console.log(currentName)
   //create a list item for each repo 
   let listItemOfOneRepo = document.createElement("li");
  //give each item a class of "repo" - cannot find class "repo", only "repos"
   listItemOfOneRepo.classList.add("repo")
  //create? <h3> element for each item 
   let headingForRepoElement = document.createElement("h3")
  //<h3> element should have the repo name 
   headingForRepoElement.innerText = currentName
   //append the list item to the global variable that accepts the unordered repo list 
  listItemOfOneRepo.append(headingForRepoElement);
  unorderedListOfRepos.append(listItemOfOneRepo)

  }

}

//create click event for the unordered list with a class of "repo-list" -
unorderedListOfRepos.addEventListener("click", function(e) {
//check if event target (element clicked on) matches the <h3> element (the name of the repo)
if (e.target.matches("h3")) {
//create variable called repoName to target the innerText where the event happens 
const repoName = e.target.innerText
//replace console.log with a call to getSpecificRepoInfo and pass it repoName as argument
//console.log(repoName)
getSpecificRepoInfo(repoName);
};
}) ;

//create async function to get specific repo info - accepts parameter: repoName
const getSpecificRepoInfo = async function (repoName) {
  //fetch request to grab info about the specific repo 
  const resSpecificRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  //declare a variable called repoInfo to resolve and save JSON response
  const repoInfo = await resSpecificRepo.json();
  //log out repoInfo
  //console.log(repoInfo)


//Create an array of languages - 
//create variable called fetchLanguages to fetch data from language_url property in your repoInfo
const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
//create a variable called languageData to save the json response
const languageData = await fetchLanguages.json();
//log out languageData
//console.log("languageData:",languageData);

//create empty array called languages
languages = [];
//loop through languageData which is an object
for(let key in languageData) {
  //push languages to the empty array
  languages.push(key)
  //console.log("key", key)
}
//log out languages array
//console.log({languages})
//call the function to display the repo info. Pass it the repoInfo object and the languages array.
displaySpecificRepoInfo(repoInfo, languages)
};

//Create a function to display specific repo info. Function should accept two parametes, repoInfo and languages
const displaySpecificRepoInfo = function ({name,description, default_branch,html_url}, languages) {
//empty the HTML of the section with a class of “repo-data” where the individual repo data will appear
individualRepoData.innerHTML = " "
//Create a new div element and add the selected repository’s name, description, default branch, and link to its code on GitHub
const divOfSelectedReposityInfo = document.createElement("div");

divOfSelectedReposityInfo.innerHTML = `
<h3>Name: ${name}</h3>
    <p>Description: ${description}</p>
    <p>Default Branch: ${default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`
//Append the new div element to the section with a class of “repo-data”
individualRepoData.append(divOfSelectedReposityInfo)
//Unhide (show) the “repo-data” element. 
individualRepoData.classList.remove("hide");
//Hide the element with the class of “repos”.
totalRepoData.classList.add("hide");
//remove the class of “hide” from the Back to Repo Gallery button
backToRepoGallButton.classList.remove("hide");
};

//Add a click event to the Back to Repo Gallery button
backToRepoGallButton.addEventListener("click", function(pizza){
//unhide (display) the section with the class of “repos” - this confusing because there was no "hide" on repos
totalRepoData.classList.remove("hide")
//Add the “hide” class to the Back to Repo Gallery button itself - not sure why we did this and then removed the hide on line 161
backToRepoGallButton.classList.add("hide")
});

//Add an input Event to the Search Box -
//attach an "input" event listener to filterInput. Pass the event (e) the callback function 
filterInput.addEventListener("input", function(e){
//create a variable to capture the value of the search text. 
const valueOfSearchText = e.target.value
//console.log(e)
//log out variable
//console.log(valueOfSearchText)


//create a variable called repos to select ALL elements on the page with a class of "repo"
const repos = document.querySelectorAll(".repo");
//Create a variable and assign it to the lowercase value of the search text.
const lowercaseSearchText = valueOfSearchText.toLowerCase();
//console.log(lowercaseSearchText)
//Loop through each repo inside your repos element 
for(let repo of repos) {
  //console.log(repo.innerText)
//Inside the loop, create a variable and assign it to the lowercase value of the innerText of each repo.
const lowercaseInnerTextRepo = repo.innerText.toLowerCase()
//Check to see if the lowercase repo text includes the lowercase search text.
if (lowercaseInnerTextRepo.includes(lowercaseSearchText)) {
 //If the repo contains the text, show it. If it doesn’t contain the text, hide the repo.
 repo.classList.remove("hide")
} else {
  repo.classList.add("hide")
}
}

});