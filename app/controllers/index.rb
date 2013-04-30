require 'json'

get '/' do
  
  erb :index
end

post '/' do
  content_type :json

  player1 = Player.new(:name => params[:player1])
  player2 = Player.new(:name => params[:player2])

  if player1.save && player2.save
    game = Game.create
    round = GamesPlayer.create(:player1_id => player1.id, :player2_id => player2.id, :game_id => game.id)
    result = { :player1 => player1.name, :player2 => player2.name, :gameID => game.id, :roundID => round.id }
    result.to_json
  else 
    response.status = 422
    @errors = "Sorry, name is taken"
    erb :errors, layout: false
  end
end

# get "/errors" do
#   @errors = "Sorry"

#   erb :index
# end

