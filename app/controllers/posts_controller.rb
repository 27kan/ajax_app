class PostsController < ApplicationController
  def index # PostというDBからidを代入
    @posts = Post.all
  end
  
  def new
  end

  def create
    Post.create(content: params[:content])
  end
  
end
