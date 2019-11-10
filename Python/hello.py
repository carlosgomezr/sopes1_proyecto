from tkinter import *
from tkinter import filedialog
from future import *
import random
from tkinter.ttk import Progressbar
import sys
import datetime
import threading
import time
import requests

from requests import *

# ---------- Variables globales ---------
contadorSolicitudes = 0
arregloLineas = []
valorTimeout = 0
globalself = []
avanceGlobal = 0
tiempoTranscurrido = 0
totalSolicitudes = 0
valorurl = "http://35.238.225.235"
referenciaTxtStatus = None
referenciaProgressBar = None
referenciaEnviados = None
referenciaProgreso = None
referenciaTiempo = None


# -------------------------------------------

class VentanaPrincipal:
    def _init_(self, master):
        self.master = master
        master.title("SO1_Proyecto1")

        self.label = Label(master, text="Ingresa los parametros y opciones para enviar el trafico.")
        self.label.pack()

        # >>>>>>>>>>>>>>>>>>>>>>> URL <<<<<<<<<<<<<<<<<<<<<<<<<
        self.frame1 = Frame(master)
        self.frame1.pack(fill=X)

        self.lblUrl = Label(self.frame1, text="URL", width=10)
        self.lblUrl.pack(side=LEFT, padx=5, pady=5)

        self.txtUrl = Entry(self.frame1)
        self.txtUrl.pack(fill=X, padx=5, expand=True)
        self.txtUrl.insert(END, valorurl)

        # >>>>>>>>>>>>>>>>>>>>>>> Concurrencia <<<<<<<<<<<<<<<<<<<<<<<<<
        self.frame2 = Frame(master)
        self.frame2.pack(fill=X)

        self.lblConcurrencia = Label(self.frame2, text="Concurrencia", width=10)
        self.lblConcurrencia.pack(side=LEFT, padx=5, pady=5)

        self.spinConcurrencia = Spinbox(self.frame2, from_=1, to=100000)
        self.spinConcurrencia.pack(fill=X, padx=5, expand=True)

        # >>>>>>>>>>>>>>>>>>>>>>> Solicitudes <<<<<<<<<<<<<<<<<<<<<<<<<
        self.frame3 = Frame(master)
        self.frame3.pack(fill=X)

        self.lblSolicitudes = Label(self.frame3, text="Solicitudes", width=10)
        self.lblSolicitudes.pack(side=LEFT, padx=5, pady=5)

        var = StringVar(root)
        var.set("5")
        self.spinSolicitudes = Spinbox(self.frame3, from_=0, to=100000, textvariable=var)
        self.spinSolicitudes.pack(fill=X, padx=5, expand=True)

        # >>>>>>>>>>>>>>>>>>>>>>> Timeout <<<<<<<<<<<<<<<<<<<<<<<<<
        self.frame4 = Frame(master)
        self.frame4.pack(fill=X)

        self.lblTimeout = Label(self.frame4, text="Timeout", width=10)
        self.lblTimeout.pack(side=LEFT, padx=5, pady=5)

        varTimeout = StringVar(root)
        varTimeout.set("100")

        self.spinTimeout = Spinbox(self.frame4, from_=1, to=100000, textvariable=varTimeout)
        self.spinTimeout.pack(fill=X, padx=5, expand=True)

        # >>>>>>>>>>>>>>>>>>>>>>> Parametros <<<<<<<<<<<<<<<<<<<<<<<<<
        self.frame5 = Frame(master)
        self.frame5.pack(fill=X)

        self.lblParametros = Label(self.frame5, text="Parametros", width=10)
        self.lblParametros.pack(side=LEFT, padx=5, pady=5)

        self.btnBuscar = Button(self.frame5, text="Buscar", command=self.onOpen)
        self.btnBuscar.pack(fill=X, padx=5, expand=True)

        self.frame6 = Frame(master)
        self.frame6.pack(fill=X)

        self.txt = Text(self.frame6, height=10, width=122)
        self.txt.pack(fill=X, padx=5, expand=True)

        # >>>>>>>>>>>>> Variables globales <<<<<<<<<<<<<<<
        global referenciaProgressBar
        global referenciaEnviados
        global referenciaProgreso
        global referenciaTxtStatus
        global referenciaTiempo
        global globalself
        self.frameProgress = Frame(master)
        self.frameProgress.pack(fill=X)
        self.progressbar = Progressbar(self.frameProgress)
        self.progressbar.place(width=200)
        self.progressbar.pack(side=RIGHT, padx=25)
        referenciaProgressBar = self.progressbar
        # ----------------------------------------
        referenciaEnviados = StringVar(root)
        referenciaEnviados.set("Enviados 0/" + str(self.spinSolicitudes.get()))
        self.lblEnviados = Label(self.frameProgress, textvariable=referenciaEnviados, width=30)
        self.lblEnviados.pack(side=LEFT, padx=5)
        # ----------------------------------------
        referenciaProgreso = StringVar(root)
        referenciaProgreso.set("Progreso 0%")
        self.lblProgreso = Label(self.frameProgress, textvariable=referenciaProgreso, width=20)
        self.lblProgreso.pack(side=LEFT, padx=15)
        # -----------------------------------------
        referenciaTiempo = StringVar(root)
        referenciaTiempo.set("Tiempo Transucrrido[Seg] 0")
        self.lblTiempo = Label(self.frameProgress, textvariable=referenciaTiempo, width=35)
        self.lblTiempo.pack(side=LEFT, padx=55)

        globalself.append(self.lblEnviados)
        globalself.append(self.lblProgreso)
        globalself.append(self.frameProgress)

        # >>>>>>>>>>>>>>>>>>>>>>> Status <<<<<<<<<<<<<<<<<<<<<<<<<
        self.frame7 = Frame(master)
        self.frame7.pack(fill=X)

        self.lblParametros = Label(self.frame7, text="Status", width=10)
        self.lblParametros.pack(side=LEFT, padx=5, pady=5)

        self.btnEjecutar = Button(self.frame7, text="Ejecutar", command=self.enviarDatos)
        self.btnEjecutar.pack(fill=X, padx=5, expand=True)

        self.frame8 = Frame(master)
        self.frame8.pack(fill=X)

        self.txtStatus = Text(self.frame8, height=17, width=122)
        self.txtStatus.pack(fill=X, padx=5, expand=True)
        referenciaTxtStatus = self.txtStatus

        globalself.append(self.frame7)
        # >>>>>>>>>>>>>>>>>>>>>>> ____ <<<<<<<<<<<<<<<<<<<<<<<<<

    def onOpen(self):
        self.txt.delete(0.0, END)
        self.txt.insert(0.0, "")
        fl = filedialog.askopenfilename(initialdir="/", title="Select file",
                                        filetypes=(("all files", "."), ("jpeg files", "*.jpg")))
        if fl != '':
            text = self.readFile(fl)
            self.txt.insert(END, text)

    def readFile(self, filename):
        f = open(filename, "r")
        text = f.read()
        return text

    def enviarDatos(self):
        self.txtStatus.delete(0.0, END)
        self.txtStatus.insert(0.0, "")
        global arregloLineas
        global valorTimeout
        global contadorSolicitudes
        global valorurl
        global totalSolicitudes
        global avanceGlobal
        global tiempoTranscurrido
        self.progressbar.step(100 - avanceGlobal)
        avanceGlobal = 0
        tiempoTranscurrido = 0
        arregloLineas = []
        valorTimeout = int(self.spinTimeout.get())
        valorurl = self.txtUrl.get()
        valorurl = valorurl.replace("\n", "")

        for x in range(0, int(float(self.txt.index('end')))):
            arregloLineas.append(self.txt.get(x + 0.0, (x + 1) + 0.0))

        totalSolicitudes = int(self.spinSolicitudes.get())
        contadorSolicitudes = 0
        # --------------------------------------------------------
        c = Clock(valorTimeout)
        c.start()
        for x in range(0, int(self.spinConcurrencia.get())):
            mythread = MyThread(name="[Hilo-{}]".format(str(x)))
            mythread.start()
        avanzarProgressBar()
        actualizarTodo()


