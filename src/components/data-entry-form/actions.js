import { Actions, jsonformsReducer } from '@jsonforms/core';

import { NEW_ID } from './constants';

const INIT = "dataentryform/INIT";
const SET = "dataentryform/SET";
const SAVE = "dataentryform/SAVE";

export const init = (data, schema, uischema) => {
    return [
        {
            type: INIT,
            payload: {
                data
            }
        },
        Actions.init({}, schema, uischema)
    ]
}

export const save = (id, data) => {
    return {
        type: SAVE,
        payload: {
            id,
            data
        }
    }
}

export const set = (data) => {
    return [
        {
            type: SET,
            payload: {
                data
            }
        },
        Actions.update('', () => data)
    ]
}

const dataentryformReducer = (state = {}, action) => {
    if (action.type === INIT) {
        const payload = action.payload;
        const data = payload.data.map(data => Object.assign({}, data));
        return Object.assign({}, state, {
            hash: Math.random(),
            data: data
        });
    }
    if (action.type === SAVE) {
        const payload = action.payload;
        const data = payload.data;
        const id = payload.id;
        const currentDataList = state.data;
        const duplicateDataList = currentDataList.map(item => Object.assign({}, item));
        if (id === NEW_ID) {
            duplicateDataList.push(data);
        } else {
            const index = currentDataList.findIndex(item => item.id === id);
            if (index < 0) return state;
            duplicateDataList[index] = data;
            
        }
        return Object.assign({}, state, {
            data: duplicateDataList
        });
    }
    if (action.type === SET) {
        console.warn("unimplemented");
        return state;
    }
    return state;
}

export const reducers = Object.assign({}, 
    {
        dataentryform: dataentryformReducer,
        jsonforms: jsonformsReducer()
    }
)