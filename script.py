import pyodide

from typing import Any

from pyscript import document, when, window, display

from operator import attrgetter

from js import document, Output
from js import document, Matrice

import json

class Nodo:
        def __init__(self, n):
            self.nome = n
            self.vtemp = 0
            self.nodoprec = ''
            self.stato = 0

        
            
grafo = [] 
    
madiacenze = []


@when('click', '#a')
def out():
    try:
        global grafo
        global madiacenze

        grafo = [] 
        
        madiacenze = []
        

        
        comps = list(document.getElementsByClassName("dati"))

        for i in range (len(comps)):
            for j in range (len(comps)):
                if (int(comps[i].id) < int(comps[j].id)):
                    app = comps[i]
                    comps[i] = comps[j]
                    comps[j] = app
                    
       


        
        r = comps[0].value

        
        a = 2
        q = True

        no = int(document.getElementById("nr").value)-1
        nd = int(document.getElementById("nd").value)-1

        for i in comps:
            if int(i.id) == a:
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

       

        if(nd != len(grafo)-1):
            grafo[nd], grafo[len(grafo)-1] = grafo[len(grafo)-1], grafo[nd]

        if(no != len(grafo)-1):
            grafo[0], grafo[no] = grafo[no], grafo[0]

        
        
        a=2
        q = True
        





        for i in range(len(grafo)):
            madiacenze.append([])
            for j in range(len(grafo)):
                madiacenze[i].append(0)

        
        for z in range(len(grafo)):
            a = 2
            
            for j in range (len(grafo)):
                while a < len(comps):

                    if comps[a].value == grafo[z].nome and comps[a+1].value == grafo[j].nome:
                        
                        madiacenze[z][j] = int(comps[a-1].value)
                    
                    a = a + 3
                
                a = 2
                            
        

        
        matr = ""
        nodi = ""
        
        for i in range (len(madiacenze)):
            
            for j in range(len(madiacenze[z])):
                matr += str(madiacenze[i][j]) + " "

            matr += ","
        

          

        for nodo in grafo:
            nodi += nodo.nome

        matri = json.dumps(matr)
        n = json.dumps(nodi)
        
        
      
        #ALgoritmo di Dijkstra
            
        def esa(i):
            for j in range(len(madiacenze[i])):
                    if madiacenze[i][j] > 0:
                            if grafo[j].vtemp > grafo[i].vtemp + madiacenze[i][j] and grafo[j].stato == 1 or grafo[j].stato == 0:
                                grafo[j].vtemp = grafo[i].vtemp + madiacenze[i][j]
                                grafo[j].nodoprec = grafo[i].nome
                                grafo[j].stato = 1
                            else:
                                if grafo[j].vtemp > grafo[i].vtemp + madiacenze[i][j] and grafo[j].stato == 3:
                                    grafo[j].vtemp = grafo[i].vtemp + madiacenze[i][j]
                                    grafo[j].nodoprec = grafo[i].nome
                                    esa(j)


        def contr():
            i = 0
            k = True
            min = 0
            x = 0

            while k and i < len(grafo):
                k = False
                esa(i)
                    
                min = 500

             
                grafo[i].stato = 3
                for z in range(len(grafo)):
                    if grafo[z].stato == 1:
                        
                        if grafo[z].vtemp < min:
                            
                            min = grafo[z].vtemp
                            x = z
                            k = True

                i = x
                
                



        contr()


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

       
      


     
        nodoprec = ""
        for i in range (len(grafo) -1, 1, -1):
            nodoprec += grafo[i].nodoprec

        nodop = json.dumps(nodoprec)

        val = grafo[len(grafo)-1].vtemp
        Matrice(matri, n, nodop)

        lista = json.dumps(nod)


        


        Output(lista)

        

        r = document.getElementById("r")
        r.textContent = "CT: " + str(val)
            
        
       




    except Exception as e:
        print(print(f"An error occurred: {e}"))

    # p.innerHTML = "<b> CIAO <b>"

