class GameTables < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :initials, :null => false
      t.string :color, :default => "edd717"
      t.timestamps
    end

    add_index(:players, :initials, :unique => true)

    create_table :games do |t|
      t.string :winner
      t.string :time 
      t.timestamps
    end

    create_table :games_players do |t|
      t.integer :player1_id
      t.integer :player2_id
      t.integer :game_id
    end
  end
end
