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

def calcular_obreros_ausentes(RND, dias_0_ausentes, dias_1_ausentes, dias_2_ausentes, dias_3_ausentes, dias_4_ausentes, dias_5_ausentes):
    if int(dias_0_ausentes + dias_1_ausentes + dias_2_ausentes + dias_3_ausentes + dias_4_ausentes + dias_5_ausentes) != 100:
        return 0
    # Define the frequency distribution for the number of absent workers
    distribution = {
        0: dias_0_ausentes,
        1: dias_1_ausentes,
        2: dias_2_ausentes,
        3: dias_3_ausentes,
        4: dias_4_ausentes,
        5: dias_5_ausentes,
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

def calcular_siguiente_fila(fila_actual, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5, valor_venta):
    dia = fila_actual[0] + 1
    obreros_totales = fila_actual[1] 
    RND_obreros_ausentes = random.random()
    obreros_ausentes = calcular_obreros_ausentes(RND_obreros_ausentes, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5)
    obreros_restantes = obreros_totales - obreros_ausentes
    fabrica_en_funcionamiento = (obreros_restantes >= 20)
    valor_venta_productos = valor_venta if fabrica_en_funcionamiento else 0
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

def correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5):
    dia = 1
    obreros_totales = obreros_totales
    RND_obreros_ausentes = random.random()
    obreros_ausentes = calcular_obreros_ausentes(RND_obreros_ausentes, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5)
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
        fila_actual = calcular_siguiente_fila(fila_actual, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5, valor_venta_productos)

    return (dias_entre_i_y_j)

def simular_n_dias(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y, dia_0 = 36, dia_1 = 38, dia_2 = 19, dia_3 = 6, dia_4 = 1, dia_5 = 0):
    return (correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5))

if __name__ == "__main__":
    simular_n_dias(100000, 99990, 100000, 20, 4000, 2400, 30, 1000)
