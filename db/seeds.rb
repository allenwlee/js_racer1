Player.create(:initials => "RF")
Player.create(:initials => "AB")
Game.create
round = GamesPlayer.new(:player1_id => 1, :player2_id => 2, :game_id => 1)
