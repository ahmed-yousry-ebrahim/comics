class CreateStripes < ActiveRecord::Migration
  def change
    create_table :stripes do |t|
      t.string :caption
      t.integer :order
      t.integer :comic_id

      t.timestamps null: false
    end
  end
end
