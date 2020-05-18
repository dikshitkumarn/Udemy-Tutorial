import * as actions from "../actions";

const initialState = {
    updatedPersons: []
}

const deletePerson =  (state = initialState, action) => {

    switch(action.type){
        case(actions.DELETE_PERSON):
            const updatedPersons = action.personsArray.filter(person => person.id != action.id)
            return {
                persons: updatedPersons
            }
    }

    return state
}

export default deletePerson