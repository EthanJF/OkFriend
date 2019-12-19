class User < ApplicationRecord
    has_secure_password

    has_many :interests, :dependent => :delete_all

    has_many :friendships_as_user1, foreign_key: :user1_id, class_name: "Friendship", dependent: :destroy
    has_many :user2s, through: :friendships_as_user1, source: :user2

    has_many :friendships_as_user2, foreign_key: :user2_id, class_name: "Friendship", dependent: :destroy
    has_many :user1s, through: :friendships_as_user2, source: :user1

    validates_presence_of :username, :email, :password, :age, :gender, :zip_code, :parties, :picture
    validates_uniqueness_of :username, :case_sensitive => false

    def all_friendships
        self.friendships_as_user1 + self.friendships_as_user2
    end
end
