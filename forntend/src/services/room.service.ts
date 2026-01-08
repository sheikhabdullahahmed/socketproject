import {api} from './api'


interface Geolocation {
    type: "Point";
    coordinates: [number, number];
}


interface LocationRequest {
    location: Geolocation;
}





export const Createroom = (data: LocationRequest) => {
    return api.post("/rooms/roomcreat",data)
}


// masla ya ta kay manay backend may routes sahi define nhi karay tay is ki wajay say is ko roomId nhi mil rahe te 
// is ka solution ya ta kay manay routes sahi karay 
// /rooms/join/:ro omId


// roomId sirf string dey ha 
// may phalay poora object bana raah ha ta is tarha nhi ho ta hai

export const Joinroom = (roomId: string) => {
    return api.get(`/rooms/join/${roomId}`)
}
 
