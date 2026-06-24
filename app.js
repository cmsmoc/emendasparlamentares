/**
 * CONFIGURAÇÃO DO BACKEND:
 * Cole a URL do seu Google Apps Script (Web App) publicado abaixo.
 * Se mantiver o valor padrão, o aplicativo funcionará no "Modo de Demonstração"
 * utilizando dados salvos localmente no navegador (localStorage).
 */
const API_URL = "https://script.google.com/macros/s/AKfycbzqIIfNdI44alspqZzh_LKuX8YoZ8pgtdd98bw5AgqLrxgV_GMrwZwg9w-4Nt7ohEpkcA/exec";

// Banco de dados de chaves de demonstração com os 64 conselheiros REAIS do CMS 2026-2029
const MOCK_KEYS = {
  "REGULACAO-CMSMOC-2026": { usuario: "SETOR DE REGULAÇÃO DA SECRETARIA MUNICIPAL DE SAÚDE (Regulação CMSMOC)", perfil: "Administrador" },
  "WEBMASTER-ADMIN-CMS": { usuario: "Webmaster Técnico CMS", perfil: "Webmaster" },
  
  // Conselheiros com suas chaves padrão (Primeiro Nome em maiúsculo, sem acentos, com cadeira em caso de duplicidade)
  "JOEL": { usuario: "Joel Francisco Borges (CLS Jardim Primavera)", perfil: "Conselheiro" },
  "AMANDA": { usuario: "Amanda Mendes Soares (CLS Independência)", perfil: "Conselheiro" },
  "EMANUELA": { usuario: "Emanuela Tomas da Silva Conceição (CLS Renascença)", perfil: "Conselheiro" },
  "SERGIO": { usuario: "Sérgio Peres (CLS Planalto)", perfil: "Conselheiro" },
  "DANIELLE": { usuario: "Danielle Santos Sousa (CLS Vila Atlântica)", perfil: "Conselheiro" },
  "LARYSSA": { usuario: "Laryssa Félix (CLS Delfino Magalhães)", perfil: "Conselheiro" },
  "LUCIANA": { usuario: "Luciana de Jesus Santos Cardoso (Assembleia de Deus Madureira)", perfil: "Conselheiro" },
  "JULIO8": { usuario: "Júlio César Pereira (Assembleia de Deus Madureira)", perfil: "Conselheiro" },
  "ROBERTA": { usuario: "Roberta Cunha Mota Santos (Fundação Sara Albuquerque)", perfil: "Conselheiro" },
  "ELIZETE": { usuario: "Elizete Santos Barbosa (Fundação Sara Albuquerque)", perfil: "Conselheiro" },
  "MARIA11": { usuario: "Maria dos Reis Ribeiro Dias (Arquidiocese de Montes Claros (Pastoral da Saúde))", perfil: "Conselheiro" },
  "GILSON": { usuario: "Gilson Mendes de Almeida (Arquidiocese de Montes Claros (Pastoral da Saúde))", perfil: "Conselheiro" },
  "MARILDA": { usuario: "Marilda Batista da Silva (Associação Consciência Ativa)", perfil: "Conselheiro" },
  "FABIANA": { usuario: "Fabiana Pereira Mori (Associação Consciência Ativa)", perfil: "Conselheiro" },
  "FARLEY": { usuario: "Farley Sindeaux Ribeiro (ANDA (Associação Norte Mineira de Apoio ao Autista))", perfil: "Conselheiro" },
  "JAMILSON": { usuario: "Jamilson Gandra Moreira (ANDA (Associação Norte Mineira de Apoio ao Autista))", perfil: "Conselheiro" },
  "FERNANDO": { usuario: "Fernando Antônio Dias de Andrade (ADEMOC)", perfil: "Conselheiro" },
  "HELDER": { usuario: "Helder Lopes Souza (ADEMOC)", perfil: "Conselheiro" },
  "NAIARA": { usuario: "Naiara Oliveira Silva (Sindicato dos Trabalhadores Rurais (CUT))", perfil: "Conselheiro" },
  "LUIZ": { usuario: "Luiz Antônio Mendes (Sindicato dos Trabalhadores Rurais (CUT))", perfil: "Conselheiro" },
  "ANIELLY": { usuario: "Anielly Costa Silva (Lar Betânia)", perfil: "Conselheiro" },
  "JAQUELINE": { usuario: "Jaqueline da Conceição Camelo (Lar das Velhinhas)", perfil: "Conselheiro" },
  "PAULO": { usuario: "Paulo Thiago Carvalho Soares Ribeiro (Associação Arco-Íris do Amor)", perfil: "Conselheiro" },
  "JOSE": { usuario: "José Cândido de Souza Filho (MGG (Movimento LBGTQIAPN+ dos Gerais))", perfil: "Conselheiro" },
  "RAFAEL": { usuario: "Rafael Carvalho Maciel (Rotary Clube)", perfil: "Conselheiro" },
  "JULIANA": { usuario: "Juliana Aparecida de Oliveira (Rotary Clube)", perfil: "Conselheiro" },
  "ISABEL": { usuario: "Isabel Macedo Avelar (UPM (União Popular da Mulher de Montes Claros))", perfil: "Conselheiro" },
  "MARISA": { usuario: "Marisa Cantidio Oliveira (UPM (União Popular da Mulher de Montes Claros))", perfil: "Conselheiro" },
  "CLAUDIA": { usuario: "Cláudia Rocha Biscotto (Clínica Rosa Mística)", perfil: "Conselheiro" },
  "PATRICIA": { usuario: "Patrícia Soares Gomes (Clínica Rosa Mística)", perfil: "Conselheiro" },
  "CINDY": { usuario: "Cindy Almeyda Reis (Associação Presente)", perfil: "Conselheiro" },
  "SANDRA": { usuario: "Sandra Simony Mendes Gonçalves Carnielle (Associação Presente)", perfil: "Conselheiro" },
  "SHEILLA": { usuario: "Sheilla Silva Mendes (ABO (Associação Brasileira de Odontologia))", perfil: "Conselheiro" },
  "MARIANA": { usuario: "Mariana Cristina Meira Cambuí (ABO (Associação Brasileira de Odontologia))", perfil: "Conselheiro" },
  "ERNANDES": { usuario: "Ernandes Rodrigues Moraes (COREN-MG (Nível Médio))", perfil: "Conselheiro" },
  "JULIO36": { usuario: "Júlio César Araújo Lopes (COREN-MG (Nível Médio))", perfil: "Conselheiro" },
  "FERNANDA": { usuario: "Fernanda Fagundes Azevedo (COREN-MG (Nível Superior))", perfil: "Conselheiro" },
  "RICARDO": { usuario: "Ricardo Soares de Oliveira (COREN-MG (Nível Superior))", perfil: "Conselheiro" },
  "CLAUDIO": { usuario: "Cláudio Luís de Souza Santos (SEEMG)", perfil: "Conselheiro" },
  "MONICA": { usuario: "Mônica de Fátima Fernandes Ferreira (SEEMG)", perfil: "Conselheiro" },
  "WASHINGTON": { usuario: "Washington Luis Carvalho Souto (SIEESS-MG)", perfil: "Conselheiro" },
  "JUCIELIO": { usuario: "Jucielio Bernardes da Silva (SIEESS-MG)", perfil: "Conselheiro" },
  "EDINE": { usuario: "Ediné Silva Soares (SINDE-SAÚDE-MG)", perfil: "Conselheiro" },
  "IMACULADA": { usuario: "Imaculada Conceição Barbosa (SINDE-SAÚDE-MG)", perfil: "Conselheiro" },
  "EDMILSON": { usuario: "Edmilson Alves da Silva (SINDSEP-MG)", perfil: "Conselheiro" },
  "EDVALDO": { usuario: "Edvaldo de Freitas Francisco (SINDSEP-MG)", perfil: "Conselheiro" },
  "ROBERTO": { usuario: "Roberto Coelho Ferreira (SINDTRRAUX)", perfil: "Conselheiro" },
  "AVILMAR": { usuario: "Avilmar Augusto Pereira (SINDTRRAUX)", perfil: "Conselheiro" },
  "IURI": { usuario: "Iuri Simões Mota (Hospital Universitário Clemente Faria)", perfil: "Conselheiro" },
  "SUELEN": { usuario: "Suelen dos Santos Ferreira (Hospital Universitário Clemente Faria)", perfil: "Conselheiro" },
  "NUBIA": { usuario: "Núbia Carneiro Guimarães (GRAPPA)", perfil: "Conselheiro" },
  "KELLY": { usuario: "Kelly Mendes Fagundes (Fundação Capelo Gaivota)", perfil: "Conselheiro" },
  "NAYRA": { usuario: "Nayra Cristine Lacerda Lourens (Santa Casa de Montes Claros)", perfil: "Conselheiro" },
  "CRISTIANO": { usuario: "Cristiano Júnior (Hospital das Clínicas Dr. Mário Ribeiro)", perfil: "Conselheiro" },
  "HERICK": { usuario: "Herick Rodrigues Araújo (Hospital Dilson Godinho)", perfil: "Conselheiro" },
  "EMILLE": { usuario: "Emille Eunice Antunes Dias Matos (APAE / Fundação Vovó Clarice)", perfil: "Conselheiro" },
  "EDUARDO": { usuario: "Eduardo Luiz da Silva (Secretaria Municipal de Saúde)", perfil: "Conselheiro" },
  "JOAO": { usuario: "João Alves Pereira (Secretaria Municipal de Saúde)", perfil: "Conselheiro" },
  "MARIA59": { usuario: "Maria Clara Lelis Ramos Cardoso (Secretaria Municipal de Saúde)", perfil: "Conselheiro" },
  "RAIMARA": { usuario: "Raimara Gonçalves Pereira (Secretaria Municipal de Saúde)", perfil: "Conselheiro" },
  "MARCIO": { usuario: "Márcio Cardoso Silva (Secretaria Municipal de Saúde)", perfil: "Conselheiro" },
  "MARCOS": { usuario: "Marcos Dangelis Aguiar (Secretaria Municipal de Saúde)", perfil: "Conselheiro" },
  "THALLYTA": { usuario: "Thallyta de Sousa Lima (GRS (Gerência Regional de Saúde))", perfil: "Conselheiro" },
  "VALDEMAR": { usuario: "Valdemar Rodrigues dos Anjos (GRS (Gerência Regional de Saúde))", perfil: "Conselheiro" }
};

// Banco de dados simulado inicial para demonstração (Emendas)
const MOCK_DATA = [
  {
    "Data de Envio": "2026-06-15T09:58:00.000Z",
    "Entidade": "Hospital Universitário Clemente de Faria",
    "Número da Emenda": "197161",
    "Tipo": "Estadual",
    "Parlamentar / Autor": "Leninha",
    "Resolução/Documento": "RESOLUÇÃO SES Nº 11.050",
    "Valor": 299000.00,
    "Objeto/Finalidade": "Equipamento / Estruturação do hospital universitário.",
    "Link do PDF": "https://drive.google.com/file/d/1emsoFd9GAvQ7RnIqWTNgYKWp2J_nhH0G/view?usp=drive_link",
    "Status": "Recebido"
  },
  {
    "Data de Envio": "2026-06-15T15:21:00.000Z",
    "Entidade": "Hospital Santa Casa de Montes Claros",
    "Número da Emenda": "36000808701202600",
    "Tipo": "Federal",
    "Parlamentar / Autor": "Farley Sindeaux Ribeiro",
    "Resolução/Documento": "Portaria MS nº 36000808701",
    "Valor": 200000.00,
    "Objeto/Finalidade": "INCREMENTO DA MÉDIA E ALTA COMPLEXIDADE (MAC) hospitalar.",
    "Link do PDF": "https://drive.google.com/file/d/1WSvf4jSAn5PbzxpvtDTWC5MbTfbwHKdJ/view?usp=drive_link",
    "Status": "Aprovado"
  },
  {
    "Data de Envio": "2026-06-15T09:59:00.000Z",
    "Entidade": "Hospital Aroldo Tourinho",
    "Número da Emenda": "195387",
    "Tipo": "Estadual",
    "Parlamentar / Autor": "Leninha",
    "Resolução/Documento": "RESOLUÇÃO SES Nº 11.050, DE 24 DE ABRIL DE 2026",
    "Valor": 299000.00,
    "Objeto/Finalidade": "Equipamento / Estruturação tecnológica.",
    "Link do PDF": "https://drive.google.com/file/d/1VMoE4TTFLgpOKtQhAiom51EI9IVW5C9K/view?usp=drive_link",
    "Status": "Em Análise"
  }
];

// Banco de dados simulado inicial para demonstração (Dúvidas)
const MOCK_DATA_DUVIDAS = [
  {
    "ID": "D-1",
    "Data": "2026-06-18T14:30:00.000Z",
    "Chave": "CMS-JOEL-01",
    "Nome": "Joel Francisco Borges",
    "Dúvida": "Gostaria de saber qual o prazo limite para a homologação das emendas da Santa Casa de Montes Claros para o plano de trabalho de oncologia.",
    "Resposta": "O prazo limite regulamentar é de até 15 dias úteis após a submissão formal no portal.",
    "Status": "Esclarecida",
    "Responsável": "SETOR DE REGULAÇÃO DA SECRETARIA MUNICIPAL DE SAÚDE (Regulação CMSMOC)",
    "Data_Resposta": "2026-06-19T10:00:00.000Z",
    "AutorExibicao": "Joel Francisco Borges"
  },
  {
    "ID": "D-2",
    "Data": "2026-06-19T16:00:00.000Z",
    "Chave": "CMS-AMANDA-02",
    "Nome": "Amanda Mendes Soares",
    "Dúvida": "O Hospital Clemente de Faria já enviou os documentos complementares da resolução 11.050?",
    "Resposta": "",
    "Status": "Pendente",
    "Responsável": "",
    "Data_Resposta": "",
    "AutorExibicao": "Amanda Mendes Soares"
  }
];

