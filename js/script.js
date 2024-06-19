//select the div with the class "overview" - where your profile information will appear
const profileInformation = document.querySelector(".overview");
//global variable called username with the value of GitHub username
const username = "mjosephson5";

//Create and name an async function to fetch information from your GitHub profile/fetch API JSON Data
const getData = async function () {
//Target the 'users' endpoint and use a template literal to add the global username variable to the endpoint: users/${username}
  const res = await fetch (`https://api.github.com/users/${username}`);
//transform JSON datat into JS object
const data = await res.json();
console.log(data)
//fetch your GitHub user data, call the function displaying the user information, and pass it the JSON data as an argument.
displayUserInformation(data);
};
getData();

//Fetch & display user information
//create and name a new function to display the fetched user information on the page with JSON data as parameter
function displayUserInformation (data) {
//originally passed it an argument I named jsonData, but didn't work
//create a new div and give it a class of "user-info"
let divOfUserInfo = document.createElement("div");
divOfUserInfo.classList.add("user-info");
//populate the div with the following elements for figure, image, and paragraphs
divOfUserInfo.innerHTML = `
<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
`;
//Append the div to the overview element
profileInformation.append(divOfUserInfo);

}


