import os
import requests

# Папка с изображениями
folder = 'images'

# Получение списка файлов в папке
files = os.listdir(folder)

# Обработка каждого файла
for file in files:
    # Открытие файла изображения
    with open(os.path.join(folder, file), 'rb') as f:
        # Получение расширения файла
        name, ext = os.path.splitext(file)

        # Отправка POST-запроса на обработку изображения
        response = requests.post('http://127.0.0.1:5000/process_image', files={'image': f})

        # Сохранение обработанного изображения
        with open(os.path.join('result', f'{name}{ext}.webp'), 'wb') as result_file:
            result_file.write(response.content)