import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

public class App {

    public static List<Ufficio> caricaDaFile() throws IOException {
        File test = new File("archivio.txt");
        if(!test.exists()){
            FileWriter fw = new FileWriter(test);
            fw.close();
        }
        BufferedReader reader = new BufferedReader(new FileReader("archivio.txt"));
        List<Ufficio> lista = new LinkedList<Ufficio>();
        Ufficio tmpUfficio = null;
        Dipendente tmpDipendente;
    
        String line = reader.readLine();
        while (line != null) {
            String[] tmp = line.split(";");
            if (tmp[0].equals("U")) {
                if (tmpUfficio != null) {
                    lista.add(tmpUfficio);
                }
                tmpUfficio = new Ufficio(tmp[1], Integer.parseInt(tmp[2]), tmp[3], Integer.parseInt(tmp[4]), tmp[5]);
            } else if (tmp[0].equals("D")) {
                if (tmpUfficio != null) {
                    tmpDipendente = new Dipendente(tmp[1], tmp[2], tmp[3], tmp[4], Integer.parseInt(tmp[5]), tmp[6]);
                    tmpUfficio.aggiungiDipendente(tmpDipendente);
                }
            }
            line = reader.readLine();
        }
        if (tmpUfficio != null) {
            lista.add(tmpUfficio);
        }
    
        reader.close();
    
        return lista;
    }

    public static void caricaSuFile(Ufficio ufficio) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("archivio.txt", true))) {
            writer.write("U;"+ufficio.getNome() + ";" + ufficio.getPiano() + ";" + ufficio.getSiglaLocale() + ";"
                    + ufficio.getNumeroPostazioni() + ";" + ufficio.getResponsabile() + "\n");
            for (Dipendente dipendente : ufficio.getDipendenti()) {
                writer.write("D;"+dipendente.getNomeCognome() + ";" + dipendente.getIndirizzoResidenza() + ";"
                        + dipendente.getDataNascita() + ";" + dipendente.getDataAssunzione() + ";"
                        + dipendente.getOreSettimanaliLavorative() + ";" + dipendente.getUfficioDiAppartenenza() + "\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        //caricamento informazioni
        List<Ufficio> listaUffici = caricaDaFile();

        //visualizzazione informazioni
        System.out.println("Informazioni caricate");
        for(int i = 0; i < listaUffici.size(); i++){
            listaUffici.get(i).visualizzaInfo();
        }

        //aggiunta informazioni
        Ufficio ufficio1 = new Ufficio("Ufficio A", 1, "A01", 10, "Responsabile A");

        Dipendente dipendente1 = new Dipendente("Nome1 Cognome1", "Indirizzo1", "01/01/1990", "01/01/2020", 40,
                "Ufficio A");
        Dipendente dipendente2 = new Dipendente("Nome2 Cognome2", "Indirizzo2", "02/02/1991", "02/02/2019", 35,
                "Ufficio A");
        Dipendente dipendente3 = new Dipendente("Nome3 Cognome3", "Indirizzo3", "03/03/1992", "03/03/2018", 30,
                "Ufficio A");
        Dipendente dipendente4 = new Dipendente("Nome4 Cognome4", "Indirizzo4", "04/04/1993", "04/04/2017", 25,
                "Ufficio A");
        Dipendente dipendente5 = new Dipendente("Nome5 Cognome5", "Indirizzo5", "05/05/1994", "05/05/2016", 20,
                "Ufficio A");

        ufficio1.aggiungiDipendente(dipendente1);
        ufficio1.aggiungiDipendente(dipendente2);
        ufficio1.aggiungiDipendente(dipendente3);
        ufficio1.aggiungiDipendente(dipendente4);
        ufficio1.aggiungiDipendente(dipendente5);

        //salvataggio dei dati
        caricaSuFile(ufficio1);
    }
}
