class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: :interests
    end

    def show
        user = User.find(params[:id])
        render json: user, include: :interests
    end

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user
        else
            render json: {
                errors: "This username is already taken!"
            }
        end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
    end


  private

  def user_params
      params.require(:user).permit(:username, :password)
  end
end
