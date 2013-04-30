$(document).ready(function() {
  var p = '80';
  var q = '81';
  var pPosition = 1;
  var qPosition = 1;
  var track = $("#player1_strip").find("td").size();
  var counter = 3;
  var playersArray = [];

  $("#initials1").keyup(function () {
    var initials1 = $(this).val();
    $("#init1").html(initials1);
  }).keyup();
  $("#color1").keyup(function () {
    var color1 = $(this).val();
    $("#color-box1").css('background-color', '#' + color1);
  }).keyup();

  $("#initials2").keyup(function () {
    var initials2 = $(this).val();
    $("#init2").html(initials2);
  }).keyup();
  $("#color2").keyup(function () {
    var color2 = $(this).val();
    $("#color-box2").css('background-color', '#' + color2);
  }).keyup();

  $('#start').on('click', function() {
    $(this).hide();
    $('.countdown').show();
    countDown();
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: '/',
      method: "POST",
      data: $(this).serialize()
    }).done(function(server_data){ //server_data is the json object
      createPlayers(server_data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      $('body').append(jqXHR.responseText);
    });
  });

  function createPlayers(server_data){
    var player1 = {
      'initials': server_data['player1'],
      'color': server_data['color1']
    };
    var player2 = {
      'initials': server_data['player2'],
      'color': server_data['color2']
    };
    var game = {
      'gameID': server_data['gameID']
    };

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.active1 { background-color: #' + server_data['color1'] + '; } .active2 { background-color: #' + server_data['color2'] + '; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    $('#player1-start').html(player1.initials);
    $('#player2-start').html(player2.initials);
    $('#title-screen').fadeOut(function(){
       $('#track').fadeIn();
    });
  }

  function countDown() {
    if (counter > 0) {
      setTimeout(countDown, 1000);
      $("#count").html(counter);
      counter--;
    } else {
      game();
    }
  }

  function game() {
    var d = new Date();
    var startTime = d.getTime();

    $("#count").html("GO!").fadeOut('slow');
    function update_player_position(player, position, active) {
      $("#" + player).find(active).removeClass(active);
      $("#" + player).find("#" + position).addClass(active);
    }
   
    $(document).on('keyup', function(e) {
      var code = (e.keyCode);
      if(code == p) {
        pPosition += 1;
        update_player_position("player1_strip", pPosition, 'active1');
        if (pPosition == track){
          var p1 = $('#player1-start').html();
          finishLine(p1,  startTime, 'active1');
        }
      }
    });

    $(document).on('keyup', function(e) {
      var code = (e.keyCode);
      if(code == q) {
       qPosition += 1;
       update_player_position("player2_strip", qPosition, 'active2');
        if (qPosition == track){
          var p2 = $('#player2-start').html();
          finishLine(p2, startTime, 'active2');
        }
      }
    });

  
    function finishLine(playerID, startTime, color) {
      var d = new Date();
      var endTime = d.getTime() - startTime;
      console.log(playerID)
      playersArray.push({player: playerID, score: endTime, color: color})

      if(playersArray.length === 2) {
        results();
      }
    }

    function results() {
      var winner = playersArray[0]
      var loser = playersArray[1]
      $("#winner").html("<h2>" + winner.player + " - " + (winner.score / 1000) + "<small>seconds</small></h2>");
      $("#loser").html("<h4>" + loser.player + " - " + (loser.score / 1000) + "<small>seconds</small></h4>");
      $("#results").fadeIn();

    }
  };
});
