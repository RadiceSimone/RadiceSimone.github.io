const FORT_CONS_COLOR = "#073826"
const CONS_COLOR = "#22d82f"
const SCONS_COLOR = "#e17570"
const FORT_SCONS_COLOR = "#93281f"

class Website {
  constructor() {
    this.yesterday = false;
    this.manualAct = false;
    this.physicalAct = false;
    this.physicalActIntensity = 0;
    this.physicalActTime = 0;
    this.weather = '';
    this.temperature = 0;
    this.points = 0;
    this.result = "";
    this.data = [];
  }

  startAlgorithm() {
    event.preventDefault();
    
    //caricamento
    document.getElementById("caricaPulsante").disabled = true;
    document.getElementById("caricamento").style.display = "flex";
    setTimeout(function() {
      document.getElementById("caricaPulsante").disabled = false;
      document.getElementById("caricamento").style.display = "none";
       
      //campo ieri
    let checkValue = document.getElementById("yesYesterday");
    if (checkValue.checked) {
      this.yesterday = true;
      this.points -= 5;
    } else {
      this.yesterday = false;
    }

    //campo attività manuale
    checkValue = document.getElementById("yesManualAct");
    if (checkValue.checked) {
      this.manualAct = true;
      this.points += 2;
    } else {
      this.manualAct = false;
    }

    //campo attività fisica
    checkValue = document.getElementById("yesPhysicalAct");
    if (checkValue.checked) { //se si è fatta attività fisica procede
      //controllo intensità
      checkValue = document.getElementById("lightwork");
      if(checkValue.checked){ //leggera
        this.physicalActIntensity = 1;
        this.points += 1;
      }
      else{
        checkValue = document.getElementById("mediumwork");
        if(checkValue.checked){ //media
          this.physicalActIntensity = 2;
          this.points += 2.5;
        }
        else{ //pesante
          this.physicalActIntensity = 3;
          this.points += 5;
        }
      }
      //controllo ore
      checkValue = document.getElementById("physicalActHours");
      this.physicalActTime = checkValue.value;
      if(this.physicalActTime <= 1){ //1 ora max
        this.points += 1
      }
      else if(this.physicalActTime > 1 && this.physicalAct <= 2){ //da 1 a 2 ore
        this.points += 2.5
      }
      else{ //oltre 2 ore
        this.points += 5
      }
    } else {
      this.physicalAct = false;
    }

    //campo meteo
    checkValue = document.getElementById("sunny");
    if(checkValue.checked){
      this.weather = 's'
      this.points += 2.5
    }
    else{
      checkValue = document.getElementById("cloudy");
      if(checkValue.checked){
        this.weather = 'c'
      }
      else{
        this.weather = 'r'
        this.points -= 5
      }
    }

    //campo temperatura
    checkValue = document.getElementById("temperature");
    this.temperature = checkValue.value;
    if(this.temperature >= 30){
      this.points += 5
    }
    else if(this.temperature < 30 && this.temperature > 25){
      this.points += 2.5
    }
    

    let color;

    if (this.points >= 14.5) {
      alert("Fortemente consigliato lavarsi");
      this.result = "Fortemente consigliato";
      color = 1
    } else if(this.points < 14.5 && this.points >= 7.5){
      alert("Consigliato lavarsi");
      this.result = "Consigliato";
      color = 2
    }
    else if(this.points < 7.5 && this.points >= 2){
      alert("Sconsigliato lavarsi");
      this.result = "Sconsigliato";
      color = 3
    }
    else{
      alert("Fortemente sconsigliato lavarsi");
      this.result = "Fortemente sconsigliato";
      color = 4
    }

    let today = new Date();
    let day = today.getDay();

    console.log("pre controllo finale " , this.data)
    if (this.data[day - 1] == "ND") {
      document.getElementById(day).innerHTML = this.result;
      if(color == 1){
        document.getElementById(day).style.backgroundColor = FORT_CONS_COLOR;
      }
      else if(color == 2){
        document.getElementById(day).style.backgroundColor = CONS_COLOR;
      }
      else if(color == 3){
        document.getElementById(day).style.backgroundColor = SCONS_COLOR;
      }
      else if(color == 4){
        document.getElementById(day).style.backgroundColor = FORT_SCONS_COLOR;
      }
      this.data[day - 1] = this.result
      this.saveInLocalStorage();
    } else {
      alert("giorno già fatto!");
    }
    }, 5000); // 5000 millisecondi = 5 secondi

    
  }

