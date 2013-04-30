require 'json'

get '/' do  
  erb :index
end

post '/' do
  content_type :json

  player1 = Player.new(:initials => params[:initials1], :color => params[:color1])
  player2 = Player.new(:initials => params[:initials2], :color => params[:color2])

  if player1.save && player2.save
    game = Game.create
    round = GamesPlayer.create(:player1_id => player1.id, :player2_id => player2.id, :game_id => game.id)
    result = { :player1 => player1.initials, :color1 => player1.color, :player2 => player2.initials, :color2 => player2.color, :gameID => game.id, :roundID => round.id }
    result.to_json
  else 
    response.status = 422
    @errors = "Sorry, name is taken"
    erb :errors, layout: false
  end
end

get '/game/:id' do
  @game = Game.find(params[:id])
  #  winner, time 
  #  in game object, there are player ids 

  erb :results
end

