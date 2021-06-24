import * as actionTypes from '../actions';

const initialState={
    results: []
}

const resultReducer = (state=initialState, action)=>{
    switch (action.type){
        case actionTypes.STORE_RESULT:
            /* const newState = {...state};
            const newResult = [...state.results];
            newResult.push({id: new Date(), value: state.counter})
            newState.results = newResult;
            return newState; */

            const newState = JSON.parse(JSON.stringify(state));
            newState.results.push({id: new Date(), value: action.value});
            console.log("old ", state);
            console.log("new ", newState);
            return newState;
            
            /* return{
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
            } */
        case actionTypes.DEL_RESULT:
            /* const id = 2;
            const newResults = [...state.results];
            newResults.splice(id, 1); */
            const newResults = state.results.filter(result => action.resultId !== result.id)
            return{
                ...state,
                results: newResults
            }
        default:
            break;
    }
    return state;
}

export default resultReducer;