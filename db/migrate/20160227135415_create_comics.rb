class CreateComics < ActiveRecord::Migration
  def change
    create_table :comics do |t|
      t.boolean :is_published, :default => false
      t.integer :stripes_count, :default => 0
      t.timestamps null: false
    end
  end
end
