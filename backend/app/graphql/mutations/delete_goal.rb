module Mutations
  class DeleteGoal < Types::BaseMutation
    argument :id, ID, required: true

    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve(id:)
      Goal.find(id).destroy!
      { success: true, errors: [] }
    end
  end
end
