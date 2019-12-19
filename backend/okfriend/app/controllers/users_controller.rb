class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: [:interests, :all_friendships]
    end

    def show
        user = User.find(params[:id])
        render json: user, include: [:interests, :all_friendships => {include: [:user1, :user2]}]
    end

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user
        else
            render json: {
                errors: user.errors.full_messages
            }
        end
    end

    def update
    user = User.find(params[:id])
    user.update(user_params)
       if user.valid?
        render json: user
    else
        render json: {
            errors: user.errors.full_messages
        }
    end
  end

    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: user
    end


  private

  def user_params
      params.require(:user).permit(:username, :email, :password, :age, :gender, :zip_code, :parties, :picture)
  end
end
