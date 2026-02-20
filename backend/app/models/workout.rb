class Workout < ApplicationRecord
  validates :name, presence: true
  validates :duration, numericality: { greater_than: 0, allow_nil: true }

  scope :recent, -> { order(created_at: :desc) }
end
