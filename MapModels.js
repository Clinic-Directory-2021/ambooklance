var _data = [];
var _bookings = [];
var _flag = false
export const setData = (data) => {
    // this.phone_number = phone_number
    _data.push(data)
}
export const clearBookings = () =>{
    return _bookings = []
}
export const setMapFlag = (flag) =>{
    _flag = flag
}
export const getMapFlag = () =>{
    return _flag
}
export const getData = () =>{
    return _data
}
export const setBookings = (bookings) => {
    // this.phone_number = phone_number
    _bookings .push(bookings)
}
export const getBookings = () =>{
    return _bookings
}