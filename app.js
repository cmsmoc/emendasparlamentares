/**
 * CONFIGURAÇÃO DO BACKEND:
 * Cole a URL do seu Google Apps Script (Web App) publicado abaixo.
 * Se mantiver o valor padrão, o aplicativo funcionará no "Modo de Demonstração"
 * utilizando dados salvos localmente no navegador (localStorage).
 */
const API_URL = "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI";

// Banco de dados de chaves de demonstração
const MOCK_KEYS = {
  "PREFEITURA-EMENDAS-2026": { usuario: "Setor de Emendas MOC", perfil: "Administrador" },
  "WEBMASTER-ADMIN-CMS": { usuario: "Webmaster Técnico CMS", perfil: "Webmaster" }
};
// Gerar chaves fictícias para os 65 conselheiros de demonstração
for (let i = 1; i <= 65; i++) {
  const numStr = i < 10 ? "0" + i : i.toString();
  MOCK_KEYS[`CMS-CONSELHEIRO-${numStr}`] = {
    usuario: `Conselheiro Titular ${numStr}`,
    perfil: "Conselheiro"
  };
}

// Banco de dados simulado inicial
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
    "Parlamentar / Autor": "Farley (Emenda 50410001)",
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

// Estado global da aplicação
let emendasData = [];
let currentUser = null; // { chave, usuario, perfil }
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

// Elementos Dashboard
const tableBody = document.getElementById("table-body");
const tableLoading = document.getElementById("table-loading");
const noDataMsg = document.getElementById("no-data-msg");
const searchInput = document.getElementById("search-input");
const filterEntidade = document.getElementById("filter-entidade");
const filterStatus = document.getElementById("filter-status");
const btnRefresh = document.getElementById("btn-refresh");

// Elementos Estatísticas Dashboard & Hero
const statTotalCount = document.getElementById("stat-total-count");
const statTotalValue = document.getElementById("stat-total-value");
const statPendingCount = document.getElementById("stat-pending-count");
const statApprovedCount = document.getElementById("stat-approved-count");
const heroTotalValue = document.getElementById("hero-total-value");
const heroTotalCount = document.getElementById("hero-total-count");

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Obter IP e Localização do Cliente
  clientInfo = await fetchClientInfo();
  
  // 2. Verificar Sessão Existente
  checkSession();

  // 3. Inicializar Componentes de Interface
  initTabs();
  initDragAndDrop();
  initFormValidation();
  
  // Configurar Login
  loginForm.addEventListener("submit", handleLoginSubmit);
  btnLogout.addEventListener("click", handleLogout);
  
  // Event listeners para filtros do dashboard
  searchInput.addEventListener("input", filterData);
  filterEntidade.addEventListener("change", filterData);
  filterStatus.addEventListener("change", filterData);
  btnRefresh.addEventListener("click", () => loadDashboardData(true));
  
  // Configurar alertas com botão de fechar
  document.querySelectorAll(".alert-close").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.currentTarget.parentElement.classList.add("hidden");
    });
  });
});

// AVALIAÇÃO DE CONEXÃO E IP
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
    console.warn("ipapi.co indisponível, tentando ipify...");
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      if (response.ok) {
        const data = await response.json();
        info.ip = data.ip || "Desconhecido";
        info.loc = "Desconhecido (Localização Bloqueada)";
      }
    } catch (err) {
      console.error("Falha ao obter IP do cliente: ", err);
    }
  }
  return info;
}

// VERIFICAÇÃO DE AUTENTICAÇÃO
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

// APLICAR PERMISSÕES BASEADAS EM PERFIL
function applyUserPermissions() {
  if (!currentUser) return;
  
  userDisplayName.textContent = `${currentUser.usuario} (${currentUser.perfil})`;
  
  const uploadTab = document.getElementById("btn-tab-upload");
  
  if (currentUser.perfil === "Conselheiro") {
    // Esconder aba de cadastro e forçar a aba do Dashboard como ativa
    if (uploadTab) uploadTab.style.display = "none";
    
    // Garantir que a aba ativa seja a do dashboard
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    
    document.getElementById("btn-tab-dashboard").classList.add("active");
    document.getElementById("tab-dashboard").classList.add("active");
  } else {
    // Perfis Administrador ou Webmaster
    if (uploadTab) uploadTab.style.display = "flex";
  }
}