# https://realpython.com/python-requests/
class MyThread(threading.Thread):
    def run(self):
        escribirEnTextoStatus("{} Inicia!".format(self.getName()))
        metodoIniciar(self.getName())
        escribirEnTextoStatus("{} Termina!".format(self.getName()))


class Clock(threading.Thread):
    def _init_(self, countdown_from=100):
        self.countdown_from = countdown_from
        self._start = None
        threading.Thread._init_(self)

    def run(self):
        self._start = time.time()
        global tiempoTranscurrido
        global avanceGlobal
        global referenciaEnviados
        global referenciaProgreso
        global referenciaTiempo
        global valorTimeout
        referenciaTiempo.set("0")
        tiempoTranscurrido = 0
        while contadorSolicitudes < totalSolicitudes and tiempoTranscurrido <= valorTimeout:
            referenciaTiempo.set(str(tiempoTranscurrido))
            avanzarProgressBar()
            actualizarTodo()
            tiempoTranscurrido = tiempoTranscurrido + 1
            time.sleep(1)


def metodoIniciar(nombreHilo):
    global tiempoTranscurrido
    global valorTimeout
    global arregloLineas
    global contadorSolicitudes
    global totalSolicitudes
    cadena = ""
    while cadena == "" or cadena == "\n":
        noLinea = -1
        while noLinea < 0 or noLinea >= len(arregloLineas):
            noLinea = random.randint(1, len(arregloLineas))
        cadena = arregloLineas[noLinea]
    cadena = cadena.replace("#", "%23")
    cadena = cadena.replace(" ", "%20")
    cadenaURL = valorurl + cadena
    cadenaURL = cadenaURL.replace("\n", "")
    nameSolicitud = nombreHilo + "[Solicitud " + str(incrementarValor()) + "]\t"
    escribirEnTextoStatus(nameSolicitud + cadenaURL)
    try:
        response = requests.get(cadenaURL)
        response.raise_for_status()
        json_response = response.json()
        escribirEnTextoStatus(nameSolicitud + "Estado: " + json_response['estado'] + ", Mensaje: " + json_response['mensaje'])
    except HTTPError as http_err:
        escribirEnTextoStatus("HTTP error occurred:"+http_err)
    except Exception as err:
        escribirEnTextoStatus('Other error occurred:'+err)
    time.sleep(1)
    if contadorSolicitudes < totalSolicitudes and tiempoTranscurrido <= valorTimeout:
        metodoIniciar(nombreHilo)


def incrementarValor():
    global contadorSolicitudes
    contadorSolicitudes = contadorSolicitudes + 1
    return contadorSolicitudes


def escribirEnTextoStatus(cad):
    global referenciaTxtStatus
    referenciaTxtStatus.insert(END, "\n" + cad)


def actualizarTodo():
    global globalself
    for x in range(0, len(globalself)):
        Tk.update(globalself[x])


def avanzarProgressBar():
    global avanceGlobal
    avance = int((contadorSolicitudes / totalSolicitudes) * 100)
    if avance == 100:
        avance = 99
    referenciaProgressBar.step(avance - avanceGlobal)
    avanceGlobal = avance
    referenciaEnviados.set("Enviados " + str(contadorSolicitudes) + "/" + str(totalSolicitudes))
    referenciaProgreso.set("Progreso " + str(avance) + "%")


root = Tk()
root.geometry("1122x685+0+0");
my_gui = VentanaPrincipal(root)
root.mainloop()