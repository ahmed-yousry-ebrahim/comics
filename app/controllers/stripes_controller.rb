class StripesController < ApplicationController
  before_action :set_stripe, only: [:show, :update, :destroy]
  before_action :set_comic

  # GET /stripes
  # GET /stripes.json
  def index
    @stripes = Stripe.where(:comic_id => @comic.id)
    render json: @stripes
  end

  # GET /stripes/1
  # GET /stripes/1.json
  def show
    render json: @stripe
  end

  # POST /stripes
  # POST /stripes.json
  def create

    image_params = params[:image]
    encoded_image = image_params[:data]
    content_type = image_params[:content_type]
    image = Paperclip.io_adapters.for("data:#{content_type};base64,#{encoded_image}")
    image.original_filename = image_params[:filename]

    @stripe = Stripe.new
    @stripe.image = image
    @stripe.caption = params[:caption]
    @stripe.comic = @comic

    if @stripe.save
      render json: @stripe, status: :created, location: @stripe
    else
      render json: @stripe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stripes/1
  # PATCH/PUT /stripes/1.json
  def update

    if @stripe.update(stripe_params)
      head :no_content
    else
      render json: @stripe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stripes/1
  # DELETE /stripes/1.json
  def destroy
    @stripe.destroy

    head :no_content
  end

  private

    def set_stripe
      @stripe = Stripe.where(:id => params[:id], :comic_id => params[:comic_id]).first
    end

    def set_comic
      @comic = Comic.find(params[:comic_id])
    end

    def stripe_params
      params.require(:stripe).permit(:caption, :order, :comic_d)
    end
end