// Estado global da aplicação
let emendasData = [];
let currentFilteredData = [];
let duvidasData = [];
let currentUser = null; // { chave, usuario, perfil }
let tempUser = null; // Guardar dados durante forçar senha
let clientInfo = { ip: "Desconhecido", loc: "Desconhecido", ua: navigator.userAgent };
let uploadedFileBase64 = "";
let uploadedFileType = "";
let uploadedFileName = "";

// Elementos DOM Autenticação
const loginOverlay = document.getElementById("login-overlay");
const loginForm = document.getElementById("login-form");
const loginKeyInput = document.getElementById("login-key");
const loginErrorMsg = document.getElementById("login-error-msg");
const btnLogin = document.getElementById("btn-login");
const userDisplayName = document.getElementById("user-display-name");
const btnLogout = document.getElementById("btn-logout");

// Elementos DOM Primeiro Acesso
const forcePasswordOverlay = document.getElementById("force-password-overlay");
const forcePasswordForm = document.getElementById("force-password-form");
const forceNewPasswordInput = document.getElementById("force-new-password");
const forceConfirmPasswordInput = document.getElementById("force-confirm-password");
const forcePasswordErrorMsg = document.getElementById("force-password-error-msg");
const btnForceSubmit = document.getElementById("btn-force-submit");

// Elementos DOM Modal Alterar Senha Geral
const changePasswordModal = document.getElementById("change-password-modal");
const generalChangePwdForm = document.getElementById("general-change-pwd-form");
const generalNewPasswordInput = document.getElementById("general-new-password");
const generalConfirmPasswordInput = document.getElementById("general-confirm-password");
const generalPwdErrorMsg = document.getElementById("general-pwd-error-msg");
const btnOpenChangePassword = document.getElementById("btn-open-change-password");
const btnCancelPwdModal = document.getElementById("btn-cancel-pwd-modal");
const btnClosePwdModal = document.getElementById("btn-close-pwd-modal");

// Elementos DOM Navegação & Geral
const tabs = document.querySelectorAll(".nav-tab-link");
const tabContents = document.querySelectorAll(".tab-content");
const proposalForm = document.getElementById("proposal-form");
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("arquivoPdf");
const filePreview = document.getElementById("file-preview");
const previewFilename = document.getElementById("preview-filename");
const previewFilesize = document.getElementById("preview-filesize");
const removeFileBtn = document.getElementById("remove-file");
const btnSubmit = document.getElementById("btn-submit");
const statusAlert = document.getElementById("status-alert");

// Elementos DOM Modal Edição
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editOriginalNumero = document.getElementById("edit-original-numero");
const editEntidade = document.getElementById("edit-entidade");
const editNumeroEmenda = document.getElementById("edit-numeroEmenda");
const editParlamentar = document.getElementById("edit-parlamentar");
const editResolucao = document.getElementById("edit-resolucao");
const editValor = document.getElementById("edit-valor");
const editObjeto = document.getElementById("edit-objeto");
const btnCloseEditModal = document.getElementById("btn-close-edit-modal");
const btnCancelEdit = document.getElementById("btn-cancel-edit");

// Elementos Dashboard
const tableBody = document.getElementById("table-body");
const tableLoading = document.getElementById("table-loading");
const noDataMsg = document.getElementById("no-data-msg");
const searchInput = document.getElementById("search-input");
const filterEntidade = document.getElementById("filter-entidade");
const filterStatus = document.getElementById("filter-status");
const btnRefresh = document.getElementById("btn-refresh");
const btnExportCsv = document.getElementById("btn-export-csv");
const btnSyncDatabase = document.getElementById("btn-sync-database");

// Elementos Estatísticas Dashboard & Hero
const statTotalCount = document.getElementById("stat-total-count");
const statTotalValue = document.getElementById("stat-total-value");
const statPendingCount = document.getElementById("stat-pending-count");
const statApprovedCount = document.getElementById("stat-approved-count");
const heroTotalValue = document.getElementById("hero-total-value");
const heroTotalCount = document.getElementById("hero-total-count");

// Elementos Dúvidas Plenárias
const duvidasList = document.getElementById("duvidas-list");
const duvidasLoading = document.getElementById("duvidas-loading");
const noDuvidasMsg = document.getElementById("no-duvidas-msg");
const btnNovaDuvida = document.getElementById("btn-nova-duvida");

const newDoubtModal = document.getElementById("new-doubt-modal");
const newDoubtForm = document.getElementById("new-doubt-form");
const doubtTextInput = document.getElementById("doubt-text");
const btnCancelDoubt = document.getElementById("btn-cancel-doubt");
const btnCloseDoubtModal = document.getElementById("btn-close-doubt-modal");

const answerDoubtModal = document.getElementById("answer-doubt-modal");
const answerDoubtForm = document.getElementById("answer-doubt-form");
const answerDoubtIdInput = document.getElementById("answer-doubt-id");
const answerDoubtPreview = document.getElementById("answer-doubt-preview");
const answerTextInput = document.getElementById("answer-text");
const answerStatusSelect = document.getElementById("answer-status");
const btnCancelAnswer = document.getElementById("btn-cancel-answer");
const btnCloseAnswerModal = document.getElementById("btn-close-answer-modal");

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", async () => {
  fetchClientInfo().then(info => { clientInfo = info; });
  checkSession();
  initTabs();
  initDragAndDrop();
  initFormValidation();
  initEditModal();
  initPasswordModals();
  initDoubtModals();
  initColumnToggle();
  
  loginForm.addEventListener("submit", handleLoginSubmit);
  btnLogout.addEventListener("click", handleLogout);
  
  // Toggle de visualização da chave de acesso (senha)
  const toggleLoginKeyBtn = document.getElementById("toggle-login-key");
  const toggleLoginKeyIcon = document.getElementById("toggle-login-key-icon");
  if (toggleLoginKeyBtn && toggleLoginKeyIcon) {
    toggleLoginKeyBtn.addEventListener("click", () => {
      if (loginKeyInput.type === "password") {
        loginKeyInput.type = "text";
        toggleLoginKeyIcon.classList.remove("fa-eye");
        toggleLoginKeyIcon.classList.add("fa-eye-slash");
      } else {
        loginKeyInput.type = "password";
        toggleLoginKeyIcon.classList.add("fa-eye");
        toggleLoginKeyIcon.classList.remove("fa-eye-slash");
      }
    });
  }
  
  searchInput.addEventListener("input", filterData);
  filterEntidade.addEventListener("change", filterData);
  filterStatus.addEventListener("change", filterData);
  btnRefresh.addEventListener("click", () => loadDashboardData(true));
  if (btnExportCsv) {
    btnExportCsv.addEventListener("click", exportFilteredDataToCSV);
  }
  
  if (btnSyncDatabase) {
    btnSyncDatabase.addEventListener("click", triggerDatabaseSync);
  }
  
  document.querySelectorAll(".alert-close").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.currentTarget.parentElement.classList.add("hidden");
    });
  });
  
  // PWA offline support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log("Service Worker ativo."))
      .catch(err => console.warn("Service Worker falhou:", err));
  }
  
  // Task 11: Bindings do modal Decreto 5197
  const btnOpenDecree = document.getElementById('btn-open-decree-modal');
  const btnCloseDecree = document.getElementById('btn-close-decree-modal');
  if (btnOpenDecree) btnOpenDecree.addEventListener('click', () => document.getElementById('decree-modal').classList.remove('hidden'));
  if (btnCloseDecree) btnCloseDecree.addEventListener('click', () => document.getElementById('decree-modal').classList.add('hidden'));
  
  // Task 7: Bindings do modal de Notificações
  const btnCloseNotif = document.getElementById('btn-close-notification-modal');
  const btnGoToDoubts = document.getElementById('btn-go-to-doubts');
  if (btnCloseNotif) btnCloseNotif.addEventListener('click', () => document.getElementById('notification-modal').classList.add('hidden'));
  if (btnGoToDoubts) btnGoToDoubts.addEventListener('click', () => {
    document.getElementById('notification-modal').classList.add('hidden');
    document.querySelectorAll('.nav-tab-link').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const btnDuvidas = document.getElementById('btn-tab-duvidas');
    const tabDuvidas = document.getElementById('tab-duvidas');
    if (btnDuvidas) btnDuvidas.classList.add('active');
    if (tabDuvidas) tabDuvidas.classList.add('active');
    renderDoubtBoard();
  });
});

// CAPTURA DE INFORMAÇÕES DE REDE
async function fetchClientInfo() {
  const info = { ip: "Desconhecido", loc: "Desconhecido", ua: navigator.userAgent };
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (response.ok) {
      const data = await response.json();
      info.ip = data.ip || "Desconhecido";
      info.loc = `${data.city || "Desconhecido"}, ${data.region || "Desconhecido"}, ${data.country_name || "Desconhecido"}`;
    }
  } catch (e) {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      if (response.ok) {
        const data = await response.json();
        info.ip = data.ip || "Desconhecido";
        info.loc = "Desconhecido (Bloqueado)";
      }
    } catch (err) {
      console.warn("Sem serviço de IP.");
    }
  }
  return info;
}

// SESSÃO DE USUÁRIO
function checkSession() {
  const session = localStorage.getItem("cms_user_session");
  if (session) {
    currentUser = JSON.parse(session);
    applyUserPermissions();
    loginOverlay.classList.add("hidden");
    loadDashboardData();
  } else {
    loginOverlay.classList.remove("hidden");
  }
}

function applyUserPermissions() {
  if (!currentUser) return;
  
  if (currentUser.perfil === "Administrador" || (currentUser.usuario && currentUser.usuario.includes("Regulação"))) {
    document.body.classList.add("theme-regulacao");
  } else {
    document.body.classList.remove("theme-regulacao");
  }

  // Task 6: Exibir nome em MAIÚSCULO com segmento/entidade abaixo
  const nomeCompleto = currentUser.usuario || "";
  // Extrai o nome antes do parêntesis e a entidade/segmento entre parêntesis
  const nomeMatch = nomeCompleto.match(/^([^(]+)(?:\(([^)]+)\))?/);
  const nomePrincipal = nomeMatch ? nomeMatch[1].trim().toUpperCase() : nomeCompleto.toUpperCase();
  const segmentoEntidade = nomeMatch && nomeMatch[2] ? nomeMatch[2].trim() : "";
  const perfilTexto = currentUser.perfil || "Usuário";

  const userDisplayEl = document.getElementById("user-display-name");
  if (userDisplayEl) {
    userDisplayEl.innerHTML = `
      <span style="display:flex; flex-direction:column; line-height:1.2;">
        <strong style="font-size:0.82rem; letter-spacing:0.5px;">${nomePrincipal}</strong>
        ${segmentoEntidade ? `<span style="font-size:0.68rem; color:rgba(255,255,255,0.55); font-weight:400;">${segmentoEntidade} · ${perfilTexto}</span>` : `<span style="font-size:0.68rem; color:rgba(255,255,255,0.55);">${perfilTexto}</span>`}
      </span>
    `;
  }
  
  const uploadTab = document.getElementById("btn-tab-upload");
  
  // Conselheiros não cadastram propostas (apenas visualizam)
  if (currentUser.perfil === "Conselheiro") {
    if (uploadTab) uploadTab.style.display = "none";
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    document.getElementById("btn-tab-dashboard").classList.add("active");
    document.getElementById("tab-dashboard").classList.add("active");
  } else {
    if (uploadTab) uploadTab.style.display = "flex";
  }
  
  // Botão Sincronizar planilha oficial (Apenas Webmaster)
  if (btnSyncDatabase) {
    if (currentUser.perfil === "Webmaster") {
      btnSyncDatabase.classList.remove("hidden");
    } else {
      btnSyncDatabase.classList.add("hidden");
    }
  }
  
  // Botão Nova Dúvida (Conselheiros e Webmasters)
  if (btnNovaDuvida) {
    if (currentUser.perfil === "Administrador") {
      btnNovaDuvida.classList.add("hidden"); // Regulação apenas responde
    } else {
      btnNovaDuvida.classList.remove("hidden");
    }
  }
}

// NAVEGAÇÃO DE ABAS
function initTabs() {
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute("data-tab");
      
      // Select all nav links and contents dynamically since we added new ones
      const allTabs = document.querySelectorAll(".nav-tab-link");
      const allContents = document.querySelectorAll(".tab-content");
      
      allTabs.forEach(t => t.classList.remove("active"));
      allContents.forEach(c => c.classList.remove("active"));
      
      tab.classList.add("active");
      const targetEl = document.getElementById(targetTab);
      if (targetEl) targetEl.classList.add("active");
      
      if (targetTab === "tab-duvidas") {
        renderDoubtBoard();
      } else if (targetTab === "tab-relatorios") {
        renderReportsTab();
      }
    });
  });
}

