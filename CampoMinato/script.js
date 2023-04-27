

function creaCampo() //crea campo da gioco
{
  mine = 50;
  righe = 20; colonne = 20; //grandezza campo
  rimanenti = mine;  //mine restanti
  celle = [];
  campo = [];
  cliccate = 0;
  for (i = 0; i < righe * colonne; i++) //crea celle
  {
    celle[i] = document.createElement('img');
    celle[i].src = "img/x.png";
    celle[i].style = "position:absolute;height:30px; width: 30px";
    celle[i].style.top = 50 + Math.floor(i / colonne) * 30; //piazza verticalmente
    celle[i].style.left = 400 + i % colonne * 30; //piazza orizzontalmente
    celle[i].addEventListener('mousedown', cliccato);  //cliccato cella
    celle[i].id = i;
    document.body.appendChild(celle[i]); //aggiunge cella all'html
  }
  //piazza mine
  piazzate = 0;
  do {
    i = Math.floor(Math.random() * colonne * righe);   //cella random
    if (campo[i] != 'mine') //controlla che non ci sia
    {
      campo[i] = 'mine';
      piazzate++;
    }
  } while (piazzate < mine);


  for (var x = 0; x < colonne; x++) //per ogni colonna
    for (y = 0; y < righe + 1; y++) //per ogni riga
    {
      if (controlla(x, y) != 'mine') //se non è una mina
      {
        campo[x + y * colonne] = // valore della cella = somma delle 8 celle adiacenti
          //se da una mina allora è 1 altrimenti 0
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


function cliccato(event) { //quando si clicca
  var source = event.target;
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
      for (i = 0; i < righe * colonne; i++) {
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
  var x = index % colonne;
  var y = Math.floor(index / colonne);

 //finire
  }
}  

function controlla(x1, y1)        // ritorna le coordinate.
{

}

function getImmagine(index) //ritorna i caratteri dell'getImmagine delle celle
{
//fare
}
