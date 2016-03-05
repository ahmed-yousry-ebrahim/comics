class Comic < ActiveRecord::Base
  has_many :stripes, :dependent => :destroy
  validates_numericality_of :stripes_count, less_than: 6
  scope :published, -> { where(is_published: true) }
end
