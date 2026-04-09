const appContainer = document.getElementById('app-container');

// ====== HỆ THỐNG ÂM THANH MÔ PHỎNG (WEB AUDIO API) ====== //
// Không yêu cầu tệp mp3 external, tránh lỗi loading
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = type;
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Hình dáng âm thanh: to đầu tiên tắt dần về cuối (decay)
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playSelectSound() {
    playTone(400, 'triangle', 0.1); 
}

function playCorrectSound() {
    playTone(523.25, 'sine', 0.1); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.4), 200); // G5
}

function playWrongSound() {
    playTone(300, 'sawtooth', 0.2);
    setTimeout(() => playTone(250, 'sawtooth', 0.4), 150);
}

function playVictorySound() {
    const notes = [
        {f: 523.25, d: 0}, {f: 659.25, d: 150}, {f: 783.99, d: 300}, 
        {f: 1046.50, d: 450}, {f: 783.99, d: 600}, {f: 1046.50, d: 750}
    ];
    notes.forEach(n => {
        setTimeout(() => playTone(n.f, 'sine', 0.2), n.d);
    });
}
// ======================================================== //


// ====== SUPABASE CONFIGURATION ====== //
// Đọc từ cấu hình trong file env.js
const SUPABASE_URL = window.ENV ? window.ENV.SUPABASE_URL : '';
const SUPABASE_ANON_KEY = window.ENV ? window.ENV.SUPABASE_ANON_KEY : '';

let supabaseClient = null;
if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        console.warn("Chưa cấu hình Supabase hợp lệ:", e);
    }
}

// Trạng thái (State)
let currentGrade = null;
let currentSemester = null;

// Thông tin học sinh
let studentName = "";
let studentClass = "";

// Trạng thái cho Quiz
let currentQuestions = [];
let questionIndex = 0;
let userScore = 0;
let selectedOption = null;
let isAnswered = false;

// Danh sách các Lớp
const classOptions = ['3A1', '3A2', '3B1', '3B2', '3B3', '4A1', '4A2', '4B1', '4B2', '4B3', '5A1', '5A2', '5B1', '5B2'];

// Hàm kết xuất trang chủ (Chọn lớp)
function renderHome() {
    currentGrade = null;
    currentSemester = null;
    
    appContainer.innerHTML = `
        <div class="section" id="grade-selection">
            <h2 class="section-title">Bạn đang học lớp mấy?</h2>
            <div class="grid-container">
                <div class="card card-grade-3" onclick="selectGrade('3')">
                    <div class="card-decor"></div>
                    <i class="fa-solid fa-shapes card-icon"></i>
                    <h2>Lớp 3</h2>
                    <p>Khám phá thế giới máy tính</p>
                </div>
                <div class="card card-grade-4" onclick="selectGrade('4')">
                    <div class="card-decor"></div>
                    <i class="fa-solid fa-file-word card-icon"></i>
                    <h2>Lớp 4</h2>
                    <p>Sáng tạo văn bản & Trình chiếu</p>
                </div>
                <div class="card card-grade-5" onclick="selectGrade('5')">
                    <div class="card-decor"></div>
                    <i class="fa-solid fa-code card-icon"></i>
                    <h2>Lớp 5</h2>
                    <p>Bước đầu học lập trình</p>
                </div>
            </div>
        </div>
    `;
}

// Hàm xử lý chọn lớp
function selectGrade(grade) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    playSelectSound();
    currentGrade = grade;
    renderSemesters();
}

// Hàm kết xuất màn hình Chọn Học Kì
function renderSemesters() {
    appContainer.innerHTML = `
        <div class="section" id="semester-selection">
            <button class="btn-back" onclick="playSelectSound(); renderHome()">
                <i class="fa-solid fa-arrow-left"></i> Quay lại khối lớp
            </button>
            <h2 class="section-title">Ôn tập Lớp ${currentGrade}</h2>
            <div class="grid-container" style="justify-content: center; max-width: 800px; margin: 0 auto;">
                <div class="card semester" onclick="selectSemester('1')" style="border-color: var(--accent-pink);">
                    <i class="fa-solid fa-book-open card-icon" style="color: var(--accent-pink);"></i>
                    <h2 style="color: var(--accent-pink);">Học Kì 1</h2>
                </div>
                <div class="card semester" onclick="selectSemester('2')" style="border-color: var(--grade-5);">
                    <i class="fa-solid fa-graduation-cap card-icon" style="color: var(--grade-5);"></i>
                    <h2 style="color: var(--grade-5);">Học Kì 2</h2>
                </div>
            </div>
        </div>
    `;
}

