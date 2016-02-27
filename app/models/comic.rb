class Comic < ActiveRecord::Base
  has_many :stripes
  validates :stripes_count, numericality: { less_than_or_equal_to: 6 }
  scope :published, -> { where(is_published: true) }
end