  saveInLocalStorage() {
    localStorage.setItem("user", JSON.stringify(this.data));
  }

  loadFromLocalStorage() {
    let checkDay = new Date();
    
    console.log("inizio " , this.data)
    if (checkDay.getDay != 1) {
      let test = JSON.parse(localStorage.getItem("user"))
      if(test != null){
        this.data = JSON.parse(localStorage.getItem("user"));
      }
      else{
        this.data = ["ND", "ND", "ND", "ND", "ND", "ND", "ND"];
      }
    } else {
      this.data = ["ND", "ND", "ND", "ND", "ND", "ND", "ND"];
    }

    console.log("dopo caricamento " , this.data)

    for (let i = 0; i < 7; i++) {
      document.getElementById(i + 1).innerHTML = this.data[i];
    }

    this.loadColors()
  }

  loadColors(){
    for(let i = 0; i < 7; i++){
      if(this.data[i] == "Fortemente consigliato"){
        document.getElementById(i + 1).style.backgroundColor = FORT_CONS_COLOR;
      }
      else if(this.data[i] == "Consigliato"){
        document.getElementById(i + 1).style.backgroundColor = CONS_COLOR;
      }
      else if(this.data[i] == "Sconsigliato"){
        document.getElementById(i + 1).style.backgroundColor = SCONS_COLOR;
      }
      else if(this.data[i] == "Fortemente sconsigliato"){
        document.getElementById(i + 1).style.backgroundColor = FORT_SCONS_COLOR;
      }
    }
  }

  enablePhysicalActAdv(){
    document.getElementById("lightwork").disabled = false
    document.getElementById("mediumwork").disabled = false
    document.getElementById("heavywork").disabled = false
    document.getElementById("physicalActHours").disabled = false
  }

  disablePhysicalActAdv(){
    document.getElementById("lightwork").disabled = true
    document.getElementById("mediumwork").disabled = true
    document.getElementById("heavywork").disabled = true
    document.getElementById("physicalActHours").disabled = true

  }

  openInfo(){
    document.getElementById("messaggio").classList.remove("hidden");
  }

  closeInfo(){
    document.getElementById("messaggio").classList.add("hidden");
  }

  /* getTemperature(){
        event.preventDefault()
        this.location = "Mariano Comense"
        const apiKey = "6eb1180161eccb06843669dbee0f87b3";
        const url = 'api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        return fetch(url)
          .then(response => response.json())
          .then(data => {
            const weatherData = {
              temperature: data.main.temp,
              condition: data.weather[0].main,
              location: data.name,
            };
            console.log(weatherData)
          });
    }*/
}

async function notifications() {
    const reg = await navigator.serviceWorker.getRegistration();
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        alert('You need to allow push notifications');
      } else {
        const orarioPianificato = parseOrarioInput("15:32d");
        
        setInterval(() => {
          const now = new Date();
          
          if (now.getHours() === orarioPianificato.getHours() &&
              now.getMinutes() === orarioPianificato.getMinutes()) {
            reg.showNotification("Demo Push Notification", {
              tag: orarioPianificato.getTime(), // un ID univoco
              body: "Hello World", // contenuto della notifica
              data: {
                url: window.location.href, // passa l'URL corrente alla notifica
              },
              actions: [
                {
                  action: "open",
                  title: "Open app",
                },
                {
                  action: "close",
                  title: "Close notification",
                },
              ],
            });
          }
        }, 60000); // Verifica ogni minuto
      }
    });
  }

function parseOrarioInput(input) {
    alert("dentro")
    const [hours, minutes] = input.split(":").map(Number);
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return null;
    }
    const orarioPianificato = new Date();
    console.log(hours, " ", minutes)
    orarioPianificato.setHours(hours);
    orarioPianificato.setMinutes(minutes);
    return orarioPianificato;
  }

