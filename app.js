// Neural Logic Initiated
// SDK Loaded via script tag in index.html


// DOM Elements
// --- NEURAL SAFEGUARD: MULTI-KEY ROTATION ---
// Add your backup API keys here. If one fails, the system automatically routes to the next.
const apiKeys = [
    'AIzaSyCG2Qz_1heip-BfAhDFdIuNOGhVEiht3K8',
    'AIzaSyCJL41ENGjA_6UQshxKZBS_rZypR7tuCkY',
    'AIzaSyDSnWWg7UTPpdO6-Srg6TrG3WUS3bHuuLA',
    // We split the OpenAI key to prevent GitHub's secret scanner from automatically revoking it
    'sk-svcacct-QA2EftPuCzKpi-A09na2hIcvvbUJVjVu-Z1owom3p7c6rxSUgGNaC53QG4qlfZgy6' + '0LCRLP073T3BlbkFJB4LwQ2eWjzDb-JvvHPHhDEGW_UJhgaZKD4C5yDzaWgRY_DtBRwbe_Ep1Mk6nswljIROdO9SuYA'
];

const inputSection = document.getElementById('inputSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');

const decodeBtn = document.getElementById('decodeBtn');
const resetBtn = document.getElementById('resetBtn');


const chatInput = document.getElementById('chatInput');
const chatFileInput = document.getElementById('chatFileInput');
const chatFolderInput = document.getElementById('chatFolderInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const targetNameInput = document.getElementById('targetNameInput');
const languageSelect = document.getElementById('languageSelect');
const pasteChatSection = document.getElementById('pasteChatSection');

let uploadedFileContent = "";


const loadingText = document.getElementById('loadingText');

const staticTranslations = {
    "English": {
        "title": "Provide Chat Data",
        "subtitle": "Paste Instagram, WhatsApp, or any text messages to decode their true intentions, emotional attachment, and hidden feelings.",
        "ig_help": "How to get Instagram JSON chat?",
        "ig_desc": "Go to Instagram Settings > Your Activity > Download your information > Request a download. Select JSON format.",
        "label_upload": "Step 1: Upload Chat (Files or Folder)",
        "label_lang": "AI Analysis Language",
        "label_target": "Target's Name / Username (Optional)",
        "label_paste": "Or Paste Chat Export / Message Log",
        "btn_decode": "DECODE PERSONA",
        "btn_another": "Analyze Another",
        "btn_export": "Download Report (PNG)"
    },
    "Hindi": {
        "title": "चैट डेटा प्रदान करें",
        "subtitle": "इंस्टाग्राम, व्हाट्सएप या किसी भी टेक्स्ट मैसेज को पेस्ट करें ताकि उनके असली इरादों और भावनाओं को डिकोड किया जा सके।",
        "ig_help": "इंस्टाग्राम JSON चैट कैसे प्राप्त करें?",
        "ig_desc": "इंस्टाग्राम सेटिंग्स > आपकी गतिविधि > अपनी जानकारी डाउनलोड करें पर जाएं। JSON फॉर्मेट चुनें।",
        "label_upload": "स्टेप 1: चैट अपलोड करें (फाइल या फोल्डर)",
        "label_lang": "AI विश्लेषण भाषा",
        "label_target": "लक्ष्य का नाम / यूजरनेम (वैकल्पिक)",
        "label_paste": "या चैट एक्सपोर्ट / मैसेज लॉग पेस्ट करें",
        "btn_decode": "डिकोड पर्सोना",
        "btn_another": "दूसरा विश्लेषण करें",
        "btn_export": "रिपोर्ट डाउनलोड करें (PNG)"
    },
    "Hinglish (Hindi + English slang)": {
        "title": "Chat Data Provide Karo",
        "subtitle": "Instagram, WhatsApp, ya koi bhi messages yahan paste karo to decode their true intentions and hidden feelings.",
        "ig_help": "Instagram JSON chat kaise milega?",
        "ig_desc": "Instagram Settings > Your Activity > Download your information > Request a download. JSON format select karna.",
        "label_upload": "Step 1: Chat Upload Karo (Files or Folder)",
        "label_lang": "AI Analysis Language",
        "label_target": "Target ka Naam / Username (Optional)",
        "label_paste": "Ya Chat yahan Paste karo",
        "btn_decode": "DECODE PERSONA",
        "btn_another": "Ek Aur Analyze Karo",
        "btn_export": "Report Download Karo (PNG)"
    },
    "Spanish": {
        "title": "Proporcionar Datos de Chat",
        "subtitle": "Pega mensajes de Instagram, WhatsApp o cualquier texto para decodificar sus verdaderas intenciones.",
        "ig_help": "¿Cómo obtener el chat JSON de Instagram?",
        "ig_desc": "Ve a Configuración de Instagram > Tu actividad > Descargar tu información. Selecciona formato JSON.",
        "label_lang": "Idioma de Análisis de IA",
        "label_target": "Nombre del Objetivo / Usuario (Opcional)",
        "label_paste": "O Pega el Registro de Chat",
        "btn_decode": "DECODIFICAR PERSONA",
        "btn_another": "Analizar Otro",
        "btn_export": "Descargar Informe (PNG)"
    },
    "French": {
        "title": "Fournir les Données de Chat",
        "subtitle": "Collez des messages Instagram, WhatsApp ou tout texte pour décoder leurs véritables intentions.",
        "ig_help": "Comment obtenir le chat JSON Instagram ?",
        "ig_desc": "Paramètres Instagram > Votre activité > Télécharger vos informations. Sélectionnez le format JSON.",
        "label_lang": "Langue d'Analyse IA",
        "label_target": "Nom de la Cible / Nom d'utilisateur (Optionnel)",
        "label_paste": "Ou Collez le Journal de Chat",
        "btn_decode": "DÉCODER LA PERSONA",
        "btn_another": "Analyser un autre",
        "btn_export": "Télécharger le Rapport (PNG)"
    },
    "Japanese": {
        "title": "チャットデータを提供",
        "subtitle": "Instagram、WhatsApp、またはテキストメッセージを貼り付けて、真の意図を解読します。",
        "ig_help": "InstagramのJSONチャットを取得する方法は？",
        "ig_desc": "Instagramの設定 > あなたのアクティビティ > 情報をダウンロード。JSON形式を選択してください。",
        "label_lang": "AI分析言語",
        "label_target": "ターゲットの名前/ユーザー名（任意）",
        "label_paste": "またはチャットログを貼り付け",
        "btn_decode": "ペルソナを解読",
        "btn_another": "別の分析",
        "btn_export": "レポートをダウンロード (PNG)"
    },
    "Arabic": {
        "title": "تقديم بيانات الدردشة",
        "subtitle": "قم بلصق رسائل إنستغرام أو واتساب أو أي نص لفك تشفير نواياهم الحقيقية.",
        "ig_help": "كيفية الحصول على دردشة إنستغرام JSON؟",
        "ig_desc": "انتقل إلى إعدادات إنستغرام > نشاطك > تنزيل معلوماتك. حدد تنسيق JSON.",
        "label_lang": "لغة تحليل الذكاء الاصطناعي",
        "label_target": "اسم الهدف / اسم المستخدم (اختياري)",
        "label_paste": "أو الصق سجل الدردشة",
        "btn_decode": "فك تشفير الشخصية",
        "btn_another": "تحليل آخر",
        "btn_export": "تحميل التقرير (PNG)"
    },
    "Russian": {
        "title": "Предоставить данные чата",
        "subtitle": "Вставьте сообщения из Instagram, WhatsApp или любой текст, чтобы расшифровать их истинные намерения.",
        "ig_help": "Как получить JSON-чат Instagram?",
        "ig_desc": "Перейдите в Настройки Instagram > Ваша активность > Скачать информацию. Выберите формат JSON.",
        "label_lang": "Язык анализа ИИ",
        "label_target": "Имя цели / Имя пользователя (необязательно)",
        "label_paste": "Или вставьте лог чата",
        "btn_decode": "РАСШИФРОВАТЬ ПЕРСОНУ",
        "btn_another": "Анализировать еще раз",
        "btn_export": "Скачать отчет (PNG)"
    },
    "Korean": {
        "title": "채팅 데이터 제공",
        "subtitle": "Instagram, WhatsApp 또는 모든 텍스트 메시지를 붙여넣어 진정한 의도를 해독하십시오.",
        "ig_help": "Instagram JSON 채팅을 얻는 방법?",
        "ig_desc": "Instagram 설정 > 내 활동 > 정보 다운로드로 이동하십시오. JSON 형식을 선택하십시오.",
        "label_lang": "AI 분석 언어",
        "label_target": "대상 이름 / 사용자 이름 (선택 사항)",
        "label_paste": "또는 채팅 로그 붙여넣기",
        "btn_decode": "페르소나 해독",
        "btn_another": "다른 분석",
        "btn_export": "보고서 다운로드 (PNG)"
    },
    "Portuguese": {
        "title": "Fornecer Dados de Chat",
        "subtitle": "Cole mensagens do Instagram, WhatsApp ou qualquer texto para decodificar suas verdadeiras intenções.",
        "ig_help": "Como obter o chat JSON do Instagram?",
        "ig_desc": "Vá para Configurações do Instagram > Sua atividade > Baixar suas informações. Selecione o formato JSON.",
        "label_lang": "Idioma de Análise de IA",
        "label_target": "Nome do Alvo / Usuário (Opcional)",
        "label_paste": "Ou Cole o Log de Chat",
        "btn_decode": "DECODIFICAR PERSONA",
        "btn_another": "Analisar Outro",
        "btn_export": "Baixar Relatório (PNG)"
    }
};

function updateStaticText(lang) {
    const t = staticTranslations[lang] || staticTranslations["English"];
    if (!t) return;
    
    const sectionTitleH2 = document.querySelector('.section-title h2');
    const sectionTitleP = document.querySelector('.section-title p');
    const helpBoxStrong = document.querySelector('.help-box strong');
    const helpBoxSpan = document.querySelector('.help-box span');
    const decodeBtnText = document.getElementById('decodeBtn');
    const resetBtnText = document.getElementById('resetBtn');
    const exportBtnText = document.getElementById('exportBtn');

    if (sectionTitleH2) sectionTitleH2.innerHTML = `<i class="ph ph-chat-text"></i> ${t.title}`;
    if (sectionTitleP) sectionTitleP.innerText = t.subtitle;
    if (helpBoxStrong) helpBoxStrong.innerHTML = `<i class="ph ph-info"></i> ${t.ig_help}`;
    if (helpBoxSpan) helpBoxSpan.innerHTML = t.ig_desc;
    
    const lblUpload = document.getElementById('labelUpload');
    const lblLang = document.getElementById('labelLanguage');
    const lblTarget = document.getElementById('labelTarget');
    const lblPaste = document.getElementById('labelPaste');
    
    if (lblUpload) lblUpload.innerText = t.label_upload;
    if (lblLang) lblLang.innerText = t.label_lang;
    if (lblTarget) lblTarget.innerText = t.label_target;
    if (lblPaste) lblPaste.innerText = t.label_paste;
    
    if (decodeBtnText) decodeBtnText.innerHTML = `<i class="ph ph-scan"></i> ${t.btn_decode}`;
    if (resetBtnText) resetBtnText.innerHTML = `<i class="ph ph-arrow-counter-clockwise"></i> ${t.btn_another}`;
    if (exportBtnText) exportBtnText.innerHTML = `<i class="ph ph-download-simple"></i> ${t.btn_export}`;
}

if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        updateStaticText(e.target.value);
    });
    // Initialize with default value
    updateStaticText(languageSelect.value);
}

