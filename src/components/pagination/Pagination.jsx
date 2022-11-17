import { createTheme, ThemeProvider } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useState, useEffect, useContext } from 'react'
import { DoggosContext } from '../../context/context'
import { paginationResult } from '../../services/utilityFunctions'

function DoggosPagination() {


    const { filterItem, doggosData, dispatch } = useContext(DoggosContext)
    const [numOfPage, setNumberOfPages] = useState()
    const [currentPageNo, setCurentPageNo] = useState(1)


    useEffect(() => {
        if (!doggosData.length || !filterItem?.limit) return
        let totalPage = Math.ceil(doggosData?.length / filterItem?.limit)
        setNumberOfPages(totalPage)
        getDataFromPageNo()
    }, [filterItem, doggosData])


    useEffect(() => {
        if (!doggosData.length || !filterItem?.limit) return
        getDataFromPageNo()
    }, [currentPageNo])



    const getDataFromPageNo = () => {
        const theFilteredData = paginationResult(doggosData.data, currentPageNo, +filterItem?.limit)
        dispatch({ type: "setFilteredData", payload: theFilteredData })
    }




    const darkTheme = createTheme({
        palette: {
            type: "dark"
        }
    })

    const handlePageChange = (page) => {
        setCurentPageNo(page)

        window.scroll(0, 0)
    }



    const pagination = {
        width: "600px",
        margin: "0 auto",
        padding: "8px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        marginTop: "1rem"
    }

    const paginationBar = {
        color: "red !important"
    }
    return (
        <>
            <div className='pagination' style={pagination}>
                <ThemeProvider theme={darkTheme}>
                    <Pagination shape='rounded' hidePrevButton hideNextButton className='paginationBar' style={paginationBar} count={numOfPage} onClick={(e) => handlePageChange(e.target.textContent)} color='primary' />
                </ThemeProvider>
            </div>
        </>
    )
}

export default DoggosPagination