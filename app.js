const DAYS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const CONDITIONS = [
  {label:"Ensolarado", icon:"☀️"},
  {label:"Parcialmente nublado", icon:"🌤️"},
  {label:"Nublado", icon:"☁️"},
  {label:"Chuva", icon:"🌧️"},
  {label:"Temporal", icon:"⛈️"}
];

function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}

function generateForecast(days=15){
  const out=[];
  for(let i=0;i<days;i++){
    const cond=pick(CONDITIONS);
    out.push({
      day:DAYS[(new Date().getDay()+i+1)%7],
      date:new Date(Date.now()+86400000*(i+1)),
      max:rand(27,36),
      min:rand(20,26),
      cond
    });
  }
  return out;
}

function render(){
  const today=new Date();
  document.getElementById("today-date").textContent=today.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
  const cond=pick(CONDITIONS);
  document.getElementById("today-icon").textContent=cond.icon;
  document.getElementById("today-condition").textContent=cond.label;
  document.getElementById("today-temp").textContent=`${rand(24,30)}°C`;
  document.getElementById("today-max").textContent=`${rand(30,35)}°C`;
  document.getElementById("today-min").textContent=`${rand(20,24)}°C`;
  document.getElementById("today-rain").textContent=`${rand(10,80)}%`;
  document.getElementById("today-wind").textContent=`${rand(5,25)} km/h`;

  const forecast=generateForecast(15);
  const nextDays=document.getElementById("next-days");
  nextDays.innerHTML="";
  forecast.slice(0,5).forEach(f=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<div>${f.day}</div><div class="icon">${f.cond.icon}</div><div>${f.max}°C / ${f.min}°C</div>`;
    nextDays.appendChild(div);
  });

  const forecastGrid=document.getElementById("forecast-grid");
  forecastGrid.innerHTML="";
  forecast.forEach(f=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<div>${f.day} ${f.date.toLocaleDateString("pt-BR