// EVENTO DE LOGIN
async function handleLoginSubmit(e) {
  e.preventDefault();
  const key = loginKeyInput.value.trim().toUpperCase();
  if (!key) return;
  
  btnLogin.disabled = true;
  btnLogin.querySelector(".login-btn-text").classList.add("hidden");
  btnLogin.querySelector(".login-spinner").classList.remove("hidden");
  loginKeyInput.parentElement.classList.remove("invalid");
  
  const isMock = checkIsMockMode();
  
  if (isMock) {
    // MOCK LOGIN STATEFUL
    setTimeout(() => {
      const chaves = obterChavesMock();
      let match = null;
      for (const k in chaves) {
        if (chaves[k].chave.toUpperCase() === key) {
          match = chaves[k];
          break;
        }
      }
      
      if (match) {
        tempUser = { chave: match.chave, usuario: match.usuario, perfil: match.perfil };
        
        if (match.primeiroAcesso) {
          // Abre o modal de alteração obrigatória
          const firstWordOfUser = tempUser.usuario.split("(")[0].trim().split(" ")[0];
          const normalizedFirstName = removerAcentos(firstWordOfUser).toUpperCase();
          document.getElementById("force-prefix").textContent = normalizedFirstName;
          document.getElementById("force-suffix").value = "";
          document.getElementById("force-password-preview-box").style.display = "none";
          forcePasswordOverlay.classList.remove("hidden");
        } else {
          currentUser = tempUser;
          localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
          applyUserPermissions();
          loginOverlay.classList.add("hidden");
          loadDashboardData();
          loginForm.reset();
        }
      } else {
        loginKeyInput.parentElement.classList.add("invalid");
        loginErrorMsg.textContent = "Chave de acesso incorreta ou inexistente.";
      }
      btnLogin.disabled = false;
      btnLogin.querySelector(".login-btn-text").classList.remove("hidden");
      btnLogin.querySelector(".login-spinner").classList.add("hidden");
    }, 800);
  } else {
    try {
      const payload = {
        chave: key,
        acao: "auth",
        clientIp: clientInfo.ip,
        clientLoc: clientInfo.loc,
        clientUa: clientInfo.ua
      };
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      const result = await response.json();
      
      if (result.status === "success") {
        tempUser = {
          chave: key,
          usuario: result.profile.usuario,
          perfil: result.profile.perfil
        };
        
        if (result.profile.primeiroAcesso) {
          const firstWordOfUser = tempUser.usuario.split("(")[0].trim().split(" ")[0];
          const normalizedFirstName = removerAcentos(firstWordOfUser).toUpperCase();
          document.getElementById("force-prefix").textContent = normalizedFirstName;
          document.getElementById("force-suffix").value = "";
          document.getElementById("force-password-preview-box").style.display = "none";
          forcePasswordOverlay.classList.remove("hidden");
        } else {
          currentUser = tempUser;
          localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
          applyUserPermissions();
          loginOverlay.classList.add("hidden");
          loadDashboardData();
          loginForm.reset();
        }
      } else {
        loginKeyInput.parentElement.classList.add("invalid");
        loginErrorMsg.textContent = result.message || "Chave de acesso incorreta ou inexistente.";
      }
    } catch (err) {
      loginKeyInput.parentElement.classList.add("invalid");
      loginErrorMsg.textContent = "Erro de conexão com o servidor Google.";
    } finally {
      btnLogin.disabled = false;
      btnLogin.querySelector(".login-btn-text").classList.remove("hidden");
      btnLogin.querySelector(".login-spinner").classList.add("hidden");
    }
  }
}

function handleLogout() {
  localStorage.removeItem("cms_user_session");
  currentUser = null;
  resetFileSelection();
  proposalForm.reset();
  loginForm.reset();
  loginOverlay.classList.remove("hidden");
}

// ── FLUXO DE ALTERAÇÃO DE CHAVE E ESQUECI MINHA SENHA ──

function initPasswordModals() {
  const forcePrefix = document.getElementById("force-prefix");
  const forceSuffix = document.getElementById("force-suffix");
  const forcePreviewBox = document.getElementById("force-password-preview-box");
  const forcePreviewText = document.getElementById("force-password-preview-text");
  const forceSuccessDiv = document.getElementById("force-password-success");
  const displayFinalPassword = document.getElementById("display-final-password");
  const btnCopyNewKey = document.getElementById("btn-copy-new-key");
  const btnForceContinue = document.getElementById("btn-force-continue");

  const generalPrefix = document.getElementById("general-prefix");
  const generalSuffix = document.getElementById("general-suffix");
  const generalPreviewBox = document.getElementById("general-password-preview-box");
  const generalPreviewText = document.getElementById("general-password-preview-text");
  
  const linkForgotPassword = document.getElementById("link-forgot-password");
  const forgotPasswordModal = document.getElementById("forgot-password-modal");
  const btnCloseForgotModal = document.getElementById("btn-close-forgot-modal");
  const btnOkForgotModal = document.getElementById("btn-ok-forgot-modal");

  // Auxiliar para normalizar o sufixo da senha (letras e números maiúsculos sem acentos)
  function formatPasswordSuffix(val) {
    return removerAcentos(val)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
  }

  // Monitorar input do primeiro acesso
  forceSuffix.addEventListener("input", (e) => {
    const formatted = formatPasswordSuffix(e.target.value);
    e.target.value = formatted;
    
    if (formatted) {
      forcePreviewText.textContent = forcePrefix.textContent + formatted;
      forcePreviewBox.style.display = "block";
    } else {
      forcePreviewBox.style.display = "none";
    }
  });

  // Monitorar input da alteração de senha geral
  generalSuffix.addEventListener("input", (e) => {
    const formatted = formatPasswordSuffix(e.target.value);
    e.target.value = formatted;
    
    if (formatted) {
      generalPreviewText.textContent = generalPrefix.textContent + formatted;
      generalPreviewBox.style.display = "block";
    } else {
      generalPreviewBox.style.display = "none";
    }
  });

  // Modal Esqueci Senha
  linkForgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    forgotPasswordModal.classList.remove("hidden");
  });
  btnCloseForgotModal.addEventListener("click", () => forgotPasswordModal.classList.add("hidden"));
  btnOkForgotModal.addEventListener("click", () => forgotPasswordModal.classList.add("hidden"));

  // Copiar senha no Primeiro Acesso
  btnCopyNewKey.addEventListener("click", () => {
    navigator.clipboard.writeText(displayFinalPassword.textContent).then(() => {
      const originalText = btnCopyNewKey.innerHTML;
      btnCopyNewKey.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
      setTimeout(() => {
        btnCopyNewKey.innerHTML = originalText;
      }, 1500);
    });
  });

  // Prosseguir para o Portal após redefinir no Primeiro Acesso
  btnForceContinue.addEventListener("click", () => {
    forcePasswordOverlay.classList.add("hidden");
    loginOverlay.classList.add("hidden");
    applyUserPermissions();
    loadDashboardData();
    
    // Resetar estado visual do card para futuros usos
    forcePasswordForm.reset();
    forcePasswordForm.classList.remove("hidden");
    forceSuccessDiv.classList.add("hidden");
    forcePreviewBox.style.display = "none";
  });

  // Submit do Primeiro Acesso
  forcePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const suffix = forceSuffix.value.trim();
    if (suffix.length < 2) {
      showInputError(forceSuffix, forcePasswordErrorMsg, "Por favor, digite pelo menos 2 caracteres complementares.");
      return;
    }
    
    const newKey = forcePrefix.textContent + suffix;
    
    btnForceSubmit.disabled = true;
    btnForceSubmit.querySelector(".btn-text").classList.add("hidden");
    btnForceSubmit.querySelector(".spinner").classList.remove("hidden");
    
    const isMock = checkIsMockMode();
    
    if (isMock) {
      setTimeout(() => {
        if (checkMockKeyExists(newKey, tempUser.chave)) {
          showInputError(forceSuffix, forcePasswordErrorMsg, "Esta chave já está em uso por outro conselheiro.");
          btnForceSubmit.disabled = false;
          btnForceSubmit.querySelector(".btn-text").classList.remove("hidden");
          btnForceSubmit.querySelector(".spinner").classList.add("hidden");
          return;
        }
        
        salvarNovaChaveMock(tempUser.chave, newKey);
        currentUser = { chave: newKey, usuario: tempUser.usuario, perfil: tempUser.perfil };
        
        // Exibir tela de sucesso
        displayFinalPassword.textContent = newKey;
        forcePasswordForm.classList.add("hidden");
        forceSuccessDiv.classList.remove("hidden");
        
        // Salvar sessão localmente
        localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
        
        btnForceSubmit.disabled = false;
        btnForceSubmit.querySelector(".btn-text").classList.remove("hidden");
        btnForceSubmit.querySelector(".spinner").classList.add("hidden");
      }, 800);
    } else {
      try {
        const payload = {
          chave: tempUser.chave,
          acao: "alterar_chave",
          novaChave: newKey,
          clientIp: clientInfo.ip,
          clientLoc: clientInfo.loc,
          clientUa: clientInfo.ua
        };
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "text/plain" }
        });
        const result = await response.json();
        
        if (result.status === "success") {
          currentUser = { chave: newKey, usuario: tempUser.usuario, perfil: tempUser.perfil };
          
          // Exibir tela de sucesso
          displayFinalPassword.textContent = newKey;
          forcePasswordForm.classList.add("hidden");
          forceSuccessDiv.classList.remove("hidden");
          
          // Salvar sessão localmente
          localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
        } else {
          showAlert("error", "Erro ao alterar", result.message);
        }
      } catch (err) {
        showAlert("error", "Erro de Conexão", "Não foi possível enviar a nova chave.");
      } finally {
        btnForceSubmit.disabled = false;
        btnForceSubmit.querySelector(".btn-text").classList.remove("hidden");
        btnForceSubmit.querySelector(".spinner").classList.add("hidden");
      }
    }
  });

  // Modal Geral de Alterar Chave (Topbar)
  btnOpenChangePassword.addEventListener("click", () => {
    if (currentUser) {
      const firstWordOfUser = currentUser.usuario.split("(")[0].trim().split(" ")[0];
      const normalizedFirstName = removerAcentos(firstWordOfUser).toUpperCase();
      generalPrefix.textContent = normalizedFirstName;
      generalSuffix.value = "";
      generalPreviewBox.style.display = "none";
      generalPwdErrorMsg.parentElement.classList.remove("invalid");
      changePasswordModal.classList.remove("hidden");
    }
  });
  
  btnCancelPwdModal.addEventListener("click", () => changePasswordModal.classList.add("hidden"));
  btnClosePwdModal.addEventListener("click", () => changePasswordModal.classList.add("hidden"));
  
  generalChangePwdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const suffix = generalSuffix.value.trim();
    if (suffix.length < 2) {
      showInputError(generalSuffix, generalPwdErrorMsg, "Digite pelo menos 2 caracteres complementares.");
      return;
    }
    
    const newKey = generalPrefix.textContent + suffix;
    const btnSave = document.getElementById("btn-save-pwd-modal");
    btnSave.disabled = true;
    
    const isMock = checkIsMockMode();
    
    if (isMock) {
      if (checkMockKeyExists(newKey, currentUser.chave)) {
        showInputError(generalSuffix, generalPwdErrorMsg, "Esta chave já está em uso por outro conselheiro.");
        btnSave.disabled = false;
        return;
      }
      salvarNovaChaveMock(currentUser.chave, newKey);
      currentUser.chave = newKey;
      localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
      showAlert("success", "Chave Alterada", `Sua nova chave de acesso é: ${newKey}. Guarde-a com cuidado.`);
      changePasswordModal.classList.add("hidden");
      btnSave.disabled = false;
    } else {
      try {
        const payload = {
          chave: currentUser.chave,
          acao: "alterar_chave",
          novaChave: newKey,
          clientIp: clientInfo.ip,
          clientLoc: clientInfo.loc,
          clientUa: clientInfo.ua
        };
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "text/plain" }
        });
        const result = await response.json();
        if (result.status === "success") {
          currentUser.chave = newKey;
          localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
          showAlert("success", "Chave Alterada", `Sua nova chave de acesso é: ${newKey}. Ela foi atualizada no sistema.`);
          changePasswordModal.classList.add("hidden");
        } else {
          showAlert("error", "Erro ao salvar", result.message);
        }
      } catch (err) {
        showAlert("error", "Falha de Rede", "Erro ao conectar com a planilha.");
      } finally {
        btnSave.disabled = false;
      }
    }
  });
}

// ── ASSISTENTE DO MOCK KEY STATEFUL ──
function checkIsMockMode() {
  return (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI" || !API_URL.includes("/macros/s/") || !API_URL.includes("/exec"));
}

function obterChavesMock() {
  const localKeys = localStorage.getItem("cms_mock_keys_v2");
  if (localKeys) {
    try {
      const parsed = JSON.parse(localKeys);
      let hasOldFormat = false;
      for (const k in parsed) {
        if (parsed[k].chave && parsed[k].chave.startsWith("CMS-")) {
          hasOldFormat = true;
          break;
        }
      }
      if (!hasOldFormat) {
        return parsed;
      }
    } catch (e) {
      // JSON inválido, prossegue para reiniciar
    }
  }
  
  const initialKeys = {};
  for (const k in MOCK_KEYS) {
    initialKeys[k] = {
      usuario: MOCK_KEYS[k].usuario,
      perfil: MOCK_KEYS[k].perfil,
      chave: k,
      primeiroAcesso: (k !== "REGULACAO-CMSMOC-2026" && k !== "WEBMASTER-ADMIN-CMS")
    };
  }
  localStorage.setItem("cms_mock_keys_v2", JSON.stringify(initialKeys));
  return initialKeys;
}

function checkMockKeyExists(newKey, oldKey) {
  const chaves = obterChavesMock();
  for (const k in chaves) {
    if (chaves[k].chave.toUpperCase() === newKey.toUpperCase() && k !== oldKey) {
      return true;
    }
  }
  return false;
}

function salvarNovaChaveMock(oldKey, newKey) {
  const chaves = obterChavesMock();
  if (chaves[oldKey]) {
    const data = chaves[oldKey];
    data.chave = newKey;
    data.primeiroAcesso = false;
    
    delete chaves[oldKey];
    chaves[newKey] = data;
    
    localStorage.setItem("cms_mock_keys_v2", JSON.stringify(chaves));
  }
}

function removerAcentos(text) {
  if (!text) return "";
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// UPLOAD DE ARQUIVOS
function initDragAndDrop() {
  dropzone.addEventListener("click", (e) => {
    if (e.target !== removeFileBtn && !removeFileBtn.contains(e.target)) fileInput.click();
  });
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    }, false);
  });
  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    }, false);
  });
  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length) handleFile(files[0]);
  });
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
  });
  removeFileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetFileSelection();
  });
}

