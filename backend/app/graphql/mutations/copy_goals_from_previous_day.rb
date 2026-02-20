module Mutations
  class CopyGoalsFromPreviousDay < Types::BaseMutation
    argument :date, GraphQL::Types::ISO8601Date, required: true

    field :goal_list, Types::GoalListType, null: true
    field :errors, [String], null: false

    def resolve(date:)
      previous_date = date - 1.day
      previous_list = GoalList.find_by(date: previous_date)

      if previous_list.nil? || previous_list.goals.empty?
        return { goal_list: nil, errors: ['No goals found for the previous day'] }
      end

      goal_list = GoalList.find_or_create_by!(date: date)

      previous_list.goals.each do |goal|
        goal_list.goals.find_or_create_by!(goal_name: goal.goal_name) do |new_goal|
          new_goal.goal_completed = false
        end
      end

      { goal_list: goal_list.reload, errors: [] }
    end
  end
end