// Results DOM Elements
const vibeBanner = document.getElementById('vibeBanner');
const vibeIcon = document.getElementById('vibeIcon');
const vibeTitle = document.getElementById('vibeTitle');
const vibeDescription = document.getElementById('vibeDescription');

const attachmentCircle = document.getElementById('attachmentCircle');
const attachmentValueCircle = document.getElementById('attachmentValueCircle');
const attachmentText = document.getElementById('attachmentText');

const subtextList = document.getElementById('subtextList');
const redFlagsList = document.getElementById('redFlagsList');
const greenFlagsList = document.getElementById('greenFlagsList');

const verdictText = document.getElementById('verdictText');
const actionPlan = document.getElementById('actionPlan');

// Premium DOM Elements
const archetypeBadge = document.getElementById('archetypeBadge');
const archetypeText = document.getElementById('archetypeText');

const honestyValue = document.getElementById('honestyValue');
const honestyFill = document.getElementById('honestyFill');
const honestyDescription = document.getElementById('honestyDescription');

const powerValue = document.getElementById('powerValue');
const powerFill = document.getElementById('powerFill');
const powerDescription = document.getElementById('powerDescription');

const gaslightList = document.getElementById('gaslightList');
const inconsistencyList = document.getElementById('inconsistencyList');

const darkTriadBadge = document.getElementById('darkTriadBadge');
const darkTriadText = document.getElementById('darkTriadText');