function handleFile(file) {
  const errorMsg = document.getElementById("pdf-error-msg");
  if (file.type !== "application/pdf") {
    showInputError(fileInput, errorMsg, "Selecione apenas arquivos PDF.");
    resetFileSelection();
    return;
  }
  if (file.size > 30 * 1024 * 1024) {
    showInputError(fileInput, errorMsg, "O tamanho do arquivo excede o limite de 30MB.");
    resetFileSelection();
    return;
  }
  
  document.getElementById("pdf-error-msg").parentElement.classList.remove("invalid");
  uploadedFileName = file.name;
  uploadedFileType = file.type;
  
  previewFilename.textContent = file.name;
  previewFilesize.textContent = formatBytes(file.size);
  dropzone.querySelector(".dropzone-content").classList.add("hidden");
  filePreview.classList.remove("hidden");
  
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    uploadedFileBase64 = reader.result.split(',')[1];
  };
}

function resetFileSelection() {
  fileInput.value = "";
  uploadedFileBase64 = "";
  uploadedFileType = "";
  uploadedFileName = "";
  dropzone.querySelector(".dropzone-content").classList.remove("hidden");
  filePreview.classList.add("hidden");
}

// FORM DE CADASTRO
function initFormValidation() {
  proposalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    
    const selectEntidade = document.getElementById("entidade");
    if (!selectEntidade.value) {
      isValid = false;
      selectEntidade.parentElement.classList.add("invalid");
    } else {
      selectEntidade.parentElement.classList.remove("invalid");
    }
    
    const inputNumero = document.getElementById("numeroEmenda");
    if (!inputNumero.value || !inputNumero.checkValidity()) {
      isValid = false;
      inputNumero.parentElement.classList.add("invalid");
    } else {
      inputNumero.parentElement.classList.remove("invalid");
    }
    
    const inputParlamentar = document.getElementById("parlamentar");
    if (!inputParlamentar.value) {
      isValid = false;
      inputParlamentar.parentElement.classList.add("invalid");
    } else {
      inputParlamentar.parentElement.classList.remove("invalid");
    }
    
    const inputValor = document.getElementById("valor");
    if (!inputValor.value || parseFloat(inputValor.value) <= 0) {
      isValid = false;
      inputValor.parentElement.classList.add("invalid");
    } else {
      inputValor.parentElement.classList.remove("invalid");
    }
    
    const pdfError = document.getElementById("pdf-error-msg");
    if (!uploadedFileBase64) {
      isValid = false;
      pdfError.parentElement.classList.add("invalid");
    } else {
      pdfError.parentElement.classList.remove("invalid");
    }
    
    if (isValid) submitProposal();
  });
  
  document.querySelectorAll("#proposal-form input, #proposal-form select").forEach(input => {
    input.addEventListener("input", (e) => {
      e.target.parentElement.classList.remove("invalid");
    });
  });
}

async function submitProposal() {
  setLoadingState(true);
  const payload = {
    chave: currentUser.chave,
    acao: "cadastro",
    entidade: document.getElementById("entidade").value,
    tipoEmenda: document.querySelector('input[name="tipoEmenda"]:checked').value,
    numeroEmenda: document.getElementById("numeroEmenda").value,
    parlamentar: document.getElementById("parlamentar").value,
    resolucao: document.getElementById("resolucao").value || "Não informado",
    valor: parseFloat(document.getElementById("valor").value),
    objeto: document.getElementById("objeto").value || "Não informado",
    fileName: `EMENDA_${document.getElementById("numeroEmenda").value}_${document.getElementById("entidade").value.replace(/\s+/g, '_').substring(0, 30)}.pdf`,
    fileType: uploadedFileType,
    fileBase64: uploadedFileBase64,
    clientIp: clientInfo.ip,
    clientLoc: clientInfo.loc,
    clientUa: clientInfo.ua
  };
  
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    setTimeout(() => {
      const localData = getLocalDb();
      localData.push({
        "Data de Envio": new Date().toISOString(),
        "Entidade": payload.entidade,
        "Número da Emenda": payload.numeroEmenda,
        "Tipo": payload.tipoEmenda,
        "Parlamentar / Autor": payload.parlamentar,
        "Resolução/Documento": payload.resolucao,
        "Valor": payload.valor,
        "Objeto/Finalidade": payload.objeto,
        "Link do PDF": "https://drive.google.com/drive/my-drive",
        "Status": "Recebido"
      });
      saveLocalDb(localData);
      showAlert("success", "✅ Cadastrado (Demo)", "A proposta foi salva localmente.");
      proposalForm.reset();
      resetFileSelection();
      setLoadingState(false);
      loadDashboardData();
    }, 1000);
  } else {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      const result = await response.json();
      if (result.status === "success") {
        showAlert("success", "✅ Proposta Enviada!", "Gravada no Sheets e Drive com sucesso.");
        proposalForm.reset();
        resetFileSelection();
        loadDashboardData();
      } else {
        showAlert("error", "❌ Erro", result.message);
      }
    } catch (e) {
      showAlert("error", "❌ Falha de Conexão", "API indisponível.");
    } finally {
      setLoadingState(false);
    }
  }
}

// MODAL DE EDIÇÃO
function initEditModal() {
  btnCloseEditModal.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    editModal.classList.add("hidden");
  });
  btnCancelEdit.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    editModal.classList.add("hidden");
  });
  
  editForm.addEventListener("submit", handleEditFormSubmit);
}

function openEditModal(numeroEmenda) {
  const row = emendasData.find(r => {
    const rNum = r && r["Número da Emenda"] ? r["Número da Emenda"].toString().trim() : "";
    const targetNum = numeroEmenda ? numeroEmenda.toString().trim() : "";
    return rNum === targetNum;
  });
  if (!row) return;
  
  editOriginalNumero.value = numeroEmenda;
  editEntidade.value = row["Entidade"];
  editNumeroEmenda.value = row["Número da Emenda"];
  editParlamentar.value = row["Parlamentar / Autor"] || "";
  editResolucao.value = row["Resolução/Documento"] || "";
  editValor.value = row["Valor"] || 0;
  editObjeto.value = row["Objeto/Finalidade"] || "";
  
  // Task 3: Mostrar/ocultar seção de deliberação
  const deliberacaoGroup = document.getElementById('edit-deliberacao-group');
  if (deliberacaoGroup) {
    const isAprovada = ['Aprovado','Aprovada','Aprovado em Plenário'].includes(row['Status'] || '');
    deliberacaoGroup.style.display = isAprovada ? 'block' : 'none';
    const numDelib = document.getElementById('edit-numero-deliberacao');
    const dataDelib = document.getElementById('edit-data-deliberacao');
    const linkDelib = document.getElementById('edit-link-deliberacao');
    if (numDelib) numDelib.value = row['Numero_Deliberacao'] || '';
    if (dataDelib) dataDelib.value = row['Data_Deliberacao'] || '';
    if (linkDelib) linkDelib.value = row['Link_Deliberacao'] || '';
  }
  
  if (row["Tipo"] === "Federal") {
    document.getElementById("edit-tipo-federal").checked = true;
  } else {
    document.getElementById("edit-tipo-estadual").checked = true;
  }
  
  editModal.classList.remove("hidden");
}

async function handleEditFormSubmit(e) {
  e.preventDefault();
  
  const originalNum = editOriginalNumero.value;
  const payload = {
    chave: currentUser.chave,
    acao: "editar_emenda",
    numeroEmenda: originalNum,
    novosDados: {
      entidade: editEntidade.value,
      tipoEmenda: (document.querySelector('input[name="edit-tipoEmenda"]:checked') || {value: "Estadual"}).value,
      numeroEmenda: editNumeroEmenda.value,
      parlamentar: editParlamentar.value,
      resolucao: editResolucao.value || "Não informado",
      valor: parseFloat(editValor.value) || 0,
      objeto: editObjeto.value || "Não informado",
      numeroDeliberacao: document.getElementById('edit-numero-deliberacao')?.value || '',
      dataDeliberacao: document.getElementById('edit-data-deliberacao')?.value || '',
      linkDeliberacao: document.getElementById('edit-link-deliberacao')?.value || ''
    },
    clientIp: clientInfo.ip,
    clientLoc: clientInfo.loc,
    clientUa: clientInfo.ua
  };
  
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    const localData = getLocalDb();
    const row = localData.find(r => {
      const rNum = r && r["Número da Emenda"] ? r["Número da Emenda"].toString().trim() : "";
      const targetNum = originalNum ? originalNum.toString().trim() : "";
      return rNum === targetNum;
    });
    if (row) {
      row["Entidade"] = payload.novosDados.entidade;
      row["Tipo"] = payload.novosDados.tipoEmenda;
      row["Número da Emenda"] = payload.novosDados.numeroEmenda;
      row["Parlamentar / Autor"] = payload.novosDados.parlamentar;
      row["Resolução/Documento"] = payload.novosDados.resolucao;
      row["Valor"] = payload.novosDados.valor;
      row["Objeto/Finalidade"] = payload.novosDados.objeto;
      
      saveLocalDb(localData);
      showAlert("success", "✅ Editado (Demo)", "Os dados foram atualizados localmente.");
      editModal.classList.add("hidden");
      loadDashboardData();
    }
  } else {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      const result = await response.json();
      if (result.status === "success") {
        showAlert("success", "✅ Dados Atualizados!", "As alterações foram salvas na planilha.");
        editModal.classList.add("hidden");
        loadDashboardData();
      } else {
        showAlert("error", "❌ Erro", result.message);
      }
    } catch (e) {
      showAlert("error", "❌ Erro", "Não foi possível conectar ao servidor.");
    }
  }
}

// CARREGAR DADOS DO DASHBOARD
async function loadDashboardData(forceRefresh = false) {
  if (!currentUser) return;
  tableLoading.classList.remove("hidden");
  if (duvidasLoading) duvidasLoading.classList.remove("hidden");
  
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    setTimeout(() => {
      emendasData = getLocalDb();
      duvidasData = getLocalDuvidas();
      renderDashboard();
      renderDoubtBoard();
      tableLoading.classList.add("hidden");
      if (duvidasLoading) duvidasLoading.classList.add("hidden");
    }, 400);
  } else {
    try {
      const cacheBuster = forceRefresh ? `&t=${new Date().getTime()}` : '';
      const response = await fetch(`${API_URL}?chave=${currentUser.chave}&ip=${clientInfo.ip}&loc=${clientInfo.loc}&ua=${clientInfo.ua}${cacheBuster}`);
      const result = await response.json();
      
      if (result.status === "success") {
        emendasData = result.data;
        duvidasData = result.duvidas || [];
        renderDashboard();
        renderDoubtBoard();
      } else {
        showAlert("error", "❌ Erro", result.message);
        handleLogout();
      }
    } catch (error) {
      emendasData = getLocalDb();
      duvidasData = getLocalDuvidas();
      renderDashboard();
      renderDoubtBoard();
      showAlert("error", "❌ Conectado Localmente", "Exibindo base local offline.");
    } finally {
      tableLoading.classList.add("hidden");
      if (duvidasLoading) duvidasLoading.classList.add("hidden");
    }
  }
}

function renderDashboard() {
  filterData();
  checkAndShowNotifications();
}

