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

app = Flask(__name__)

CORS(app)

# Ejemplo endpoint get
@app.route('/api/data')
def get_data():
    return jsonify({'message': 'Test React Python'})

# Ejemplo endpoint post
@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    number = data.get('number')

    if number is None:
        return jsonify({'error': 'No number provided'}), 400

    try:
        number = int(number)
    except ValueError:
        return jsonify({'error': 'Invalid number'}), 400

    # Your calculation logic here
    result = number * 2  # Example: multiply the number by 2

    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(debug=True)
