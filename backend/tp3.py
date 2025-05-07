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

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from montecarlo import correr_simulacion
from io import BytesIO
import pandas as pd
import json

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
        dia_0 = int(data.get('dia_0', 36))
        dia_1 = int(data.get('dia_1', 38))
        print("bbbbbb")
        dia_2 = int(data.get('dia_2', 19))
        dia_3 = int(data.get('dia_3', 6))
        dia_4 = int(data.get('dia_4', 1))
        dia_5 = int(data.get('dia_5', 0))
    except (ValueError, TypeError):
        return jsonify({'error': 'Parámetros inválidos'}), 400

    # Correr la simulación
    try:
        resultado = correr_simulacion(n, i, j, obreros_totales, valor_venta, costo_produccion, costo_obrero, valor_y, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5)
        return jsonify({'results': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/export-excel', methods=['POST'])
def export_excel():
    try:
        # Get the simulation results from the request
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        print("Received data:", json.dumps(data)[:1000])  # Print first 1000 chars for debugging
            
        simulation_results = data.get('simulationResults')
        if not simulation_results:
            return jsonify({"error": "No simulation results provided"}), 400
        
        # Check if dailyResults exist
        if 'dailyResults' not in simulation_results or not simulation_results['dailyResults']:
            return jsonify({"error": "No daily results found in simulation data"}), 400
        
        # Create a BytesIO object to store the Excel file
        output = BytesIO()
        
        # Create a Pandas Excel writer using the BytesIO object
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            # Convert daily results to DataFrame and write to Excel
            # Map the columns to match your table structure
            daily_data = []
            for day in simulation_results['dailyResults']:
                daily_data.append({
                    'Día': day.get('day', ''),
                    'RND': day.get('rnd', 0),
                    'Ausentes': day.get('absentWorkers', 0),
                    'Presentes': day.get('presentWorkers', 0),
                    'Operativo': 'Sí' if day.get('operational', False) else 'No',
                    'Ingresos ($)': day.get('revenue', 0),
                    'Costos Prod. ($)': day.get('costs', 0),
                    'Costos Personal ($)': day.get('laborCosts', 0),
                    'Beneficio ($)': day.get('profit', 0),
                    'Beneficio AC ($)': day.get('cumulativeProfit', 0)
                })
            
            daily_df = pd.DataFrame(daily_data)
            daily_df.to_excel(writer, sheet_name='Resultados Diarios', index=False)
            
            # Get workbook and worksheet objects to format cells
            workbook = writer.book
            format_currency = workbook.add_format({'num_format': '$#,##0.00'})
            format_decimal = workbook.add_format({'num_format': '0.0000'})
            
            # Apply formatting to daily results sheet
            daily_sheet = writer.sheets['Resultados Diarios']
            daily_sheet.set_column('B:B', 12, format_decimal)  # RND column
            daily_sheet.set_column('F:F', 15, format_currency)  # Revenue column
            daily_sheet.set_column('G:G', 15, format_currency)  # Production costs column
            daily_sheet.set_column('H:H', 15, format_currency)  # Labor costs column
            daily_sheet.set_column('I:I', 15, format_currency)  # Profit column
            daily_sheet.set_column('J:J', 15, format_currency)  # Cumulative profit column
        
        # Reset the pointer to the start of the BytesIO object
        output.seek(0)
        
        # Return the Excel file as an attachment
        return send_file(
            output, 
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name='simulacion_montecarlo.xlsx'
        )
        
    except Exception as e:
        import traceback
        print(f"Excel export error: {str(e)}")
        print(traceback.format_exc())  # Print full traceback for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=False)
