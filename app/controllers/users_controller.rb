class UsersController < ApplicationController
  before_action :set_user, only: %i[edit update show destroy]

  def index
    @users = send_request('api/admins', hash, 'get')['data']
  end

  def show; end

  def edit
    id = params[:id]
    @user = send_authenticated_request("api/admins/#{id}", hash, 'get')
  end

  def update
    id = params[:id]
    @user = send_authenticated_request("api/admins/#{id}", update_params, 'put')
  end

  def new; end

  def create; end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_path, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    user_param_array = if params[:user][:password]
                         %i[email member_level password password_confirmation]
                       else
                         %i[email member_level]
                       end
    params.require(:user).permit(user_param_array)
  end

  def person_hash
    {
      first_name: params[:user][:first_name],
      last_name: params[:user][:last_name]
    }
  end

  def update_params
    {
      username: params[:user]['username'],
      email: params[:user]['email'],
      firstName: params[:user]['firstName'],
      lastName: params[:user]['lastName'],
      fullName: "#{params[:user]['firstName']} #{params[:user]['lastName']}",
      password: params[:user]['password'],
      password_confirmation: params[:user]['password_confirmation'],
      roles: JSON.parse(params[:user]['roles']),
      enabled: (params[:user]['enabled'] == 'true')? true : false
    }
  end

  def user_person_update
    @user.person.update(person_hash) && @user.update(user_params)
  end

end
