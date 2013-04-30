class Player < ActiveRecord::Base
  validates :initials, :presence => true, :uniqueness => true 

  has_and_belongs_to_many :games 
end