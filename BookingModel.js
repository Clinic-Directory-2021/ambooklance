var _accident_type;
var _emergency_type;
var _involve;

export const setAccidentType = (accident_type) => {
    // this.phone_number = phone_number
    _accident_type = accident_type
}
export const getAccidentType = () =>{
    return _accident_type
}

export const setEmergencyType = (emergency_type) => {
    // this.phone_number = phone_number
    _emergency_type = emergency_type
}
export const getEmergencyType = () =>{
    return _emergency_type
}

export const setInvolvePerson = (involve) => {
    // this.phone_number = phone_number
    _involve = involve
}
export const getInvolvePerson = () =>{
    return _involve
}