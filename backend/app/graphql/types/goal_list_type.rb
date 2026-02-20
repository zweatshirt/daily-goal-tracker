module Types
  class GoalListType < BaseObject
    field :id, ID, null: false
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :goals_count, Integer, null: false
    field :completed_goals_count, Integer, null: false
    field :goals, [Types::GoalType], null: false
  end
end
