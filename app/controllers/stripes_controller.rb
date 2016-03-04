class StripesController < ApplicationController
  before_action :set_stripe, only: [:show, :update, :destroy]
  before_action :set_comic

  # GET /stripes
  # GET /stripes.json
  def index
    @stripes = Stripe.where(:comic_id => @comic.id)
  end

  # GET /stripes/1
  # GET /stripes/1.json
  def show
    render partial: 'stripe', locals: { stripe: @stripe }
  end

  # POST /stripes
  # POST /stripes.json
  def create
    @stripe = Stripe.new
    @stripe.comic = @comic
    set_image
    if @stripe.save(stripe_params.except(:image))
      render json: (render_to_string(partial: 'stripe', locals: { stripe: @stripe })), status: :created
    else
      render json: @stripe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stripes/1
  # PATCH/PUT /stripes/1.json
  def update
    set_image
    if @stripe.update(stripe_params.except(:image))
      render json: (render_to_string(partial: 'stripe', locals: { stripe: @stripe })), status: :ok
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
      if params.is_a?(String)
        return JSON.parse(params[:stripe])
      else
        return params.require(:stripe).permit(:caption, :order, :comic_id, :image => [:data, :content_type, :filename])
      end

    end

    def set_image
      if stripe_params.has_key?(:image)
        unless stripe_params[:image].blank?
          image_params = stripe_params[:image]
          encoded_image = image_params[:data]
          content_type = image_params[:content_type]
          image = Paperclip.io_adapters.for(encoded_image)
          image.original_filename = image_params[:filename]
          @stripe.image = image
        else
          @stripe.image = nil
        end
      end

    end
end
