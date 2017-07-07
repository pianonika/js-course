let myMap;
let clusterer;
let count = 0;

function mapInit() {
    let myPlacemark;

    myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 5
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем собственный макет с информацией о выбранном геообъекте.
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );

    clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна.
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 5
    });

    myMap.geoObjects.add(clusterer);
    var placemarks = [];


    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        console.log(myMap.geoObjects);
        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            // myPlacemark.geometry.setCoordinates(coords);
          //  myMap.geoObjects.add(new ymaps.Placemark(coords));
           var placemark = new ymaps.Placemark(coords, {
               // Устаналиваем данные, которые будут отображаться в балуне.
               balloonContentHeader: '<a href="123">asd</a>',
               balloonContentBody: getContentBody(),
               balloonContentFooter: 'Мацуо Басё'
           });
           clusterer.add(placemark);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            // myMap.geoObjects.add(new ymaps.Placemark(coords));
            // clusterer.add(new ymaps.Placemark(coords));

             var placemark = new ymaps.Placemark(coords, {
                 // Устаналиваем данные, которые будут отображаться в балуне.
                 balloonContentHeader: '<a href="123">asd</a>',
                 balloonContentBody: getContentBody(),
                 balloonContentFooter: 'Мацуо Басё'
             });
             clusterer.add(placemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }

    var placemarkBodies;
    function getContentBody () {
        if (!placemarkBodies) {
            placemarkBodies = [
                ['Слово скажу -', 'Леденеют губы.', 'Осенний вихрь!'].join('<br/>'),
                ['Вновь встают с земли', 'Опущенные дождем', 'Хризантем цветы.'].join('<br/>'),
                ['Ты свечу зажег.', 'Словно молнии проблеск,', 'В ладонях возник.'].join('<br/>')
            ];
        }
        return '<br>' + placemarkBodies;
    }
    clusterer.balloon.open(clusterer.getClusters()[0]);
}

function geocode(address) {
    return ymaps.geocode(address).then(result => {
        var points = result.geoObjects.toArray();

        if (points.length) {
            return points[0].geometry.getCoordinates();
        }
    });
}


new Promise(resolve => window.onload = resolve)
    // .then(() => vkInit())
    .then(response => new Promise(resolve => ymaps.ready(resolve)))
    // .then(() => vkApi('friends.get', {fields: 'photo_200,city,country'}))
    .then(friends => {
        mapInit();
        return true;
    })
    .catch(e => alert('Ошибка: ' + e.message));
