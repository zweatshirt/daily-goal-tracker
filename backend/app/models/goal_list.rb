class GoalList < ApplicationRecord
  has_many :goals, dependent: :destroy

  validates :date, presence: true, uniqueness: true

  def goals_count
    goals.count
  end

  def completed_goals_count
    goals.where(goal_completed: true).count
  end
end