function filterData() {
  const textSearch = searchInput.value.toLowerCase().trim();
  const entFilter = filterEntidade.value;
  const statusFilter = filterStatus.value;
  
  const filtered = emendasData.filter(row => {
    const entidade = (row["Entidade"] || "").toString();
    const numero = (row["Número da Emenda"] || "").toString();
    const resolucao = (row["Resolução/Documento"] || "").toString();
    const objeto = (row["Objeto/Finalidade"] || "").toString();
    const status = (row["Status"] || "").toString();
    const parlamentar = (row["Parlamentar / Autor"] || "").toString();
    
    const matchesText = !textSearch || 
                        numero.toLowerCase().includes(textSearch) ||
                        resolucao.toLowerCase().includes(textSearch) ||
                        objeto.toLowerCase().includes(textSearch) ||
                        parlamentar.toLowerCase().includes(textSearch) ||
                        entidade.toLowerCase().includes(textSearch);
                        
    const matchesEnt = !entFilter || entidade === entFilter;
    const matchesStatus = !statusFilter || (() => {
      const s = row['Status'] || '';
      if (statusFilter === 'Pendente Aprovação') {
        return ['Recebido','Em Análise','Pendente Aprovação','Não Aprovado em Plenário','Devolvido para Correção'].includes(s);
      } else if (statusFilter === 'Aprovada') {
        return ['Aprovado','Aprovada','Aprovado em Plenário'].includes(s);
      }
      return s === statusFilter;
    })();
    
    return matchesText && matchesEnt && matchesStatus;
  });
  
  currentFilteredData = filtered;
  calculateStats(filtered);
  tableBody.innerHTML = "";
  
  if (filtered.length === 0) {
    noDataMsg.classList.remove("hidden");
    return;
  }
  
  noDataMsg.classList.add("hidden");
  
  const isWebmaster = currentUser.perfil === "Webmaster";
  const isAdmin = currentUser.perfil === "Administrador" || isWebmaster;
  
  filtered.forEach(row => {
    const tr = document.createElement("tr");
    
    const rawDate = row["Data de Envio"];
    let formattedDate = "Não inf.";
    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'});
      }
    }
    
    const numero = row["Número da Emenda"];
    const status = row["Status"] || "Recebido";
    
    let statusCellContent = "";
    // Task 2: status alinhado ao fluxo plenário real
    const STATUS_MAP_DISPLAY = {
      'Recebido': 'Pendente Aprovação',
      'Em Análise': 'Pendente Aprovação',
      'Aprovado': 'Aprovada',
      'Aprovado em Plenário': 'Aprovada',
      'Não Aprovado em Plenário': 'Pendente Aprovação',
      'Devolvido para Correção': 'Pendente Aprovação',
      'Pendente Aprovação': 'Pendente Aprovação',
      'Aprovada': 'Aprovada'
    };
    const statusDisplay = STATUS_MAP_DISPLAY[status] || status;
    if (isWebmaster) {
      statusCellContent = `
        <select class="status-select-inline" data-numero="${numero}">
          <option value='Pendente Aprovação' ${['Recebido','Em Análise','Pendente Aprovação','Não Aprovado em Plenário','Devolvido para Correção'].includes(status) ? 'selected' : ''}>Pendente Aprovação</option>
          <option value='Aprovada' ${['Aprovado','Aprovado em Plenário','Aprovada'].includes(status) ? 'selected' : ''}>Aprovada ✓ Plenário</option>
        </select>
      `;
    } else {
      let statusClass = "status-todo";
      if (['Recebido','Em Análise','Pendente Aprovação','Não Aprovado em Plenário','Devolvido para Correção'].includes(status)) statusClass = "status-warn";
      else if (['Aprovado','Aprovado em Plenário','Aprovada'].includes(status)) statusClass = "status-ok";
      statusCellContent = `<span class="badge-status ${statusClass}">${statusDisplay}</span>`;
    }
    
    const pdfUrl = row["Link do PDF"] || "#";
    let actionCellContent = "";
    
    if (pdfUrl !== "#") {
      actionCellContent = `<a href="${pdfUrl}" target="_blank" class="action-btn download-trigger" data-numero="${numero}" data-entidade="${row["Entidade"]}"><i class="fa-solid fa-file-pdf"></i> PDF</a>`;
    } else {
      actionCellContent = `<span style="color: var(--cms-muted);">Sem arquivo</span>`;
    }
    
    // Task 3: link da deliberação plenária
    const linkDelib = row['Link_Deliberacao'] || '';
    if (linkDelib && linkDelib.startsWith('http')) {
      actionCellContent = `<a href='${linkDelib}' target='_blank' class='action-btn' style='background:#D1FAE5; color:#065F46; border-color:#A7F3D0;' title='Ver Deliberação Plenária'><i class='fa-solid fa-gavel'></i></a>` + actionCellContent;
    }
    
    if (isAdmin) {
      actionCellContent += `
        <button class="action-btn btn-editar" data-numero="${numero}" title="Editar Dados" style="border-color: #6366f1; color: #6366f1;">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="delete-btn-inline btn-excluir" data-numero="${numero}" data-entidade="${row["Entidade"]}" title="Excluir Emenda">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
    }
    
    const valor = parseFloat(row["Valor"]) || 0;
    
    const entidadeAbrev = row["Entidade"] || "Não informado";
    const parlamentarStr = row["Parlamentar / Autor"] || "Não informado";
    const resolucaoStr = row["Resolução/Documento"] || "Não informado";
    tr.innerHTML = `
      <td data-label="Data de Envio">${formattedDate}</td>
      <td data-label="Entidade Beneficiada" class="cell-entidade" title="${entidadeAbrev}" style="font-weight: 600; color: var(--cms-navy);">${entidadeAbrev}</td>
      <td data-label="Nº Emenda"><strong>${numero}</strong></td>
      <td data-label="Tipo"><span class="badge-status status-todo" style="background: #E0F2FE; color: #0369A1;">${row["Tipo"]}</span></td>
      <td data-label="Parlamentar / Autor" class="cell-parlamentar" title="${parlamentarStr}"><strong>${parlamentarStr}</strong></td>
      <td data-label="Resol./Portaria" class="cell-resolucao" title="${resolucaoStr}">${resolucaoStr}</td>
      <td data-label="Valor Repassado"><strong style="color: var(--cms-blue);">${formatCurrency(valor)}</strong></td>
      <td data-label="Status">${statusCellContent}</td>
      <td data-label="Ações" style="white-space: nowrap; display: flex; gap: 4px; align-items: center;">${actionCellContent}</td>
    `;
    
    tableBody.appendChild(tr);
  });
  
  bindTableActions();
}

function bindTableActions() {
  document.querySelectorAll(".download-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const num = e.currentTarget.getAttribute("data-numero");
      const entidade = e.currentTarget.getAttribute("data-entidade");
      logActionOnServer("log_download", `Baixou o PDF do plano de trabalho da emenda nº ${num} (${entidade}).`);
    });
  });

  document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const num = e.currentTarget.getAttribute("data-numero");
      openEditModal(num);
    });
  });

  document.querySelectorAll(".status-select-inline").forEach(select => {
    select.addEventListener("change", async (e) => {
      const num = e.currentTarget.getAttribute("data-numero");
      const novoStatus = e.currentTarget.value;
      await updateStatusOnServer(num, novoStatus);
    });
  });

  document.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const num = e.currentTarget.getAttribute("data-numero");
      const conf = confirm(`Tem certeza que deseja excluir a emenda nº ${num}?`);
      if (conf) {
        await deleteEmendaOnServer(num);
      }
    });
  });
}

// ── LOGICA DO QUADRO DE DÚVIDAS (FRONTEND) ──

function initDoubtModals() {
  // Modal de cadastro
  btnNovaDuvida.addEventListener("click", () => {
    newDoubtForm.reset();
    doubtTextInput.parentElement.classList.remove("invalid");
    newDoubtModal.classList.remove("hidden");
  });
  
  btnCancelDoubt.addEventListener("click", () => newDoubtModal.classList.add("hidden"));
  btnCloseDoubtModal.addEventListener("click", () => newDoubtModal.classList.add("hidden"));
  
  newDoubtForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = doubtTextInput.value.trim();
    if (!texto) {
      doubtTextInput.parentElement.classList.add("invalid");
      return;
    }
    
    const btnSave = document.getElementById("btn-save-doubt");
    btnSave.disabled = true;
    
    if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
      setTimeout(() => {
        const list = getLocalDuvidas();
        list.push({
          "ID": "D-" + new Date().getTime(),
          "Data": new Date().toISOString(),
          "Chave": currentUser.chave,
          "Nome": currentUser.usuario,
          "Dúvida": texto,
          "Resposta": "",
          "Status": "Pendente",
          "Responsável": "",
          "Data_Resposta": "",
          "AutorExibicao": currentUser.usuario
        });
        saveLocalDuvidas(list);
        showAlert("success", "✅ Dúvida Enviada (Demo)", "Salva localmente.");
        newDoubtModal.classList.add("hidden");
        loadDashboardData();
        btnSave.disabled = false;
      }, 500);
    } else {
      try {
        const payload = {
          chave: currentUser.chave,
          acao: "cadastrar_duvida",
          duvida: texto,
          clientIp: clientInfo.ip,
          clientLoc: clientInfo.loc,
          clientUa: clientInfo.ua
        };
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "text/plain" }
        });
        const result = await response.json();
        if (result.status === "success") {
          showAlert("success", "✅ Dúvida Cadastrada!", "Todos os conselheiros foram notificados por email.");
          newDoubtModal.classList.add("hidden");
          loadDashboardData();
        } else {
          showAlert("error", "Erro", result.message);
        }
      } catch (err) {
        showAlert("error", "Falha de Rede", "Não foi possível enviar sua dúvida.");
      } finally {
        btnSave.disabled = false;
      }
    }
  });

  // Modal de Resposta
  btnCancelAnswer.addEventListener("click", () => answerDoubtModal.classList.add("hidden"));
  btnCloseAnswerModal.addEventListener("click", () => answerDoubtModal.classList.add("hidden"));
  
  answerDoubtForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = answerDoubtIdInput.value;
    const resp = answerTextInput.value.trim();
    const status = answerStatusSelect.value;
    
    if (!resp) return;
    
    const btnSave = document.getElementById("btn-save-answer");
    btnSave.disabled = true;
    
    if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
      setTimeout(() => {
        const list = getLocalDuvidas();
        const row = list.find(d => d.ID === id);
        if (row) {
          row.Resposta = resp;
          row.Status = status;
          row.Responsável = currentUser.usuario;
          row.Data_Resposta = new Date().toISOString();
        }
        saveLocalDuvidas(list);
        showAlert("success", "✅ Respondido (Demo)", "Resposta salva localmente.");
        answerDoubtModal.classList.add("hidden");
        loadDashboardData();
        btnSave.disabled = false;
      }, 500);
    } else {
      try {
        const payload = {
          chave: currentUser.chave,
          acao: "responder_duvida",
          idDuvida: id,
          resposta: resp,
          novoStatus: status,
          clientIp: clientInfo.ip,
          clientLoc: clientInfo.loc,
          clientUa: clientInfo.ua
        };
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "text/plain" }
        });
        const result = await response.json();
        if (result.status === "success") {
          showAlert("success", "✅ Resposta Enviada!", "Os conselheiros foram notificados por email.");
          answerDoubtModal.classList.add("hidden");
          loadDashboardData();
        } else {
          showAlert("error", "Erro", result.message);
        }
      } catch (err) {
        showAlert("error", "Erro de Rede", "Erro ao salvar esclarecimento.");
      } finally {
        btnSave.disabled = false;
      }
    }
  });
}

function renderDoubtBoard() {
  if (!duvidasList) return;
  duvidasList.innerHTML = "";
  
  if (duvidasData.length === 0) {
    noDuvidasMsg.classList.remove("hidden");
    if (duvidasLoading) duvidasLoading.classList.add("hidden");
    return;
  }
  
  noDuvidasMsg.classList.add("hidden");
  if (duvidasLoading) duvidasLoading.classList.add("hidden");
  
  const isWebmaster = currentUser.perfil === "Webmaster";
  const isAdmin = currentUser.perfil === "Administrador" || isWebmaster;
  
  // Ordenação: Pendentes no topo, depois ordenadas por data descrescente
  const sorted = [...duvidasData].sort((a, b) => {
    if (a.Status === "Pendente" && b.Status !== "Pendente") return -1;
    if (a.Status !== "Pendente" && b.Status === "Pendente") return 1;
    return new Date(b.Data) - new Date(a.Data);
  });
  
  sorted.forEach(row => {
    const card = document.createElement("div");
    card.className = "doubt-card";
    
    // Task 7: estilo especial para dúvidas pendentes
    if (row.Status === 'Pendente') {
      card.style.cssText = 'border-left: 4px solid #DC2626; background:#FEF2F2;';
    }
    
    const dDate = new Date(row.Data);
    const formattedDate = !isNaN(dDate.getTime()) ? 
      dDate.toLocaleDateString("pt-BR") + " " + dDate.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : "";
      
    // Cópia local de censura de autor se for Administrador em modo Demo
    let autor = row.AutorExibicao || "Conselho";
    if (currentUser.perfil === "Administrador" && API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
      autor = "Conselho";
    }
    
    // Status color
    let statusClass = "status-todo";
    if (row.Status === "Em Discussão") statusClass = "status-warn";
    else if (row.Status === "Esclarecida") statusClass = "status-ok";
    
    let answerHtml = "";
    if (row.Resposta) {
      const aDate = new Date(row.Data_Resposta);
      const formattedDateResp = !isNaN(aDate.getTime()) ? 
        aDate.toLocaleDateString("pt-BR") + " " + aDate.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : "";
      
      answerHtml = `
        <div class="doubt-answer-body">
          <div class="doubt-answer-header">
            <span>Esclarecimento Técnico</span>
            <span>${row.Responsável} — ${formattedDateResp}</span>
          </div>
          <div class="doubt-answer-text">${row.Resposta}</div>
        </div>
      `;
    }
    
    let actionBtnHtml = "";
    // Apenas Administrador/Webmaster respondem
    if (isAdmin) {
      actionBtnHtml = `
        <div class="doubt-actions">
          <button class="action-btn btn-responder-duvida" data-id="${row.ID}" style="background: var(--cms-navy); color: white; border: none;">
            <i class="fa-solid fa-reply"></i> Responder
          </button>
        </div>
      `;
    }
    
    card.innerHTML = `
      <div class="doubt-card-header">
        <div class="doubt-author"><i class="fa-solid fa-circle-user"></i> ${autor}</div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="badge-status ${statusClass}">${row.Status}</span>
          <span class="doubt-meta">${formattedDate}</span>
        </div>
      </div>
      <div class="doubt-question-body">${row.Dúvida}</div>
      ${answerHtml}
      ${actionBtnHtml}
    `;
    
    duvidasList.appendChild(card);
  });
  
  // Bind nos botões de resposta
  document.querySelectorAll(".btn-responder-duvida").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      openAnswerDoubtModal(id);
    });
  });
}

function openAnswerDoubtModal(id) {
  const row = duvidasData.find(d => d.ID === id);
  if (!row) return;
  
  answerDoubtIdInput.value = id;
  answerDoubtPreview.textContent = `"${row.Dúvida}"`;
  answerTextInput.value = row.Resposta || "";
  answerStatusSelect.value = row.Status || "Esclarecida";
  
  answerDoubtModal.classList.remove("hidden");
}

// ── SYNC DE DADOS COM O BANCO OFICIAL (WEBMASTER) ──
async function triggerDatabaseSync() {
  if (currentUser.perfil !== "Webmaster") return;
  
  const conf = confirm("Deseja sincronizar as chaves dos conselheiros com a Planilha Oficial (ID: 10IaUS3W5dpQ3XIcPXo5VzqRT_ihFAZ65IKkKA7fdhsA)? Novos conselheiros serão importados e senhas existentes serão mantidas.");
  if (!conf) return;
  
  const btn = document.getElementById("btn-sync-database");
  const origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;
  
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    setTimeout(() => {
      showAlert("success", "Sincronização Completa (Demo)", "O banco local foi populado com a lista padrão de 64 conselheiros.");
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }, 1200);
  } else {
    try {
      const payload = {
        chave: currentUser.chave,
        acao: "atualizar_tabelas",
        clientIp: clientInfo.ip,
        clientLoc: clientInfo.loc,
        clientUa: clientInfo.ua
      };
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      const result = await response.json();
      if (result.status === "success") {
        showAlert("success", "Sucesso!", result.message);
        loadDashboardData(true);
      } else {
        showAlert("error", "Erro ao Sincronizar", result.message);
      }
    } catch (err) {
      showAlert("error", "Erro de Rede", "Erro ao comunicar requisição de sincronismo.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

// INTERAÇÕES DE LOGS & UPDATES COM SERVIDOR
async function logActionOnServer(acao, detalhes) {
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") return;
  try {
    const payload = {
      chave: currentUser.chave,
      acao: acao,
      detalhes: detalhes,
      clientIp: clientInfo.ip,
      clientLoc: clientInfo.loc,
      clientUa: clientInfo.ua
    };
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain" }
    });
  } catch (err) {
    console.warn(err);
  }
}

async function updateStatusOnServer(numeroEmenda, novoStatus) {
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    const data = getLocalDb();
    const row = data.find(r => {
      const rNum = r && r["Número da Emenda"] ? r["Número da Emenda"].toString().trim() : "";
      const targetNum = numeroEmenda ? numeroEmenda.toString().trim() : "";
      return rNum === targetNum;
    });
    if (row) {
      row["Status"] = novoStatus;
      saveLocalDb(data);
      showAlert("success", "Status Atualizado", `Status alterado para '${novoStatus}'.`);
      loadDashboardData();
    }
    return;
  }
  
  try {
    const payload = {
      chave: currentUser.chave,
      acao: "editar_status",
      numeroEmenda: numeroEmenda,
      novoStatus: novoStatus,
      clientIp: clientInfo.ip,
      clientLoc: clientInfo.loc,
      clientUa: clientInfo.ua
    };
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain" }
    });
    const result = await response.json();
    if (result.status === "success") {
      showAlert("success", "Status Sincronizado", `Status alterado no Google Sheets.`);
      loadDashboardData();
    } else {
      showAlert("error", "Erro ao Atualizar", result.message);
    }
  } catch (err) {
    showAlert("error", "Erro de Rede", "Erro ao enviar novo status.");
  }
}

async function deleteEmendaOnServer(numeroEmenda) {
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    const data = getLocalDb();
    const index = data.findIndex(r => {
      const rNum = r && r["Número da Emenda"] ? r["Número da Emenda"].toString().trim() : "";
      const targetNum = numeroEmenda ? numeroEmenda.toString().trim() : "";
      return rNum === targetNum;
    });
    if (index !== -1) {
      data.splice(index, 1);
      saveLocalDb(data);
      showAlert("success", "Emenda Excluída", `A emenda nº ${numeroEmenda} foi removida localmente.`);
      loadDashboardData();
    }
    return;
  }
  
  try {
    const payload = {
      chave: currentUser.chave,
      acao: "excluir",
      numeroEmenda: numeroEmenda,
      clientIp: clientInfo.ip,
      clientLoc: clientInfo.loc,
      clientUa: clientInfo.ua
    };
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain" }
    });
    const result = await response.json();
    if (result.status === "success") {
      showAlert("success", "Excluído com sucesso", "A emenda foi excluída do painel.");
      loadDashboardData();
    } else {
      showAlert("error", "Erro ao Excluir", result.message);
    }
  } catch (err) {
    showAlert("error", "Erro de Rede", "Falha de rede.");
  }
}

function calculateStats(dataList) {
  // Task 3: stats do painel usam os dados filtrados (count visível)
  // mas hero usa o total completo de emendasData para não enganar
  const globalData = emendasData; // dados completos sem filtro

  statTotalCount.textContent = dataList.length;
  heroTotalCount.textContent = globalData.length; // sempre o total real
  
  const totalValueFiltered = dataList.reduce((acc, row) => acc + (parseFloat(row["Valor"]) || 0), 0);
  const totalValueGlobal = globalData.reduce((acc, row) => acc + (parseFloat(row["Valor"]) || 0), 0);
  
  statTotalValue.textContent = formatCurrency(totalValueFiltered);
  heroTotalValue.textContent = formatCurrency(totalValueGlobal); // sempre total real
  
  const pendingCount = dataList.filter(row => {
    const s = row['Status'] || 'Pendente Aprovação';
    return !['Aprovado','Aprovada','Aprovado em Plenário'].includes(s);
  }).length;
  statPendingCount.textContent = pendingCount;
  
  const approvedCount = dataList.filter(row => {
    const s = row['Status'] || '';
    return ['Aprovado','Aprovada','Aprovado em Plenário'].includes(s);
  }).length;
  statApprovedCount.textContent = approvedCount;
}

// AUXILIARES
function setLoadingState(isLoading) {
  if (isLoading) {
    btnSubmit.disabled = true;
    btnSubmit.querySelector(".btn-text").classList.add("hidden");
    btnSubmit.querySelector(".spinner").classList.remove("hidden");
  } else {
    btnSubmit.disabled = false;
    btnSubmit.querySelector(".btn-text").classList.remove("hidden");
    btnSubmit.querySelector(".spinner").classList.add("hidden");
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function showInputError(inputEl, msgEl, text) {
  inputEl.parentElement.classList.add("invalid");
  msgEl.textContent = text;
}

function showAlert(type, title, desc) {
  statusAlert.className = `alert alert-${type}`;
  statusAlert.querySelector(".alert-title").textContent = title;
  statusAlert.querySelector(".alert-desc").textContent = desc;
  statusAlert.querySelector(".alert-icon i").className = type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-triangle-exclamation";
  statusAlert.classList.remove("hidden");
  
  // Auto sumir em 5 segundos
  setTimeout(() => {
    statusAlert.classList.add("hidden");
  }, 5000);
}

// BANCO DE DADOS LOCAL (OFFLINE / DEMO FALLBACKS)
function getLocalDb() {
  const local = localStorage.getItem("cms_emendas_local");
  if (!local) {
    localStorage.setItem("cms_emendas_local", JSON.stringify(MOCK_DATA));
    return MOCK_DATA;
  }
  return JSON.parse(local);
}

function saveLocalDb(data) {
  localStorage.setItem("cms_emendas_local", JSON.stringify(data));
}

function getLocalDuvidas() {
  const local = localStorage.getItem("cms_duvidas_local");
  if (!local) {
    localStorage.setItem("cms_duvidas_local", JSON.stringify(MOCK_DATA_DUVIDAS));
    return MOCK_DATA_DUVIDAS;
  }
  return JSON.parse(local);
}

function saveLocalDuvidas(data) {
  localStorage.setItem("cms_duvidas_local", JSON.stringify(data));
}

// ── MÓDULO DE DÚVIDAS DO DASHBOARD E INLINE RESPONDING ──

function renderDashboardDoubtPanel() {
  const toggleHeader = document.getElementById("toggle-dashboard-duvidas");
  const sectionContent = document.getElementById("content-dashboard-duvidas");
  const arrow = document.getElementById("arrow-dashboard-duvidas");
  const listContainer = document.getElementById("dashboard-duvidas-list");
  const noDoubtMsg = document.getElementById("no-dashboard-duvidas-msg");
  
  const alertBox = document.getElementById("regulacao-alert-duvidas");
  const pendingList = document.getElementById("regulacao-pendentes-list");
  
  if (!listContainer) return;
  
  // 1. Configurar evento de toggle (accordion) se ainda não foi feito
  if (!toggleHeader.dataset.bound) {
    toggleHeader.addEventListener("click", () => {
      const isCollapsed = sectionContent.style.display === "none";
      if (isCollapsed) {
        sectionContent.style.display = "block";
        arrow.className = "fa-solid fa-chevron-up";
      } else {
        sectionContent.style.display = "none";
        arrow.className = "fa-solid fa-chevron-down";
      }
    });
    toggleHeader.dataset.bound = "true";
    sectionContent.style.display = "block"; // Começa aberto por padrão
  }
  
  // 2. Atualizar contadores no topo
  updateDoubtStats();
  
  // 3. Limpar painéis
  listContainer.innerHTML = "";
  pendingList.innerHTML = "";
  
  if (duvidasData.length === 0) {
    noDoubtMsg.classList.remove("hidden");
    alertBox.classList.add("hidden");
    return;
  }
  
  noDoubtMsg.classList.add("hidden");
  
  const isWebmaster = currentUser.perfil === "Webmaster";
  const isRegulacao = currentUser.perfil === "Administrador" || isWebmaster;
  
  // Filtrar as pendentes para a Regulação
  const pendentesRegulacao = duvidasData.filter(d => d.Status === "Pendente");
  
  if (isRegulacao && pendentesRegulacao.length > 0) {
    alertBox.classList.remove("hidden");
    
    pendentesRegulacao.forEach(row => {
      const card = createDoubtCard(row, true);
      pendingList.appendChild(card);
    });
  } else {
    alertBox.classList.add("hidden");
  }
  
  // Exibir todas as dúvidas no feed geral (ordenadas por data descendente)
  const sorted = [...duvidasData].sort((a, b) => new Date(b.Data) - new Date(a.Data));
  sorted.forEach(row => {
    const card = createDoubtCard(row, false);
    listContainer.appendChild(card);
  });
}

function updateDoubtStats() {
  const total = duvidasData.length;
  const pendentes = duvidasData.filter(d => d.Status === "Pendente").length;
  const respondidas = duvidasData.filter(d => d.Status === "Esclarecida").length;
  
  document.getElementById("doubt-stat-enviadas").textContent = total;
  document.getElementById("doubt-stat-pendentes").textContent = pendentes;
  document.getElementById("doubt-stat-respondidas").textContent = respondidas;

  // Task 7: atualizar legendas dos contadores se existirem
  const legEnviadas = document.getElementById("doubt-legend-enviadas");
  const legPendentes = document.getElementById("doubt-legend-pendentes");
  const legRespondidas = document.getElementById("doubt-legend-respondidas");
  if (legEnviadas) legEnviadas.textContent = total === 1 ? "Dúvida" : "Dúvidas";
  if (legPendentes) legPendentes.textContent = pendentes === 1 ? "Aguardando" : "Aguardando";
  if (legRespondidas) legRespondidas.textContent = respondidas === 1 ? "Esclarecida" : "Esclarecidas";
}

function createDoubtCard(row, isInlineAnswer = false) {
  const card = document.createElement("div");
  // Task 7: cor de fundo do card por status
  let cardBgStyle = "";
  if (row.Status === "Pendente") cardBgStyle = "border-left: 4px solid #F59E0B; background: #FFFBEB;";
  else if (row.Status === "Esclarecida") cardBgStyle = "border-left: 4px solid #10B981; background: #ECFDF5;";
  else if (row.Status === "Em Discussão") cardBgStyle = "border-left: 4px solid #3B82F6; background: #EFF6FF;";
  card.className = "doubt-card";
  if (cardBgStyle) card.setAttribute("style", cardBgStyle);
  
  const dDate = new Date(row.Data);
  const formattedDate = !isNaN(dDate.getTime()) ? 
    dDate.toLocaleDateString("pt-BR") + " " + dDate.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : "";
    
  let autor = row.AutorExibicao || "Conselho";
  if (currentUser.perfil === "Administrador" && checkIsMockMode()) {
    autor = "Conselho";
  }
  
  let statusClass = "status-todo";
  if (row.Status === "Em Discussão") statusClass = "status-warn";
  else if (row.Status === "Esclarecida") statusClass = "status-ok";
  
  let answerHtml = "";
  if (row.Resposta) {
    const aDate = new Date(row.Data_Resposta);
    const formattedDateResp = !isNaN(aDate.getTime()) ? 
      aDate.toLocaleDateString("pt-BR") + " " + aDate.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : "";
    
    answerHtml = `
      <div class="doubt-answer-body" style="margin-top: 10px; margin-bottom: 15px;">
        <div class="doubt-answer-header">
          <span>Esclarecimento Técnico</span>
          <span>${row.Responsável} — ${formattedDateResp}</span>
        </div>
        <div class="doubt-answer-text">${row.Resposta}</div>
      </div>
    `;
  }
  
  const isWebmaster = currentUser.perfil === "Webmaster";
  const isRegulacao = currentUser.perfil === "Administrador" || isWebmaster;
  
  let inlineFormHtml = "";
  if (isRegulacao && isInlineAnswer) {
    inlineFormHtml = `
      <div class="inline-answer-container" id="inline-answer-box-${row.ID}" style="border-top: 1px solid var(--cms-border); background: var(--cms-off); padding: 15px; display: flex; flex-direction: column; gap: 10px;">
        <label style="font-weight: 700; font-size: 0.8rem; color: var(--cms-navy); text-transform: uppercase;">Responder diretamente:</label>
        <textarea id="inline-text-${row.ID}" rows="3" placeholder="Escreva o esclarecimento técnico oficial aqui..." required style="width: 100%; border: 1px solid var(--cms-border); padding: 10px; font-size: 0.85rem; border-radius: var(--border-radius-sm); resize: vertical;"></textarea>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--cms-muted);">Alterar Status:</label>
            <select id="inline-status-${row.ID}" style="padding: 5px; font-size: 0.8rem; border-radius: var(--border-radius-sm); border: 1px solid var(--cms-border);">
              <option value="Esclarecida">Esclarecida (Concluída)</option>
              <option value="Em Discussão">Em Discussão</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
          <button type="button" class="submit-btn btn-salvar-inline-resposta" data-id="${row.ID}" style="background: var(--cms-green); font-size: 0.8rem; padding: 6px 14px; border-radius: var(--border-radius-sm); border: none; color: white; cursor: pointer;">
            Salvar Resposta
          </button>
        </div>
      </div>
    `;
  } else if (isRegulacao && !row.Resposta) {
    inlineFormHtml = `
      <div style="padding: 10px 20px; border-top: 1px solid var(--cms-border); background: var(--cms-off); display: flex; justify-content: flex-end;">
        <button class="action-btn btn-expand-inline-responder" data-id="${row.ID}" style="background: var(--cms-navy); color: white; border: none; font-size: 0.8rem; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; border-radius: var(--border-radius-sm);">
          <i class="fa-solid fa-reply"></i> Responder
        </button>
      </div>
      <div class="inline-answer-container hidden" id="inline-answer-box-${row.ID}" style="border-top: 1px solid var(--cms-border); background: var(--cms-off); padding: 15px; display: flex; flex-direction: column; gap: 10px;">
        <label style="font-weight: 700; font-size: 0.8rem; color: var(--cms-navy); text-transform: uppercase;">Responder diretamente:</label>
        <textarea id="inline-text-${row.ID}" rows="3" placeholder="Escreva o esclarecimento técnico oficial aqui..." required style="width: 100%; border: 1px solid var(--cms-border); padding: 10px; font-size: 0.85rem; border-radius: var(--border-radius-sm); resize: vertical;"></textarea>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--cms-muted);">Alterar Status:</label>
            <select id="inline-status-${row.ID}" style="padding: 5px; font-size: 0.8rem; border-radius: var(--border-radius-sm); border: 1px solid var(--cms-border);">
              <option value="Esclarecida">Esclarecida (Concluída)</option>
              <option value="Em Discussão">Em Discussão</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="nav-btn btn-cancelar-inline-resposta" data-id="${row.ID}" style="background: white; border: 1px solid var(--cms-border); font-size: 0.8rem; padding: 6px 12px; border-radius: var(--border-radius-sm); cursor: pointer;">
              Cancelar
            </button>
            <button type="button" class="submit-btn btn-salvar-inline-resposta" data-id="${row.ID}" style="background: var(--cms-green); font-size: 0.8rem; padding: 6px 14px; border-radius: var(--border-radius-sm); border: none; color: white; cursor: pointer;">
              Salvar Resposta
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  card.innerHTML = `
    <div class="doubt-card-header">
      <div class="doubt-author"><i class="fa-solid fa-circle-user"></i> ${autor}</div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="badge-status ${statusClass}">${row.Status}</span>
        <span class="doubt-meta">${formattedDate}</span>
      </div>
    </div>
    <div class="doubt-question-body" style="padding: 15px 20px;">${row.Dúvida}</div>
    ${answerHtml}
    ${inlineFormHtml}
  `;
  
  // Bind nos botões inline do card
  const btnSalvar = card.querySelector(".btn-salvar-inline-resposta");
  if (btnSalvar) {
    btnSalvar.addEventListener("click", async () => {
      const txtArea = card.querySelector(`#inline-text-${row.ID}`);
      const selectStatus = card.querySelector(`#inline-status-${row.ID}`);
      const text = txtArea.value.trim();
      const status = selectStatus.value;
      if (!text) {
        alert("Por favor, digite uma resposta antes de salvar.");
        return;
      }
      await enviarRespostaDuvida(row.ID, text, status, btnSalvar);
    });
  }
  
  const btnExpand = card.querySelector(".btn-expand-inline-responder");
  const btnCancelInline = card.querySelector(".btn-cancelar-inline-resposta");
  const inlineBox = card.querySelector(`#inline-answer-box-${row.ID}`);
  
  if (btnExpand) {
    btnExpand.addEventListener("click", () => {
      inlineBox.classList.remove("hidden");
      btnExpand.classList.add("hidden");
    });
  }
  if (btnCancelInline) {
    btnCancelInline.addEventListener("click", () => {
      inlineBox.classList.add("hidden");
      btnExpand.classList.remove("hidden");
    });
  }
  
  return card;
}