// LOGIN SUBMISSION
async function handleLoginSubmit(e) {
  e.preventDefault();
  
  const key = loginKeyInput.value.trim();
  if (!key) return;
  
  // Set Loading
  btnLogin.disabled = true;
  btnLogin.querySelector(".login-btn-text").classList.add("hidden");
  btnLogin.querySelector(".login-spinner").classList.remove("hidden");
  loginKeyInput.parentElement.classList.remove("invalid");
  
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    // MODO DEMONSTRAÇÃO LOCAL
    setTimeout(() => {
      const match = MOCK_KEYS[key];
      if (match) {
        currentUser = {
          chave: key,
          usuario: match.usuario,
          perfil: match.perfil
        };
        localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
        applyUserPermissions();
        loginOverlay.classList.add("hidden");
        loadDashboardData();
      } else {
        loginKeyInput.parentElement.classList.add("invalid");
        loginErrorMsg.textContent = "Chave inválida. Use 'CMS-CONSELHEIRO-01' ou 'PREFEITURA-EMENDAS-2026' para testar.";
      }
      btnLogin.disabled = false;
      btnLogin.querySelector(".login-btn-text").classList.remove("hidden");
      btnLogin.querySelector(".login-spinner").classList.add("hidden");
    }, 1000);
  } else {
    // VALIDAÇÃO COM O GOOGLE APPS SCRIPT
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
        currentUser = {
          chave: key,
          usuario: result.profile.usuario,
          perfil: result.profile.perfil
        };
        localStorage.setItem("cms_user_session", JSON.stringify(currentUser));
        applyUserPermissions();
        loginOverlay.classList.add("hidden");
        loadDashboardData();
      } else {
        loginKeyInput.parentElement.classList.add("invalid");
        loginErrorMsg.textContent = result.message || "Erro na validação da chave.";
      }
    } catch (err) {
      console.error(err);
      loginKeyInput.parentElement.classList.add("invalid");
      loginErrorMsg.textContent = "Falha ao se conectar com o servidor. Verifique sua URL.";
    } finally {
      btnLogin.disabled = false;
      btnLogin.querySelector(".login-btn-text").classList.remove("hidden");
      btnLogin.querySelector(".login-spinner").classList.add("hidden");
    }
  }
}

// LOGOUT
function handleLogout() {
  localStorage.removeItem("cms_user_session");
  currentUser = null;
  resetFileSelection();
  proposalForm.reset();
  loginForm.reset();
  loginOverlay.classList.remove("hidden");
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
      document.getElementById(targetTab).classList.add("active");
      
      if (targetTab === "tab-dashboard") {
        loadDashboardData();
      }
    });
  });
}

// DRAG AND DROP
function initDragAndDrop() {
  dropzone.addEventListener("click", (e) => {
    if (e.target !== removeFileBtn && !removeFileBtn.contains(e.target)) {
      fileInput.click();
    }
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
    const dt = e.dataTransfer;
    const files = dt.files;
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
  
  if (file.size > 15 * 1024 * 1024) {
    showInputError(fileInput, errorMsg, "O tamanho do arquivo excede o limite de 15MB.");
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

// FORM VALIDATION
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

function showInputError(inputEl, errorEl, msg) {
  inputEl.parentElement.classList.add("invalid");
  errorEl.textContent = msg;
}

// ENVIO DE PROPOSTA
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
    // MODO DEMO
    setTimeout(() => {
      const localData = getLocalDb();
      const newProposal = {
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
      };
      
      localData.push(newProposal);
      saveLocalDb(localData);
      
      showAlert("success", "✅ Sucesso (Modo Demo)", "A proposta foi salva no armazenamento local do navegador! Ação registrada nos logs.");
      proposalForm.reset();
      resetFileSelection();
      setLoadingState(false);
      loadDashboardData();
    }, 1200);
  } else {
    // API GOOGLE
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      const result = await response.json();
      
      if (result.status === "success") {
        showAlert("success", "✅ Proposta Enviada!", "O plano de trabalho foi salvo no Google Drive e registrado na planilha.");
        proposalForm.reset();
        resetFileSelection();
        loadDashboardData();
      } else {
        showAlert("error", "❌ Erro no Servidor", result.message || "Erro desconhecido.");
      }
    } catch (error) {
      showAlert("error", "❌ Falha de Rede", "Erro de conexão com a API.");
    } finally {
      setLoadingState(false);
    }
  }
}

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

// ALERTS
function showAlert(type, title, desc) {
  statusAlert.className = `alert alert-${type}`;
  statusAlert.querySelector(".alert-title").textContent = title;
  statusAlert.querySelector(".alert-desc").textContent = desc;
  statusAlert.querySelector(".alert-icon i").className = type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation";
  statusAlert.classList.remove("hidden");
  setTimeout(() => statusAlert.classList.add("hidden"), 8000);
}

// DASHBOARD DATA FETCH
async function loadDashboardData(forceRefresh = false) {
  if (!currentUser) return;
  tableLoading.classList.remove("hidden");
  
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    setTimeout(() => {
      emendasData = getLocalDb();
      renderDashboard();
      tableLoading.classList.add("hidden");
    }, 450);
  } else {
    try {
      const cacheBuster = forceRefresh ? `&t=${new Date().getTime()}` : '';
      const response = await fetch(`${API_URL}?chave=${currentUser.chave}&ip=${clientInfo.ip}&loc=${clientInfo.loc}&ua=${clientInfo.ua}${cacheBuster}`);
      const result = await response.json();
      
      if (result.status === "success") {
        emendasData = result.data;
        renderDashboard();
      } else {
        showAlert("error", "❌ Erro de Acesso", result.message || "Chave não autorizada.");
        handleLogout();
      }
    } catch (error) {
      console.error(error);
      emendasData = getLocalDb();
      renderDashboard();
      showAlert("error", "❌ Offline", "Exibindo dados armazenados em cache local.");
    } finally {
      tableLoading.classList.add("hidden");
    }
  }
}

