class CreateGoalLists < ActiveRecord::Migration[7.1]
  def change
    create_table :goal_lists do |t|
      t.date :date, null: false

      t.timestamps
    end

    add_index :goal_lists, :date, unique: true
  end
end
