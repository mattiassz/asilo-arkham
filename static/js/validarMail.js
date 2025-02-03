function validarEmail() {
    var emailInput = document.getElementById("contactoLaburante");
    var emailValue = emailInput.value;

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!regex.test(emailValue) && emailValue.length > 0) {
        emailInput.setCustomValidity("Por favor, ingrese un correo electrónico válido");
    } else {
        emailInput.setCustomValidity("");
    }
}
