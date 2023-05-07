class Gioco {
  constructor() {
    event.preventDefault();
    this.mine = document.impostazioniCampo.mine.value;
    document.getElementById("mineRimanenti").innerHTML += this.mine;
    this.righe = document.impostazioniCampo.righe.value;
    this.colonne = document.impostazioniCampo.colonne.value;
    this.rimanenti = this.mine;
    this.celle = [];
    this.campo = [];
    this.cliccate = 0;
    this.enabled = true;
    this.creaCampo();
  }

  creaCampo(){ //crea campo da gioco
    for (let i = 0; i < this.righe * this.colonne; i++) //crea celle
    {
      this.celle[i] = document.createElement('img');
      this.celle[i].src = "img/x.png";
      this.celle[i].style.top = 300 + Math.floor(i / this.colonne) * 30; //piazza verticalmente
      this.celle[i].style.left =  ($(window).width()/ 2)+ i % this.colonne * 30; //piazza orizzontalmente
      this.celle[i].addEventListener('mousedown', this.cliccato.bind(this));  //cliccato cella, bind indica che viene eseguita nel contesto della classe Gioco
      this.celle[i].id = i;
      document.getElementById("campoGioco").appendChild(this.celle[i]);
      //document.body.appendChild(this.celle[i]); //aggiunge cella all'html
    }
    


    //piazza mine
    this.piazzate = 0;
    do {
      let i = Math.floor(Math.random() * this.colonne * this.righe);   //cella random
      if (this.campo[i] != 'mine') //controlla che non ci sia
      {
        this.campo[i] = 'mine';
        this.piazzate++;
      }
    } while (this.piazzate < this.mine);


    for (let x = 0; x < this.colonne; x++){
      for (let y = 0; y < this.righe; y++) //per ogni riga
      {
        if (this.controlla(x, y) != 'mine') //se non è una mina
        {
          this.campo[x + y * this.colonne] = // valore della cella = somma delle 8 celle adiacenti
            //se da una mina allora è 1 altrimenti 0
            ((this.controlla(x, y + 1) == 'mine') | 0) //basso
            + ((this.controlla(x - 1, y + 1) == 'mine') | 0) //basso-sinistra
            + ((this.controlla(x + 1, y + 1) == 'mine') | 0) //basso-destra
            + ((this.controlla(x, y - 1) == 'mine') | 0) //alto
            + ((this.controlla(x - 1, y - 1) == 'mine') | 0) //alto-sinistra
            + ((this.controlla(x + 1, y - 1) == 'mine') | 0) //alto-destra
            + ((this.controlla(x - 1, y) == 'mine') | 0) //sinistra
            + ((this.controlla(x + 1, y) == 'mine') | 0); //destra
        }
      }
    } 
  }

  controlla(x1, y1){        // ritorna le coordinate.
    if ((x1 >= 0) && (y1 >= 0) && (x1 < this.colonne) && (y1 < this.righe)) { //controlla che non siano fuori
      return this.campo[x1 + y1 * this.colonne];
    }
  }

  cliccato(event) { //quando si clicca
    if(this.enabled == true){
      let source = event.target;
      let id = source.id;  //cella cliccata
      
  
      if (event.which == 3)  //tasto destro cliccato
      {
        switch (this.getImmagine(id)) {
        
          case 'x':
            this.celle[id].src = 'img/f.png';
            this.rimanenti--;
            document.getElementById("mineRimanenti").innerHTML = "Mine rimanenti: " + this.rimanenti;
            break;  //mette flag se non è cliccata
          case 'f':
            this.celle[id].src = 'img/q.png';
            this.rimanenti++;
            document.getElementById("mineRimanenti").innerHTML = "Mine rimanenti: " + this.rimanenti;
            break;  //se c'è la flag mette un punto di domanda
          case 'q':
            this.celle[id].src = 'img/x.png';
            break; //se c'è il punto di domanda mette non cliccata
        }
        event.preventDefault();
      }
    
      if (event.which == 1 && this.getImmagine(id) != 'f') //cliccato sinistro e non è una flag
      {
        if (this.campo[id] == 'mine') //se è una mina (sconfitta)
        {
          for (let i = 0; i < this.righe * this.colonne; i++) {
            if (this.campo[i] == 'mine') {
              this.celle[i].src = "img/m.png"; //mostra mina
            }
            if (this.campo[i] != 'mine' && this.getImmagine(i) == 'f') {
              this.celle[i].src = "img/e.png"; //flags sbagliate
            }
          }
          alert("Hai perso!");
          this.enabled = false;
        }
        else
          if (this.getImmagine(id) == 'x') {
            this.rivelaCella(id); //rivela cella
          }
      }
    
      if (this.cliccate == this.righe * this.colonne - this.mine)  //tutte cliccate (vittoria)
      {
        alert("Hai vinto!")
        this.enabled = false;
      }
    }
    else{
      alert("Il gioco è terminato!");
    }
    
  }

  getImmagine(index){ //ritorna i caratteri dell'getImmagine delle celle
  
    return this.celle[index].src.substr(this.celle[index].src.length - 5, 1);
  }

  rivelaCella(index) {
    if (this.getImmagine(index) == "x" && this.campo[index] != 'mine') {
      this.cliccate++;
    }
  
    this.celle[index].src = "img/" + this.campo[index] + ".png";  //mette il numero
  
    //converte in coordinate
    let x = index % this.colonne;
    let y = Math.floor(index / this.colonne);
  
    if (this.campo[index] == 0)  //se la cella è a 0 controlla le celle adiacenti
    {
      if (x > 0 && this.getImmagine(index - 1) == "x") { //sinistra
        this.rivelaCella(index - 1);
      }
      if (x < (this.colonne - 1) && this.getImmagine(index + 1) == "x") { //destra
        this.rivelaCella(index + 1);
      }
      if (y < (this.righe - 1) && this.getImmagine(index + this.colonne) == "x") { //basso
        this.rivelaCella(index + this.colonne);
      }
      if (y > 0 && this.getImmagine(index - this.colonne) == "x") { //sopra
        this.rivelaCella(index - this.colonne);
      }
      if (x > 0 && y > 0 && getImmagine(index - this.colonne - 1) == "x") { //alto-sinistra
        this.rivelaCella(index - this.colonne - 1);
      }
      if (x < (this.colonne - 1) && y < (this.righe - 1) && this.getImmagine(index + this.colonne + 1) == "x") { //basso-destra
        this.rivelaCella(index + this.colonne + 1);
      }
      if (x > 0 && y < (this.righe - 1) && y < (this.righe - 1) && this.getImmagine(index + this.colonne - 1) == "x") { //basso-sinistra
        this.rivelaCella(index + this.colonne - 1);
      }
      if (x < (this.colonne - 1) && y > 0 && y < (this.righe - 1) && this.getImmagine(index - this.colonne + 1) == "x") { //alto-destra
        this.rivelaCella(index - this.colonne + 1);
      }
    }
}

  restart(){
    location.reload();
  }
}        
