
export function initMap () {
  window.myMap = new ymaps.Map('map_1', {
    center: [56.852878, 35.928228],
    zoom: 16
  });

  myMap.controls.add('zoomControl');

  const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    //hintContent: 'Собственный значок метки',
    //balloonContent: 'Это красивая метка'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: '../images/location_marker.svg',
    // Размеры метки.
    iconImageSize: [57, 69],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-29, -69]
  });

  myMap.geoObjects.add(myPlacemark);


}
