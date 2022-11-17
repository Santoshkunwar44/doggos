import { useContext, useEffect, useState } from "react"
import { DoggosContext } from "../../context/context"
import { DoggosBreedListApi } from "../../services/api/Apis"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import ShuffleOnOutlinedIcon from '@mui/icons-material/ShuffleOnOutlined';
const BreedList = () => {

    const [breedListArray, setBreedListArray] = useState([])
    const { dispatch, doggosBreed, showSidebar } = useContext(DoggosContext)



    useEffect(() => {


        //  the code inside this  block  will only run  when this BreedList component initially mounts or starts
        // because this useEffect has an empty dependency   ---> [ ]


        fetchBreedListFunction()


    }, [])


    const fetchBreedListFunction = async () => {




        try {
            const { data } = await DoggosBreedListApi()
            let breedListArr = []

            for (const key in data.message) {
                breedListArr.push(key)
            }

            setBreedListArray(breedListArr)

        } catch (error) {
            console.log(error)
        }

    }



    const handleSetBreed = (breed) => {
        dispatch({ type: "set_doggos_breed", payload: breed })
    }


    return (
        <ul className='sidebar_doggos_breed_list'>
            {
                showSidebar && <ArrowLeftOutlinedIcon onClick={() => dispatch({ type: "setHideSidebar" })} className="hideSidebarIcon" />
            }
            <li className={`${doggosBreed === "Random" ? 'active_breed' : ""}`} onClick={() => handleSetBreed("Random")} > <ShuffleOnOutlinedIcon sx={{ marginRight: "10px" }} className={"mainIcons breedList_itemIcon randomIcon"} /> Random</li>

            {
                breedListArray.map((breed, index) => (

                    <li className={`${doggosBreed === breed ? 'active_breed' : ""}`} onClick={() => handleSetBreed(breed)} key={index}> <PetsIcon sx={{ marginRight: "10px" }} className={"mainIcons breedList_itemIcon"} />  {breed}</li>
                ))
            }


        </ul >
    )
}

export default BreedList