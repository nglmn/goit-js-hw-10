import iziToast from "izitoast";
import { iziSnackbarSuccess, iziSnackbarError } from "./iziToastCustom";

const form = document.querySelector('.form'),
    input = document.querySelector('.user-input-number');

let delayTime = null;
input.setAttribute('step', 1000)

input.addEventListener('change', (e) => {
    delayTime = +e.target.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let chosenRadioBtn = form.elements.state.value;

    const request = (delayTime) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                chosenRadioBtn === 'fulfilled' ? resolve(delayTime) : reject(delayTime);
            }, delayTime);
        })
    }

    request(delayTime)
        .then(() => {
            iziSnackbarSuccess.message = `Fulfilled promise in ${delayTime}ms`;
            iziToast.success(iziSnackbarSuccess)
        })
        .catch(() => {
            iziSnackbarError.message = `Rejected promise in ${delayTime} ms`
            iziToast.error(iziSnackbarError)
        })
})
