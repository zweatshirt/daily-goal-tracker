module Types
  class MutationType < BaseObject
    field :create_goal, mutation: Mutations::CreateGoal
    field :toggle_goal, mutation: Mutations::ToggleGoal
    field :delete_goal, mutation: Mutations::DeleteGoal
    field :copy_goals_from_previous_day, mutation: Mutations::CopyGoalsFromPreviousDay
  end
end