// Hàm xử lý chọn Học Kì
function selectSemester(semester) {
    playSelectSound();
    currentSemester = semester;
    renderContent();
}

// Hàm kết xuất nội dung bài học
function renderContent() {
    // window.lessonData được lấy từ data.js
    const lessons = window.lessonData[currentGrade][currentSemester];
    
    let topicsHTML = lessons.map(lesson => `
        <li class="topic-item">
            <div class="topic-icon">
                <i class="fa-solid ${lesson.icon}"></i>
            </div>
            <span>${lesson.title}</span>
        </li>
    `).join('');

    appContainer.innerHTML = `
        <div class="section" id="course-content">
            <button class="btn-back" onclick="playSelectSound(); renderSemesters()">
                <i class="fa-solid fa-arrow-left"></i> Quay lại học kì
            </button>
            
            <div class="content-box">
                <h3>Danh sách bài tóm tắt (Lớp ${currentGrade} - Học Kì ${currentSemester})</h3>
                <ul class="topic-list">
                    ${topicsHTML}
                </ul>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn-primary" style="background-color: var(--grade-4); margin: 0 auto;" onclick="playSelectSound(); renderStudentForm()">
                        <i class="fa-solid fa-flag-checkered"></i> Làm bài Trắc nghiệm
                    </button>
                </div>
            </div>
        </div>
    `;
}

/* =========================================
   QUIZZ ENGINE LOGIC
   ========================================= */

// Hàm xáo trộn mảng (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderStudentForm() {
    let optionsHtml = '<option value="">-- Chọn lớp của em --</option>';
    classOptions.forEach(cls => {
        // Chỉ hiện Lớp phù hợp với khối đang chọn (VD: đang chọn khối 3 thì chỉ hiện đầu 3)
        if(cls.startsWith(currentGrade)) {
            optionsHtml += `<option value="${cls}" ${studentClass === cls ? 'selected' : ''}>${cls}</option>`;
        }
    });

    appContainer.innerHTML = `
        <div class="section" id="student-form-view">
            <button class="btn-back" onclick="playSelectSound(); renderContent()">
                <i class="fa-solid fa-arrow-left"></i> Quay lại bài học
            </button>
            <div class="quiz-container">
                <div style="text-align: center; margin-bottom: 20px;">
                    <i class="fa-solid fa-user-astronaut trophy-icon" style="color: var(--accent-pink); font-size: 4rem; animation: float 3s infinite ease-in-out;"></i>
                    <h2>Thông tin Học sinh</h2>
                </div>
                <div class="form-group">
                    <label>Họ và Tên của em:</label>
                    <input type="text" id="input-student-name" class="form-input" placeholder="Ví dụ: Nguyễn Văn A" value="${studentName}">
                </div>
                <div class="form-group">
                    <label>Lớp đang học:</label>
                    <select id="input-student-class" class="form-input">
                        ${optionsHtml}
                    </select>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn-primary" style="margin: 0 auto;" onclick="submitStudentForm()">
                        Bắt đầu làm bài <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function submitStudentForm() {
    const nameInput = document.getElementById('input-student-name').value.trim();
    const classInput = document.getElementById('input-student-class').value;

    if (!nameInput) {
        alert("Em hãy nhập Họ và Tên nhé!");
        return;
    }
    if (!classInput) {
        alert("Em hãy chọn Lớp của mình nhé!");
        return;
    }

    studentName = nameInput;
    studentClass = classInput;
    initQuiz();
}

function initQuiz() {
    playSelectSound();
    
    // Trích xuất và copy dữ liệu để không làm ảnh hưởng bài gốc
    currentQuestions = JSON.parse(JSON.stringify(window.quizData[currentGrade][currentSemester]));
    
    // Xáo trộn thứ tự các câu hỏi trong đề thi
    shuffleArray(currentQuestions);
    
    // Xáo trộn thứ tự 4 đáp án trong từng câu hỏi
    currentQuestions.forEach(q => {
        const correctAnswerText = q.o[q.a]; // Lưu lại nội dung đáp án đúng
        shuffleArray(q.o); // Đảo vị trí các đáp án
        q.a = q.o.indexOf(correctAnswerText); // Tìm lại vị trí mới của đáp án đúng
    });

    questionIndex = 0;
    userScore = 0;
    renderQuiz();
}

function renderQuiz() {
    const q = currentQuestions[questionIndex];
    selectedOption = null;
    isAnswered = false;

    let optionsHTML = q.o.map((opt, i) => `
        <button class="option-btn" id="opt-${i}" onclick="selectOption(${i})">
            <span style="font-weight: 800; color: var(--grade-5); border: 2px solid; border-radius: 50%; width: 30px; height: 30px; display: inline-flex; justify-content: center; align-items: center;">${String.fromCharCode(65 + i)}</span> 
            ${opt}
        </button>
    `).join('');

    appContainer.innerHTML = `
        <div class="section" id="quiz-view">
            <button class="btn-back" onclick="playSelectSound(); renderContent()">
                <i class="fa-solid fa-times"></i> Thoát bài thi
            </button>
            
            <div class="quiz-container">
                <div class="quiz-header">
                    <span class="question-status">Câu hỏi ${questionIndex + 1} / ${currentQuestions.length}</span>
                    <span class="score-text">💰 Điểm: ${userScore}</span>
                </div>
                
                <h3 class="question-text">${q.question}</h3>
                
                <div class="options-grid">
                    ${optionsHTML}
                </div>
                
                <div class="quiz-footer">
                    <button class="btn-primary" id="btn-next" onclick="submitAnswer()" disabled>
                        Kiểm Tra <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function selectOption(index) {
    if (isAnswered) return; // Nếu đã khóa đáp án thì không cho chọn lại
    
    playSelectSound(); // Âm thanh chọn đáp án
    selectedOption = index;
    
    // Xóa class selected khỏi tất cả các nút
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Thêm selected vào nút vừa chọn
    document.getElementById(`opt-${index}`).classList.add('selected');
    
    // Bật nút Kiểm Tra
    document.getElementById('btn-next').disabled = false;
}

