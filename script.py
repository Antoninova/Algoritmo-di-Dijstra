import pyodide

from typing import Any

from pyscript import document, when, window, display

from operator import attrgetter

from js import document, Output

import json

class Nodo:
        def __init__(self, n):
            self.nome = n
            self.vtemp = 0
            self.nodoprec = ''
            self.stato = 0

        def getT(self):
            print("T: " + str(self.temp))
grafo = [] 
    
madiacenze = []


@when('click', '#a')
def out():
    global grafo
    global madiacenze

    grafo = [] 
    
    madiacenze = []
    

    print("CUAO")
    comps = list(document.getElementsByClassName("dati"))

    for i in range (len(comps)):
        for j in range (len(comps)):
            if (int(comps[i].id) < int(comps[j].id)):
                app = comps[i]
                comps[i] = comps[j]
                comps[j] = app
                
    print("In ordine")
    for i in comps:
        print(i.id)


    
    r = comps[0].value

    print("R:")
    
    print(r)

    
    a = 2
    q = True

    #acquisizione nodi
    for i in comps:
        if int(i.id) == a:
            print(i.id)
            if q:
                a = a + 1
                q = False
            else:
                a = a + 2
                q = True

            p = True
            for nodo in grafo:
                if nodo.nome == i.value:
                    p = False
            if p:
                grafo.append(Nodo(i.value))

    
    grafo.sort(key=attrgetter('nome'))

    for nodo in grafo:
        print("Nodo:")
        print(nodo.nome)
    
    a=2
    q = True
    print("PROVA")





    for i in range(len(grafo)):
        madiacenze.append([])
        for j in range(len(grafo)):
            madiacenze[i].append(0)

    
    for z in range(len(grafo)):
        a = 2
        
        for j in range (len(grafo)):
            print ("A")
            print (a)
            print (len(grafo))
            while a < len(comps):
                print("SU")
                print(comps[a].value)
                print(grafo[z].nome)

                print(comps[a+1].value)
                print(grafo[j].nome)
                if comps[a].value == grafo[z].nome and comps[a+1].value == grafo[j].nome:
                    print("ECCOMI")
                    madiacenze[z][j] = int(comps[a-1].value)
                
                a = a + 3
            
            a = 2
                        
    


    print("MATRICE:")
    for i in range (len(madiacenze)):
        for j in range(len(madiacenze[z])):
            print(madiacenze[i][j])

    
    print("WELLLA")

    for nodo in grafo:
        print("Nodo:")
        print(nodo.nome)


    no = int(document.getElementById("nr").value)-1
    print("Nodo d'origine")
    print(no)
    #ALgoritmo di Dijkstra
        
    def esa(i):
        for j in range(len(madiacenze[0])):
            if madiacenze[i][j] > 0:
                    if grafo[j].vtemp > grafo[i].vtemp + madiacenze[i][j] and grafo[j].stato == 1 or grafo[j].stato == 0:
                        grafo[j].vtemp = grafo[i].vtemp + madiacenze[i][j]
                        grafo[j].nodoprec = grafo[i].nome
                        grafo[j].stato = 1
                        print("1")
                        print("Nodo:::::")
                        print(grafo[i].nome)
                        print(grafo[j].nodoprec)
                    else:
                        if grafo[j].vtemp > grafo[i].vtemp + madiacenze[i][j] and grafo[j].stato == 3:
                            grafo[j].vtemp = grafo[i].vtemp + madiacenze[i][j]
                            grafo[j].nodoprec = grafo[i].nome
                            esa(j)


    def contr():
        i = no
        k = True
        min = 0
        x = 0

        while k and i <= len(grafo):
            k = False
            esa(i)
                
            min = 500

            print(3)
            grafo[i].stato = 3
            print(4)
            for z in range(len(grafo)):
                print(5)
                if grafo[z].stato == 1:
                    print(grafo[z].nome)
                    print(grafo[z].vtemp)
                    print(min)
                    if grafo[z].vtemp < min:
                        print ("CIAO")
                        min = grafo[z].vtemp
                        x = z
                        k = True

            i = x
            
            print()
            print("i ")
            print(i)
            print(x)
            print()



    contr()

    for nodo in grafo:
        print("Nodo:")
        print(nodo.nome)
        print(nodo.vtemp)
        print(nodo.nodoprec)


    nod = []
    nod.append(grafo[len(grafo)-1].nome)
    nod.append(grafo[len(grafo)-1].nodoprec)

    p = 0
    k = True
    while k and p < (len(nod)/2):
        k = False
        for nodo in grafo:
            if nodo.nome == nod[p+1]:
                nod.append(nodo.nome)
                nod.append(nodo.nodoprec)
                p = p + 1
                if nodo.nome != grafo[0].nome:
                    k = True
                else:
                    k = False

    nod[len(nod)-1] = 'A'

    print("NOD")
    for i in nod:
        print(i)


    lista = json.dumps(nod)


    

    print("Listapy")
    for i in range (len(lista)):
        print(lista[i])

    Output(lista)

    


        
    
    p = document.getElementById("p")

    p1 = document.getElementById("p1")

    p1.textContent = "Nodo destinatario Valore  Nodo"

    for nodo in grafo:
        testo =  nodo.nome
        testo = testo + " "
        testo = testo + str(nodo.vtemp) 
        testo = testo + " "
        testo = testo + nodo.nodoprec

    p.textContent = testo

    # p.innerHTML = "<b> CIAO <b>"

