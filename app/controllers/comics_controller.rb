class ComicsController < ApplicationController
  before_action :set_comic, only: [:show, :update, :destroy]

  # GET /comics
  # GET /comics.json
  def index
    @comics = Comic.published

    render json: @comics
  end

  # GET /comics/1
  # GET /comics/1.json
  def show
    render json: @comic, :include => :stripes
  end

  # POST /comics
  # POST /comics.json
  def create
    @comic = Comic.new(comic_params)
    if @comic.save
      render json: @comic, status: :created, location: @comic
    else
      render json: @comic.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comics/1
  # PATCH/PUT /comics/1.json
  def update
    @comic = Comic.find(params[:id])

    if @comic.update(comic_params)
      render json: @comic, status: :ok
    else
      render json: @comic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comics/1
  # DELETE /comics/1.json
  def destroy
    @comic.destroy

    head :no_content
  end

  private

    def set_comic
      @comic = Comic.find(params[:id])
    end

    def comic_params

      if params.is_a?(String)
        return JSON.parse(params[:comic])
      else
        return params.require(:comic).permit(:is_published)
      end

    end
end
