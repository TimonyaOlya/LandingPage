const value = {
    'Landing Page': {
        pm: 50,
        design: 100,
        development: 100,
        qa: 50,
    },
    'Online Store': {
        pm: 120,
        design: 500,
        development: 1000,
        qa: 300,
    },
    'Web Application': {
        pm: 200,
        design: 500,
        development: 1000,
        qa: 300,
    },
    'Mobile Application': {
        pm: 300,
        design: 500,
        development: 2000,
        qa: 300,
    }
};

function getFormValues() {

    const websiteTypeElement = document.querySelector('#project_type_id');
    const pmEl = document.querySelector('#pm');
    const designEl = document.querySelector('#design');
    const developmentEl = document.querySelector('#development');
    const qaEl = document.querySelector('#qa');

    return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design: designEl.checked,
        development: developmentEl.checked,
        qa: qaEl.checked,
    }

}

function calculate() {
    const values = getFormValues();
    let totalPrice = 0;

    const workTypes = value[values.websiteType];
    if (values.pm) {
        totalPrice = workTypes.pm;
    }
    if (values.design) {
        totalPrice = totalPrice + workTypes.design;
    }

    if (values.development) {
        totalPrice = totalPrice + workTypes.development;
    }

    if (values.qa) {
        totalPrice = totalPrice + workTypes.qa;
    }

    const totalPriceEl = document.querySelector('#totalPrice');

    totalPriceEl.textContent = totalPrice;

    console.log(totalPrice);

}
const formEl = document.querySelector('#calculationForm');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#modal-success');
const inputContainer = document.querySelector('#user-email');
const textError = document.querySelector('#text-email-error');
const userEmailInput = document.querySelector('#user-email');

calculate();

formEl.addEventListener('change', calculate);

formEl.addEventListener('submit', function(event) {
    event.preventDefault()
    emailModal.classList.add('modal-active');
});

const closeButtons = document.querySelectorAll('.modal-close-icon');

closeButtons.forEach(function(closeButton) {
    closeButton.addEventListener('click', function() {
        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active');
        inputContainer.classList.remove('user-email-error');
        textError.classList.remove('text-email-error');

    });
});
const modalContainerEmail = document.querySelector('#modal-container-email');

modalContainerEmail.addEventListener('submit', function(event) {
    event.preventDefault();
    if (userEmailInput.value) {
        emailModal.classList.remove('modal-active');

        const formData = new FormData(formEl);
        formData.append('Email', userEmailInput.value);
        fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(function() {

                emailModal.classList.remove('modal-active');
                successModal.classList.add('modal-active');

            })
            .catch((error) => alert('не удалось отправить форму'));
    }
});
