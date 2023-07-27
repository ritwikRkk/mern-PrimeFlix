const formValidator = {
    "name": (nameVal) => {
        let regex = /^[a-zA-Z]([0-9a-zA-Z]){2,10}$/;
        let str = nameVal;
        if (regex.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    "userName": (userNameVal) => {
        let regex = /^[a-zA-Z]([A-Za-z\d@$!%*?&]){7,10}$/;
        let str = userNameVal;
        if (regex.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    "loginid": (loginidVal) => {
        if (loginidVal.length >= 8) {
            return true;
        }
        else {
            return false;
        }
    },
    "password": (passwordVal) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        let str = passwordVal;
        if (regex.test(str)) {
            // console.log(regex.exec(str))
            return true;
        }
        else {
            return false;
        }
    },
    "oldpassword": (oldPasswordVal) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        let str = oldPasswordVal;
        if (regex.test(str)) {
            // console.log(regex.exec(str))
            return true;
        }
        else {
            return false;
        }
    },
    "cpassword": (passwordVal, cpasswordVal, validPass) => {
        if ((passwordVal === cpasswordVal) && (cpasswordVal.length > 0) && (validPass === "true")) {
            return true;
        }
        else {
            return false;
        }
    },

    "phone": (phoneVal) => {
        let regex = /^([0-9]){10}$/;
        let str = phoneVal;
        if (regex.test(str)) {
            return true;
        }
        else {
            return false;
        }
        // // console.log("phone " + phoneVal);
        // return "phone " + phoneVal;
    },

    "email": (emailVal) => {
        // eslint-disable-next-line
        let regex = /^([_\-\.a-zA-Z]+)([0-9]+)?@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
        let str = emailVal;
        if (regex.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },

    "message": (messageVal) => {
        // let regex = /^[a-zA-Z]{1}(\s)?(\W+)?(\w+)?/;
        let str = messageVal;
        if (str.length > 4) {
            return true;
        }
        else {
            return false;
        }
    },
}

export default formValidator;

// let submit = document.getElementById('submit');



// submit.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log('You clicked on submit button');
//     if (validName && validEmail && validPhone) {
//         console.log('Name, Email, and Phone is valid. Now submitting the form.');
//         let success = document.getElementById('success');
//         success.classList.add('show');
//         // failure.classList.remove('show');
//         // $('#failure').alert('close');
//         // $('#failure').hide();
//         // $('#success').show();

//     }
//     else {
//         // alert('One or more out of Name, Email, and Phone is not valid. Enter valid details.')
//         let failure = document.getElementById('failure');
//         failure.classList.add('show');
//         // success.classList.remove('show');
//         // $('#success').alert('close');
//         // $('#success').hide();
//         // $('#failure').show();

//     }

// })