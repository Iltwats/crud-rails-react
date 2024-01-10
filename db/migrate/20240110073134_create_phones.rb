class CreatePhones < ActiveRecord::Migration[7.1]
  def change
    create_table :phones do |t|
      t.string :brand
      t.string :country_origin
      t.integer :ram

      t.timestamps
    end
  end
end
