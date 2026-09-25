// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
// aqui ele esta revalidando o token toda vez que o usuario atualiza a pagina
function validarToken() {

    const token = sessionStorage.TOKEN;

    if (!token) {

        window.location = "../index.html";

        return;
    }

    try {
        // o token é compactado em 3 partes, aqui ele separa elas, verica se o token ja expirou por tempo, 
        // e valida com as informações do resto do session storage
        const descompactado = JSON.parse(atob(token.split(".")[1]));
        const expiracao = descompactado.exp * 1000;
        if (Date.now() >= expiracao) {
            sessionStorage.clear();
            window.location = "../index.html";
            return;
        }
        if (
            Number(sessionStorage.ID_USUARIO) !== descompactado.id ||
            sessionStorage.NOME_USUARIO !== descompactado.username ||
            sessionStorage.EMAIL_USUARIO !== descompactado.email
        ) {
            sessionStorage.clear();
            window.location = "../index.html";
            return;
        }
    } catch (erro) {
        sessionStorage.clear();
        window.location = "../index.html";
    }
}
