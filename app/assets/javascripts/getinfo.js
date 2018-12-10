// TODO:
// ・KEYはRailsのsecrets.ymlに書くように変更、JSからはsecrets.yml呼び出せないので構成は要検討
// ・天気の時間表示は日本時間になるように変更
const API_KEY = '24d82be1705e800a165137739ed16563';
const ABS_TMP_DIFF = 273;


function buildHTML(i){
  var html = 
  `<div class='result_of_day${i} '>
    <p><b id='result-weather${i}'></b><p>
    <img id='result-weather-icon${i}' src="" style="width100px">
    <p>temp: <b id='result-temp${i}'></b>°C.<br>
    <b><span id='result-datetime${i}'></span></b>
  </div>`
  $('#form-result').append(html);
};

$(function() {
  var formSpinner = $('#form-spinner');
  var formError = $('#form-error');
  var formResult = $('#form-result');
  var sectionLabel = $('.section_label');
  sectionLabel.css('display', 'none');
  $('#input-form').on('submit', function(e) {
    formSpinner.css('display', 'inline');
    var cityName = $(this).find('#weather-form-city').prop('value');
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    requestUrl += cityName + '&APPID=' + API_KEY;

    $.ajax(requestUrl)
    .done(function(data) {
      if (data.cod == 200) {
        $('#form-result').empty();

        formSpinner.css('display', 'none');
        formError.css('display', 'none');

        $('#result-city-name').text(data.city.name);
        for(var i=0; i<data.cnt; i++){
          buildHTML(i);
          $('#result-temp'+i).text(Math.round(data.list[i].main.temp - ABS_TMP_DIFF));
          $('#result-weather'+i).text(data.list[i].weather[0].main);
          $('#result-weather-icon'+i).attr('src', 'http://openweathermap.org/img/w/'+data.list[i].weather[0].icon+'.png');
          $('#result-datetime'+i).text(data.list[i].dt_txt);
        }
        sectionLabel.css('display', 'block');
        formResult.css({display: "flex", direction: "row", overflow: "scroll"});
      } else {
        formSpinner.css('display', 'none');
        formError.css('display', 'block');
        formResult.css('display', 'none');
      }
    })
      .fail(function() {
        formSpinner.css('display', 'none');
        alert('Something wrong occurred.');
      });
    e.preventDefault();
  });
});