async function enviarRespostaDuvida(id, resp, status, btnSubmitElement = null) {
  if (!resp) return;
  
  if (btnSubmitElement) {
    btnSubmitElement.disabled = true;
  }
  
  if (checkIsMockMode()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getLocalDuvidas();
        const row = list.find(d => d.ID === id);
        if (row) {
          row.Resposta = resp;
          row.Status = status;
          row.Responsável = currentUser.usuario;
          row.Data_Resposta = new Date().toISOString();
        }
        saveLocalDuvidas(list);
        showAlert("success", "✅ Respondido (Demo)", "Resposta salva localmente.");
        if (btnSubmitElement) btnSubmitElement.disabled = false;
        loadDashboardData();
        resolve(true);
      }, 500);
    });
  } else {
    try {
      const payload = {
        chave: currentUser.chave,
        acao: "responder_duvida",
        idDuvida: id,
        resposta: resp,
        novoStatus: status,
        clientIp: clientInfo.ip,
        clientLoc: clientInfo.loc,
        clientUa: clientInfo.ua
      };
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      const result = await response.json();
      if (result.status === "success") {
        showAlert("success", "✅ Resposta Enviada!", "Os conselheiros foram notificados por email.");
        loadDashboardData();
        return true;
      } else {
        showAlert("error", "Erro", result.message);
        return false;
      }
    } catch (err) {
      showAlert("error", "Erro de Rede", "Erro ao salvar esclarecimento.");
      return false;
    } finally {
      if (btnSubmitElement) btnSubmitElement.disabled = false;
    }
  }
}

