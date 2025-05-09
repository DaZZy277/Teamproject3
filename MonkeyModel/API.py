import os
from flask import Flask,request,jsonify
import models
# from importnb import Notebook # ใช้ importnb เพื่อ models .ipynb

# # นำเข้า models.ipynb
# with Notebook():
#     import models  # ไฟล์ .ipynb จะถูก import โดยใช้ชื่อ model

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():

    # รับ input (จำนวนปีและจำนวนเงินเริ่มต้น) จาก request
    data = request.get_json()
    # print(data)

    try:
        # แปลงค่า n_years และ initial_amount เป็น int
        n_years = int(data.get('n_years'))
        initial_amount = float(data.get('initial_amount'))
    except ValueError:
        return jsonify({'error': 'Invalid input. Ensure that n_years and initial_amount are integers.'}), 400

    # เรียกใช้ฟังก์ชันใน models.py เพื่อทำนายผล
    predictions = models.predict(n_years, initial_amount)
    # print(predictions)

    # ส่งคืนผลลัพธ์กลับเป็น JSON
    return jsonify(predictions)
    # return "Success", 200
    # return n_years, initial_amount

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5050))
    app.run(debug=False,host='0.0.0.0' ,port=port)



