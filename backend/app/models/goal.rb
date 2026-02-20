class Goal < ApplicationRecord
  belongs_to :goal_list

  validates :goal_name, presence: true, uniqueness: { scope: :goal_list_id }
end
