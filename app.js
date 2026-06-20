/**
 * CONFIGURAÇÃO DO BACKEND:
 * Cole a URL do seu Google Apps Script (Web App) publicado abaixo.
 * Se mantiver o valor padrão, o aplicativo funcionará no "Modo de Demonstração"
 * utilizando dados salvos localmente no navegador (localStorage).
 */
const API_URL = "https://script.google.com/macros/s/AKfycbzelLvubXmBmiDd9z7rynQHejNZiY2XdOoQxrXTPLfOFF4ng7m352iWEOA1rECivqioNw/exec";

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
  clientInfo = await fetchClientInfo();
  checkSession();
  initTabs();
  initDragAndDrop();
  initFormValidation();
  initEditModal();
  initPasswordModals();
  initDoubtModals();
  
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
  
  userDisplayName.textContent = `${currentUser.usuario} (${currentUser.perfil})`;
  
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
      
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      
      tab.classList.add("active");
      const targetEl = document.getElementById(targetTab);
      if (targetEl) targetEl.classList.add("active");
      
      if (targetTab === "tab-duvidas") {
        renderDoubtBoard();
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

// ── FLUXO DE ALTERAÇÃO DE CHAVE ──

function initPasswordModals() {
  // Modal de primeiro acesso obrigatório
  forcePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newKey = forceNewPasswordInput.value.trim().toUpperCase();
    const confKey = forceConfirmPasswordInput.value.trim().toUpperCase();
    
    if (newKey.length < 4) {
      showInputError(forceNewPasswordInput, forcePasswordErrorMsg, "A nova chave deve ter pelo menos 4 caracteres.");
      return;
    }
    
    if (newKey !== confKey) {
      showInputError(forceConfirmPasswordInput, forcePasswordErrorMsg, "As chaves não conferem.");
      return;
    }
    
    // Validar que começa com o primeiro nome do conselheiro
    const firstWordOfUser = tempUser.usuario.split("(")[0].trim().split(" ")[0];
    const normalizedFirstName = removerAcentos(firstWordOfUser).toUpperCase();
    const normalizedNewKey = removerAcentos(newKey).toUpperCase();
    
    if (!normalizedNewKey.startsWith(normalizedFirstName)) {
      showInputError(forceNewPasswordInput, forcePasswordErrorMsg, `A sua nova chave deve começar com o seu primeiro nome: ${normalizedFirstName}`);
      return;
    }
    
    btnForceSubmit.disabled = true;
    btnForceSubmit.querySelector(".btn-text").classList.add("hidden");
    btnForceSubmit.querySelector(".spinner").classList.remove("hidden");
    
    const isMock = checkIsMockMode();
    
    if (isMock) {
      setTimeout(() => {
        if (checkMockKeyExists(newKey, tempUser.chave)) {
          showInputError(forceNewPasswordInput, forcePasswordErrorMsg, "Esta chave já está em uso por outro conselheiro.");
          btnForceSubmit.disabled = false;
          btnForceSubmit.querySelector(".btn-text").classList.remove("hidden");
          btnForceSubmit.querySelector(".spinner").classList.add("hidden");
          return;
        }
        
        salvarNovaChaveMock(tempUser.chave, newKey);
        currentUser = { chave: newKey, usuario: tempUser.usuario, perfil: tempUser.perfil };
        localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
        applyUserPermissions();
        forcePasswordOverlay.classList.add("hidden");
        loginOverlay.classList.add("hidden");
        loadDashboardData();
        forcePasswordForm.reset();
        btnForceSubmit.disabled = false;
        btnForceSubmit.querySelector(".btn-text").classList.remove("hidden");
        btnForceSubmit.querySelector(".spinner").classList.add("hidden");
        showAlert("success", "Chave Atualizada", "Sua nova chave de acesso foi salva!");
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
          localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
          applyUserPermissions();
          forcePasswordOverlay.classList.add("hidden");
          loginOverlay.classList.add("hidden");
          loadDashboardData();
          forcePasswordForm.reset();
          showAlert("success", "Chave Atualizada", "Sua nova chave de acesso foi configurada com sucesso.");
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
    generalChangePwdForm.reset();
    generalPwdErrorMsg.parentElement.classList.remove("invalid");
    changePasswordModal.classList.remove("hidden");
  });
  
  btnCancelPwdModal.addEventListener("click", () => changePasswordModal.classList.add("hidden"));
  btnClosePwdModal.addEventListener("click", () => changePasswordModal.classList.add("hidden"));
  
  generalChangePwdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newKey = generalNewPasswordInput.value.trim().toUpperCase();
    const confKey = generalConfirmPasswordInput.value.trim().toUpperCase();
    
    if (newKey.length < 4) {
      showInputError(generalNewPasswordInput, generalPwdErrorMsg, "Mínimo 4 caracteres.");
      return;
    }
    
    if (newKey !== confKey) {
      showInputError(generalConfirmPasswordInput, generalPwdErrorMsg, "As chaves não conferem.");
      return;
    }
    
    // Validar que começa com o primeiro nome do conselheiro
    const firstWordOfUser = currentUser.usuario.split("(")[0].trim().split(" ")[0];
    const normalizedFirstName = removerAcentos(firstWordOfUser).toUpperCase();
    const normalizedNewKey = removerAcentos(newKey).toUpperCase();
    
    if (!normalizedNewKey.startsWith(normalizedFirstName)) {
      showInputError(generalNewPasswordInput, generalPwdErrorMsg, `A sua nova chave deve começar com o seu primeiro nome: ${normalizedFirstName}`);
      return;
    }
    
    const btnSave = document.getElementById("btn-save-pwd-modal");
    btnSave.disabled = true;
    
    const isMock = checkIsMockMode();
    
    if (isMock) {
      if (checkMockKeyExists(newKey, currentUser.chave)) {
        showInputError(generalNewPasswordInput, generalPwdErrorMsg, "Esta chave já está em uso por outro conselheiro.");
        btnSave.disabled = false;
        return;
      }
      salvarNovaChaveMock(currentUser.chave, newKey);
      currentUser.chave = newKey;
      localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
      showAlert("success", "Chave Alterada", "Chave de acesso alterada com sucesso.");
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
          showAlert("success", "Chave Alterada", "Sua chave de acesso foi alterada no Google Sheets!");
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
      objeto: editObjeto.value || "Não informado"
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
    const matchesStatus = !statusFilter || status === statusFilter;
    
    return matchesText && matchesEnt && matchesStatus;
  });
  
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
    if (isWebmaster) {
      statusCellContent = `
        <select class="status-select-inline" data-numero="${numero}">
          <option value="Recebido" ${status === "Recebido" ? "selected" : ""}>Recebido</option>
          <option value="Em Análise" ${status === "Em Análise" ? "selected" : ""}>Em Análise</option>
          <option value="Aprovado" ${status === "Aprovado" ? "selected" : ""}>Aprovado</option>
          <option value="Devolvido para Correção" ${status === "Devolvido para Correção" ? "selected" : ""}>Devolvido p/ Corr.</option>
        </select>
      `;
    } else {
      let statusClass = "status-todo";
      if (status === "Em Análise") statusClass = "status-warn";
      else if (status === "Aprovado") statusClass = "status-ok";
      else if (status === "Devolvido para Correção") statusClass = "status-elim";
      statusCellContent = `<span class="badge-status ${statusClass}">${status}</span>`;
    }
    
    const pdfUrl = row["Link do PDF"] || "#";
    let actionCellContent = "";
    
    if (pdfUrl !== "#") {
      actionCellContent = `<a href="${pdfUrl}" target="_blank" class="action-btn download-trigger" data-numero="${numero}" data-entidade="${row["Entidade"]}"><i class="fa-solid fa-file-pdf"></i> PDF</a>`;
    } else {
      actionCellContent = `<span style="color: var(--cms-muted);">Sem arquivo</span>`;
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
    
    tr.innerHTML = `
      <td>${formattedDate}</td>
      <td style="font-weight: 600; color: var(--cms-navy);">${row["Entidade"]}</td>
      <td><strong>${numero}</strong></td>
      <td><span class="badge-status status-todo" style="background: #E0F2FE; color: #0369A1;">${row["Tipo"]}</span></td>
      <td><strong>${row["Parlamentar / Autor"] || "Não informado"}</strong></td>
      <td>${row["Resolução/Documento"] || "Não informado"}</td>
      <td><strong style="color: var(--cms-blue);">${formatCurrency(valor)}</strong></td>
      <td>${statusCellContent}</td>
      <td style="white-space: nowrap; display: flex; gap: 4px; align-items: center;">${actionCellContent}</td>
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
  statTotalCount.textContent = dataList.length;
  heroTotalCount.textContent = dataList.length;
  
  const totalValue = dataList.reduce((acc, row) => acc + (parseFloat(row["Valor"]) || 0), 0);
  const formattedTotal = formatCurrency(totalValue);
  statTotalValue.textContent = formattedTotal;
  heroTotalValue.textContent = formattedTotal;
  
  const pendingCount = dataList.filter(row => {
    const status = row["Status"] || "Recebido";
    return status === "Recebido" || status === "Em Análise";
  }).length;
  statPendingCount.textContent = pendingCount;
  
  const approvedCount = dataList.filter(row => row["Status"] === "Aprovado").length;
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
