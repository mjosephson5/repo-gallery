//select the div with the class "overview" - where your profile information will appear
const profileInformation = document.querySelector(".overview");
//select unordered list that will display repos
const unorderedListOfRepos = document.querySelector(".repo-list")
//global variable called username with the value of GitHub username
const username = "mjosephson5";





//Create and name an async function to fetch information from your GitHub profile/fetch API JSON Data
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

//Fetch & display user information
//create a new function to display the fetched user information on the page with JSON data as parameter
function displayUserInformation (jsonData) {
//originally passed it a parameter I named jsonData, but didn't work
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
//why do we call the function here and not somewhere else like after the getRepos function?
getRepos();
}


//Create a new async function to fetch your repos
const getRepos = async function () {
  //grab API URL and add endpoints to fetch list of repos - sort by most recently updated and have 100 to a page
  const resRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  //transform JSON repo data intp JS object
  const repoData = await resRepos.json()
  //my console.log did not work till I called the function - why not??? also when I eventually logged it out it came up as an array not an object
  // console.log(repoData)
  displayRepoData(repoData)
};



//Display info about your repos
//create a function to display information about each repo - use "repos" or is it "repoData" as parameter - thought repoData then changed it
function displayRepoData (repos) {
  //loop through each element in repoData/ repos
  console.log(repos)

  for( let i = 0; i < repos.length; i+=1) {
    let currentRepo = repos[i]
    let currentName = currentRepo.name
    console.log(currentRepo)
    console.log(currentName)
   //create a list item for each repo - shoudl i use let or const here?
   let listItemOfOneRepo = document.createElement("li");
  //give each item a class of "repo" - cannot find class "repo", only "repos"
   listItemOfOneRepo.classList.add("repo")
  //create? <h3> element for each item - why can't we just change the innerText of the list, is it for formatting reasons we need to create an element
   let headingForRepoElement = document.createElement("h3")
  //<h3> element should have the repo name - JS telling me that'name' is "deprecated" but I thought that was the property I needed to reference in the array?object?
   headingForRepoElement.innerText = currentName
   //append the list item to the global variable that accepts the unordered repo list - i put this outside of the for loop originally because thought we wouldn't want to append until we had looped through all the elements
  listItemOfOneRepo.append(headingForRepoElement);
  unorderedListOfRepos.append(listItemOfOneRepo)

  }

}