function renderDashboard() {
  filterData();
}

// FILTRAGEM E RENDERIZAÇÃO DA TABELA
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
  
  const isAdmin = currentUser.perfil === "Administrador" || currentUser.perfil === "Webmaster";
  
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
    
    // Render de Status: Dropdown interativo para Administrador, Badge estática para Conselheiro
    let statusCellContent = "";
    if (isAdmin) {
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
    
    // Ações: Botão de Download + Botão de Exclusão (apenas para Admin)
    const pdfUrl = row["Link do PDF"] || "#";
    let actionCellContent = "";
    
    if (pdfUrl !== "#") {
      actionCellContent = `<a href="${pdfUrl}" target="_blank" class="action-btn download-trigger" data-numero="${numero}" data-entidade="${row["Entidade"]}"><i class="fa-solid fa-external-link"></i> Ver PDF</a>`;
    } else {
      actionCellContent = `<span style="color: var(--cms-muted);">Sem arquivo</span>`;
    }
    
    if (isAdmin) {
      actionCellContent += `
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
      <td style="white-space: nowrap; display: flex; gap: 6px; align-items: center;">${actionCellContent}</td>
    `;
    
    tableBody.appendChild(tr);
  });
  
  // Vincular eventos nas ações geradas dinamicamente
  bindTableActions();
}

function bindTableActions() {
  // 1. Logs de cliques em PDF (Downloads)
  document.querySelectorAll(".download-trigger").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const num = e.currentTarget.getAttribute("data-numero");
      const entidade = e.currentTarget.getAttribute("data-entidade");
      logActionOnServer("log_download", `Baixou o PDF do plano de trabalho da emenda nº ${num} (${entidade}).`);
    });
  });

  // 2. Mudança de Status Inline (Admin apenas)
  document.querySelectorAll(".status-select-inline").forEach(select => {
    select.addEventListener("change", async (e) => {
      const num = e.target.getAttribute("data-numero");
      const novoStatus = e.target.value;
      await updateStatusOnServer(num, novoStatus);
    });
  });

  // 3. Exclusão Lógica de Emenda (Admin apenas)
  document.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const num = e.currentTarget.getAttribute("data-numero");
      const entidade = e.currentTarget.getAttribute("data-entidade");
      
      const conf = confirm(`⚠️ Atenção:\nVocê tem certeza que deseja excluir logicamente (soft-delete) a emenda nº ${num} do ${entidade}?\nEsta ação será gravada no histórico de logs.`);
      if (conf) {
        await deleteEmendaOnServer(num);
      }
    });
  });
}

// ENVIAR LOGS DE AÇÃO PARA O SERVIDOR
async function logActionOnServer(acao, detalhes) {
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    console.log(`[LOG MOCK] Ação: ${acao} | Detalhes: ${detalhes}`);
    return;
  }
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
    console.warn("Falha ao registrar log no servidor:", err);
  }
}

// ATUALIZAR STATUS NO SERVIDOR
async function updateStatusOnServer(numeroEmenda, novoStatus) {
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    // MOCK UPDATE
    const data = getLocalDb();
    const row = data.find(r => r["Número da Emenda"].toString() === numeroEmenda.toString());
    if (row) {
      row["Status"] = novoStatus;
      saveLocalDb(data);
      showAlert("success", "Status Atualizado (Demo)", `O status da emenda nº ${numeroEmenda} foi alterado para '${novoStatus}'.`);
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
      showAlert("success", "Status Sincronizado", `Status alterado para '${novoStatus}' no Google Sheets.`);
      loadDashboardData();
    } else {
      showAlert("error", "Erro ao Atualizar", result.message || "Erro no servidor.");
    }
  } catch (err) {
    showAlert("error", "Erro de Rede", "Não foi possível conectar à API.");
  }
}

// EXCLUSÃO NO SERVIDOR
async function deleteEmendaOnServer(numeroEmenda) {
  if (API_URL === "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
    // MOCK DELETE
    const data = getLocalDb();
    const index = data.findIndex(r => r["Número da Emenda"].toString() === numeroEmenda.toString());
    if (index !== -1) {
      data.splice(index, 1); // remove fisicamente na demo
      saveLocalDb(data);
      showAlert("success", "Registro Excluído (Demo)", `A emenda nº ${numeroEmenda} foi removida localmente.`);
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
      showAlert("success", "Emenda Excluída", `O registro nº ${numeroEmenda} foi deletado (soft-delete) da planilha.`);
      loadDashboardData();
    } else {
      showAlert("error", "Erro ao Excluir", result.message || "Erro no servidor.");
    }
  } catch (err) {
    showAlert("error", "Erro de Rede", "Erro ao enviar requisição de exclusão.");
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

// LOCALSTORAGE DATABASE
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
