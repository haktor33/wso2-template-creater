import { actionTypes } from "store/actionTypes/xml.template.types";

const initialData = {
    templateList: [],
    nextKey: 0,
};

const xmlTemplate = (state = initialData, action) => {
    switch (action.type) {
        case actionTypes.addItem:
            let { nextKey } = state;
            const templateList = JSON.parse(JSON.stringify(state.templateList));
            nextKey++;
            templateList.push({ key: ++nextKey, ...action.payload.item });
            return { ...state, nextKey, templateList };
        case actionTypes.updateItem:
            const { data } = action.payload;
            const updatedList = JSON.parse(JSON.stringify(state.templateList));
            updatedList.filter(f => f.key === data.key)[0] = data;
            return { ...state, templateList: updatedList };
        case actionTypes.setList:
            const tmpList = JSON.parse(JSON.stringify(action.payload.templateList));
            let { nextKey: nxtKey } = state;
            tmpList.filter(f => !f.key).forEach(item => item.key = ++nxtKey)
            return { ...state, templateList: tmpList, nextKey: nxtKey };
        case actionTypes.removeItem:
            const { key } = action.payload;
            const newList = JSON.parse(JSON.stringify(state.templateList.filter(f => f.key !== key)));
            return { ...state, templateList: newList };
        case actionTypes.clearAll:
            return { ...JSON.parse(JSON.stringify(initialData)) };
        default:
            return state;
    }
};

export { xmlTemplate };