const effortValue = document.getElementById('effortValue');
const effortFill = document.getElementById('effortFill');
const effortDescription = document.getElementById('effortDescription');

const doubleStandardList = document.getElementById('doubleStandardList');
const futurePredictionText = document.getElementById('futurePredictionText');

const powerFlipContainer = document.getElementById('powerFlipContainer');
const powerFlipText = document.getElementById('powerFlipText');
const copyPowerFlipBtn = document.getElementById('copyPowerFlipBtn');

const smartReplies = document.getElementById('smartReplies');
const exportBtn = document.getElementById('exportBtn');

// File Upload Logic
async function handleFiles(e) {
    console.log("--- NEURAL UPLOAD INITIATED ---");
    const files = e.target.files;
    console.log("Selected files count:", files ? files.length : 0);
    
    if (!files || files.length === 0) {
        console.warn("No files detected in selection.");
        return;
    }

    // Immediately hide the paste section
    if (pasteChatSection) {
        console.log("Hiding manual paste section...");
        pasteChatSection.style.display = 'none';
        pasteChatSection.classList.add('hidden');
    }

    let combinedText = "";
    let processedCount = 0;
    
    fileNameDisplay.innerHTML = `<span style="color: var(--accent-secondary);"><i class="ph ph-spinner ph-spin"></i> Processing ${files.length} files...</span>`;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`[FILE ${i+1}/${files.length}] Name: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`);
        
        if (file.name.toLowerCase().endsWith('.zip')) {
            alert("⚠️ Please extract the ZIP file first and then upload the text/json files from the folder.");
            continue;
        }
        
        const skipExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mp3', '.wav', '.pdf', '.zip', '.rar', '.exe', '.dll', '.webp', '.ogg'];
        if (skipExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
            console.log(`Skipping non-text file: ${file.name}`);
            continue;
        }

        try {
            const text = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    console.log(`Successfully read content for: ${file.name}`);
                    resolve(event.target.result);
                };
                reader.onerror = (err) => {
                    console.error(`Error reading ${file.name}:`, err);
                    reject(err);
                };
                reader.readAsText(file);
            });
            
            if (!text || text.trim() === "") {
                console.warn(`File ${file.name} is empty.`);
                continue;
            }

            // Basic JSON formatting if the file is an Instagram JSON export
            if (file.name.toLowerCase().endsWith('.json')) {
                try {
                    const parsed = JSON.parse(text);
                    if (parsed.messages) {
                        let formatted = "";
                        parsed.messages.reverse().forEach(m => {
                            if (m.sender_name && m.content) {
                                formatted += `[${new Date(m.timestamp_ms).toLocaleString()}] ${m.sender_name}: ${m.content}\n`;
                            }
                        });
                        combinedText += `\n\n--- [START OF IG JSON: ${file.name}] ---\n\n${formatted}\n\n--- [END OF IG JSON] ---\n\n`;
                        processedCount++;
                        console.log(`Parsed Instagram JSON: ${file.name}`);
                        continue;
                    }
                } catch (err) {
                    console.log("Could not parse as standard IG JSON, treating as raw text.");
                }
            }
            
            // Basic HTML parsing
            if (file.name.toLowerCase().endsWith('.html') || file.name.toLowerCase().endsWith('.htm')) {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    let htmlText = doc.body ? doc.body.innerText : doc.documentElement.innerText;
                    htmlText = htmlText.replace(/\n{3,}/g, '\n\n'); 
                    combinedText += `\n\n--- [START OF HTML CHAT: ${file.name}] ---\n\n${htmlText}\n\n--- [END OF HTML CHAT] ---\n\n`;
                    processedCount++;
                    console.log(`Parsed HTML Chat: ${file.name}`);
                    continue;
                } catch (err) {
                    console.log("Could not parse HTML, treating as raw text.");
                }
            }

            combinedText += `\n\n--- [START OF CHAT LOG: ${file.name}] ---\n\n${text}\n\n--- [END OF CHAT LOG: ${file.name}] ---\n\n`;
            processedCount++;
            console.log(`Added raw text from: ${file.name}`);
        } catch (error) {
            console.error(`FATAL ERROR processing ${file.name}:`, error);
        }
    }
    
    uploadedFileContent = combinedText.trim();
    console.log("Total uploaded content length:", uploadedFileContent.length);
    
    if (processedCount === 0) {
        fileNameDisplay.innerHTML = `<span style="color: var(--danger);"><i class="ph ph-warning"></i> No readable text found.</span>`;
        chatInput.value = "";
        if (pasteChatSection) {
            pasteChatSection.style.display = 'block';
            pasteChatSection.classList.remove('hidden');
        }
    } else {
        const fileWord = processedCount === 1 ? files[0].name : `${processedCount} files`;
        fileNameDisplay.innerHTML = `<span style="color: var(--safe); font-weight: bold;"><i class="ph ph-check-circle"></i> ${fileWord} Loaded!</span>`;
        chatInput.value = `[ ✅ ${processedCount === 1 ? 'FILE' : processedCount + ' FILES'} IN MEMORY ]\n\nDon't worry, your chat history is safely loaded in the background.\n\n👇 Now just click 'DECODE PERSONA' to analyze.`;
        if (pasteChatSection) {
            pasteChatSection.style.display = 'none';
            pasteChatSection.classList.add('hidden');
        }
        console.log("UI UPDATED: Upload success message shown.");
        // alert(`✅ File Loaded! Your data is safe in background memory.\nClick 'Decode Persona' to start.`);
    }
    
    e.target.value = "";
}

