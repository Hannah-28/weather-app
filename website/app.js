/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKEY = '31d1605470c7347c57af39e5c1c3562a';
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET info from API using async function
const getWeatherData = async (baseURL) => {
    const res = await fetch (baseURL);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// add event listener to the button and call the api data
generate.addEventListener('click', generateFunction);

// Async function to get the inputs and call the api data
async function generateFunction() {
    generate.textContent = 'Generating...';
    generate.style.color =  '#3b4a6b'
    generate.style.backgroundColor = '#f0d43a'
    const zip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    const apiURL = `${baseURL+zip},us&appid=${apiKEY}`
    getWeatherData(apiURL)
    .then((data) => {
        postData('/', {temperature: data.temp, date: newDate, userResponse: userResponse})
    })
    .then(() => {updateUI()}
    );
}

// Async POST to server the landed information from API 
const postData = async ( baseURL = '', data = {})=>{

    const response = await fetch(baseURL, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
        console.log('error', error);
    }
};

// Update UI Dynamically 
const updateUI = async () =>{
    const request = await fetch('/all');
    try{
        const info = await request.json();
        document.getElementById('date').innerHTML = info.date;
        document.getElementById('temp').innerHTML = info.temperature;
        document.getElementById('content').innerHTML = info.userResponse;
    } catch(error){
        console.log('error',error);
    };   
}