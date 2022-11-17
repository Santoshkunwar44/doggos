import axiosRef from "../axios/Axios"
export const DoggosBreedListApi = () => axiosRef.get("/breeds/list/all");
export const DoggosRandomImageApi = (limit) => axiosRef.get(`/breeds/image/random/${limit}`)
export const DoogosByBreedApi = (breed) => axiosRef.get(`/breed/${breed}/images`)
export const DoggosSubBreedApi = (breed) => axiosRef.get(`/breed/${breed}/list`)

export const DoggosBreedRandomApi = (breed) => axiosRef.get(`/breed/${breed}/images/random`)