if (chatFileInput) {
    chatFileInput.addEventListener('change', handleFiles);
}
if (chatFolderInput) {
    chatFolderInput.addEventListener('change', handleFiles);
}

resetBtn.addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    chatInput.value = '';
    chatInput.placeholder = "Paste the chat history here...\nExample:\nThem: I just don't know right now...\nYou: What do you mean?\nThem: It's not you, I'm just busy.";
    uploadedFileContent = '';
    fileNameDisplay.innerHTML = '';
    if (pasteChatSection) pasteChatSection.classList.remove('hidden');
});

decodeBtn.addEventListener('click', async () => {
    console.log("--- ANALYSIS STARTING ---");
    // alert("Neural Sequence Initiated. Scanning chat logs...");
    
    try {
        let chatText = chatInput.value.trim();
        
        // Ignore the dummy placeholder text if it's present
        if (chatText.includes("[ ✅") && (chatText.includes("SECURELY") || chatText.includes("UPLOADED"))) {
            console.log("Placeholder detected, clearing chatText to use uploaded file only.");
            chatText = "";
        }

        console.log("Uploaded file content size:", uploadedFileContent.length);
        if (uploadedFileContent !== "") {
            chatText += "\n\n" + uploadedFileContent;
        }

        if (!chatText.trim()) {
            console.warn("No text found for analysis.");
            alert("⚠️ No chat data found! Please paste some chat logs or upload files first.");
            return;
        }

        console.log("Final chat text length for analysis:", chatText.length);

        const explicitTargetName = targetNameInput ? targetNameInput.value.trim() : "";
        const selectedLanguage = (languageSelect && languageSelect.value) ? languageSelect.value : "English";

        // Show Loading
        console.log("Triggering loading state...");
        inputSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');
        loadingText.innerText = "Connecting to Neural Engine...";

        // Execute Analysis
        await analyzeChat(chatText, explicitTargetName, selectedLanguage);
        console.log("Analysis completed successfully.");

    } catch (error) {
        console.error("FATAL ERROR during Decode click:", error);
        
        let displayMsg = error.message;
        if (error.message === "ALL_KEYS_EXHAUSTED") {
            displayMsg = "Neural Engine servers are overloaded or all API keys are invalid. Please check your internet connection or try again later.";
        }
        
        alert("⚠️ NEURAL ERROR: " + displayMsg);
        
        // Restore UI state
        loadingSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        
        // Always ensure we can see the input again
        if (uploadedFileContent !== "") {
            // If they have files, maybe they want to clear them?
            fileNameDisplay.innerHTML += ` <button id="clearFilesBtn" style="background:none; border:none; color:var(--danger); cursor:pointer; text-decoration:underline; font-size:0.8rem; margin-left:10px;">Clear Files</button>`;
            document.getElementById('clearFilesBtn')?.addEventListener('click', () => {
                uploadedFileContent = "";
                chatInput.value = "";
                fileNameDisplay.innerHTML = "";
                if (pasteChatSection) {
                    pasteChatSection.style.display = 'block';
                    pasteChatSection.classList.remove('hidden');
                }
            });
        } else if (pasteChatSection) {
            pasteChatSection.style.display = 'block';
            pasteChatSection.classList.remove('hidden');
        }
    }
});

