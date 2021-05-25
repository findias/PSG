import { chatid, token } from "./telegram_config.js";

const options = {
    enableHighAccuracy: true,
    // timeout: 5000,
    maximumAge: 0
};
const someError = () => {
    console.error(error)
}

const textAccuracy = document.querySelector('#accuracy')
const textLatitude = document.querySelector('#latitude')
const textLongitude = document.querySelector('#longitude')

//Geoposition metod

const getPosition = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,someError,options);
    } else {
        alert("Версия вашего браузера не позволяет определить ваше местоположение");
    }
}

//Function for geoposition
const showPosition = (position) => {
    const accuracy = Math.trunc(position.coords.accuracy)
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const timePosition = new Date(position.timestamp)
    const positionInfo = `Местоположение ОП: (Широта: ${latitude}, Долгота: ${longitude}, Точность: ${accuracy} Время сбора информации: ${timePosition})`

    $.ajax({
        type: "POST",
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}/parse_mode=HTML&text=${positionInfo}`,
    }, options);
    $.ajax({
        type: "POST",
        url: `https://api.telegram.org/bot${token}/sendLocation?chat_id=${chatid}&latitude=${latitude}&longitude=${longitude}`,
    }, options);
    textAccuracy.textContent = `Точность: ${accuracy} м.`
    textLatitude.textContent = `Широта: ${latitude}`
    textLongitude.textContent = `Долгота: ${longitude}`
}

const intervalPosition = setInterval(() => {
    getPosition()
}, 10000);

setTimeout(() => {clearInterval(intervalPosition)},50000)

//Battery

const getBattery = () => {
    if (navigator.getBattery) {
        navigator.getBattery()
            .then(function(battery){
                // let charging = battery.charging; // Boolean
                // let chargingTime = battery.chargingTime; // Infinity
                // let dischargingTime = battery.dischargingTime; // Infinity
                let level = battery.level * 100 + '%'; // Float (0 to 1)
                const batteryInfo = `Процент заряда батареи ОП: ${level}`
                $.ajax({
                    type: "POST",
                    url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}/parse_mode=HTML&text=${batteryInfo}`,
                });
            });
    } else {
        $.ajax({
            type: "POST",
            url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}/parse_mode=HTML&text=Обработка данных о батареи не поддерживается`,
        });
    }
}

getBattery()

//Button

const button = document.querySelector('#button-hand-position')
button.addEventListener('click', event => {
        getPosition();
        getBattery()
    }
);
