import java.util.ArrayList;
import java.util.List;

public class Ufficio {
    private String nome;
    private int piano;
    private String siglaLocale;
    private int numeroPostazioni;
    private String responsabile;
    private List<Dipendente> dipendenti;

    public Ufficio() {
        this.nome = "";
        this.piano = 0;
        this.siglaLocale = "";
        this.numeroPostazioni = 0;
        this.responsabile = "";
        this.dipendenti = new ArrayList<>();
    }

    public Ufficio(String nome, int piano, String siglaLocale, int numeroPostazioni, String responsabile) {
        this.nome = nome;
        this.piano = piano;
        this.siglaLocale = siglaLocale;
        this.numeroPostazioni = numeroPostazioni;
        this.responsabile = responsabile;
        this.dipendenti = new ArrayList<>();
    }

    public void aggiungiDipendente(Dipendente dipendente) {
        dipendenti.add(dipendente);
    }

    public String getNome() {
        return nome;
    }

    public int getPiano() {
        return piano;
    }

    public String getSiglaLocale() {
        return siglaLocale;
    }

    public int getNumeroPostazioni() {
        return numeroPostazioni;
    }

    public String getResponsabile() {
        return responsabile;
    }

    public List<Dipendente> getDipendenti() {
        return dipendenti;
    }

    public void visualizzaInfo(){
        System.out.println(this.nome + " " + this.piano + " " + this.siglaLocale + " " + this.numeroPostazioni + " " + this.responsabile);
        for(int j = 0; j < this.dipendenti.size(); j++){
            this.dipendenti.get(j).visualizzaInfo();
        }
    }
}