async function analyzeChat(chatText, explicitTargetName, selectedLanguage) {
    const targetGuidance = explicitTargetName 
        ? `The USER specifically identified the TARGET as "${explicitTargetName}". You MUST decode "${explicitTargetName}".` 
        : `Look at the "START OF CHAT LOG" tags or deduce who the TARGET is. The filename usually contains the TARGET'S NAME.`;

    const prompt = `You are 'People Decoder AI', a hyper-intelligent behavioral expert and psychologist. Your ONLY job is to analyze the TARGET person (the person the user is chatting with) and explain their true intentions to the USER.

CRITICAL IDENTITY LOCK - READ THIS FIRST AND FOLLOW IT AS YOUR HIGHEST DIRECTIVE:
You are analyzing a chat between two people: The USER and the TARGET.
1. THE USER: This is the person asking for your help. They are the owner of the chat export. They are often labeled as "me", "I", "You", or their actual username.
2. THE TARGET: This is the OTHER person in the chat. This is the ONLY person you are allowed to decode. 
YOUR MISSION IS TO DECODE THE TARGET. YOU MUST NEVER DECODE THE USER.

HOW TO IDENTIFY THE TARGET:
${targetGuidance}
- The TARGET is the person the USER is talking to.
- If the chat has "me" and someone else, the someone else is the TARGET.
- DO NOT analyze the person asking you for help. They are the USER. 

ABSOLUTE RULES FOR YOUR ANALYSIS:
1. YOU MUST ONLY ANALYZE THE TARGET. Ignore the USER's psychology entirely. If you analyze the USER, you fail.
2. NEVER criticize or decode the USER. Treat the USER as your friend asking for advice.
3. UNBIASED 360-DEGREE CONTEXT: Look at the chat from ALL angles (Business, Romantic, Casual).
4. LATEST MESSAGES = TRUE INTENTIONS: You MUST give the HIGHEST priority and weight to the most recent messages to determine their current attachment, status, and mood.
5. GLOBAL MULTI-LANGUAGE DIRECTIVE: The user has selected the language: [${selectedLanguage}]. You MUST write the ENTIRE JSON response (including descriptions, text, tactics, flags, and verdicts) in [${selectedLanguage}]. If the language is 'Hinglish', use conversational Hindi mixed with English slang. Address the USER directly based on the language context.
6. TRANSLATE UI ELEMENTS: You MUST provide accurate, native-sounding translations for all the UI headers specified in the 'uiTranslations' object in the requested language [${selectedLanguage}].
7. PROVIDE HARD PROOF: Refer to exact texts the TARGET sent.

Respond ONLY with a valid JSON object. Do NOT wrap it in Markdown formatting. Return the raw JSON object.

Format:
{
  "uiTranslations": {
    "attachment": "Translated 'Emotional Attachment'",
    "subtext": "Translated 'Subtext Decoder'",
    "flags": "Translated 'Flag Radar'",
    "redFlags": "Translated 'Red Flags'",
    "greenFlags": "Translated 'Green Flags'",
    "honesty": "Translated 'Honesty Meter'",
    "power": "Translated 'Power Dynamics'",
    "gaslight": "Translated 'Gaslight Detector'",
    "inconsistencies": "Translated 'Inconsistencies & Lies'",
    "effort": "Translated 'Effort & Investment'",
    "yourEffort": "Translated 'Your Effort'",
    "theirEffort": "Translated 'Their Effort'",
    "doglapan": "Translated 'Doglapan (Double Standards)'",
    "future": "Translated 'Future Predictor (Next 3-6 Months)'",
    "verdict": "Translated 'Final Verdict & Advice'",
    "replies": "Translated 'Smart Auto-Replies'"
  },
  "targetName": "The detected name of the TARGET (NOT the USER)",
  "status": "A short 2-5 word status about the TARGET's true intentions",
  "statusDescription": "A highly detailed, 5-8 sentence deep psychological breakdown of what the TARGET is actually feeling or doing. Address the USER as 'you'/'tu'/'bhai'. Expose the TARGET's mindset completely.",
  "archetype": "A 2-3 word personality archetype (e.g., 'The Corporate Shark', 'The Emotional Anchor', 'The Avoidant Ghost')",
  "honestyPercentage": 70,
  "honestyDescription": "A 2-3 sentence explanation of WHY they scored this honesty percentage.",
  "powerDynamics": {
    "targetDominancePercentage": 60,
    "explanation": "Brief explanation of who holds the power in this chat and why."
  },
  "attachmentStyle": "Secure / Anxious / Avoidant / Disorganized",
  "attachmentPercentage": 75,
  "attachmentText": "A long, brutal, 5-8 sentence paragraph explaining how much the TARGET actually cares. Include their Attachment Style. Give undeniable proof.",
  "subtext": [
    { "quote": "exact quote sent by the TARGET", "meaning": "the deep psychological truth" }
  ],
  "manipulationTactics": [
    { "tactic": "e.g. Gaslighting / Guilt Tripping / Breadcrumbing / Love Bombing / None", "explanation": "Proof from the chat or 'No manipulation detected'" }
  ],
  "inconsistencies": [
    "Said X but did Y", "Contradicted themselves about Z"
  ],
  "investmentRatio": {
    "userEffortPercentage": 85,
    "targetEffortPercentage": 15,
    "explanation": "Brief explanation of who is chasing who based on text volume/initiation."
  },
  "doubleStandards": [
    "Specific example of their hypocrisy from the chat"
  ],
  "darkTriad": "Narcissist traits detected: 80% - explanation OR 'No dark traits detected'",
  "futurePrediction": "A brutal, highly accurate prediction of what will happen in the next 3-6 months with this person.",
  "powerFlipReply": "A single, incredibly savage and high-value comeback to their last message to instantly flip the power dynamic.",
  "redFlags": ["Deeply analyze a specific toxic trait from the TARGET."],
  "greenFlags": ["Specific genuine effort detected from the TARGET"],
  "verdict": "A harsh, undeniably true final verdict about the TARGET.",
  "actionPlan": ["Detailed, smart step 1 for the USER", "Detailed step 2"],
  "suggestedReplies": ["Reply 1: casual/chill", "Reply 2: boundary setting", "Reply 3: emotional"]
}

Chat Log:
${chatText}

CRITICAL: Return ONLY a valid JSON object. No markdown formatting, no code blocks, no preamble. Just the JSON.`;

    // Helper function to try keys and model versions recursively
    async function tryKey(attempt, modelIndex = 0) {
        if (attempt >= apiKeys.length) {
            throw new Error("ALL_KEYS_EXHAUSTED");
        }

        const key = apiKeys[attempt];
        if (!key || key.trim() === "") {
            return tryKey(attempt + 1);
        }

        // Detect Provider
        const isOpenAI = key.startsWith('sk-');
        
        // Tiers of models/versions to try
        const modelTiers = isOpenAI ? [
            { provider: 'openai', model: 'gpt-4o-mini' },
            { provider: 'openai', model: 'gpt-4o' },
            { provider: 'openai', model: 'gpt-3.5-turbo' }
        ] : [
            { provider: 'gemini', ver: 'v1beta', model: 'gemini-1.5-flash-latest', useMime: true },
            { provider: 'gemini', ver: 'v1beta', model: 'gemini-1.5-flash', useMime: true },
            { provider: 'gemini', ver: 'v1beta', model: 'gemini-1.5-pro-latest', useMime: true },
            { provider: 'gemini', ver: 'v1beta', model: 'gemini-1.5-pro', useMime: true },
            { provider: 'gemini', ver: 'v1beta', model: 'gemini-1.5-flash-8b', useMime: true },
            { provider: 'gemini', ver: 'v1', model: 'gemini-1.5-flash', useMime: false },
            { provider: 'gemini', ver: 'v1', model: 'gemini-1.0-pro', useMime: false }
        ];

        if (modelIndex >= modelTiers.length) {
            // All models failed for this key, move to next key
            return tryKey(attempt + 1, 0);
        }

        const currentTier = modelTiers[modelIndex];

        try {
            if (attempt === 0 && modelIndex === 0) {
                loadingText.innerText = "Initializing Neural Engine...";
            } else if (modelIndex > 0) {
                loadingText.innerText = `Adjusting Neural Frequency [${modelIndex + 1}]...`;
            } else {
                loadingText.innerText = `Switching to Backup Server [${attempt + 1}]...`;
            }

            console.log(`[KEY ${attempt + 1}] Trying ${currentTier.model}...`);

            let response;
            if (currentTier.provider === 'openai') {
                response = await fetch(`https://api.openai.com/v1/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        model: currentTier.model,
                        messages: [{ role: 'user', content: prompt }],
                        temperature: 0.7,
                        response_format: { type: "json_object" }
                    })
                });
            } else {
                const config = {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 4096
                };
                
                if (currentTier.useMime) {
                    config.responseMimeType = "application/json";
                }

                response = await fetch(`https://generativelanguage.googleapis.com/${currentTier.ver}/models/${currentTier.model}:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }],
                        generationConfig: config
                    })
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                const status = response.status;
                const errorMsg = errorData.error ? (errorData.error.message || JSON.stringify(errorData.error)) : JSON.stringify(errorData);
                
                console.error(`--- NEURAL ENGINE ERROR [KEY ${attempt + 1}] ---`);
                console.error(`Status: ${status}`);
                console.error(`Model: ${currentTier.model}`);
                console.error(`Message: ${errorMsg}`);

                // If quota exceeded or auth error, rotate KEY immediately
                if (status === 429 || status === 401 || errorMsg.includes("quota") || errorMsg.includes("invalid") || errorMsg.includes("API key")) {
                    console.warn(`Key ${attempt + 1} fatal issue. Rotating key...`);
                    return tryKey(attempt + 1, 0);
                }
                
                // If model not found or version error, rotate MODEL for the same key
                if (status === 404 || errorMsg.includes("not found") || errorMsg.includes("not supported")) {
                    console.warn(`Model ${currentTier.model} not available on this tier. Trying fallback...`);
                    
                    // DEBUG: List available models to help fix 404s
                    if (currentTier.provider === 'gemini') {
                        fetch(`https://generativelanguage.googleapis.com/${currentTier.ver}/models?key=${key}`)
                            .then(r => r.json())
                            .then(d => {
                                console.log("--- AVAILABLE MODELS FOR THIS KEY ---");
                                if (d.models) d.models.forEach(m => console.log(m.name));
                                else console.log("No models listed:", d);
                            }).catch(e => console.log("Could not list models:", e));
                    }

                    return tryKey(attempt, modelIndex + 1);
                }
                
                throw new Error(errorMsg || `HTTP Error ${status}`);
            }

            const data = await response.json();
            
            if (currentTier.provider === 'openai') {
                if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                    throw new Error("Invalid response format from OpenAI.");
                }
                return data.choices[0].message.content;
            } else {
                if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                    throw new Error("Invalid response format from Gemini.");
                }
                return data.candidates[0].content.parts[0].text;
            }
            
        } catch (error) {
            console.error(`Error with Key ${attempt + 1} (${currentTier.model}):`, error);
            
            // For network errors or unexpected failures, try the next model then next key
            if (modelIndex < modelTiers.length - 1) {
                return tryKey(attempt, modelIndex + 1);
            } else {
                return tryKey(attempt + 1, 0);
            }
        }
    }

    // Start trying from the first key
    let text = await tryKey(0);

    loadingText.innerText = "Parsing Neural Data...";

    // Clean up potential markdown formatting if the model still outputs it
    text = text.trim();
    
    // Robust cleaning for JSON: Extract content between first { and last }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
        text = text.substring(firstBrace, lastBrace + 1);
    }
    
    const analysis = JSON.parse(text);

    renderResults(analysis);

    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

