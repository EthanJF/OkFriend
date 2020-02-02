class ChatSerializer < ActiveModel::Serializer
  attributes :id, :user1_id, :user2_id
  has_many :messages
end
