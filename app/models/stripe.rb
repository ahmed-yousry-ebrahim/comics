class Stripe < ActiveRecord::Base
  before_validation :set_image
  before_create :add_order
  belongs_to :comic, counter_cache: true
  validates_associated :comic
  has_attached_file :image, styles: { thumb: "220x170#" }
  validates_attachment :image, presence: true,
                       content_type: { content_type: ["image/jpeg","image/png"] },
                       size: { in: 100..5000.kilobytes }
  private
    def add_order
      self.order = self.comic.stripes_count + 1
    end
end
