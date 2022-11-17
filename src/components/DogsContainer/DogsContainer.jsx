import { useContext, useEffect, useState } from "react"
import { DoggosContext } from "../../context/context"
import { DoggosRandomImageApi, DoogosByBreedApi } from "../../services/api/Apis"
import DoggosImg from "../DoggosImg/DoggosImg"
import "./dogsContainer.css"
import PolicyIcon from '@mui/icons-material/Policy';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PetsIcon from '@mui/icons-material/Pets';
import DoggosSkeleton from "../Skeleton/Skeleton"
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const DogsContainer = () => {

    const [doggosResult, setDoggosResult] = useState([])
    const [searchQuery, setSearchQuery] = useState(false)
    const [filterData, setFilterData] = useState({ limit: 12 })
    const { doggosBreed, dispatch, loading, filteredData } = useContext(DoggosContext)



    useEffect(() => {
        if (doggosBreed) {
            setSearchQuery(true)
            if (doggosBreed === "Random") {
                fetchRandomDoggos(30)
                return
            }
            fetchDoggosByBreedFunc(doggosBreed)

        } else {
            fetchRandomDoggos(30)
            setSearchQuery(false)
        }
    }, [doggosBreed])


    useEffect(() => {


        dispatch({ type: "set_filter_item", payload: filterData })


    }, [filterData])




    useEffect(() => {
        if (doggosResult) {
            dispatch({ type: 'setdoggosData', payload: { length: doggosResult.length, data: doggosResult } })
        }
    }, [doggosResult])



    const fetchDoggosByBreedFunc = async (breed) => {


        try {
            dispatch({ type: "setLoading", payload: true })
            const { data } = await DoogosByBreedApi(breed)
            dispatch({ type: "setLoading", payload: false })
            setDoggosResult(data.message)
        } catch (error) {
            console.log("some error occured")
            setDoggosResult([])
            dispatch({ type: "setError", payload: "Error while fetching the doggos data ..." })
        }
    }
    const fetchRandomDoggos = async (limit) => {
        try {
            dispatch({ type: "setLoading", payload: true })
            const { data } = await DoggosRandomImageApi(limit)
            setDoggosResult(data.message)
            dispatch({ type: "setLoading", payload: false })
        } catch (error) {
            console.log(error)
            setDoggosResult([])
            dispatch({ type: "setError", payload: "Error while fetching the doggos data ..." })
        }
    }


    console.log("the result", doggosResult)

    return (
        <div className='dogsContainer'>
            <div className="filter_row ">
                <div className="filteredRow_item1 filterItems">
                    <FilterAltIcon className="mainIcons" /> <span>Filtered Doggos</span>
                </div>
                <div className="filteredRow_item1 filterItems">
                    <PetsIcon className="mainIcons" /> <span>{doggosBreed ? doggosBreed : "Random"}</span>
                </div>
                <div className="filter_row_text filterItems"> <PolicyIcon className="mainIcons" />  <span>{doggosResult.length} results Found </span> </div>
                <div className="filter_row_limit filterItems">
                    <FormatListNumberedIcon className="mainIcons" />
                    <span>Doggos Per page</span>
                    <div className="limitBox" >

                        <input type="number" value={filterData?.limit} className="limit" onChange={(e) => setFilterData((prev) => ({ ...prev, limit: +e.target.value }))} />
                    </div>
                </div>
            </div>
            <div className="doggos_result">
                {loading ? <DoggosSkeleton /> :
                    filteredData ? filteredData.map((item) => (
                        <DoggosImg key={item} image={item} />
                    )) :
                        doggosResult.map((item) => (
                            <DoggosImg key={item} image={item} />
                        ))
                }
            </div>
        </div>
    )
}

export default DogsContainer




