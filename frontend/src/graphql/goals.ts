import { gql } from "@apollo/client";

export const GET_GOAL_LIST = gql`
  query GetGoalList($date: ISO8601Date!) {
    goalList(date: $date) {
      id
      date
      goalsCount
      completedGoalsCount
      goals {
        id
        goalName
        goalCompleted
      }
    }
  }
`;

export const GET_GOAL_LISTS = gql`
  query GetGoalLists($startDate: ISO8601Date, $endDate: ISO8601Date) {
    goalLists(startDate: $startDate, endDate: $endDate) {
      id
      date
      goalsCount
      completedGoalsCount
    }
  }
`;

export const SEARCH_GOALS = gql`
  query SearchGoals($query: String!, $date: ISO8601Date) {
    searchGoals(query: $query, date: $date) {
      id
      goalName
      goalCompleted
      goalList {
        date
      }
    }
  }
`;

export const CREATE_GOAL = gql`
  mutation CreateGoal($goalName: String!, $date: ISO8601Date!) {
    createGoal(goalName: $goalName, date: $date) {
      goal {
        id
        goalName
        goalCompleted
      }
      errors
    }
  }
`;

export const TOGGLE_GOAL = gql`
  mutation ToggleGoal($id: ID!) {
    toggleGoal(id: $id) {
      goal {
        id
        goalCompleted
      }
      errors
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(id: $id) {
      success
      errors
    }
  }
`;

export const COPY_GOALS_FROM_PREVIOUS_DAY = gql`
  mutation CopyGoalsFromPreviousDay($date: ISO8601Date!) {
    copyGoalsFromPreviousDay(date: $date) {
      goalList {
        id
        date
        goals {
          id
          goalName
          goalCompleted
        }
      }
      errors
    }
  }
`;
