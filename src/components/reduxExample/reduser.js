import * as actionTypes from './actionTypes'

const defaultState = {
    error: null,
    tasks: [],
    loading: false,
    successMessage: null,
    errorMessage: null,
    addTaskSuccess: false

}
export const reducer = (state = defaultState, action) => {
    console.log(state, 'state')
    console.log(action, 'action')

    switch (action.type) {
        case actionTypes.ERROR: {
            return {
                ...state,
                errorMessage: action.error,
                loading: false
            }
        }
        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                tasks: action.tasks,
                loading: false,
                successMessage: 'Task came succesfully'
            }
        }
        case actionTypes.LOADING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                successMessage: null,
                errorMessage: null,
            }
        }
        case actionTypes.ADD_TASK_SUCCESS: {
            const tasks = [...state.tasks, action.task]
            return {
                ...state,
                tasks: tasks,
                loading: false,
                successMessage: 'Task came successfully',
                addTaskSuccess: true
            }
        }


        default: return state;
    }
}

