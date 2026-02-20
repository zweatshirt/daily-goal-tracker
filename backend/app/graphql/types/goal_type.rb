module Types
  class GoalType < BaseObject
    field :id, ID, null: false
    field :goal_name, String, null: false
    field :goal_completed, Boolean, null: false
    field :goal_list, Types::GoalListType, null: false
  end
end
