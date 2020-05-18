import * as actions from "../actions";
// import addPerson from "../../components/AddPerson/AddPerson";

const initialState = {
    persons: []
}

const addPerson =  (state = initialState, action) => {

    switch(action.type){
        case(actions.ADD_PERSON):
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            let newpersons = [...state.persons]
            newpersons.push(newPerson)
            return {
                persons: newpersons
            }
    }

    return state
}

export default addPerson