module Mutations
  class CreateGoal < Types::BaseMutation
    argument :goal_name, String, required: true
    argument :date, GraphQL::Types::ISO8601Date, required: true

    field :goal, Types::GoalType, null: true
    field :errors, [String], null: false

    def resolve(goal_name:, date:)
      goal_list = GoalList.find_or_create_by!(date: date)
      goal = goal_list.goals.build(goal_name: goal_name)

      if goal.save
        { goal: goal, errors: [] }
      else
        { goal: nil, errors: goal.errors.full_messages }
      end
    end
  end
end
