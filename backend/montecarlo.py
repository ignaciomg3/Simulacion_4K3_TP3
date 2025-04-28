import random

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
    # Define the frequency distribution for the number of absent workers
    distribution = {
        0: 36,
        1: 38,
        2: 19,
        3: 6,
        4: 1,
    }

    # Normalize the distribution to probabilities
    total_days = sum(distribution.values())
    probabilities = {k: v / total_days for k, v in distribution.items()}

    # Generate cumulative probabilities
    cumulative = []
    cumulative_sum = 0
    for k, p in probabilities.items():
        cumulative_sum += p
        cumulative.append((k, cumulative_sum))

    # Determine the number of absent workers based on RND
    for k, threshold in cumulative:
        if RND <= threshold:
            return k

    return 0  # Default to 0 if no match (should not happen)

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
    RND_obreros_ausentes = random.random()
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
    dia = 1
    obreros_totales = obreros_totales
    RND_obreros_ausentes = random.random()
    obreros_ausentes = calcular_obreros_ausentes(RND_obreros_ausentes)
    obreros_restantes = obreros_totales - obreros_ausentes
    fabrica_en_funcionamiento = (obreros_restantes >= 20)
    valor_venta_productos = valor_venta
    costo_fabricacion_productos = costo_produccion
    costo_por_obrero = costo_obrero
    ganancia_dia = calcular_ganancia_dia(valor_venta_productos, costo_fabricacion_productos, costo_por_obrero, obreros_totales, obreros_restantes, fabrica_en_funcionamiento)
    ganancia_acumulada = ganancia_dia
    valor_y = valor_y
    contador_beneficio_mayor_y = 1 if ganancia_dia > valor_y else 0
    probabilidad_beneficio_diario_mayor_y = contador_beneficio_mayor_y / dia


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
        if i <= fila_actual[0] <= j or fila_actual[0] == n:
            dias_entre_i_y_j.append(fila_actual)
        fila_actual = calcular_siguiente_fila(fila_actual)

    return (dias_entre_i_y_j)

def simular_n_dias(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y):
    return (correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y))
    # for i in range(4):
        # correr_simulacion(n, i, j, i+21, valor_venta, costo_produccion, costo_obrero, valor_y)

if __name__ == "__main__":
    simular_n_dias(100000, 99990, 100000, 20, 4000, 2400, 30, 1000)
