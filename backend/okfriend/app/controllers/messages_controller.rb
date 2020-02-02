class MessagesController < ApplicationController

  def index
    messages = Message.all
    render json: messages, include: :user
  end

  def show
    message = Message.find(params[:id])
    render json: message, include: :user
  end

  def create
    message = Message.create(message_params)
    # render json: message, include: :user
    chat = Chat.find(message_params[:chat_id])
    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)
      ).serializable_hash
      MessagesChannel.broadcast_to chat, serialized_data
      head :ok
    end
  end

  def destroy
    message = Message.find(params[:id])
    message.destroy
    render json: message
  end


  private

  def message_params
    params.require(:message).permit(:content, :user_id, :chat_id)
  end

end
