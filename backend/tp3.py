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

from flask import Flask, request, jsonify
from flask_cors import CORS
from montecarlo import correr_simulacion

app = Flask(__name__)

CORS(app)

@app.route('/api/simular', methods=['POST'])
def simulate():
    data = request.get_json()

    try:
        n = int(data.get('n'))
        i = int(data.get('i'))
        j = int(data.get('j'))
        obreros_totales = int(data.get('obreros_totales'))
        valor_venta = int(data.get('valor_venta', 4000))
        costo_produccion = int(data.get('costo_produccion', 2400))
        costo_obrero = int(data.get('costo_obrero', 30))
        valor_y = int(data.get('valor_y', 1000))
    except (ValueError, TypeError):
        return jsonify({'error': 'Parámetros inválidos'}), 400

    # Correr la simulación
    try:
        resultado = correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y)
        return jsonify({'results': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == "__main__":
    app.run(debug=False)
