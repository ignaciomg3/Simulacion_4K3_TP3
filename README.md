INDICACIONES PARA INICIALIZAR
Instalar Flask y flask-cors (pip install Flask flask-cors)
En una terminal escribir "cd frontend/my-react-app", despues "npm i" y despues "npm start"
Ejecutar en el backend el programa tp3.py

# Simulacion_4K3_TP3
Desarrollar un aplicativo con interfaz gráfica (no modo caracter) amigable (que no haga parpadeos al
scrollear), donde los parámetros ingresados se puedan visualizar luego de realizar la simulación.
El valor de las variables marcadas con rojo en el texto deben poder ser ingresadas como parámetro.
Todos los acumuladores deben figurar como columnas.
Se debe trabajar en memoria con 2 filas.
Se deberá simular X tiempo (parámetro solicitado al inicio) generando N cantidad de filas en total. El
aplicativo debe soportar al menos N = 100.000.-
Se mostrará en el vector de estado i iteraciones a partir de una hora j (i y j ingresados por parámetro).
Además se deberá mostrar la fila N, es decir la última fila simulada.

Una industria automotriz ha experimentado la siguiente frecuencia diaria de personas que se ausentan al trabajo tomando información de los en los últimos 100 días: 

Número de obreros ausentes | Cantidad de días
0 | {36} 
1 | {38}
2 | {19}
3 | {6}
4 | {1}
5+ | {0}
Total 100

a) Elabore una distribución de frecuencias para los datos anteriores. 
b) Simule el ausentismo para un período de {n} días. 
c) Teniendo en cuenta los siguientes datos: 
  El proceso de operación de la planta requiere un mínimo rígido de 20 obreros. 
  Si menos de 20 obreros concurren en un día determinado, la planta debe suspender la producción. 
  No obstante, esa puede operar satisfactoriamente con 20 obreros o más. 
  
  Cuando la planta está en operaciones, se elaboran productos químicos con un valor de venta de $ {4.000} diarios.
  Los costos variables de producir y vender esos productos, excluida la mano de obra, son $ {2.400}. 
  La compañía siempre ha tenido 24 personas en su lista de personal de planta en el pasado. 
  Todos los obreros de la planta son permanentes, es decir, trabajan con una relación de empleo fija. 
  Esto implica que la compañía paga a todos los obreros que se presentan a trabajar cada día, aún en el caso de que la planta no pueda operar, y los obreros ausentes también reciben su retribución íntegra ese día. 
  Las remuneraciones, incluyendo beneficios adicionales y cargas sociales, promedian $ {30} por día para cada obrero. 
  Simule el funcionamiento de la industria por {n} días, si decidiera tener una nómina de 21, 22 ó 23 obreros en lugar de 24 (también simular). 
  Para esta simulación calcule: 
  1) el beneficio que obtendría la industria automotriz:
  2) La probabilidad de obtener un beneficio diario mayor a un valor {y}

ToDo:
revisar si quedaron cosas en ingles
algunas columnas de la tabla tienen el nombre mal
mostrar los parametros en el nombre de la simulacion
mostrar todas las simulaciones para 21 22 23 24 empleados? (no entendi bien ese punto)