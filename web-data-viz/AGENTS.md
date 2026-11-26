# Contexto do Projeto — SENTRY (Monitoramento de Servidores SCADA)

## 1. Visão Geral e Escopo
- **Projeto:** Sentry — sistema web de monitoramento de recursos computacionais de servidores que hospedam sistemas SCADA (foco em infraestrutura de servidores críticos, como ambientes industriais/offshore).
- **Métricas monitoradas:** CPU, memória RAM, armazenamento (disco/ROM) e rede, além de status/disponibilidade do servidor e alertas de sobrecarga/limites.
- **Fora do escopo:** Controle direto de processos industriais (válvulas, bombas, sensores de campo) ou manutenção física automática de hardware.

## 2. Usuários Principais (Personas)
- **Analista de Gestão, Incidentes e Problemas:** Precisa de visão consolidada de múltiplos servidores, histórico de degradação/tendências e investigação de causa raiz/incidentes.
- **Técnico de Automação Industrial:** Precisa de estado em tempo real, alertas rápidos quando limites são ultrapassados e detalhamento por componente de hardware.

## 3. Stack e Estrutura Atual (Frontend / Dados / Infra)
- **Frontend (pasta `public/`):** HTML, CSS (`dashboards.css`, `style.css`, etc.), JavaScript (`navbar.js`, `sessao.js`, etc.), com uso de classes utilitárias/estilização responsiva e gráficos (ex.: Chart.js).
- **Telas existentes em `public/dashboard/`:** `ajuda.html`, `alertas.html`, `analytics.html`, `dashboardRicardo.html`, `equipe.html`, `servidores.html` (além de `index.html`, `login.html`, `cadastro.html`, `simulador.html` na raiz de `public/`).
- **Coleta e Backend:** Coleta de métricas de hardware em Python (`psutil`, `getmac`, `socket`, `datetime`), API/serviços e persistência relacional (MySQL: `empresa`, `usuario`, `servidor`, `tipo_medicao`, `servidor_medicao`, `codigo_ativacao`, `endereco`, `sistema_operacional`).
- **Nuvem / IA:** Documentação base referencia arquitetura em nuvem (EC2/S3/MySQL/R); no ambiente atual de desenvolvimento/testes, utilizo conta de estudante Azure para experimentos/treinamento de modelo de IA e apoio com OpenCode no VS Code.

## 4. Diretrizes para Desenvolvimento de Telas
- Manter coerência visual e semântica com as telas já existentes em `public/dashboard/` e estilos em `public/css/`.
- Priorizar leitura rápida de KPIs, status (normal, atenção/alerta, crítico), filtros (ex.: por servidor ou status) e responsividade.
- Evitar duplicar estilos desnecessários quando já houver classes ou variáveis CSS no projeto; informar claramente quais arquivos HTML/CSS/JS devem ser criados ou alterados.
- Quando houver dados de IA/anomalias ou métricas ainda não conectadas ao backend real, estruturar com clareza para fácil integração posterior com a API/banco.