function submitAnswer() {
    if (isAnswered) {
        // Đang ở trạng thái review, bấm Next để qua câu
        playSelectSound();
        nextQuestion();
        return;
    }

    const q = currentQuestions[questionIndex];
    isAnswered = true;
    const btnNext = document.getElementById('btn-next');
    
    // Kiểm tra tính đúng/sai
    if (selectedOption === q.a) {
        // Đúng
        userScore += 10; // Cứ mỗi câu đúng 10 điểm
        document.getElementById(`opt-${selectedOption}`).classList.add('correct');
        playCorrectSound(); // Gọi âm thanh ting ting
    } else {
        // Sai
        document.getElementById(`opt-${selectedOption}`).classList.add('wrong');
        document.getElementById(`opt-${q.a}`).classList.add('correct');
        playWrongSound(); // Gọi âm thanh buzz
    }

    btnNext.innerHTML = 'Tiếp tục <i class="fa-solid fa-arrow-right"></i>';
    document.querySelector('.score-text').innerHTML = `💰 Điểm: ${userScore}`;
}

function nextQuestion() {
    questionIndex++;
    if (questionIndex < currentQuestions.length) {
        renderQuiz();
    } else {
        renderResult();
    }
}

async function renderResult() {
    playVictorySound(); // Âm thanh chiến thắng cuối kì
    
    const totalMax = currentQuestions.length * 10;
    
    // Lưu kết quả lên Supabase
    if (supabaseClient) {
        try {
            await supabaseClient.from('quiz_results').insert([
                {
                    student_name: studentName,
                    class_name: studentClass,
                    score: userScore
                }
            ]);
        } catch (error) {
            console.error("Lỗi khi lưu điểm:", error);
        }
    }
    const percent = userScore / totalMax;
    let message = "Tuyệt vời! Em làm rất xuất sắc!";
    if (percent < 0.5) {
        message = "Cố gắng lên nhé! Lần sau sẽ cực kì tốt hơn!";
    } else if (percent < 0.8) {
        message = "Rất tốt! Em đã nắm bài khá vững!";
    }

    appContainer.innerHTML = `
        <div class="section" id="quiz-result">
            <div class="quiz-container result-container">
                <i class="fa-solid fa-trophy trophy-icon"></i>
                <h2>Hoàn Thành Bài Thi!</h2>
                <p>Số điểm của em: <span style="color: var(--grade-5); font-weight:800; font-size:2rem;">${userScore} / ${totalMax}</span></p>
                <p style="color: var(--text-dark); margin-bottom: 40px; font-style: italic;">"${message}"</p>
                
                <div>
                    <button class="btn-primary" style="margin: 0 auto; margin-bottom: 15px;" onclick="playSelectSound(); initQuiz()">
                        <i class="fa-solid fa-rotate-right"></i> Làm lại bài này
                    </button>
                    <button class="btn-back" style="box-shadow: none; border-color: transparent;" onclick="playSelectSound(); renderContent()">
                        Về danh sách bài
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Khởi tạo trang web lúc ban đầu
window.onload = () => {
    // User gesture needed for audio context to start
    document.body.addEventListener('click', () => {
        if(audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }, { once: true });
    
    renderHome();
};

/* =========================================
   ADMIN DASHBOARD SECTION
   ========================================= */

function renderAdminLogin() {
    appContainer.innerHTML = `
        <div class="section" id="admin-login-view">
            <button class="btn-back" onclick="playSelectSound(); renderHome()">
                <i class="fa-solid fa-arrow-left"></i> Về trang chủ
            </button>
            <div class="quiz-container" style="max-width: 400px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <i class="fa-solid fa-user-shield" style="font-size: 3rem; color: var(--grade-5); margin-bottom: 10px;"></i>
                    <h2>Giáo Viên Đăng Nhập</h2>
                </div>
                <div class="form-group">
                    <label>Tài khoản</label>
                    <input type="text" id="admin-user" class="form-input" placeholder="Nhập tài khoản" onkeyup="if(event.key === 'Enter') document.getElementById('admin-pass').focus();">
                </div>
                <div class="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" id="admin-pass" class="form-input" placeholder="Nhập mật khẩu" onkeyup="if(event.key === 'Enter') handleAdminLogin();">
                </div>
                <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="handleAdminLogin()">Đăng Nhập</button>
            </div>
        </div>
    `;
}

function handleAdminLogin() {
    playSelectSound();
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    if (user === "admin" && pass === "ththamdon3") {
        renderAdminDashboard();
    } else {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
}

async function renderAdminDashboard() {
    let filterOptions = '<option value="">Tất cả các lớp</option>';
    classOptions.forEach(cls => {
        filterOptions += `<option value="${cls}">${cls}</option>`;
    });

    appContainer.innerHTML = `
        <div class="section" id="admin-dashboard-view">
            <button class="btn-back" onclick="playSelectSound(); renderHome()">
                <i class="fa-solid fa-arrow-left"></i> Đăng xuất
            </button>
            <div class="quiz-container" style="max-width: 900px; text-align: left;">
                <h2><i class="fa-solid fa-ranking-star" style="color: var(--grade-3);"></i> Bảng Điểm Học Sinh</h2>
                
                <div class="filter-bar">
                    <div>
                        <label style="font-weight: bold; margin-right: 10px;">Lọc theo lớp:</label>
                        <select id="admin-class-filter" class="form-input" style="width: auto; display: inline-block; padding: 8px;" onchange="loadAdminData()">
                            ${filterOptions}
                        </select>
                    </div>
                    <button class="btn-primary" style="padding: 8px 15px; font-size: 1.1rem;" onclick="loadAdminData()"><i class="fa-solid fa-rotate-right"></i> Làm mới</button>
                </div>

                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 60px;">STT</th>
                                <th>Họ và Tên</th>
                                <th style="width: 100px;">Lớp</th>
                                <th style="width: 100px;">Điểm</th>
                                <th style="width: 180px;">Thời gian</th>
                            </tr>
                        </thead>
                        <tbody id="admin-table-body">
                            <tr><td colspan="5" style="text-align:center;" class="loading-text">Đang tải dữ liệu...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    await loadAdminData();
}

