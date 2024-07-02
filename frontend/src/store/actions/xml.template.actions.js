import { actionTypes } from "store/actionTypes/xml.template.types";

const addItem = (item) => ({
    type: actionTypes.addItem,
    payload: { item }
});

const updateItem = (data, key) => ({
    type: actionTypes.updateItem,
    payload: { data, key }
});

const setList = (list) => ({
    type: actionTypes.setList,
    payload: { templateList: list }
});

const removeItem = (key) => ({
    type: actionTypes.removeItem,
    payload: { key }
});


const clearAll = () => ({
    type: actionTypes.clearAll,
    payload: {}
});

export const xmlTemplateActions = { addItem, updateItem, setList, removeItem, clearAll };
