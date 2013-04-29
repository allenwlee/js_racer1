Player.create(:name => "Robby")
Player.create(:name => "Angie")
Game.create
round = GamesPlayer.new(:player1_id => 1, :player2_id => 2, :game_id => 1)
