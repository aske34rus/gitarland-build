  // * Side Nav *
  function openNav() {
      document.getElementById("overlay-element").style.display = "block";
      document.getElementById("sidenav").style.right= "0";
  }

  function closeNav() {
      document.getElementById("overlay-element").style.display = "none";
      document.getElementById("sidenav").style.right = "-250px";
  }

  // * Sidenav Menu *
  $(document).ready(function() {
    $('.sidenav-menu .sub>a').click(function(event) {
      $('.sidenav-menu>ul').css({
        marginLeft: '-100%'
      });
      $(this).addClass('open');
      return false;
    });

    $('.sidenav-menu .back>a').click(function() {
      $('.sidenav-menu>ul').css({
        marginLeft: '0'
      });
      $('.sidenav-menu .sub>a.open').removeClass('open');
      return false;
    });
  });



// Живой поиск

//  Функция обновления результатов поиска
function updateSearchResults(input) {

  // Напоминалка! (Удадить иди закоментить)
  $('.search-results .test').html('<div class="box"><p>Загляни в функцию updateSearchResults в файле catalog/view/theme/GitarLand/assets/js/user.js <- там инструкция</p></div>')


  /* PHP выглядит примерно так:

    example-search-results.php
      <?php 

      // Делаем полученные данные максимально безопасными
      $searchInput = $_REQUEST['searchInput'];
      $searchInput = trim($searchInput);
      $searchInput = searchInputipslashes($searchInput);
      $searchInput = htmlspecialchars($searchInput);

      // *********************************************************************
      // *
      // * Тут всякие ваши ПХП манипуляции с полученым запросом $searchInput
      // *
      // *********************************************************************

      // Вот в такой массив нужно собрать данные
      $resultsArray = [
        "autocompletion" => ['A&L','Adams','Admira','Alvarez'],
        "results"=>[
              array(
                'img' => 'image/export/preview-in-added-to-cart.png',
                'category' => 'Caravan Music',
                'title' => 'Jonson&Co HS-3912-Y'
                ),
              array(
                'img' => 'image/export/preview-in-added-to-cart.png',
                'category' => 'Caravan Music',
                'title' => 'Jonson&Co HS-3912-Y'
                ),
             ]
      ];

      // Кодируем в JSON и отправляем
      echo json_encode($resultsArray);


   */

  // ajax запрос
  $.ajax({
    type: "POST",
    url: "example-search-results.php", //!!! <- Это все что требуется тут поменять при посадке, спасибо что заглянул :)
    data: "searchInput="+encodeURIComponent(input),
    success: function(result){
      // Обработка результатов

      // Парсим в обьект
      var resultObj = jQuery.parseJSON(result);

      // Вставляем автодополнение
      var autocompletion = '';
      $.each(resultObj.autocompletion, function(index, value){
        autocompletion = autocompletion+'<li onclick="autocompletion(this)">'+value+'</li>';
      });
      $('.search-results .autocompletion').html(autocompletion);

      // Вставляем результаы
      var results = '';
      $.each(resultObj.results, function(index, value){
        results = results+'<li><a href="#" class="item"><div class="preview"><div class="height preview-1"><img src="'+value.img+'" alt=""></div></div><div class="label"><div class="category">'+value.category+'</div><div class="title">'+value.title+'Y</div></div></a></li><li>';
      });
      $('.search-results .results').html(results);
    }

  });

}


// Фукция для автодополнения
function autocompletion(e) {
  $('.mod_search input').val($(e).text());
  updateSearchResults($(e).text());
}

// Непосредственно 
$('.mod_search input').keyup(function() {
  // Определяем координаты поисковой строки
  var left = $(this).offset().left;
  var top = $(this).offset().top;

  // Вызываем функцию обновления результатов поиска передав ей значение поля
  updateSearchResults($(this).val());

  // Показываем popup результатов помещяя ее под поиском
  $('.search-results').css({
    display: 'block',
    top: top+$(this).height(),
    left: left,
    width: $(this).innerWidth()
  });


  // Если случано скрылись результаты, при наведеении на строку они опять появятся
  $(this).hover(function() {
    $('.search-results').css({
      display: 'block'
    });
  });

});

// Улерживаем открытыми результаы поиска ели на них наведен курсор и скрываем если пользователь увел курсор
$('.search-results').hover(function() {
  $('.search-results').css({
    display: 'block'
  });
}, function() {
  $('.search-results').css({
    display: 'none'
  });
});


