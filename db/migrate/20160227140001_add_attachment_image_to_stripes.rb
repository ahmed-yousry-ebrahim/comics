class AddAttachmentImageToStripes < ActiveRecord::Migration
  def self.up
    change_table :stripes do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :stripes, :image
  end
end
