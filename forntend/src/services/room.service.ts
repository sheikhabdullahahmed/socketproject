import {api} from './api'

interface Location {
    lng: number,
    lat: number,
    type:"Point",
    coordinates: [number, number]
}

interface LocationRequest {
    lng: string,
    lat: string,
     location: Location;    
   
}


export const Createroom = (data: LocationRequest) => {
    return api.post("/rooms/roomcreat",data)
}


