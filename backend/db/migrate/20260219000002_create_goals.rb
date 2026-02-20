class CreateGoals < ActiveRecord::Migration[7.1]
  def change
    create_table :goals do |t|
      t.string :goal_name, null: false
      t.boolean :goal_completed, null: false, default: false
      t.references :goal_list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
