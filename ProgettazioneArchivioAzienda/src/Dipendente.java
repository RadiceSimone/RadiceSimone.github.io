public class Dipendente {
    private String nomeCognome;
    private String indirizzoResidenza;
    private String dataNascita;
    private String dataAssunzione;
    private int oreSettimanaliLavorative;
    private String ufficioDiAppartenenza;

    public Dipendente(String nomeCognome, String indirizzoResidenza, String dataNascita,
            String dataAssunzione, int oreSettimanaliLavorative, String ufficioDiAppartenenza) {
        this.nomeCognome = nomeCognome;
        this.indirizzoResidenza = indirizzoResidenza;
        this.dataNascita = dataNascita;
        this.dataAssunzione = dataAssunzione;
        this.oreSettimanaliLavorative = oreSettimanaliLavorative;
        this.ufficioDiAppartenenza = ufficioDiAppartenenza;
    }

    public String getNomeCognome() {
        return nomeCognome;
    }


    public String getIndirizzoResidenza() {
        return indirizzoResidenza;
    }

    public String getDataNascita() {
        return dataNascita;
    }

    public String getDataAssunzione() {
        return dataAssunzione;
    }

    public int getOreSettimanaliLavorative() {
        return oreSettimanaliLavorative;
    }

    public String getUfficioDiAppartenenza() {
        return ufficioDiAppartenenza;
    }

    public void visualizzaInfo(){
        System.out.println(this.nomeCognome + " " + this.indirizzoResidenza + " " + this.dataNascita + " " + this.dataAssunzione + " " + this.oreSettimanaliLavorative + " " + this.ufficioDiAppartenenza);
    }

    
}
