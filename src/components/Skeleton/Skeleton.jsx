import { Box, Skeleton, Stack } from '@mui/material'
import "./skeleton.css"
const FriendsSkelton = () => {


    const friendsSkeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
        <>

            {
                friendsSkeletonCount.map((e) => {
                    return (<Stack className='skeletonItem' sx={{ width: "200px", margin: "10px 10px" }} direction={"column"} gap={2.3} >
                        <Box>
                            <Skeleton className='dark_skeleton' variant='rectangular' height={200} width={"100%"} />
                        </Box>
                    </Stack>
                    )
                })
            }


        </>

    )
}







export const DoggosSkeleton = () => {

    return (


        <>

            <Box className='skeletonContainer'>
                <FriendsSkelton />
            </Box>

        </>
    )
}

export default DoggosSkeleton