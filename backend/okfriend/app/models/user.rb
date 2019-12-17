class User < ApplicationRecord
    has_secure_password

    has_many :interests, :dependent => :delete_all

    validates_presence_of :username, :email, :password, :age, :gender, :zip_code, :parties, :picture
    validates_uniqueness_of :username, :case_sensitive => false

    
end
