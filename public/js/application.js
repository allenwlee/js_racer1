$(document).ready(function() {
  var p = '80';
  var q = '81';
  var pPosition = 1;
  var qPosition = 1;
  var track = $("#player1_strip").find("td").size();
  var counter = 3;

  function Person(name) {
    this.name = name
  }

  $('#start').on('click', function() {
    $('.countdown').show()
    countDown(function() {
      var player1 = new Player()
    });
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

  function getPlayers(){

  }

  function createPlayers(server_data){
    var player1 = {
      'name': server_data['player1']
    };
    var player2 = {
      'name': server_data['player2']
    };
    var game = {
      'gameID': server_data['gameID']
    };

    $('#player1').html(player1.name);
    $('#player2').html(player2.name);
    $('.player-form').fadeOut(function(){
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



  // var started = false;
  // var counter = 0

  // function countDown() {
  //   if (counter < 3) {
  //     setTimeout(countDown, 1000);
  //     counter++;
  //   } else {
  //     started = true;
  //   }
  // }

  function game() {
    var d = new Date();
    var startTime = d.getTime();

    $("#count").html("GO!");
    function update_player_position(player, position) {
      $("#" + player).find('.active').removeClass('active');
      $("#" + player).find("#" + position).addClass('active');
    }
   
    $(document).on('keyup', function(e) {
      var code = (e.keyCode);
      if(code == p) {
        pPosition += 1;
        update_player_position("player1_strip", pPosition);
        if (pPosition == track){
          var p1 = $('#player1').html();
          winner(p1,  startTime);
        }
      }
    });

    $(document).on('keyup', function(e) {
      var code = (e.keyCode);
      if(code == q) {
       qPosition += 1;
       update_player_position("player2_strip", qPosition);
        if (qPosition == track){
          var p2 = $('#player2').html();
          winner(p2, startTime );
        }
      }
    });

    function winner(player, startTime){
      var d = new Date();
      var endTime = d.getTime() - startTime;
      $('#start').hide(); 

    }
  };
});
