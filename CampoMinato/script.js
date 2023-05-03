function creaCampo() //crea campo da gioco
{
  event.preventDefault();
  mine = document.impostazioniCampo.mine.value;
  righe = document.impostazioniCampo.righe.value; 
  colonne = document.impostazioniCampo.colonne.value;
  rimanenti = mine;  //mine restanti
  celle = [];
  campo = []; 
  cliccate = 0;
  for (let i = 0; i < righe * colonne; i++) //crea celle, una riga per volta
  {
    celle[i] = document.createElement('img');
    celle[i].src = "img/x.png";
    celle[i].style = "position:absolute;height:30px; width: 30px; border: 1px solid black"; //absolute: possibilità di sovrapposizione
    celle[i].style.top = 50 + Math.floor(i / colonne) * 30; //coordinate verticali
    //50 è la distanza dal bordo superiore della pagina, math.floor arrotonda e 30 è la distanza tra le righe
    celle[i].style.left = 400 + i % colonne * 30; //coordinate orizzontali
    //400 è la distanza dal bordo dell pagina, i % colonne = colonna della cella e 30 è la distanza tra celle
    celle[i].addEventListener('mousedown', cliccato);  //cliccato cella
    celle[i].id = i;
    document.body.appendChild(celle[i]); //aggiunge cella all'html
  }
  //piazza mine
  piazzate = 0;
  do {
    let i = Math.floor(Math.random() * colonne * righe);   //cella random
    if (campo[i] != 'mine') //controlla che non ci sia
    {
      campo[i] = 'mine';
      piazzate++;
    }
  } while (piazzate < mine);

  //inserisce numeri mine adiacenti
  for (let x = 0; x < colonne; x++) //per ogni colonna
    for (let y = 0; y < righe; y++) //per ogni riga
    {
      if (controlla(x, y) != 'mine') //se non è una mina
      {
        campo[x + y * colonne] = // valore della cella = somma delle 8 celle adiacenti
          //se da una mina allora è 1 altrimenti 0 (l'or 0 converte)
          ((controlla(x, y + 1) == 'mine') | 0) //basso
          + ((controlla(x - 1, y + 1) == 'mine') | 0) //basso-sinistra
          + ((controlla(x + 1, y + 1) == 'mine') | 0) //basso-destra
          + ((controlla(x, y - 1) == 'mine') | 0) //alto
          + ((controlla(x - 1, y - 1) == 'mine') | 0) //alto-sinistra
          + ((controlla(x + 1, y - 1) == 'mine') | 0) //alto-destra
          + ((controlla(x - 1, y) == 'mine') | 0) //sinistra
          + ((controlla(x + 1, y) == 'mine') | 0); //destra
      }
    }

}

function controlla(x1, y1)        // ritorna le coordinate.
{
  if ((x1 >= 0) && (y1 >= 0) && (x1 < colonne) && (y1 < righe)) { //controlla che non siano fuori
    return campo[x1 + y1 * colonne]; 
  }
}

function getImmagine(index) //ritorna il carattere img della cella
{
  return celle[index].src.substr(celle[index].src.length - 5, 1); 
}

function cliccato(event) { //quando si clicca
  let source = event.target;
  id = source.id;  //cella cliccata

  if (event.which == 3)  //tasto destro cliccato
  {
    switch (getImmagine(id)) {
      case 'x':
        celle[id].src = 'img/f.png';
        rimanenti--;
        break;  //mette flag se non è cliccata
      case 'f':
        celle[id].src = 'img/q.png';
        rimanenti++;
        break;  //se c'è la flag mette un punto di domanda
      case 'q':
        celle[id].src = 'img/x.png';
        break; //se c'è il punto di domanda mette non cliccata
    }
    event.preventDefault();
  }

  if (event.which == 1 && getImmagine(id) != 'f') //cliccato sinistro e non è una flag
  {
    if (campo[id] == 'mine') //se è una mina (sconfitta)
    {
      for (let i = 0; i < righe * colonne; i++) {
        if (campo[i] == 'mine') {
          celle[i].src = "img/m.png"; //mostra mina
        }
        if (campo[i] != 'mine' && getImmagine(i) == 'f') {
          celle[i].src = "img/e.png"; //flags sbagliate
        }
      }
      alert("Hai perso!");
    }
    else
      if (getImmagine(id) == 'x') {
        rivelaCella(id); //rivela cella
      }
  }

  if (cliccate == righe * colonne - mine)  //tutte cliccate (vittoria)
  {
    alert("Hai vinto!")
  }
}


function rivelaCella(index) {
  if (campo[index] != 'mine' && getImmagine(index) == "x") { //se non è stata cliccata e non è una mina
    cliccate++;
  }
  celle[index].src = "img/" + campo[index] + ".png";  //mette il numero

  //converte in coordinate
  let x = index % colonne;
  let y = Math.floor(index / colonne);

  if (campo[index] == 0)  //se la cella è a 0 controlla le celle adiacenti
  {
    if (x > 0 && getImmagine(index - 1) == "x") { //sinistra
      rivelaCella(index - 1);
    }
    if (x < (colonne - 1) && getImmagine(index + 1) == "x") { //destra
      rivelaCella(index + 1);
    }
    if (y < (righe - 1) && getImmagine(index + colonne) == "x") { //basso
      rivelaCella(index + colonne);
    }
    if (y > 0 && getImmagine(index - colonne) == "x") { //sopra
      rivelaCella(index - colonne);
    }
    if (x > 0 && y > 0 && getImmagine(index - colonne - 1) == "x") { //alto-sinistra
      rivelaCella(index - colonne - 1);
    }
    if (x < (colonne - 1) && y < (righe - 1) && getImmagine(index + colonne + 1) == "x") { //basso-destra
      rivelaCella(index + colonne + 1);
    }
    if (x > 0 && y < (righe - 1) && y < (righe - 1) && getImmagine(index + colonne - 1) == "x") { //basso-sinistra
      rivelaCella(index + colonne - 1);
    }
    if (x < (colonne - 1) && y > 0 && y < (righe - 1) && getImmagine(index - colonne + 1) == "x") { //alto-destra
      rivelaCella(index - colonne + 1);
    }
  }
}        
