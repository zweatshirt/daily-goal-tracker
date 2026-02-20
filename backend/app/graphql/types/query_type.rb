module Types
  class QueryType < BaseObject
    field :goal_list, GoalListType, null: true do
      argument :date, GraphQL::Types::ISO8601Date, required: true
    end

    field :goal_lists, [GoalListType], null: false do
      argument :start_date, GraphQL::Types::ISO8601Date, required: false
      argument :end_date, GraphQL::Types::ISO8601Date, required: false
    end

    field :search_goals, [GoalType], null: false do
      argument :query, String, required: true
      argument :date, GraphQL::Types::ISO8601Date, required: false
    end

    def goal_list(date:)
      GoalList.find_by(date: date)
    end

    def goal_lists(start_date: nil, end_date: nil)
      scope = GoalList.all
      scope = scope.where('date >= ?', start_date) if start_date
      scope = scope.where('date <= ?', end_date) if end_date
      scope.order(:date)
    end

    def search_goals(query:, date: nil)
      scope = Goal.where('goal_name ILIKE ?', "%#{query}%")
      if date
        goal_list = GoalList.find_by(date: date)
        scope = scope.where(goal_list: goal_list) if goal_list
      end
      scope.includes(:goal_list)
    end
  end
end
