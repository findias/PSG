const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
const someError = () => {
    console.error(error)
}

const getPosition = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,someError,options);
    } else {
        alert("Версия вашего браузера не позволяет определить ваше местоположение");
    }
}

const showPosition = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const timePosition = new Date(position.timestamp)
    console.log('Широта: '+ latitude + ', Долгота: ' + longitude + ', Время сбора информации: ' + timePosition)
    return latitude
}
console.log(getPosition())


