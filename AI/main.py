from flask import Flask, request, jsonify, Response
from werkzeug.utils import secure_filename
import cv2
import numpy as np
# import os
# import tempfile

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Загрузка каскада Хаара для обнаружения номеров машин
car_cascade = cv2.CascadeClassifier('haarcascade_russian_plate_number.xml')


@app.route('/process_image', methods=['POST'])
def process_image():
    # Получение изображения из POST-запроса
    file = request.files['image']
    img = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Преобразование изображения в оттенки серого
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Обнаружение номеров машин на изображении
    cars = car_cascade.detectMultiScale(gray, 1.1, 4)

    # Замена номеров машин на логотип
    for (x, y, w, h) in cars:
        # Загрузка логотипа и изменение его размера
        logo = cv2.imread('logo.png')
        logo = cv2.resize(logo, (w, h))
        img[y:y+h, x:x+w] = logo

    # Сохранение результата в формате webp
    _, buffer = cv2.imencode('.webp', img, [cv2.IMWRITE_WEBP_QUALITY, 50])
    result = buffer.tobytes()

    # Отправка обработанного изображения обратно в ответе
    return Response(result, mimetype='image/jpeg')


@app.route('/')
def index():
    return 'Готовая картинка!'


if __name__ == '__main__':
    app.run(debug=True, port=3006)