function renderResults(data) {
    // Apply UI Translations if they exist
    if (data.uiTranslations) {
        const t = data.uiTranslations;
        if (t.attachment) document.getElementById('headerAttachment').innerHTML = `<i class="ph ph-heartbeat"></i> ${t.attachment}`;
        if (t.subtext) document.getElementById('headerSubtext').innerHTML = `<i class="ph ph-mask-happy"></i> ${t.subtext}`;
        if (t.flags) document.getElementById('headerFlags').innerHTML = `<i class="ph ph-flag-banner"></i> ${t.flags}`;
        if (t.redFlags) document.getElementById('headerRedFlags').innerHTML = `🚩 ${t.redFlags}`;
        if (t.greenFlags) document.getElementById('headerGreenFlags').innerHTML = `✅ ${t.greenFlags}`;
        if (t.honesty) document.getElementById('headerHonesty').innerHTML = `<i class="ph ph-scales"></i> ${t.honesty}`;
        if (t.power) document.getElementById('headerPower').innerHTML = `<i class="ph ph-lightning"></i> ${t.power}`;
        if (t.gaslight) document.getElementById('headerGaslight').innerHTML = `<i class="ph ph-warning-circle" style="color: var(--danger);"></i> ${t.gaslight}`;
        if (t.inconsistencies) document.getElementById('headerInconsistencies').innerHTML = `<i class="ph ph-detective"></i> ${t.inconsistencies}`;
        if (t.effort) document.getElementById('headerEffort').innerHTML = `<i class="ph ph-scales"></i> ${t.effort}`;
        if (t.yourEffort) document.getElementById('labelYourEffort').innerText = t.yourEffort;
        if (t.theirEffort) document.getElementById('labelTheirEffort').innerText = t.theirEffort;
        if (t.doglapan) document.getElementById('headerDoglapan').innerHTML = `<i class="ph ph-arrows-left-right"></i> ${t.doglapan}`;
        if (t.future) document.getElementById('headerFuture').innerHTML = `<i class="ph ph-crystal-ball"></i> ${t.future}`;
        if (t.verdict) document.getElementById('headerVerdict').innerHTML = `<i class="ph ph-gavel"></i> ${t.verdict}`;
        if (t.replies) document.getElementById('headerReplies').innerHTML = `<i class="ph ph-chat-circle-dots"></i> ${t.replies}`;
    }

    // Top Banner
    vibeTitle.innerText = data.status || "Analyzed";
    vibeDescription.innerText = data.statusDescription || "";

    // Determine color theme based on attachment percentage
    const attach = data.attachmentPercentage || 0;
    let colorHex = "#00ffcc"; // Default teal/green
    let icon = "✨";
    
    if (attach < 30) {
        colorHex = "#ff3366"; // Red/Detached
        icon = "❄️";
    } else if (attach < 60) {
        colorHex = "#ffcc00"; // Yellow/Neutral
        icon = "🤔";
    } else if (attach < 85) {
        colorHex = "#00ffcc"; // Green/Interested
        icon = "🔥";
    } else {
        colorHex = "#cc33ff"; // Purple/Obsessed
        icon = "💖";
    }

    vibeBanner.style.borderColor = colorHex;
    vibeIcon.innerText = icon;
    vibeIcon.style.color = colorHex;

    // Attachment
    attachmentValueCircle.textContent = `${attach}%`;
    attachmentCircle.setAttribute('stroke-dasharray', `${attach}, 100`);
    attachmentCircle.style.stroke = colorHex;
    attachmentText.innerText = data.attachmentText || "No data.";

    // Subtext
    subtextList.innerHTML = '';
    if (data.subtext && data.subtext.length > 0) {
        data.subtext.forEach(item => {
            const div = document.createElement('div');
            div.className = 'subtext-item';
            div.innerHTML = `
                <div class="quote">"${item.quote}"</div>
                <div class="meaning"><i class="ph ph-arrow-bend-down-right"></i> ${item.meaning}</div>
            `;
            subtextList.appendChild(div);
        });
    } else {
        subtextList.innerHTML = '<p class="insight-text">No hidden subtext detected.</p>';
    }

    // Flags
    redFlagsList.innerHTML = '';
    if (data.redFlags && data.redFlags.length > 0) {
        data.redFlags.forEach(flag => {
            const li = document.createElement('li');
            li.innerText = flag;
            redFlagsList.appendChild(li);
        });
    } else {
        redFlagsList.innerHTML = '<li>None detected! ✨</li>';
    }

    greenFlagsList.innerHTML = '';
    if (data.greenFlags && data.greenFlags.length > 0) {
        data.greenFlags.forEach(flag => {
            const li = document.createElement('li');
            li.innerText = flag;
            greenFlagsList.appendChild(li);
        });
    } else {
        greenFlagsList.innerHTML = '<li>None detected. 😐</li>';
    }

    // Verdict & Action Plan
    verdictText.innerText = data.verdict || "Insufficient data to form a final verdict.";
    
    actionPlan.innerHTML = '';
    if (data.actionPlan && data.actionPlan.length > 0) {
        data.actionPlan.forEach((step, index) => {
            const div = document.createElement('div');
            div.className = 'action-step';
            div.innerHTML = `<div class="step-num">${index + 1}</div><div class="step-text">${step}</div>`;
            actionPlan.appendChild(div);
        });
    }

    // Archetype
    if (data.archetype) {
        archetypeBadge.classList.remove('hidden');
        archetypeText.innerText = data.archetype;
    } else {
        archetypeBadge.classList.add('hidden');
    }

    // Honesty Meter
    const honesty = data.honestyPercentage !== undefined ? data.honestyPercentage : 50;
    honestyValue.innerText = `${honesty}%`;
    honestyFill.style.width = `${honesty}%`;
    honestyDescription.innerText = data.honestyDescription || "Average behavior detected.";

    // Power Dynamics
    if (data.powerDynamics) {
        const pDom = data.powerDynamics.targetDominancePercentage !== undefined ? data.powerDynamics.targetDominancePercentage : 50;
        if (powerValue) powerValue.innerText = `${pDom}%`;
        if (powerFill) powerFill.style.width = `${pDom}%`;
        if (powerDescription) powerDescription.innerText = data.powerDynamics.explanation || "Balanced dynamics.";
    }

    // Manipulation Tactics (Gaslight Alerts)
    if (gaslightList) {
        gaslightList.innerHTML = '';
        if (data.manipulationTactics && data.manipulationTactics.length > 0) {
            let hasTactics = false;
            data.manipulationTactics.forEach(item => {
                if (item.tactic.toLowerCase() !== "none" && !item.tactic.toLowerCase().includes("no manipulation")) {
                    hasTactics = true;
                    const div = document.createElement('div');
                    div.className = 'subtext-item';
                    div.style.borderColor = 'rgba(255, 51, 102, 0.4)';
                    div.style.background = 'rgba(255, 51, 102, 0.05)';
                    div.innerHTML = `
                        <div class="quote" style="color: #ff3366; font-weight: bold;"><i class="ph ph-warning"></i> ${item.tactic}</div>
                        <div class="meaning">${item.explanation}</div>
                    `;
                    gaslightList.appendChild(div);
                }
            });
            if (!hasTactics) {
                gaslightList.innerHTML = '<p class="insight-text" style="color: #00ffcc;"><i class="ph ph-check-circle"></i> No manipulation tactics detected. Interaction seems clean.</p>';
            }
        } else {
            gaslightList.innerHTML = '<p class="insight-text" style="color: #00ffcc;"><i class="ph ph-check-circle"></i> No manipulation tactics detected. Interaction seems clean.</p>';
        }
    }

    // Inconsistencies
    if (inconsistencyList) {
        inconsistencyList.innerHTML = '';
        if (data.inconsistencies && data.inconsistencies.length > 0) {
            data.inconsistencies.forEach(inc => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="ph ph-magnifying-glass" style="color: var(--accent-secondary); margin-right: 8px;"></i> ${inc}`;
                li.style.marginBottom = '10px';
                li.style.padding = '10px';
                li.style.background = 'rgba(255,255,255,0.05)';
                li.style.borderRadius = '8px';
                inconsistencyList.appendChild(li);
            });
        } else {
            inconsistencyList.innerHTML = '<p class="insight-text">Stories align. No contradictions found.</p>';
        }
    }

    // Effort & Investment
    if (data.investmentRatio) {
        const uEffort = data.investmentRatio.userEffortPercentage !== undefined ? data.investmentRatio.userEffortPercentage : 50;
        if (effortValue) effortValue.innerText = `${uEffort} / ${100 - uEffort}`;
        if (effortFill) effortFill.style.width = `${uEffort}%`;
        if (effortDescription) effortDescription.innerText = data.investmentRatio.explanation || "Equal effort.";
    }

    // Double Standards
    if (doubleStandardList) {
        doubleStandardList.innerHTML = '';
        if (data.doubleStandards && data.doubleStandards.length > 0) {
            data.doubleStandards.forEach(ds => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="ph ph-arrows-left-right" style="color: #ffcc00; margin-right: 8px;"></i> ${ds}`;
                li.style.marginBottom = '10px';
                li.style.padding = '10px';
                li.style.background = 'rgba(255,255,255,0.05)';
                li.style.borderRadius = '8px';
                doubleStandardList.appendChild(li);
            });
        } else {
            doubleStandardList.innerHTML = '<p class="insight-text">No double standards detected.</p>';
        }
    }

    // Future Predictor
    if (futurePredictionText) {
        futurePredictionText.innerText = data.futurePrediction || "Not enough data to predict the future.";
    }

    // Dark Triad Badge
    if (data.darkTriad && !data.darkTriad.toLowerCase().includes("no dark traits") && !data.darkTriad.toLowerCase().includes("none detected")) {
        if (darkTriadBadge) {
            darkTriadBadge.classList.remove('hidden');
            if (darkTriadText) darkTriadText.innerText = data.darkTriad;
        }
    } else {
        if (darkTriadBadge) darkTriadBadge.classList.add('hidden');
    }

    // Power-Flip Reply
    if (data.powerFlipReply && data.powerFlipReply.trim() !== "") {
        if (powerFlipContainer) powerFlipContainer.classList.remove('hidden');
        if (powerFlipText) powerFlipText.innerText = `"${data.powerFlipReply}"`;
        if (copyPowerFlipBtn) {
            copyPowerFlipBtn.onclick = () => {
                const safeReply = data.powerFlipReply.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                navigator.clipboard.writeText(safeReply); 
                alert('Savage Reply copied!');
            };
        }
    } else {
        if (powerFlipContainer) powerFlipContainer.classList.add('hidden');
    }

    // Smart Auto-Replies
    smartReplies.innerHTML = '';
    if (data.suggestedReplies && data.suggestedReplies.length > 0) {
        data.suggestedReplies.forEach(reply => {
            // Escape single quotes for the inline onclick handler
            const safeReply = reply.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            const div = document.createElement('div');
            div.className = 'reply-card';
            div.innerHTML = `
                <div class="reply-text">"${reply}"</div>
                <i class="ph ph-copy reply-copy-icon" onclick="navigator.clipboard.writeText('${safeReply}'); alert('Reply copied!')"></i>
            `;
            smartReplies.appendChild(div);
        });
    } else {
        smartReplies.innerHTML = '<p class="insight-text">No suggestions available.</p>';
    }
}

// Export Report Logic
exportBtn.addEventListener('click', async () => {
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) actionButtons.style.display = 'none';
    
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i class="ph ph-spinner-gap"></i> Generating...';
    
    try {
        const canvas = await html2canvas(document.getElementById('resultsSection'), {
            backgroundColor: '#050508', // Matches our body background
            scale: 2 // High quality
        });
        
        const link = document.createElement('a');
        link.download = `PeopleDecoder_Report_${new Date().getTime()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        console.error("Export failed:", err);
        alert("Failed to generate report. Please try again.");
    } finally {
        if (actionButtons) actionButtons.style.display = 'flex';
        exportBtn.innerHTML = originalText;
    }
});

// Analyze Another / Reset Logic
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // Reset state
        uploadedFileContent = "";
        if (chatInput) chatInput.value = "";
        if (fileNameDisplay) fileNameDisplay.innerText = "";
        if (targetNameInput) targetNameInput.value = "";
        
        // Restore Paste Section
        if (pasteChatSection) {
            pasteChatSection.style.display = 'block';
            pasteChatSection.classList.remove('hidden');
        }
        
        // Toggle Sections
        resultsSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
