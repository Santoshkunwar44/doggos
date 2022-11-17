import React, { useContext, useRef } from 'react'
import BreedList from '../breedList/BreedList'
import "./sidebar.css"
import CategoryIcon from '@mui/icons-material/Category';
import { DoggosContext } from '../../context/context';
const Sidebar = () => {


    const { showSidebar } = useContext(DoggosContext)
    const sidebarRef = useRef()



    return (
        <div ref={sidebarRef} className={`${showSidebar ? "show" : ""} sidebar`}>

            <div className='sidebar_header'>
                <CategoryIcon className='mainIcons' />      <h3 className='sidebar_header_text'>The Doggos Breeds</h3>
            </div>
            <BreedList />
        </div>
    )
}

export default Sidebar