// ── MÓDULO DE NOTIFICAÇÕES (DÚVIDAS PENDENTES) ──

function checkAndShowNotifications() {
  const pendentes = duvidasData.filter(d => d.Status === 'Pendente');
  const modal = document.getElementById('notification-modal');
  const list = document.getElementById('notification-doubts-list');
  if (!modal || !list) return;
  
  if (pendentes.length === 0) {
    modal.classList.add('hidden');
    return;
  }
  
  list.innerHTML = '';
  const isAdmin = currentUser && (currentUser.perfil === 'Administrador' || currentUser.perfil === 'Webmaster');
  
  pendentes.forEach(row => {
    const dDate = new Date(row.Data);
    const formattedDate = !isNaN(dDate.getTime()) ? dDate.toLocaleDateString('pt-BR') : '';
    const card = document.createElement('div');
    card.style.cssText = 'background:#FEF2F2; border:1px solid #FECACA; border-left:4px solid #DC2626; border-radius:8px; padding:16px;';
    
    const responseForm = isAdmin ? `
      <div style='margin-top:12px; display:flex; flex-direction:column; gap:8px; border-top:1px solid #FECACA; padding-top:12px;'>
        <textarea id='notif-resp-${row.ID}' rows='3' placeholder='Escreva o esclarecimento oficial...' style='width:100%; border:1px solid #E5E7EB; border-radius:6px; padding:10px; font-size:0.85rem; resize:vertical;'></textarea>
        <div style='display:flex; justify-content:flex-end; gap:8px; align-items:center;'>
          <select id='notif-status-${row.ID}' style='padding:6px 10px; border-radius:6px; border:1px solid #E5E7EB; font-size:0.8rem;'>
            <option value='Esclarecida'>Esclarecida</option>
            <option value='Em Discussão'>Em Discussão</option>
          </select>
          <button type='button' class='submit-btn btn-notif-salvar' data-id='${row.ID}' style='padding:6px 14px; font-size:0.8rem; background:var(--cms-green); border:none; cursor:pointer; border-radius:4px; color:white; font-family:var(--font-display); letter-spacing:0.5px;'>
            <i class='fa-solid fa-paper-plane'></i> Responder
          </button>
        </div>
      </div>
    ` : '';
    
    card.innerHTML = `
      <div style='display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;'>
        <div style='display:flex; align-items:center; gap:8px;'>
          <i class='fa-solid fa-circle-user' style='color:#DC2626; font-size:1.1rem;'></i>
          <strong style='font-size:0.85rem; color:#991B1B;'>${row.AutorExibicao || 'Conselho'}</strong>
        </div>
        <span style='font-size:0.75rem; color:#6B7280;'>${formattedDate}</span>
      </div>
      <p style='font-size:0.9rem; color:#1F2937; line-height:1.5;'>${row['Dúvida'] || ''}</p>
      ${responseForm}
    `;
    list.appendChild(card);
  });
  
  list.querySelectorAll('.btn-notif-salvar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const resp = document.getElementById(`notif-resp-${id}`)?.value.trim();
      const status = document.getElementById(`notif-status-${id}`)?.value || 'Esclarecida';
      if (!resp) { alert('Por favor, escreva uma resposta antes de enviar.'); return; }
      e.currentTarget.disabled = true;
      answerDoubtIdInput.value = id;
      answerTextInput.value = resp;
      answerStatusSelect.value = status;
      const row = duvidasData.find(d => d.ID === id);
      if (row) answerDoubtPreview.textContent = row['Dúvida'] || '';
      answerDoubtForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      modal.classList.add('hidden');
    });
  });
  
  modal.classList.remove('hidden');
}

// ── MÓDULO DE RELATÓRIOS (TÉCNICOS E GERADOR DINÂMICO) ──

let reportsEventsInitialized = false;

function renderReportsTab() {
  if (!reportsEventsInitialized) {
    initReportEvents();
    reportsEventsInitialized = true;
  }
  renderRelatorios();
  generateFilteredReport();
}

function initReportEvents() {
  const btnSubtabTecnicos = document.getElementById("btn-subtab-tecnicos");
  const btnSubtabGerador = document.getElementById("btn-subtab-gerador");
  const btnSubtabDinamico = document.getElementById("btn-subtab-dinamico");
  const subtabTecnicosContent = document.getElementById("subtab-tecnicos-content");
  const subtabGeradorContent = document.getElementById("subtab-gerador-content");
  const subtabDinamicoContent = document.getElementById("subtab-dinamico-content");
  
  // Alternância de Sub-Abas
  btnSubtabTecnicos.addEventListener("click", () => {
    btnSubtabTecnicos.style.background = "var(--cms-blue)";
    btnSubtabTecnicos.style.color = "white";
    btnSubtabGerador.style.background = "var(--cms-white)";
    btnSubtabGerador.style.color = "var(--cms-navy)";
    if(btnSubtabDinamico) {
      btnSubtabDinamico.style.background = "var(--cms-white)";
      btnSubtabDinamico.style.color = "var(--cms-navy)";
    }
    subtabTecnicosContent.classList.remove("hidden");
    subtabGeradorContent.classList.add("hidden");
    if(subtabDinamicoContent) subtabDinamicoContent.classList.add("hidden");
  });
  
  btnSubtabGerador.addEventListener("click", () => {
    btnSubtabGerador.style.background = "var(--cms-blue)";
    btnSubtabGerador.style.color = "white";
    btnSubtabTecnicos.style.background = "var(--cms-white)";
    btnSubtabTecnicos.style.color = "var(--cms-navy)";
    if(btnSubtabDinamico) {
      btnSubtabDinamico.style.background = "var(--cms-white)";
      btnSubtabDinamico.style.color = "var(--cms-navy)";
    }
    subtabGeradorContent.classList.remove("hidden");
    subtabTecnicosContent.classList.add("hidden");
    if(subtabDinamicoContent) subtabDinamicoContent.classList.add("hidden");
    generateFilteredReport();
  });

  if (btnSubtabDinamico) {
    btnSubtabDinamico.addEventListener("click", () => {
      btnSubtabDinamico.style.background = "var(--cms-blue)";
      btnSubtabDinamico.style.color = "white";
      btnSubtabTecnicos.style.background = "var(--cms-white)";
      btnSubtabTecnicos.style.color = "var(--cms-navy)";
      btnSubtabGerador.style.background = "var(--cms-white)";
      btnSubtabGerador.style.color = "var(--cms-navy)";
      subtabDinamicoContent.classList.remove("hidden");
      subtabTecnicosContent.classList.add("hidden");
      subtabGeradorContent.classList.add("hidden");
      renderRelatorios();
    });
  }

  // Eventos de Filtro no Gerador
  const filterEnt = document.getElementById("rep-filter-entidade");
  const filterTipo = document.getElementById("rep-filter-tipo");
  const filterStat = document.getElementById("rep-filter-status");
  
  if(filterEnt) filterEnt.addEventListener("change", generateFilteredReport);
  if(filterTipo) filterTipo.addEventListener("change", generateFilteredReport);
  if(filterStat) filterStat.addEventListener("change", generateFilteredReport);
  
  // Checkboxes de colunas
  const checkboxes = document.querySelectorAll('#report-generator-form input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener("change", generateFilteredReport);
  });
  
  // Ações de exportar
  const btnRepCopy = document.getElementById("btn-rep-copy");
  if(btnRepCopy) btnRepCopy.addEventListener("click", copyReportToClipboard);
  
  const reportGenForm = document.getElementById("report-generator-form");
  if(reportGenForm) reportGenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    exportReportToCSV();
  });
}