async function loadAdminData() {
    const tbody = document.getElementById('admin-table-body');
    const filterClass = document.getElementById('admin-class-filter').value;
    
    if (!supabaseClient) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--accent-pink); padding: 30px;"><b>Chưa kết nối Supabase!</b><br>Vui lòng cập nhật URL và KEY trong file env.js</td></tr>';
        return;
    }

    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;" class="loading-text">Đang tải biểu điểm...</td></tr>';

    try {
        let query = supabaseClient.from('quiz_results').select('*').order('created_at', { ascending: false });
        
        if (filterClass) {
            query = query.eq('class_name', filterClass);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chưa có học sinh nào nộp bài.</td></tr>';
            return;
        }

        tbody.innerHTML = data.map((row, index) => {
            const date = new Date(row.created_at);
            const dateStr = date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td style="font-weight:bold;">${row.student_name}</td>
                    <td><span style="background-color: var(--bg-color); border: 2px solid var(--text-dark); border-radius: 10px; padding: 2px 8px; font-weight: 800;">${row.class_name}</span></td>
                    <td style="color:var(--grade-5); font-weight:bold; font-size: 1.2rem;">${row.score}</td>
                    <td style="font-size: 0.9rem;">${dateStr}</td>
                </tr>
            `;
        }).join('');
    } catch (err) {
        console.error("Lỗi tải dữ liệu admin:", err);
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--accent-pink);">Có lỗi khi lấy dữ liệu! Vui lòng kiểm tra lại quyền truy cập hoặc cấu hình Database.</td></tr>';
    }
}
