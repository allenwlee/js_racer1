require 'json'

get '/' do
  
  erb :index
end

post '/' do
  content_type :json

  player1 = Player.new(:name => params[:player1])
  player2 = Player.new (:name => params[:player2])

  if player1.save && player2.save
    { 'player1': player1.name, 'player2': player2.name }
  else 
    @errors = "Sorry, name is taken"
    erb :index
  end
end

