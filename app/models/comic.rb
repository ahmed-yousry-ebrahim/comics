class Comic < ActiveRecord::Base
  has_many :stripes, :dependent => :destroy
  validates :stripes_count, numericality: { less_than: 6 }
  scope :published, -> { where(is_published: true) }
end
