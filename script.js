// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"

// function rederweatherinfo(data){

//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} deg cel`
//     document.body.appendChild(newPara);
// }

// async function fetchingWeatherDetails(){
//     try{
//         let city= "mumbai";
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         let data = await response.json();
//         console.log(data);
    
//         rederweatherinfo(data);
//     }
//     catch(err){
//         console.log("error found" , err);
//     }
// }

// function getGeolocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("no geolocation")
//     }
// }
// async function showPosition(position){
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;

//     console.log(lat);
//     console.log(lon);

//     try{
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
//         let data = await response.json();
//         console.log(data);
    
//         rederweatherinfo(data);
//     }
//     catch(err){
//         console.log("error found here" , err);
//     }

// }



const usertab = document.querySelector(".user-conatiner");
const searchtab = document.querySelector(".search-container");
const grantAccess = document.querySelector(".grant-access");
const userweatherinfo = document.querySelector(".your-weather");
const loading = document.querySelector(".load");
const search = document.querySelector(".search-weather");
const user = document.querySelector(".your-weather");
const undefi = document.querySelector('.undef');
const imgun = document.querySelector(".abc");
//initializing values 
let currTab = usertab;
currTab.classList.add("currTab");
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"

//phle se location hongi values to dikha dega
getfromsessionStorage();

//adding listenrs on both tabs
usertab.addEventListener('click', ()=>{
    switchTab(usertab);
})
searchtab.addEventListener('click', ()=>{
    switchTab(searchtab);
})
loading.classList.add("active");
// switching tab
function switchTab(tab){
    if(tab !== currTab){
        currTab.classList.remove("currTab");
        currTab = tab;

        currTab.classList.add("currTab");

        if(tab === searchtab){
            user.classList.remove("active");
            grantAccess.classList.remove("active");
            search.classList.add("active");
            undefi.classList.add("active");
            imgun.classList.add("active");

        }
            else if(tab === usertab){
            undefi.classList.add("active");
            imgun.classList.add("active");
            //to display weather
            getfromsessionStorage();
           
        }
    }
}

//longi and lati check hai ya ni
function getfromsessionStorage(){
    const localcoordinates = sessionStorage.getItem("user-coordinates");

    if(!localcoordinates){
        //nahi mile 
        grantAccess.classList.add("active");
    }
    else{
        //mil gye 
        const coordinates = JSON.parse(localcoordinates);
        fetchuserweatherinfo(coordinates);
    }
}

const accessbtn = document.querySelector("[data-access-btn]");

//after giving access
accessbtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("geolocation not found");
    }
})

function showPosition(position){
    const coordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
    fetchuserweatherinfo(coordinates);
}

//fetching user weather info using lati and longi
async function fetchuserweatherinfo(coordinates){
    const {lat, lon} = coordinates;

    grantAccess.classList.remove('active');
    search.classList.remove("active");
    loading.classList.add("active");
    let data;
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        data = await response.json();
        loading.classList.remove("active");
        user.classList.add("active");
        rederweatherinfo(data);
    }
    catch(err){
        loading.classList.remove("active");
        // alert("alert");
    }
    
}

//rendering data to document.body
function rederweatherinfo(data){
    
        const city = document.querySelector("[data-city]");
        const cityicon = document.querySelector("[data-city-icon]");
        const desc = document.querySelector("[data-weather-status]");
        const weathericon = document.querySelector("[data-weather-icon]");
        const temp = document.querySelector("[data-weather-temp]");
        const wind = document.querySelector("[data-c1]");
        const humidity = document.querySelector("[data-c2]");
        const clouds = document.querySelector("[data-c3]");
    
        city.innerText = data?.name;
        // cityicon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
        desc.innerText = data?.weather?.[0]?.description;
        weathericon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
        temp.innerText = `${data?.main?.temp}°C`;
        wind.innerText = `${data?.wind?.speed}m/s`;
        humidity.innerText = `${data?.main?.humidity}%`;
        clouds.innerText = `${data?.clouds?.all}%`;
    
}

const searchInput = document.querySelector("[data-searchField]");

search.addEventListener("submit" , (e)=>{
    loading.classList.add("active");
    console.log("load");
    e.preventDefault();
    let city = searchInput.value;
    if(city === ""){
        return;
    }
    else{
        fetchuserweatherinfowithcity(city);
        searchInput.value = "";
    }
})

console.log(undefi);

async function fetchuserweatherinfowithcity(mycity){
    // loading.classList.add("active");
    user.classList.remove("active");
    grantAccess.classList.remove("active");
    let data;
    try{
        let city = mycity;
        console.log("sheher" , city);
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        data = await response.json();
        if (!data.sys) {
            throw data;
          }
            user.classList.add("active");
            search.classList.remove("active");
            loading.classList.remove("active");
            rederweatherinfo(data);
    }
    catch(error){
        loading.classList.remove("active");
        search.classList.remove("active")
        undefi.classList.add("active");
        console.log(undefi);
    }
}
