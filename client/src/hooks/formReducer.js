const FormActionTypes = {
    FORM_PREV_STEP: "FORM_PREV_STEP",
    FORM_NEXT_STEP: "FORM_NEXT_STEP",
    FORM_ERROR: "FORM_ERROR",
    ADD_DATA: "ADD_DATA",
    FORM_RESET: "FORM_RESET"
};

const FormSettings = {
    maxStep: 3
};

const FormInitialState = {
    form: {},
    current_step: 1,
    errors: {}
}

const formReducer = (state = FormInitialState, {type, payload}) => {
    switch(type){
        case FormActionTypes.ADD_DATA:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...payload
                }
            }

        case FormActionTypes.FORM_NEXT_STEP:
            return {
                ...state,
                current_step: (state.current_step + 1)
            }

        case FormActionTypes.FORM_PREV_STEP:
            return {
                ...state,
                current_step: (state.current_step - 1)
            }

        case FormActionTypes.FORM_ERROR:
            return {
                ...state,
                errors: {
                    // ...state.errors,
                    ...payload
                }
            }

        case FormActionTypes.FORM_RESET:
            return {
                ...FormInitialState
            }

        default:
            return state;
    }
}

export {
    FormActionTypes,
    FormInitialState,
    formReducer,
    FormSettings
}