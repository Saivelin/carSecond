import cv2

img = cv2.imread('car.jpg')

# загрузка модели для распознавания номеров
model = cv2.CascadeClassifier('haarcascade_russian_plate_number.xml')

# поиск номера на изображении
plates = model.detectMultiScale(img, scaleFactor=1.1, minNeighbors=5)

# если номер обнаружен, размытие номера по Гауссу
if len(plates) > 0:
    # координаты номера на изображении
    x, y, w, h = plates[0]

    # выделение области номера на изображении
    plate = img[y:y+h, x:x+w]

    # повторное применение размытия по Гауссу
    for i in range(5):
        blurred_plate = cv2.GaussianBlur(plate, (25, 25), 0)
        plate = blurred_plate

    # замена области номера на размытую область
    img[y:y+h, x:x+w] = blurred_plate

cv2.imshow('Strongly blurred car number', img)
cv2.waitKey(0)
cv2.destroyAllWindows()