"""
Columnas de Montecarlo

| Dia (Obligatorio)
| Obreros totales (Hardcoded, 21 22 23 24)
| RND obreros ausentes 
| Obreros ausentes 
| Obreros restantes 
| Fabrica en funcionamiento 
| Venta productos (Opcional, default $4000)
| Costo produccion (Opcional, default $2400)
| Costo por obrero (Opcional, default $30)
| Ganancia del día 
| Ganancia AC  
| Contador beneficio > Y
| P() beneficio diario > Y

Lista de parametros:

Días a simular
Cantidad de días con x obreros ausentes (sum = 100)
Valor de venta de productos
Costo variable de fabricacón de productos
Costo por obrero
Valor Y de beneficio diario
"""

def calcular_obreros_ausentes(RND):
    pass

def calcular_ganancia_dia(venta, costo_fabricacion, costo_obrero, obreros_totales, obreros_restantes, funcionamiento):
    if funcionamiento:
        ganancia = venta - costo_fabricacion - (obreros_restantes * costo_obrero)
        return (ganancia)
    else:
        ganancia = venta - costo_fabricacion - (obreros_totales * costo_obrero)
        return (ganancia)

def calcular_siguiente_fila(fila_actual):
    dia = fila_actual[0] + 1
    obreros_totales = fila_actual[1] 
    RND_obreros_ausentes = 0  # GENERAR_RANDOM
    obreros_ausentes = calcular_obreros_ausentes(RND_obreros_ausentes)
    obreros_restantes = obreros_totales - obreros_ausentes
    fabrica_en_funcionamiento = (obreros_restantes >= 20)
    valor_venta_productos = fila_actual[6]
    costo_fabricacion_productos = fila_actual[7]
    costo_por_obrero = fila_actual[8]
    ganancia_dia = calcular_ganancia_dia(valor_venta_productos, costo_fabricacion_productos, costo_por_obrero, obreros_totales, obreros_restantes, fabrica_en_funcionamiento)
    ganancia_acumulada = fila_actual[10] + ganancia_dia
    valor_y = fila_actual[11]
    contador_beneficio_mayor_y = (fila_actual[12] + 1 if ganancia_dia > valor_y else fila_actual[12]) 
    probabilidad_beneficio_diario_mayor_y = contador_beneficio_mayor_y / dia

    return ([dia, obreros_totales, RND_obreros_ausentes, obreros_ausentes, obreros_restantes, fabrica_en_funcionamiento,
             valor_venta_productos, costo_fabricacion_productos, costo_por_obrero, ganancia_dia, ganancia_acumulada,
             valor_y, contador_beneficio_mayor_y, probabilidad_beneficio_diario_mayor_y])

def correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y):
    dia = 0
    obreros_totales = obreros_totales
    RND_obreros_ausentes = 0
    obreros_ausentes = 0
    obreros_restantes = obreros_totales
    fabrica_en_funcionamiento = True
    valor_venta_productos = valor_venta
    costo_fabricacion_productos = costo_produccion
    costo_por_obrero = costo_obrero
    ganancia_dia = 0
    ganancia_acumulada = 0
    valor_y = valor_y
    contador_beneficio_mayor_y = 0
    probabilidad_beneficio_diario_mayor_y = 0


    dias_entre_i_y_j = []

    fila_actual = [dia, 
                   obreros_totales, 
                   RND_obreros_ausentes, 
                   obreros_ausentes, 
                   obreros_restantes, 
                   fabrica_en_funcionamiento, 
                   valor_venta_productos, 
                   costo_fabricacion_productos, 
                   costo_por_obrero, 
                   ganancia_dia, 
                   ganancia_acumulada, 
                   valor_y,
                   contador_beneficio_mayor_y, 
                   probabilidad_beneficio_diario_mayor_y]

    for _ in range(n):
        if i <= fila_actual[0] <= j:
            dias_entre_i_y_j.append(fila_actual)
        fila_actual = calcular_siguiente_fila(fila_actual)


def simular_n_dias(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y):
    # n = int(input("Ingrese la cantidad de días a simular: "))
    # i = int(input("Ingrese el día a partir del cual mostrar la simulación: "))
    # j = int(input("Ingrese el día hasta el cual mostrar la simulación: "))

    for i in range(4):
        correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y)

if __name__ == "__main__":
    simular_n_dias(100000, 99990, 100000, 20, 4000, 2400, 30, 1000)
