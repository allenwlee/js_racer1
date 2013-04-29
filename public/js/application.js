$(document).ready(function() {
  var p = '80';
  var q = '81';
  var pPosition = 1;
  var qPosition = 1;
  var track = $("#player1_strip").find("td").size();
  var counter = 3;

  $('#start').on('click', function() {
    $('.countdown').show()
    countDown();
  })

  function countDown() {
    if (counter > 0) {
      setTimeout(countDown, 1000);
      $("#count").html(counter)
      counter--;
    } else {
      game()
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
    $("#count").html("GO!")
    function update_player_position(player, position) {
      $("#" + player).find('.active').removeClass('active');
      $("#" + player).find("#" + position).addClass('active');
    }

    function winner(player){
      alert(player + " wins!")
    }
   
    $(document).on('keyup', function(e) {
      var code = (e.keyCode);
      if(code == p) {
        pPosition += 1;
        update_player_position("player1_strip", pPosition);
        if (pPosition == track){
          winner("Player 1")
        }
      }
    });

    $(document).on('keyup', function(e) {
      var code = (e.keyCode);
      if(code == q) {
       qPosition += 1;
       update_player_position("player2_strip", qPosition);
       if (qPosition == track){
         winner("Player 2")
       }
      }
    });
  };
});
