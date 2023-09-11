const FORT_CONS_COLOR = "#073826";
const CONS_COLOR = "#22d82f";
const SCONS_COLOR = "#e17570";
const FORT_SCONS_COLOR = "#93281f";

class Website {
  constructor() {
    this.yesterday = false;
    this.manualAct = false;
    this.physicalAct = false;
    this.physicalActIntensity = 0;
    this.physicalActTime = 0;
    this.weather = "";
    this.temperature = 0;
    this.points = 0;
    this.result = "";
    this.data = [];
  }

  /**
   * funzione lanciata al click del tasto di verifica: per prima cosa controlla la compilazione dei campi e successivamente controlla il risultato.
   * tali passaggi vengono eseguiti SOLO se non si è ancora eseguito il test nel giorno attuale altrimenti viene comunicato l'avviso
   */
  startAlgorithm() {
    event.preventDefault();

    let self = this;

    //caricamento
    document.getElementById("caricaPulsante").disabled = true;
    document.getElementById("caricamento").style.display = "flex";
    setTimeout(function () {
      document.getElementById("caricaPulsante").disabled = false;
      document.getElementById("caricamento").style.display = "none";

      //campo ieri
      let checkValue = document.getElementById("yesYesterday");
      if (checkValue.checked) {
        self.yesterday = true;
        self.points -= 5;
      } else {
        self.yesterday = false;
      }

      //campo attività manuale
      checkValue = document.getElementById("yesManualAct");
      if (checkValue.checked) {
        self.manualAct = true;
        self.points += 2;
      } else {
        self.manualAct = false;
      }

      //campo attività fisica
      checkValue = document.getElementById("yesPhysicalAct");
      if (checkValue.checked) {
        //se si è fatta attività fisica procede
        //controllo intensità
        checkValue = document.getElementById("lightwork");
        if (checkValue.checked) {
          //leggera
          self.physicalActIntensity = 1;
          self.points += 1;
        } else {
          checkValue = document.getElementById("mediumwork");
          if (checkValue.checked) {
            //media
            self.physicalActIntensity = 2;
            self.points += 2.5;
          } else {
            //pesante
            self.physicalActIntensity = 3;
            self.points += 5;
          }
        }
        //controllo ore
        checkValue = document.getElementById("physicalActHours");
        self.physicalActTime = checkValue.value;
        if (self.physicalActTime <= 1) {
          //1 ora max
          self.points += 1;
        } else if (self.physicalActTime > 1 && self.physicalAct <= 2) {
          //da 1 a 2 ore
          self.points += 2.5;
        } else {
          //oltre 2 ore
          self.points += 5;
        }
      } else {
        self.physicalAct = false;
      }

      //campo meteo
      checkValue = document.getElementById("sunny");
      if (checkValue.checked) {
        self.weather = "s";
        self.points += 2.5;
      } else {
        checkValue = document.getElementById("cloudy");
        if (checkValue.checked) {
          self.weather = "c";
        } else {
          self.weather = "r";
          self.points -= 5;
        }
      }

      //campo temperatura
      checkValue = document.getElementById("temperature");
      self.temperature = checkValue.value;
      if (self.temperature >= 30) {
        self.points += 5;
      } else if (self.temperature < 30 && self.temperature > 25) {
        self.points += 2.5;
      }

      let color;

      if (self.points >= 14.5) {
        self.result = "Fortemente consigliata";
        color = 1;
      } else if (self.points < 14.5 && self.points >= 7.5) {
        self.result = "Consigliata";
        color = 2;
      } else if (self.points < 7.5 && self.points >= 2) {
        self.result = "Sconsigliata";
        color = 3;
      } else {
        self.result = "Fortemente sconsigliata";
        color = 4;
      }

      self.result = self.result.toUpperCase()

      let today = new Date();
      let day = today.getDay();
      //controllo domenica
      if(day == 0){
        day = 7
      }

      if (self.data[day - 1] == "ND") {
        document.getElementById(day).innerHTML = self.result;
        document.getElementById(day).style.color = "white";
        if (color == 1) {
          document.getElementById(day).style.backgroundColor = FORT_CONS_COLOR;
        } else if (color == 2) {
          document.getElementById(day).style.backgroundColor = CONS_COLOR;
        } else if (color == 3) {
          document.getElementById(day).style.backgroundColor = SCONS_COLOR;
        } else if (color == 4) {
          document.getElementById(day).style.backgroundColor = FORT_SCONS_COLOR;
        }
        self.data[day - 1] = self.result;
        self.saveInLocalStorage();

        self.addResult(self.result, color);
      } else {
        self.addResult("TEST GIA' ESEGUITO, TORNA DOMANI!", 0)
      }
    }, 5000); 
  }

  /**
   * comunica all'utente il risultato del test e la relativa descrizione
   * @param {*} res risultato test
   * @param {*} col colore del risultato (rosso = negativo & verde = positivo)
   */
  addResult(res, col) {
    let result =  document.getElementById("result")
    document.getElementById("divResult").classList.remove("hidden");
    result.innerHTML = res;
    if (col == 1) {
      result.style.color = FORT_CONS_COLOR;
    } else if (col == 2) {
      result.style.color = CONS_COLOR;
    } else if (col == 3) {
      result.style.color = SCONS_COLOR;
    } else if (col == 4) {
      result.style.color = FORT_SCONS_COLOR;
    }

    this.getDescriptionFromTxt(col);
  }

