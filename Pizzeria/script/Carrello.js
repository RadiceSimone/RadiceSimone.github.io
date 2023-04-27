class Carrello{
    constructor(){
        this.lista = new Array();
    }

    aggiungiPizza(id){
        const tmp = new Pizza(id, 1);
        let trovato = false;

        for(let i = 0; i < this.lista.length; i++){
            if(id == this.lista[i].nome){
                this.lista[i].incrementaNumero();
                trovato = true;
                const listaElementi = document.getElementsByTagName("td");
                let n = parseInt(listaElementi[i].innerHTML) + 1;
                listaElementi[i].innerHTML = n;
            }
        }

        if(trovato == false){
            this.lista.push(tmp);
            let table = $("#listaPizze");
            table.append("<tr><td>" +tmp.num + "</td><td>" + tmp.nome + "</td></tr>");
        }
    }
}