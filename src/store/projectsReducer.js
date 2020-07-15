const defaultState = {
  status: "NOT_FETCHED",
  project: { status: "NOT_FETCHED" },
  projects: [],
};

const projectsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_PROJECTS":
      return { ...state, status: "FETCHING_PROJECTS" };
    case "FETCH_PROJECTS_SUCCESS":
      return {
        ...state,
        status: "FETCHED_PROJECTS",
        projects: action.projects,
      };
    case "FETCH_PROJECTS_FAILED":
      return {
        ...state,
        status: "FETCHING_PROJECTS_FAILED",
        error: action.error,
      };
    case "FETCH_PROJECT":
      return { ...state, project: { status: "FETCHING_PROJECT" } };
    case "FETCH_PROJECT_SUCCESS":
      return {
        ...state,
        project: { status: "FETCH_PROJECT_SUCCESS", ...action.project },
      };
    case "FETCH_PROJECT_FAILED":
      return {
        ...state,
        project: { status: "FETCH_PROJECT_FAILED", error: action.error },
      };
    case "DELETE_PROJECT":
      return { ...state, status: "DELETING_PROJECT" };
    case "DELETE_PROJECT_SUCCESS":
      return {
        ...state,
        status: "DELETED_PROJECT",
        projects: state.projects.filter((p) => p._id !== action.id),
      };
    case "DELETE_PROJECT_FAILED":
      return {
        ...state,
        status: "DELETE_PROJECT_SUCCESS",
        error: action.error,
      };
    case "ADD_PROJECT":
      return { ...state, status: "ADDING_PROJECT" };
    case "ADD_PROJECT_SUCCESS":
      return {
        ...state,
        status: "ADD_PROJECT_SUCCESS",
        projects: [action.project, ...state.projects],
      };
    case "ADD_PROJECT_FAILED":
      return { ...state, status: "ADD_PROJECT_FAILED", error: action.error };
    case "INVITE_COLLABORATOR":
      return { ...state, status: "INVITING_COLLABORATOR" };
    case "INVITE_COLLABORATOR_SUCCESS":
      return { ...state, status: "INVITE_COLLABORATOR_SUCCESS" };
    case "INVITE_COLLABORATOR_FAILED":
      return {
        ...state,
        status: "INVITE_COLLABORATOR_FAILED",
        error: action.error,
      };
    case "ACCEPT_INVITATION":
      return { ...state, status: "ACCEPTING_INVITATION" };
    case "ACCEPT_INVITATION_SUCCESS":
      return {
        ...state,
        status: "ACCEPT_INVITATION_SUCCESS",
        projects: [action.project, ...state.projects],
      };
    case "ACCEPT_INVITATION_FAILED":
      return {
        ...state,
        status: "ACCEPT_INVITATION_FAILED",
        error: action.error,
      };
    case "ATTACH_DATASET":
      return {
        ...state,
        project: { ...state.project, status: "ATTACHING_DATASET" },
      };
    case "ATTACH_DATASET_SUCCESSS":
      return {
        ...state,
        project: {
          ...state.project,
          status: "ATTACH_DATASET_SUCCESS",
          ...action.project,
        },
      };
    case "ATTACH_DATASET_FAILED":
      return {
        ...state,
        project: {
          ...state.project,
          status: "ATTACH_DATASET_FAILED",
          error: action.error,
        },
      };
    case "DETACH_DATASET":
      return {
        ...state,
        project: { ...state.project, status: "DETACHING_DATASET" },
      };
    case "DETACH_DATASET_SUCCESSS":
      return {
        ...state,
        project: {
          ...state.project,
          status: "DETACH_DATASET_SUCCESS",
          ...action.project,
        },
      };
    case "DETACH_DATASET_FAILED":
      return {
        ...state,
        project: {
          ...state.project,
          status: "DETACH_DATASET_FAILED",
          error: action.error,
        },
      };
    case "REMOVE_MEMBER":
      return {
        ...state,
        project: { ...state.project, status: "REMOVING_MEMBER" },
      };
    case "REMOVE_MEMBER_SUCCESS":
      return {
        ...state,
        project: {
          ...state.project,
          status: "REMOVE_MEMBER_SUCCESS",
          ...action.project,
        },
      };
    case "REMOVE_MEMBER_FAILED":
      return {
        ...state,
        project: {
          ...state.project,
          status: "REMOVE_MEMBER_FAILED",
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default projectsReducer;