// ========================
// FUNÇÕES DAS TASKS 5 E 9
// ========================

function initColumnToggle() {
  const btnToggleColumns = document.getElementById("btn-toggle-columns");
  const columnsDropdown = document.getElementById("columns-dropdown");
  const toggleCols = document.querySelectorAll(".toggle-col");

  if (btnToggleColumns && columnsDropdown) {
    btnToggleColumns.addEventListener("click", () => {
      columnsDropdown.classList.toggle("hidden");
    });
    
    document.addEventListener("click", (e) => {
      if (!btnToggleColumns.contains(e.target) && !columnsDropdown.contains(e.target)) {
        columnsDropdown.classList.add("hidden");
      }
    });
  }

  const savedCols = JSON.parse(localStorage.getItem("cms_hidden_columns") || "[]");
  
  toggleCols.forEach(checkbox => {
    const colClass = checkbox.getAttribute("data-col");
    if (savedCols.includes(colClass)) {
      checkbox.checked = false;
      hideColumn(colClass, true);
    }
    
    checkbox.addEventListener("change", (e) => {
      const col = e.target.getAttribute("data-col");
      hideColumn(col, !e.target.checked);
      
      const currentHidden = Array.from(toggleCols).filter(cb => !cb.checked).map(cb => cb.getAttribute("data-col"));
      localStorage.setItem("cms_hidden_columns", JSON.stringify(currentHidden));
    });
  });
}

function hideColumn(colClass, hide) {
  const styleElId = "style-hide-" + colClass;
  let styleEl = document.getElementById(styleElId);
  
  function getColumnIndex(cls) {
    const map = {
      "col-entidade": 2, "col-num": 3, "col-parl": 5, "col-val": 7, "col-status": 8, "col-acoes": 9
    };
    return map[cls] || 0;
  }
  
  if (hide) {
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleElId;
      styleEl.innerHTML = `.${colClass} { display: none !important; } th:nth-child(${getColumnIndex(colClass)}), td:nth-child(${getColumnIndex(colClass)}) { display: none !important; }`;
      document.head.appendChild(styleEl);
    }
  } else {
    if (styleEl) {
      styleEl.remove();
    }
  }
}

function renderRelatorios() {
  const container = document.getElementById("dynamic-reports-container");
  if (!container) return;
  
  const statusCounts = {};
  const parlVals = {};
  const entVals = {};
  
  emendasData.forEach(row => {
    const status = row["Status"] || "Desconhecido";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    
    const parl = row["Parlamentar / Autor"] || "Não Informado";
    const val = parseFloat(row["Valor"]) || 0;
    parlVals[parl] = (parlVals[parl] || 0) + val;
    
    const ent = row["Entidade"] || "Não Informada";
    entVals[ent] = (entVals[ent] || 0) + val;
  });
  
  const sortedParl = Object.entries(parlVals).sort((a,b) => b[1] - a[1]).slice(0, 5);
  const sortedEnt = Object.entries(entVals).sort((a,b) => b[1] - a[1]).slice(0, 5);
  
  const formatCurrency = val => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  const renderBars = (dataArray, maxValue) => dataArray.map(([label, val]) => {
    const pct = maxValue > 0 ? (val / maxValue) * 100 : 0;
    return `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px; font-weight: 600; color: var(--cms-navy);">
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%;">${label}</span>
          <span>${formatCurrency(val)}</span>
        </div>
        <div style="background: var(--cms-off); height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="width: ${pct}%; background: var(--cms-blue); height: 100%; border-radius: 4px;"></div>
        </div>
      </div>
    `;
  }).join('');
  
  const renderStatus = () => Object.entries(statusCounts).map(([status, count]) => {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--cms-border); padding: 8px 0;">
        <span style="font-size: 0.85rem; color: var(--cms-navy); font-weight: 600;">${status}</span>
        <span style="background: var(--cms-yellow); color: var(--cms-navy); font-weight: bold; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">${count}</span>
      </div>
    `;
  }).join('');
  
  const maxParl = sortedParl.length ? sortedParl[0][1] : 0;
  const maxEnt = sortedEnt.length ? sortedEnt[0][1] : 0;
  
  container.innerHTML = `
    <div style="background: white; border: 1px solid var(--cms-border); border-radius: var(--border-radius-sm); padding: 15px;">
      <h4 style="margin-bottom: 15px; color: var(--cms-navy); font-family: var(--font-display);"><i class="fa-solid fa-list-check"></i> Propostas por Status</h4>
      ${renderStatus()}
    </div>
    <div style="background: white; border: 1px solid var(--cms-border); border-radius: var(--border-radius-sm); padding: 15px;">
      <h4 style="margin-bottom: 15px; color: var(--cms-navy); font-family: var(--font-display);"><i class="fa-solid fa-user-tie"></i> Top 5 Parlamentares (Valores)</h4>
      ${renderBars(sortedParl, maxParl)}
    </div>
    <div style="background: white; border: 1px solid var(--cms-border); border-radius: var(--border-radius-sm); padding: 15px;">
      <h4 style="margin-bottom: 15px; color: var(--cms-navy); font-family: var(--font-display);"><i class="fa-solid fa-hospital"></i> Top 5 Entidades (Valores)</h4>
      ${renderBars(sortedEnt, maxEnt)}
    </div>
  `;
}

function getFilteredReportData() {
  const entVal = document.getElementById("rep-filter-entidade").value;
  const tipoVal = document.getElementById("rep-filter-tipo").value;
  const statusVal = document.getElementById("rep-filter-status").value;
  
  return emendasData.filter(row => {
    const entidade = (row["Entidade"] || "").toString();
    const tipo = (row["Tipo"] || "").toString();
    const status = (row["Status"] || "").toString();
    
    const matchesEnt = !entVal || entidade === entVal;
    const matchesTipo = !tipoVal || tipo === tipoVal;
    const matchesStatus = !statusVal || status === statusVal;
    
    return matchesEnt && matchesTipo && matchesStatus;
  });
}

function generateFilteredReport() {
  const filtered = getFilteredReportData();
  
  // 1. Atualizar cards de resumo financeiro
  const totalValue = filtered.reduce((acc, row) => acc + (parseFloat(row["Valor"]) || 0), 0);
  document.getElementById("rep-summary-total-value").textContent = formatCurrency(totalValue);
  document.getElementById("rep-summary-total-count").textContent = filtered.length;
  
  // 2. Montar cabeçalho e corpo da tabela de pré-visualização com base nas colunas selecionadas
  const thead = document.getElementById("report-preview-thead");
  const tbody = document.getElementById("report-preview-tbody");
  
  thead.innerHTML = "";
  tbody.innerHTML = "";
  
  // Identificar colunas selecionadas
  const selectedCols = [];
  const checkboxes = document.querySelectorAll('#report-generator-form input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selectedCols.push({
        id: cb.getAttribute("data-col"),
        label: cb.parentElement.textContent.trim()
      });
    }
  });
  
  if (selectedCols.length === 0) {
    thead.innerHTML = "<tr><th>Nenhuma coluna selecionada</th></tr>";
    return;
  }
  
  // Renderizar o thead
  const trHead = document.createElement("tr");
  selectedCols.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col.label;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  
  // Renderizar o tbody (limitar a 30 linhas para pré-visualização rápida)
  const previewRows = filtered.slice(0, 30);
  if (previewRows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = selectedCols.length;
    td.textContent = "Nenhuma emenda corresponde aos filtros definidos.";
    td.style.textAlign = "center";
    td.style.color = "var(--cms-muted)";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  
  previewRows.forEach(row => {
    const tr = document.createElement("tr");
    selectedCols.forEach(col => {
      const td = document.createElement("td");
      let val = row[col.id];
      
      // Formatação especial
      if (col.id === "Valor") {
        val = formatCurrency(parseFloat(val) || 0);
      } else if (col.id === "Data de Envio" && val) {
        const d = new Date(val);
        val = !isNaN(d.getTime()) ? d.toLocaleDateString("pt-BR") : val;
      }
      
      td.textContent = val !== undefined && val !== null ? val : "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function exportReportToCSV() {
  const filtered = getFilteredReportData();
  if (filtered.length === 0) {
    showAlert("error", "Sem Dados", "Não há dados para exportar com os filtros atuais.");
    return;
  }
  
  // Identificar colunas selecionadas
  const selectedCols = [];
  const checkboxes = document.querySelectorAll('#report-generator-form input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selectedCols.push({
        id: cb.getAttribute("data-col"),
        label: cb.parentElement.textContent.trim()
      });
    }
  });
  
  if (selectedCols.length === 0) {
    showAlert("error", "Sem Colunas", "Selecione pelo menos uma coluna para exportar.");
    return;
  }
  
  // Montar CSV string (Excel em pt-BR usa ponto e vírgula ";" como separador e codificação UTF-8 com BOM)
  let csvContent = "\ufeff"; // UTF-8 BOM
  
  // Cabeçalho
  csvContent += selectedCols.map(col => `"${col.label.replace(/"/g, '""')}"`).join(";") + "\n";
  
  // Conteúdo
  filtered.forEach(row => {
    const line = selectedCols.map(col => {
      let val = row[col.id];
      if (col.id === "Valor") {
        val = (parseFloat(val) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else if (col.id === "Data de Envio" && val) {
        const d = new Date(val);
        val = !isNaN(d.getTime()) ? d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : val;
      }
      
      val = val !== undefined && val !== null ? val.toString() : "";
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvContent += line.join(";") + "\n";
  });
  
  // Download do arquivo
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const dateStr = new Date().toISOString().slice(0,10);
  link.setAttribute("href", url);
  link.setAttribute("download", `Relatorio_Emendas_CMS_${dateStr}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  logActionOnServer("log_export_csv", `Exportou relatório de emendas em CSV com ${filtered.length} registros.`);
  showAlert("success", "Exportado", "O download do relatório CSV começou automaticamente.");
}

function copyReportToClipboard() {
  const filtered = getFilteredReportData();
  if (filtered.length === 0) {
    showAlert("error", "Sem Dados", "Não há dados para copiar.");
    return;
  }
  
  const selectedCols = [];
  const checkboxes = document.querySelectorAll('#report-generator-form input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selectedCols.push({
        id: cb.getAttribute("data-col"),
        label: cb.parentElement.textContent.trim()
      });
    }
  });
  
  if (selectedCols.length === 0) return;
  
  // Separador de tabulação para colar direto em Excel/Sheets
  let textContent = selectedCols.map(col => col.label).join("\t") + "\n";
  
  filtered.forEach(row => {
    const line = selectedCols.map(col => {
      let val = row[col.id];
      if (col.id === "Valor") {
        val = (parseFloat(val) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else if (col.id === "Data de Envio" && val) {
        const d = new Date(val);
        val = !isNaN(d.getTime()) ? d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : val;
      }
      return val !== undefined && val !== null ? val.toString().replace(/\t/g, ' ') : "";
    });
    textContent += line.join("\t") + "\n";
  });
  
  navigator.clipboard.writeText(textContent).then(() => {
    showAlert("success", "Copiado", "Os dados filtrados foram copiados para a área de transferência!");
  });
}

// ========================
// FUNÇÃO EXPORTAR CSV (DASHBOARD)
// ========================

function exportFilteredDataToCSV() {
  if (!currentFilteredData || currentFilteredData.length === 0) {
    showAlert("warning", "Nenhum dado", "Não há dados filtrados para exportar.");
    return;
  }
  
  // Extrair todos os cabecalhos baseados no primeiro registro
  const headers = ["Data de Envio", "Entidade", "Número da Emenda", "Tipo", "Parlamentar / Autor", "Resolução/Documento", "Valor", "Objeto/Finalidade", "Status"];
  
  let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(";") + "\n";
  
  currentFilteredData.forEach(row => {
    const line = headers.map(header => {
      let val = row[header];
      if (header === "Valor") {
        val = (parseFloat(val) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else if (header === "Data de Envio" && val) {
        const d = new Date(val);
        val = !isNaN(d.getTime()) ? d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}) : val;
      }
      
      let strVal = val !== undefined && val !== null ? val.toString().replace(/"/g, '""') : "";
      return `"${strVal}"`;
    });
    
    csvContent += line.join(";") + "\n";
  });
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `emendas_filtradas_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showAlert("success", "Exportado", "Arquivo CSV gerado com sucesso!");
}

