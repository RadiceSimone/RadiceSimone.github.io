class Website{

    constructor(){
        this.val1 = false
        this.val2 = false
        this.points = 0
        this.location = ""
        this.result = ""
        this.data = []
    }

    startAlgorithm(){
        event.preventDefault()

        let radioCheck = document.getElementById('yesYesterday');
        if(radioCheck.checked){
            this.val1 = true
        }
        else{
            this.val1 = false
            this.points += 5
        }
        
        radioCheck= document.getElementById('yesPhysicalAct');
        if(radioCheck.checked){
            this.val2 = true
            this.points += 10
        }
        else{
            this.val2 = false
        }

        if(this.points > 5){
            alert("Consigliato lavarsi")
            this.result = "SI"
        }
        else{
            alert("Sconsigliato lavarsi")
            this.result = "NO"
        }

        let today = new Date()
        let day = today.getDay()

        if(this.data[day-1] == "ND"){
            document.getElementById(day).innerHTML = this.result
            this.saveInLocalStorage()
        }
        else{
            alert("giorno già fatto!")
        }
    }

    saveInLocalStorage(){
        localStorage.setItem('user', JSON.stringify(this.data));
    }

    loadFromLocalStorage(){
        let checkDay = new Date();

        if(checkDay.getDay != 1){
            this.data = JSON.parse(localStorage.getItem('user'));
        }
        else{
            this.data = ["ND", "ND", "ND", "ND", "ND", "ND", "ND"]
        }
    
        for(let i = 0; i < 7; i++){
            document.getElementById(i+1).innerHTML = this.data[i]
        }
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
