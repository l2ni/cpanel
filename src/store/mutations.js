    /*eslint-disable*/
    const mutations = {
        changelastRequest(state, value) {
            state.lastRequest = value;
        },
        modalContainer(state, e) {
            state.modal_Container = e;
        },
        foodArr(state, e) {
            state.foodsArr = e
        },
        foodArrPush(state, e) {
            state.foodsArr.push(e);
        },
        ingredientPush(state, e) {
            state.ingredient.push(e);
        },
        deleteAjax(state, e) {
            state.ajax = e;
        },
        ingredientArr(state, e) {
            state.ingredient = e;
        },
        itemsMealArr(state, e) {
            state.itemsMeal = e;
        },
        Setsection(state, e) {
            state.section = e;
        },
        usersArr(state, e) {
            state.users = e;
        },
        AccountArr(state, e) {
            state.Account = e;
        },
        dataTap(state, e) {
            state.tapObj = e;
        },
        dataTapPush(state, e) {
            state.tapObj.push(e);
        },
        searchArr(state, e) {
            state.search = e;
        },
        searchPush(state, e) {
            state.search.push(e);
        },
        valid(state, e) {
            state.validata = e;
        }

    };
    export default mutations;