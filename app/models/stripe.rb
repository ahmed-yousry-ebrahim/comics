class Stripe < ActiveRecord::Base
  before_create :add_order_attribute
  after_destroy :maintain_comic_stripes_order
  before_update :check_order , :if => "order_changed?"
  after_update :swap_stripes , :if => "order_changed?"
  belongs_to :comic, counter_cache: true
  validates_associated :comic
  has_attached_file :image, styles: { web: "220x170#", mobile: "265x205#" }
  validates_attachment :image, presence: true,
                       content_type: { content_type: ["image/jpg","image/jpeg","image/png"] },
                       size: { in: 0..5000.kilobytes }
  private
    def add_order_attribute
      self.order = self.comic.stripes_count + 1
    end


    def maintain_comic_stripes_order

      following_comic_stripes = self.comic.stripes.where(order: self.order..Float::INFINITY) #the stripes following the current to be deleted stripe
      following_comic_stripes.each do |stripe|
        stripe.order = stripe.order - 1
        stripe.save
      end
    end

    def swap_stripes
      query = self.comic.stripes.where(:order => self.order)
      query.each do |stripe|
        unless stripe.id == self.id
          stripe.order = self.order_was
          stripe.save
        end

      end

    end

    def check_order
      if self.order < 1 || self.order > self.comic.stripes_count
        errors.add(:order,'Order cannot be less than 1 or exceed the stripes count')
        return false
      end
    end
end
