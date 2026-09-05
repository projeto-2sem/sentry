async function verificarEmail() {
    let email = ipt_email.value
    let paragrafo_error = document.getElementById("paragrafo_error")


    if (email.length <= 0) {
        let error = document.getElementById("error_message")
        error.style.display = "block"
        setTimeout(() => {
            paragrafo_error.style.opacity = 1
        }, 4)


        return
    }

    let response = await fetch(`http://localhost:3333/usuarios/verificar-email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await response.json()


    if (json.length <= 0) {
        let error = document.getElementById("error_message")
        error.style.display = "block"
        setTimeout(() => {
            paragrafo_error.style.opacity = 1
        }, 400)

        return
    }

    paragrafo_error.style.opacity = "1"
    paragrafo_error.style.color = "#16A34A"
    paragrafo_error .innerHTML = "Email encontrado"
    sessionStorage.setItem("email", email)


}