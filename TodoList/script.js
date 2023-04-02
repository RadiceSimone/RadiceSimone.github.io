class Lista {
    constructor() {
        this.listaEventi = [];
        this.listaElementi = [];
        this.nEl = 0;
        this.nome = "";
        this.data = "";
        this.mostraUrgenti = true;
        this.indexModifica = 0;
    }

    add() {
        event.preventDefault();
        this.listaElementi = document.getElementsByClassName("attività");
        let evento = new Evento();

        if (this.nEl < this.listaElementi.length) {
            let dateTemp = new Date(document.crea.data.value);
            this.data = dateTemp.getDate() + "/" + (dateTemp.getMonth() + 1) + "/" + dateTemp.getFullYear();
            this.nome = document.crea.nome.value;
            this.listaElementi[this.nEl].querySelector("#nomeAttività").value = this.nome;
            this.listaElementi[this.nEl].querySelector("#dataAttività").value = this.data;
            this.listaElementi[this.nEl].style.display = "block";
            evento.nome = this.nome;
            evento.data = this.data;

            let dataDiOggi = new Date();
            if ((dateTemp.getDate() - dataDiOggi.getDate()) < 3 && dateTemp.getMonth() == dataDiOggi.getMonth() && dateTemp.getFullYear() == dataDiOggi.getFullYear()) {
                evento.colore = "red";
                evento.isUrgente = true;
            }
            else if (dateTemp.getMonth() == dataDiOggi.getMonth() && dateTemp.getFullYear() == dataDiOggi.getFullYear()) {
                evento.colore = "yellow";
            }
            else {
                evento.colore = "green";
            }

            this.listaElementi[this.nEl].style.backgroundColor = evento.colore;
            this.listaEventi.push(evento);
            this.nEl++;
        }
        else {
            alert("LISTA PIENA!");
        }
    }

    eliminaSingolo(id) {
        let indexDaEliminare = id - 1;
        this.listaElementi[indexDaEliminare].querySelector("#nomeAttività").value = "";
        this.listaElementi[indexDaEliminare].querySelector("#dataAttività").value = "";
        this.listaElementi[indexDaEliminare].style.display = "none";
        delete this.listaElementi[i];
        this.nEl--;
    }

    eliminaTutti() {
        for (let i = 0; i < this.nEl; i++) {
            this.listaElementi[i].querySelector("#nomeAttività").value = "";
            this.listaElementi[i].querySelector("#dataAttività").value = "";
            this.listaElementi[i].style.display = "none";
            delete this.listaElementi[i];
        }
        this.nEl = 0;
    }

    check(id) {
        let i = id - 1;

        if (this.listaEventi[i].isChecked == false) {
            this.listaElementi[i].style.backgroundColor = "grey";
            this.listaEventi[i].isChecked = true;
        }
        else {
            this.listaElementi[i].style.backgroundColor = this.listaEventi[i].colore;
            this.listaEventi[i].isChecked = false;
        }

    }

    urgenti() {
        if (this.mostraUrgenti == true) {
            for (let i = 0; i < this.nEl; i++) {
                if (this.listaEventi[i].isUrgente == true) {
                    this.listaElementi[i].style.display = "none";
                }
            }
            this.mostraUrgenti = false;
        }
        else {
            for (let i = 0; i < this.nEl; i++) {
                if (this.listaEventi[i].isUrgente == true) {
                    this.listaElementi[i].style.display = "block";
                }
            }
            this.mostraUrgenti = true;
        }
    }

    ordinaPerScadenza() {
        let data1 = new Date();
        let data2 = new Date();
        let info = [];

        for (let j = 0; j < this.nEl; j++) {
            for (let i = 0; i < this.nEl - 1; i++) {
                info = this.listaEventi[i].data.split("/");
                data1.setDate(info[0]);
                data1.setMonth(info[1]);
                data1.setFullYear(info[2]);

                info = this.listaEventi[i + 1].data.split("/");
                data2.setDate(info[0]);
                data2.setMonth(info[1]);
                data2.setFullYear(info[2]);

                if (data1 > data2) {
                    let temp = this.listaEventi[i];
                    this.listaEventi[i] = this.listaEventi[i + 1];
                    this.listaEventi[i + 1] = temp;
                }
            }
        }

        for (let i = 0; i < this.nEl; i++) {
            this.listaElementi[i].querySelector("#nomeAttività").value = this.listaEventi[i].nome;
            this.listaElementi[i].querySelector("#dataAttività").value = this.listaEventi[i].data;
            this.listaElementi[i].style.backgroundColor = this.listaEventi[i].colore;
        }
    }

    abilitaModifica(pos) {
        this.listaElementi[pos - 1].querySelector("#nomeAttività").style.pointerEvents = "auto";

        const item = this.listaElementi[pos - 1].querySelector("#dataAttività");
        const newItem = document.createElement('p');
        newItem.innerHTML = '<input type="date" id = "dataModificata">';
        item.parentNode.replaceChild(newItem, item);

        document.getElementById("salvaModifica").style.display = "block";
        this.indexModifica = pos - 1;
    }

    salvaModifica() {
        this.listaEventi[this.indexModifica].nome = this.listaElementi[this.indexModifica].querySelector("#nomeAttività").value;

        let dateTemp = new Date(this.listaElementi[this.indexModifica].querySelector("#dataModificata").value);
        let dataDiOggi = new Date();

        this.listaEventi[this.indexModifica].data = dateTemp.getDate() + "/" + (dateTemp.getMonth() + 1) + "/" + dateTemp.getFullYear();

        if ((dateTemp.getDate() - dataDiOggi.getDate()) < 3 && dateTemp.getMonth() == dataDiOggi.getMonth() && dateTemp.getFullYear() == dataDiOggi.getFullYear()) {
            this.listaEventi[this.indexModifica].colore = "red";
            this.listaEventi[this.indexModifica].isUrgente = true;
        }
        else if (dateTemp.getMonth() == dataDiOggi.getMonth() && dateTemp.getFullYear() == dataDiOggi.getFullYear()) {
            this.listaEventi[this.indexModifica].colore = "yellow";
            this.listaEventi[this.indexModifica].isUrgente = false;
        }
        else {
            this.listaEventi[this.indexModifica].colore = "green";
            this.listaEventi[this.indexModifica].isUrgente = false;
        }

        this.listaElementi[this.indexModifica].style.backgroundColor = this.listaEventi[this.indexModifica].colore;
        this.listaElementi[this.indexModifica].querySelector("#nomeAttività").style.pointerEvents = "none";

        const item = this.listaElementi[this.indexModifica].querySelector("#dataModificata");
        const newItem = document.createElement('p');
        newItem.innerHTML = '<input type="text" id = "dataAttività" style="pointer-events: none;">';
        item.parentNode.replaceChild(newItem, item);

        this.listaElementi[this.indexModifica].querySelector("#dataAttività").value = dateTemp.getDate() + "/" + (dateTemp.getMonth() + 1) + "/" + dateTemp.getFullYear();

        document.getElementById("salvaModifica").style.display = "none";
    }
}

class Evento {
    constructor() {
        this.nome = "";
        this.data = "";
        this.colore = "";
        this.isChecked = false;
        this.isUrgente = false;
    }
}