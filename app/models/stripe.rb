class Stripe < ActiveRecord::Base
  before_create :add_order_attribute
  after_destroy :maintain_comic_stripes_order
  after_update :swap_stripes_order , :if => "!order_was && order_changed?"
  belongs_to :comic, counter_cache: true
  validates_associated :comic
  has_attached_file :image, styles: { thumb: "220x170#" }
  validates_attachment :image, presence: true,
                       content_type: { content_type: ["image/jpg","image/jpeg","image/png"] },
                       size: { in: 10..5000.kilobytes }
  private
    def add_order_attribute
      self.order = self.comic.stripes_count + 1
    end


    def maintain_comic_stripes_order
      following_comic_stripes = self.comic.stripes.where(:order > self.order) #the stripes following the current to be deleted stripe
      following_comic_stripes.each do |stripe|
        stripe.order = stripe.order - 1
        stripe.save
      end
    end

    def swap_stripes_order
      query = self.comic.stripes.where(:order => self.order)
      if query.count > 0
        swapped_stripe = query.first
        swapped_stripe.order = self.order_was
        swapped_stripe.save
      end

    end
end
