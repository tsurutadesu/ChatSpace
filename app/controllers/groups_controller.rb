class GroupsController < ApplicationController
  def new
  end

  def edit
  end

  def update(group_params)
    if current_user.update(group_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).parmit(:name)
  end
end
