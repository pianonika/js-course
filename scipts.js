let myMap;
let clusterer;
let count = 0;
let feedback = {};
let dataPoints = [];
let currentAddress='';
let currentCoords;
let organizationMarks=[];
let myPlacemarkList = [];
let myPlacemarkListItem = {};

function mapInit() {
    let myPlacemark;

    myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем собственный макет с информацией о выбранном геообъекте.
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<h2 class=ballon_place>{{ properties.balloonPlace|raw }}</h2>' +
            '<div class=ballon_address ><a href="#" id="linkPlacemark">'+
            '{{properties.balloonContentHeader|raw }}'+
            '</a></div>' +
            '<div class=ballon_Review>{{ properties.balloonReview|raw }}</div>'+
            '<div class=ballon_date>{{ properties.balloonDate|raw }}</div>'
    );

    var BalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="templateBalloon">' +
        '<a class="close" id="close" href="#">&times;</a>' +
        '$[[options.contentLayout observeSize maxWidth=350  maxHeight=520]]' +
        '</div>');

    var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="templateBalloonHeader">' +
            '<b>{{properties.balloonContentHeader}}</b><br />' +
        '</div>'+
        '<div class="templateBalloonBody">'+
            '$[properties.balloonContentBody]'+
        '</div>'
    );
    var BalloonContentLayoutEmpty = ymaps.templateLayoutFactory.createClass(
        '<div class="templateBalloonHeader">' +
            '<b>{{contentHeader}}</b><br />' +
        '</div>'+
        '<div class="templateBalloonBody">'+
            '$[contentBody]'+
        '</div>'
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

    if (localStorage.getItem('myPlacemarkList')) {
        myPlacemarkList=JSON.parse(localStorage.getItem('myPlacemarkList'));
    }

    myMap.geoObjects.add(clusterer);
    function readLocalstorage() {

      var organizationMarksAddress=[];

      for (var i=0;i<myPlacemarkList.length;i++) {
          // если аджеса еще нет в списке
          if (organizationMarksAddress.indexOf(myPlacemarkList[i].address)==-1) {
              var myPlacemark= createPlacemark(myPlacemarkList[i]);

              myMap.geoObjects.add(myPlacemark);
              organizationMarksAddress.push(myPlacemarkList[i].address);
              organizationMarks.push(myPlacemark);
          }
      }
      clusterer.add(organizationMarks);
      myMap.geoObjects.add(clusterer);

    }
    readLocalstorage();

    // получим содержимое формы ввода отзыва
    function getContentBalloon(address) {
        var htmlText='';

        htmlText+='<div id="listReviewForAddress">'+(getListReviewForAddress(address)||'Отзывов пока нет')+'</div>';
        htmlText+='<form>';
        htmlText+='<h4 class="form__title"> ВАШ ОТЗЫВ</h4>';
        htmlText+='<input type=form__title" text" class="input" id="inputName" placeholder="Имя">';
        htmlText+='<input type="text" class="input" id="inputOrganization" placeholder="Компания">';
        htmlText+='<textarea class="input" placeholder="Ваши впечатления" id="inputReview" rows="6"></textarea>';
        htmlText+='<button id=\'addbutton\' class="btn" type=\'button\'>Добавить</button>';
        htmlText+='</form>';

        return htmlText;
    }

    // список отзывов по адресу
    function getListReviewForAddress(address) {
        var content='';

        if (!!myPlacemarkList) {
          myPlacemarkList
            .filter((myPlacemarkListItem)=> {
                return myPlacemarkListItem.address==address
            })
            .forEach ( (myPlacemarkListItem) => {
                content+='<div class="listReviewForAddress__item"><b>'+myPlacemarkListItem.name+'</b> ';
                content+=myPlacemarkListItem.place+' ';
                content+=myPlacemarkListItem.date+'<br>';
                content+=myPlacemarkListItem.Review+'</div>';
            });
        }

        return content;
    }

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        // if (myPlacemark) {
        //      var placemark = new ymaps.Placemark(coords, {
        //          // Устаналиваем данные, которые будут отображаться в балуне.
        //          balloonContentHeader: '<a href="123">asd</a>',
        //          balloonContentBody: getContentBody(),
        //          balloonContentFooter: 'Мацуо Басё'
        //      });
        //      clusterer.add(placemark);
        // }

        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');

            getAddress(coords)
            .then((res)=>{
                currentAddress=res;
                currentCoords=coords;
                myMap.balloon.open(coords,
                    {
                        contentHeader: res,
                        contentBody: getContentBalloon(currentAddress)
                    },
                    {
                        layout: BalloonLayout,
                        contentLayout: BalloonContentLayoutEmpty
                    });
            })
        } else {
            myMap.balloon.close();
        }
    });

    // слушаем клик по контейнеру карты
    map.addEventListener('click', function (e) {
        if (e.target.id=='addbutton') {
            createReview();
        }
        if (e.target.id=='close') {
            myMap.balloon.close();
        }

        if (e.target.id=='linkPlacemark') {
            for (var i=0; i<organizationMarks.length; i++) {
                if (organizationMarks[i].properties.get ('balloonContentHeader')==e.target.innerText) {
                     myMap.balloon.open(organizationMarks[i].properties.get ('balloonCoords'),
                    {
                        contentHeader: organizationMarks[i].properties.get ('balloonContentHeader'),
                        contentBody: getContentBalloon(e.target.innerText)
                    },
                    {
                        layout: BalloonLayout,
                        contentLayout: BalloonContentLayoutEmpty
                    });
                }
            }

        }
    });

     // Создание нового отзыва
      function createReview(coords) {
          if (!inputOrganization.value||!inputName.value||!inputReview.value) {
              alert('Не все поля заполнены! Отзыв не будет добавлен')
          } else {
              if (currentAddress=='') {
                  currentAddress=myMap.balloon._balloon._data.properties.get('balloonContentHeader');
              }

              console.log('Адрес', currentAddress);

              var itNewPlacemark=true;

              if (myPlacemarkList.some((myPlacemarkListItem)=> {
                  return myPlacemarkListItem.address == currentAddress
              })) {
                  console.log('есть уже метка по адресу '+currentAddress);
                  itNewPlacemark = false;
              } else {
                  console.log('добавляем новую метку');
              }

              var newReview = {
                  coords: currentCoords,
                  address: currentAddress,
                  place: inputOrganization.value,
                  name: inputName.value,
                  Review: inputReview.value,
                  date: getCurrentDateTime()
              };
              myPlacemarkList.push(newReview);

              localStorage.setItem('myPlacemarkList', JSON.stringify(myPlacemarkList));

              if (itNewPlacemark) {
                  var myPlacemark= createPlacemark(newReview);

                  // добавим новую метку на карту
                  myMap.geoObjects.add(myPlacemark);
                  // добавим новую метку в кластер
                  clusterer.add(myPlacemark);
                  organizationMarks.push(myPlacemark)
              } else {
                  // добавим новый отзыв в список отзываов по адресу

                  for (var i=0; i<organizationMarks.length; i++) {
                      if (organizationMarks[i].properties.get('balloonContentHeader')==currentAddress) {
                          organizationMarks[i].properties.set('balloonContentBody', getContentBalloon(currentAddress));
                      }
                  }
              }
              listReviewForAddress.innerHTML=getListReviewForAddress(currentAddress);

              return myPlacemark;
          }
      }

      // Создание новой метки
      function createPlacemark(element) {
          var myPlacemark= new ymaps.Placemark(element.coords, {
                  iconCaption: '',
                  balloonContentHeader: element.address,
                  balloonContentBody: getContentBalloon(element.address),
                  balloonPlace: element.place,
                  balloonDate: element.date,
                  balloonReview: element.Review,
                  balloonCoords: element.coords
              },
              {
                  balloonLayout: BalloonLayout,
                  balloonContentLayout: BalloonContentLayout
              }
          );

          return myPlacemark;
      }

      // Определяем адрес по координатам (обратное геокодирование).
      function getAddress(coords) {
          return ymaps.geocode(coords).then(function (res) {
              return res.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.AddressDetails').Country.AddressLine;
          });
      }
}

function getCurrentDateTime() {
    var curDate = new Date();

    var year = curDate.getFullYear();
    var month = curDate.getMonth()+1;
    var day = curDate.getDate();
    var hh = curDate.getHours();
    var mm = curDate.getMinutes();
    var ss = curDate.getSeconds();

    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    if (hh < 10) { hh = '0' + hh; }
    if (mm < 10) { mm = '0' + mm; }
    if (ss < 10) { ss = '0' + ss; }

    curDate = year + '.' + month + '.' + day +' ' + hh + ':' + mm + ':' + ss;

    return curDate;
}

new Promise(resolve => window.onload = resolve)
    .then(response => new Promise(resolve => ymaps.ready(resolve)))
    .then(friends => {
        console.log('карта загружена');
        mapInit();
        return true;
    })
    .catch(e => alert('Ошибка: ' + e.message));
