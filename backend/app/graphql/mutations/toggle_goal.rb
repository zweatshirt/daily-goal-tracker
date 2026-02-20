module Mutations
  class ToggleGoal < Types::BaseMutation
    argument :id, ID, required: true

    field :goal, Types::GoalType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      goal = Goal.find(id)
      goal.goal_completed = !goal.goal_completed

      if goal.save
        { goal: goal, errors: [] }
      else
        { goal: nil, errors: goal.errors.full_messages }
      end
    end
  end
end
