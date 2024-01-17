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
            iziSnackbarSuccess.message = `Fulfilled promise in ${delayTime}ms`
            iziToast.success(iziSnackbarSuccess)
        })
        .catch(() => {
            iziSnackbarError.message = `Rejected promise in ${delayTime}ms`
            iziToast.error(iziSnackbarError)
        })
})




// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const delayUserTime = form;

//     console.log(delayUserTime);
//     // const request = () => {

//     //     const delayUserTime = form.elements.delay.value;

//     //     return new Promise((resolve, reject) => {
//     //         setTimeout(() => {
//     //             resolve();
//     //         }, delayTimetime)
//     //     })
//     // }

//     // request
//     //     .then(() => { console.log(${ delayTime }); })
// })












// const isSuccess = 5;

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if (isSuccess) {
//             resolve(isSuccess)
//         } else {
//             reject('BAd');
//         }
//     }, 2000)
// })


// promise
//     .then(value => {
//         console.log(value);
//         return value * 2;
//     })
//     .then(value => {
//         console.log(value);
//         return value * 3;
//     })
//     .then(value => {
//         console.log(value);
//         return value * 4;
//     })
//     .then(value => {
//         console.log(value);
//     })
//     .catch(error => { console.log(error) })
//     .finally(() => { console.log('continue compiling..'); })


// console.log('Запрос данних..');

// const request = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данних..');

//         const product = {
//             name: 'LEGO',
//             price: 3400,
//         }

//         resolve(product);
//     }, 2000);
// });

// request
//     .then((product) => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 product.status = 'available';
//                 resolve(product);
//             }, 2000);
//         })
//     })
//     .then((product) => {
//         product.count = '12';
//         return product;
//     })
//     .then((product) => {
//         console.log(product);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//     .finally(() => {
//         console.log('continue');
//     })


// const test = (time) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Hello');
//         }, time);
//     })
// }

// test(2000).then(() => { console.log('2000') });
// test(5000).then(() => { console.log('5000') });