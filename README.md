# Algoritmo di Dijkstra
## Cos'è l'algoritmo di Dijkstra
L'algoritmo di Dijkstra fu inventato nel 1956 dall'informatico olandese Edsger Dijkstra, da cui prende il nome. Fu lo stesso ideatore a pubblicarlo solo dopo, nel 1959.

Esso è un algoritmo di routing centralizzato e statico, in particolare fa parte della famiglia Shortest Path Routing. È in grado di calcolare il sink tree di una rete, cioè l'albero, che dato un nodo d'origine, calcola il miglior percorso tra tutti i nodi, oppure, può essere applicato in modo parziale calcolando il percorso minimo tra una coppia di nodi: Nodo origine e Nodo destinatario come realizzato nel mio "Capolavoro". 

Tale algoritmo trova applicazione in molteplici contesti quale l'ottimizzazione nella realizzazione di reti e la valutazione di percorsi runtime nel campo della robotica.

La complessità computazionale dell'algoritmo di Dijkstra può essere espressa in funzione di |𝑉| ed |𝐸| ossia, rispettivamente, il numero di nodi e degli archi appartenenti al grafo sul quale viene eseguito. L'algoritmo utilizza una coda di priorità su cui vengono effettuate tre operazioni: la costruzione della coda, l'estrazione dell'elemento minimo e la riduzione del valore di un elemento. La struttura dati utilizzata per l'implementazione della coda di priorità determina la complessità di queste tre operazioni e, di conseguenza, quella dell'algoritmo.
L'algoritmo di Dijkstra viene, quindi, utilizzato per reti di piccole o medie dimensioni (anche nel routing gerarchico) poichè all'aumentare dei nodi e degli archi aumenta in modo eccessivo il tempo di convergenza della rete, cioè il processo di aggiornamento delle route in tutta la rete (calcolo del percorso minimo).

## Il mio "Capolavoro"
Il mio Capolavoro consiste in un sito che implementa l’algoritmo di Dijstra per il calcolo del cammino minimo tra una coppia di nodi. 

Il sito presenta un’interfaccia grafica per disegnare il grafo di una rete. Tale interfaccia è costituita da un pannello Canvas con js (JavaScript) e da alcuni bottoni per interargire con essa.

I tasti "Origine" e "Destinatario" permettono di scegliere rispettivamente il nodo origine e il nodo destinatario.

Al click del tasto "Calcola" viene applicato l'algoritmo di Dijkstra sulla rete disegnata; compaiono, inoltre, in un altro pannello Canvas il percorso minimo e a fianco al tasto "Calcola", un tasto per la visualizzazzione della matrice delle adiacenze e del costo massimo del percorso. Tale matrice può essere cambiata di posizione per trascinamento e può essere chiusa dal tasto "X" in alto a destra della matrice stessa o dal tasto utilizzato in precedenza per visualizzarla.

[sito](https://antoninova.github.io/Algoritmo-di-Dijstra/)
