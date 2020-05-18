import * as actions from "../actions";

const initialState = {
    persons: []
}

const reducer =  (state = initialState, action) => {

    switch(action.type){
        case(actions.ADD_PERSON):
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            let newpersons = [...state.persons]
            newpersons.push(newPerson)
            console.log(newpersons)
            return {
                persons: newpersons
            }
        case(actions.DELETE_PERSON):
            const updatedPersons = state.persons.filter(person => person.id != action.id)
            return {
                persons: updatedPersons
            }
    }

    return state
}

export default reducer