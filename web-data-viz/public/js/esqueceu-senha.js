async function verificarEmail() {
    let email = ipt_email.value
    let paragrafo_error = document.getElementById("paragrafo_error")
    let error = document.getElementById("error_message")

    if (email.length <= 0) {
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
        error.style.display = "block"
        setTimeout(() => {
            paragrafo_error.style.opacity = 1
        }, 400)

        return
    }
    error.style.display = "block"
    setTimeout(() => {
        paragrafo_error.style.opacity = "1"
        paragrafo_error.style.color = "#16A34A"
        paragrafo_error.innerHTML = "Email encontrado"
    }, 100)

    console.log(json)
    sessionStorage.setItem("email", json[0].email)
    sessionStorage.setItem("idUsuario", json[0].idUsuario)
    let container_input = document.getElementById("container_input")
    setTimeout(() => {
        container_input.innerHTML = `
        <div class="content-code">
            <input type="text" maxlength="1" oninput="verificarNumero(this); verificarCodigo(this, 0)">
            <input type="text" maxlength="1" oninput="verificarNumero(this); verificarCodigo(this, 1)">
            <input type="text" maxlength="1" oninput="verificarNumero(this); verificarCodigo(this, 2)">
            <input type="text" maxlength="1" oninput="verificarNumero(this); verificarCodigo(this, 3)">
            <input type="text" maxlength="1" oninput="verificarNumero(this); verificarCodigo(this, 4)">
            <input type="text" maxlength="1" oninput="verificarNumero(this); verificarCodigo(this, 5)">
        </div>
        <div class="send-code">
            <p class="paragrafo_send">Não recebeu o código ?</p>
            <button class="btn-resend" onclick="gerarCodigo()">Reenviar código</button>
        </div>
        <div class="error_message" id="error_message">
            <p class="paragrafo_error" id="paragrafo_error">Código invalido</p>
        </div>
        <div class="content-back">
            <a href="./login.html"><i class="bi bi-chevron-left" id="move_aside"></i>
            <span>Voltar para o login</span>
            </a>
        </div>
        `
        text_title.innerHTML = `Digite o código enviado para o email ${sessionStorage.getItem("email")}`

        error.style.display = "none"
        paragrafo_error.style.opacity = 0
        paragrafo_error.style.color = "#DC2626"
    }, 3000)



    await gerarCodigo()
}

function verificarNumero(elemento) {
    // Removendo qualquer coisa que não seja um numero, to verificar todos os caracteres e se não for numero troco por nada
    elemento.value = elemento.value.replace(/\D/g, "");
}

async function gerarCodigo() {
    let response = await fetch(`http://localhost:3333/email/enviar-email/${sessionStorage.getItem("email")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await response.json()

    if (json.length <= 0) {
        return
    }

    sessionStorage.setItem("codigo", json)
}

function verificarCodigo() {
    let inputs = document.querySelectorAll(".content-code input")
    let codigo_digitado = ""

    inputs.forEach(input => {
        codigo_digitado += input.value
    })

    if (codigo_digitado.length < 6) {
        return
    }

    let paragrafo_error = document.getElementById("paragrafo_error")
    let error = document.getElementById("error_message")

    if (codigo_digitado != sessionStorage.getItem("codigo")) {
        error.style.display = "block"
        setTimeout(() => {
            paragrafo_error.style.opacity = 1
        }, 400)
        return
    }

    error.style.display = "block"
    setTimeout(() => {
        paragrafo_error.style.opacity = "1"
        paragrafo_error.style.color = "#16A34A"
        paragrafo_error.innerHTML = "Código válido"
    }, 400)

    let container_input = document.getElementById("container_input")
    text_title.innerHTML = `Digite uma nova senha`

    setTimeout(() => {
        container_input.innerHTML = `
    <div class="container-pass">
        <div class="content-input">
            <p>Nova senha</p>
                <div class="wrapper-input">
                    <i class="bi bi-envelope-fill"></i>
                    <input type="text" placeholder="Digite sua senha" id="ipt_senha">
                </div>
        </div>
        <div class="content-input">
            <p>Confirmar nova senha</p>
            <div class="wrapper-input">
                <i class="bi bi-envelope-fill"></i>
                <input type="text" placeholder="Confirme sua senha" id="ipt_confirmar">
            </div>
        </div>
    </div>
    <div class="error_message" id="error_message">
        <p class="paragrafo_error" id="paragrafo_error">Senha inválida</p>
    </div>
    <div class="content-btn">
        <button onclick="redefinirSenha()">Redefinir senha</button>
    </div>
    <div class="content-back">
        <a href="./login.html"><i class="bi bi-chevron-left" id="move_aside"></i>
        <span>Voltar para o login</span>
        </a>
    </div>
    `

        error.style.display = "none"
        paragrafo_error.style.opacity = 0
        paragrafo_error.style.color = "#DC2626"
    }, 3000)
}

async function validarSenha(senha, senha_confirmar) {
    if (senha == "" || senha_confirmar == "") {
        paragrafo_error.innerHTML = "Preencha todos os campos"
        return false
    }
    if (senha.length < 8) {
        paragrafo_error.innerHTML =
            "A senha devem ter pelo menos 8 caracteres"
        return false
    }

    if (senha != senha_confirmar) {
        paragrafo_error.innerHTML =
            "Senha e confirmação de senha devem ser iguais";
        return false;
    }
    return true
}

async function redefinirSenha() {
    let senha = ipt_senha.value
    let senha_confirmar = ipt_confirmar.value
    let validar = await validarSenha(senha, senha_confirmar)
    let paragrafo_error = document.getElementById("paragrafo_error")
    let error = document.getElementById("error_message")

    if (!validar) {
        error.style.display = "block"
        setTimeout(() => {
            paragrafo_error.style.opacity = 1
        }, 400)
        return
    }

    let id = sessionStorage.getItem("idUsuario")
    console.log(id)

    let response = await fetch("http://localhost:3333/usuarios/trocar-senha", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "idServer": id,
            "senhaServer": senha
        })
    })

    let json = await response.json()

    if (json.length <= 0) {
        error.style.display = "block"
        setTimeout(() => {
            paragrafo_error.style.opacity = 1
        }, 400)
        return
    }

    error.style.display = "block"
    setTimeout(() => {
        paragrafo_error.style.opacity = "1"
        paragrafo_error.style.color = "#16A34A"
        paragrafo_error.innerHTML = "Senha cadastrada com sucesso, redirecionando para login"
    }, 10)

    setTimeout(() => {
        window.location = "./login.html";
    }, 3000)
}