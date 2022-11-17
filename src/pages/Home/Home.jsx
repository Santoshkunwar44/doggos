import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import DogsContainer from "../../components/DogsContainer/DogsContainer";
import Downshift from 'downshift'
import { DoggosBreedListApi } from "../../services/api/Apis"
import { useEffect, useState, useContext, useRef } from "react";
import { DoggosContext } from "../../context/context";
import DoggosPagination from "../../components/pagination/Pagination";
import Navbar from "../../components/Navbar";
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PopoverSetting from "../../components/popover/PopoverSetting";
import SyncIcon from '@mui/icons-material/Sync';
import { getLoggedInUser } from "../../services/utilityFunctions";
const Home = () => {

    const [breedOptions, setBreedOptions] = useState([])
    const { dispatch } = useContext(DoggosContext)
    const inputRef = useRef()

    useEffect(() => {
        const currentUser = getLoggedInUser()
        if (currentUser) {
            dispatch({ type: "setUserData", payload: currentUser })
        }
    }, [])



    useEffect(() => {
        fetchAllTheBreedList()
    }, [])

    const fetchAllTheBreedList = async () => {
        try {
            const { data } = await DoggosBreedListApi()
            let breedListArr = []

            for (const key in data.message) {

                breedListArr.push(key)
            }

            let theArr = breedListArr.map((item) => ({ value: item }))

            setBreedOptions(theArr)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (selection) => {

        // alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
        if (selection.value) {
            dispatch({ type: "set_doggos_breed", payload: selection.value })

        }


    }


    const handleSubmit = () => {
        let value = inputRef.current.value
        if (value) {
            dispatch({ type: "set_doggos_breed", payload: value })
        }
    }


    return (
        <>
            <Navbar />
            <div className="home">
                <Sidebar />
                <div className="home_container">
                    <div className="home_header">

                        <Downshift
                            onChange={handleChange}
                            itemToString={item => (item ? item.value : '')}
                        >
                            {({
                                getInputProps,
                                getItemProps,
                                getLabelProps,
                                getMenuProps,
                                isOpen,
                                inputValue,
                                highlightedIndex,
                                selectedItem,
                                getRootProps,
                            }) => (
                                <div className="home_header_searchBox">
                                    {/* <label {...getLabelProps()}>Enter a fruit</label> */}
                                    <div onClick={() => dispatch({ type: 'pageRefresh' })} title="refresh " className="syncIconBox">

                                        <SyncIcon className="mainIcons syncIcon" style={{ cursor: "pointer" }} />
                                    </div>
                                    <div className="search"
                                        style={{ display: 'inline-block' }}
                                        {...getRootProps({}, { suppressRefError: true })}
                                    >
                                        <input ref={inputRef} placeholder="Doggos breed....." {...getInputProps()} />
                                        <TroubleshootOutlinedIcon sx={{ cursor: "pointer" }} className={"mainIcons searchInputIcon"} onClick={handleSubmit} />
                                    </div>
                                    <ul className="optionItemsList" style={{ position: "absolute" }} {...getMenuProps()}>
                                        {isOpen
                                            ? breedOptions
                                                .filter(item => !inputValue || item.value.includes(inputValue))
                                                .map((item, index) => (
                                                    <li
                                                        {...getItemProps({
                                                            key: item.value,
                                                            index,
                                                            item,
                                                            style: {
                                                                textAlign: "start",
                                                                padding: "9px",
                                                                backgroundColor:
                                                                    highlightedIndex === index ? '#2d2e2f' : '#2d2e2f',
                                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                                color: highlightedIndex === index ? 'white' : 'gray'
                                                            },
                                                        })}
                                                    >
                                                        {item.value}
                                                    </li>
                                                ))
                                            : null}
                                    </ul>
                                </div>
                            )}
                        </Downshift>

                        <PopoverSetting>
                            <SettingsSuggestIcon onClick={() => console.log("hello")} sx={{ position: "absolute", right: "20px", fill: "#ce6816", cursor: "pointer", width: "1.5rem" }} />
                        </PopoverSetting>

                    </div>
                    <DogsContainer />
                    <DoggosPagination />
                </div>
            </div>
        </>
    )
}

export default Home





