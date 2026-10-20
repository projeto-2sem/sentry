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
        // o token é compactado em 3 partes, aqui ele separa elas, verifica se o token ja expirou por tempo, 
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


function escreverNavbar(cargo) {
    if (cargo.toLowerCase() == "analista") {
        document.getElementById("nome_usuario").innerText = `
        <div class="sidebar_top_wrapper">
                <div class="sidebar_logo">
                    <img src="../assets/imgs/sentry_logo_grid-removebg-preview.png" alt="">
                    <span class="text-sidebar">SENTRY</span>
                </div>
                <button class="sidebar_close" type="button" onclick="move_aside()" data-hidden="0"
                    id="btn_move_aside"><i class="bi bi-chevron-left" id="move_aside"></i></button>
            </div>
            <div class="sidebar_mid_wrapper">
                <ul class="sidebar_list">
                    <a href="analytics.html">
                        <li class="sidebar_items"><i class="bi bi-columns-gap"></i><span
                                class="text-sidebar">Analytics</span></li>
                    </a>
                    <a href="servidores.html">
                        <li class="sidebar_items"><i class="bi bi-database"></i><span class="text-sidebar">Server</span>
                        </li>
                    </a>
                    <a href="alertas.html">
                        <li class="sidebar_items"><i class="bi bi-exclamation-triangle-fill"></i><span
                                class="text-sidebar">Alertas</span>
                        </li>
                    </a>
                    <a href="">
                        <li class="sidebar_items selected_items"><i class="bi bi-people-fill"></i><span
                                class="text-sidebar">Equipe</span></li>
                    </a>
                    <a href="ajuda.html">
                        <li class="sidebar_items"><i class="bi bi-headset"></i><span class="text-sidebar">Ajuda</span>
                        </li>
                    </a>
                </ul>
            </div>
            <div class="sidebar_bot_wrapper">
                <div class="sidebar_account_wrapper">
                    <div class="sidebar_account_photo">
                        <h3 id="siglas_usuario">GS</h3>
                    </div>
                    <div class="sidebar_account_infos">
                        <p class="text-sidebar" id="nome_usuario">Usuário</p>
                        <p class="text-sidebar" id="cargo_usuario">Analista</p>
                    </div>
                </div>
                <a class="sidebar_bot_leave" href="../index.html">
                    <div class="card_logout">
                        <i class="bi bi-box-arrow-in-right"></i><span class="text-sidebar">Sair</span>
                    </div>
                </a>
            </div>
        `
    }
}