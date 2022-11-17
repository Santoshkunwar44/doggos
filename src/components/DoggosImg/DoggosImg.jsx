import "./doggosImg.css"
import { useContext } from "react"
import { DoggosContext } from "../../context/context"


const DoggosImg = ({ image }) => {

    const { modalOpen } = useContext(DoggosContext)

    return (
        <div className='doggosImageBox'>

            <img className={`doggosImage ${modalOpen ? "hide" : ""}`} src={image} alt="doggos_image" />

        </div>
    )
}

export default DoggosImg