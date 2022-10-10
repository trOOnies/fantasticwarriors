function aNombreComun(camp) {
    return document.querySelector(`label[for=${camp}]`).textContent
}


function validarContacto() {
    var form = document.getElementById("contactForm")

    allCamps = ["inputName", "inputSurname", "inputTel", "inputEmail"]

    // Todos los campos deben estar llenos
    for (camp of allCamps) {
        if (form[camp].value.length == 0) {
            commonName = aNombreComun(camp)
            alert(`Campo vacío: ${commonName}`)
            form[camp].focus()  // Foco sobre el campo a completar
            return;
        }
    }

    const ALL_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var telChars = form.inputTel.value.split("")
    if (!telChars.every(x => ALL_DIGITS.includes(x))) {
        commonName = aNombreComun("inputTel")
        alert(`El campo '${commonName}' debe incluir sólo dígitos. No incluir espacios, ni guiones u otros caracteres especiales.`)
        form.inputTel.focus()  // Foco sobre el campo a completar
        return;
    }

    alert("Formulario validado con exito!")
}
