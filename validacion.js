function isEmailDisposable (email) {
    return fetch(`https://open.kickbox.com/v1/disposable/${email}`)
        .then(response => response.json())
        .catch(error => console.log('error', error))
}


function aNombreComun(camp) {
    return document.querySelector(`label[for=${camp}]`).textContent
}


async function validarContacto() {
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

    // Nombre y Apellido
    const ALL_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    nameCamps = ["inputName", "inputSurname"]

    for (camp of nameCamps) {
        var campChars = form[camp].value.split("")
        if (campChars.some(x => ALL_DIGITS.includes(x))) {
            commonName = aNombreComun(camp)
            alert(`El campo '${commonName}' no puede incluir dígitos. Usar números romanos de ser necesario.`)
            form[camp].focus()
            return;
        }
    }

    // Telefono
    var telValue = form.inputTel.value
    if (telValue.length < 6 || telValue.length > 20) {
        commonName = aNombreComun("inputTel")
        alert(`El campo '${commonName}' debe tener entre 6 y 20 caracteres.`)
        form.inputTel.focus()
        return;
    }
    var telChars = telValue.split("")
    if (!telChars.every(x => ALL_DIGITS.includes(x))) {
        commonName = aNombreComun("inputTel")
        alert(`El campo '${commonName}' debe incluir sólo dígitos. No incluir espacios, ni guiones u otros caracteres especiales.`)
        form.inputTel.focus()
        return;
    }

    // Email
    var atSymbolPos = form.inputEmail.value.indexOf("@")
    var dotLastPos = form.inputEmail.value.lastIndexOf(".")
    if (atSymbolPos === -1 || dotLastPos === -1 || dotLastPos < atSymbolPos) {
        commonName = aNombreComun("inputEmail")
        alert(`El valor de '${commonName}' inputado es invalido.`)
        form.inputEmail.focus()
        return;
    }

    alert("Envio de datos realizado con exito! Pronto nos pondremos en contacto con usted.")

    // Muestro la informacion inputada
    var valOut = document.querySelector("#validacionOut p")
    valOut.innerHTML = "Información enviada"
    for (camp of allCamps) {
        valOut.innerHTML += `<br>${aNombreComun(camp)}: ${form[camp].value}`
    }

    var ans = await isEmailDisposable(form.inputEmail.value)
    valOut.innerHTML += ` (desechable=${ans.disposable})`
    
}