  /**
   * carica dal file numero 'num' la frase associata al risultato del test
   * @param {*} num numero del file da cui estrarre la frase
   */
  getDescriptionFromTxt(num){
    fetch(num + '.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel caricamento del file');
      }
      return response.text();
    })
    .then(content => {
      document.getElementById("description").innerHTML = content;
    })
    .catch(error => {
      console.error('Errore:', error);
    });
  }

  /**
   * salva i dati utente in localStorage
   */
  saveInLocalStorage() {
    localStorage.setItem("user", JSON.stringify(this.data));
  }

  /**
   * all'avvio della pagina web carica i dati utente dal localStorage. in caso di primo accesso o di nuova settimana essi vengono indicati con "ND"
   */
  loadFromLocalStorage() {
    if (this.checkWeek()) { 
      let test = JSON.parse(localStorage.getItem("user"));
      if (test != null) {
        this.data = JSON.parse(localStorage.getItem("user"));
      } else {
        this.data = ["ND", "ND", "ND", "ND", "ND", "ND", "ND"];
      }
    } else {
      this.data = ["ND", "ND", "ND", "ND", "ND", "ND", "ND"];
    }

    for (let i = 0; i < 7; i++) {
      document.getElementById(i + 1).innerHTML = this.data[i];
    }

    this.loadColors();
  }

  /**
   * richiama il controllo riguardante se la settimana è la stessa di quella dell'ultimo accesso. lo fa caricando dai dati utente del localStorage la data dell'ultimo accesso
   * @returns false se la settimana è diversa, true se è la stessa di quella dell'ultimo accesso
   */
  checkWeek() {
    const currentDate = new Date();
    const storedDate = new Date(localStorage.getItem("lastAccess"));

    if (!storedDate || this.checkWeekChange(currentDate, storedDate)) {
      localStorage.setItem("lastAccess", currentDate);
      return false;
    }

    return true;
  }

  /**
   * effettua il controllo vero e proprio sulla settimana
   * @param {*} currentDate data attuale di accesso
   * @param {*} storedDate data di ultimo accesso
   * @returns se la settimana della data attuale e quella dell'ultima registrata corrispondono
   */
  checkWeekChange(currentDate, storedDate) {
    const currentWeek = this.getWeekNumber(currentDate);
    const storedWeek = this.getWeekNumber(storedDate);

    return currentWeek !== storedWeek;
  }

  /**
   * ricava il numero di settimana dalla data 
   * @param {*} date data da cui estrarre il numero di settimana
   * @returns il numero di settimana
   */
  getWeekNumber(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - firstJan) / 86400000 + firstJan.getDay() + 1) / 7);
  }

  /**
   * carica i colori della tabella del report settimanale: se il dato non è definito rimane bianco altrimenti lo sfondo della cella corrispondente cambia a seconda
   * del risultato registrato dal test
   */
  loadColors() {
    for (let i = 0; i < 7; i++) {
      if (this.data[i] != "ND") {
        document.getElementById(i + 1).style.color = "white";
      }

      if (this.data[i] == "FORTEMENTE CONSIGLIATA") {
        document.getElementById(i + 1).style.backgroundColor = FORT_CONS_COLOR;
      } else if (this.data[i] == "CONSIGLIATA") {
        document.getElementById(i + 1).style.backgroundColor = CONS_COLOR;
      } else if (this.data[i] == "SCONSIGLIATA") {
        document.getElementById(i + 1).style.backgroundColor = SCONS_COLOR;
      } else if (this.data[i] == "FORTEMENTE SCONSIGLIATA") {
        document.getElementById(i + 1).style.backgroundColor = FORT_SCONS_COLOR;
      }
    }
  }

  /**
   * attiva i campi avanzati dell'attività fisica in caso di spunta sul "Si" su quello base
   */
  enablePhysicalActAdv() {
    document.getElementById("lightwork").disabled = false;
    document.getElementById("mediumwork").disabled = false;
    document.getElementById("heavywork").disabled = false;
    document.getElementById("physicalActHours").disabled = false;
  }

  /**
   * disattiva i campi avanzati dell'attività fisica in caso di spunta sul "No" su quello base
   */
  disablePhysicalActAdv() {
    document.getElementById("lightwork").disabled = true;
    document.getElementById("mediumwork").disabled = true;
    document.getElementById("heavywork").disabled = true;
    document.getElementById("physicalActHours").disabled = true;
  }

  /**
   * apre il popup delle informazioni sulla pagina
   */
  openInfo() {
    document.getElementById("messaggio").classList.remove("hidden");
  }

  /**
   * chiude il popup delle informazioni sulla pagina
   */
  closeInfo() {
    document.getElementById("messaggio").classList.add("hidden");
  }
}