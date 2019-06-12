import { init, save, set } from './actions';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';

export { reducers } from './actions';
export const Actions = {
    init,
    save,
    set
};

export * from './constants';

export const initialState = {
    jsonforms: {
        renderers: materialRenderers,
        cells: materialCells,
    }
}