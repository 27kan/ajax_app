class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content],checked: false)
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked # 取得したメモが既読⇆未読を反転する
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    # 既読⇆未読を反転させた値を再取得してitemに代入
    render json: { post: item }
    # 既読処理を行なった値をレスポンスとして返す
  end
  
end
