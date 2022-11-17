import { createContext, useReducer } from "react"





// reducer 


const Reducer = (state, action) => {
    switch (action.type) {
        case "setModalOpen":
            console.log("opening")
            return { ...state, modalOpen: true }
        case "setModalClose":
            console.log("closing")
            return { ...state, modalOpen: false }
        case "set_doggos_breed":
            return { ...state, doggosBreed: action.payload }
        case "setUserData":
            return { ...state, userData: action.payload }

        case "set_filter_item":
            return { ...state, filterItem: action.payload }

        case "setLoading":
            return { ...state, loading: action.payload }

        case "setError":
            return { ...state, loading: false, error: action.payload }
        case "setdoggosData":
            return { ...state, doggosData: action.payload }

        case "setFilteredData":
            return { ...state, filteredData: action.payload }
        case "setHideSidebar":
            return { ...state, showSidebar: false }
        case "setShowSidebar":
            return { ...state, showSidebar: true }

        case "pageRefresh":
            return { ...initialState, userData: state.userData }
        case "logout":
            return { ...state, userData: null }

        default:
            return state
    }
}







// context 




const initialState = {
    modalOpen: false,
    userData: null,
    doggosBreed: "",
    filterItem: null,
    loading: false,
    filteredData: null,
    showSidebar: null,
    error: false,
    doggosData: {
        data: null,
        length: null

    },
    filteredResult: null
}
export const DoggosContext = createContext(initialState)


export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <DoggosContext.Provider value={{
            doggosBreed: state.doggosBreed,
            filterItem: state.filterItem,
            loading: state.loading,
            filteredData: state.filteredData,
            error: state.error,
            doggosData: state.doggosData,
            showSidebar: state.showSidebar,
            userData: state.userData,
            modalOpen: state.modalOpen,
            dispatch: dispatch
        }} >
            {
                children
            }
        </DoggosContext.Provider>
    )

}



    // import { createContext, useReducer, useEffect } from "react";
    // import Reducer from "./Reducer";

    // const INITIAL_STATE = {
    //     user: JSON.parse(localStorage.getItem("user")) || null,
    //     isFetching: false,
    //     error: false,
    //     progress: 0,
    // };

    // export const Context = createContext(INITIAL_STATE);

