

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
  $('.search-results .load').html('Загрузка...')
  // ajax запрос
  $.ajax({
    url: $(".live-search form").attr('action'), // путь к обработчику берем из атрибута action
    type: $(".live-search form").attr('method'), // метод передачи - берем из атрибута method
    data: {filter_name: input},
    dataType: 'json',
    success: function(result){
      // Обработка результатов
      $('.search-results .load').html('Ответ получен :)');
      
      // Вставляем автодополнение
      var autocompletion = '';
      var results = '';
      $.each(result, function(index, value){

        if (value.type == 'cat') {

          autocompletion = autocompletion+'<li><a href="'+value.href+'">'+value.name+'</a></li>';
        }else if (value.type == 'item') {
          results = results+'<li><a href="'+value.href+'" class="item"><div class="preview"><div class="height preview-1"><img src="'+value.image+'" alt="'+value.image_alt+'"></div></div><div class="label"><div class="title">'+value.name+'</div></div></a></li><li>';
        }
      });


      // Вставляем результаы
      $('.search-results .autocompletion').html(autocompletion);
      $('.search-results .results').html(results);
      $('.search-results .load').html('');

      $.colorbox.resize();
      $('.live-search input').focus();
    },
    error: function(){
      $('.search-results .load').html('Ошибка :(')
    }
  });

}


// Фукция для автодополнения
function autocompletion(e) {
  $('.live-search input').val($(e).text());
  updateSearchResults($(e).text());
}

if(readyjs) readyjs[readyjs.length] = function(){ 
  // Непосредственно 

    $('.live-search input').keyup(function() {
      console.log('111')
      // Вызываем функцию обновления результатов поиска передав ей значение поля
      updateSearchResults($(this).val());

      // Показываем popup результатов помещяя ее под поиском
      $('.search-results').css({
        display: 'block',
        top: $(this).height()+4,
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


};

