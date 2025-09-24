function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function setProbabilityClass(el, value) {
    el.classList.remove('probability-high', 'probability-medium', 'probability-low');
    if (value >= 70) el.classList.add('probability-high');
    else if (value >= 40) el.classList.add('probability-medium');
    else el.classList.add('probability-low');
}

async function fetchStudentDetailById(studentId) {
    // TODO: 替换为真实接口请求
    // const res = await fetch(`/api/students/${encodeURIComponent(studentId)}`);
    // if (!res.ok) throw new Error('网络错误');
    // return await res.json();

    const baseStudents = {
        'S001': { id: 'S001', name: '张小明', phone: '138****1234', courseId: 'C001', courseName: '高中数学强化班', probability: 85 },
        'S002': { id: 'S002', name: '李小红', phone: '139****5678', courseId: 'C002', courseName: '初中英语冲刺班', probability: 72 },
        'S003': { id: 'S003', name: '王小强', phone: '137****9012', courseId: 'C003', courseName: '小学奥数提高班', probability: 58 },
        'S004': { id: 'S004', name: '赵小丽', phone: '136****3456', courseId: 'C004', courseName: '高中物理提升班', probability: 91 },
        'S005': { id: 'S005', name: '陈小华', phone: '135****7890', courseId: 'C005', courseName: '初中数学基础班', probability: 43 }
    };
    const baseHistories = {
        'S001': [72, 75, 78, 80, 83, 85, 86, 87],
        'S002': [60, 62, 65, 67, 70, 71, 72, 72],
        'S003': [40, 45, 50, 52, 55, 57, 58, 59],
        'S004': [88, 89, 90, 90, 91, 92, 92, 93],
        'S005': [30, 35, 38, 40, 42, 43, 44, 45]
    };

    const info = baseStudents[studentId] || { id: studentId, name: '未知', phone: '-', courseId: '-', courseName: '-', probability: 0 };
    const values = baseHistories[studentId] || [50, 52, 54, 56, 58, 60, 62, 64];
    const today = new Date();
    const intentionHistory = values.map((v, idx) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (values.length - 1 - idx) * 7);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return { date: `${d.getFullYear()}-${mm}-${dd}`, value: v };
    });
    const participationPool = [
        { courseName: '数学讲座', status: '已出勤', homework: '已完成' },
        { courseName: '英语公开课', status: '缺勤', homework: '未布置' },
        { courseName: '家长沟通会', status: '已出勤', homework: '不适用' },
        { courseName: '物理实验课', status: '请假', homework: '未完成' },
        { courseName: '化学体验营', status: '已出勤', homework: '部分完成' }
    ];
    const recentParticipation = Array.from({ length: 5 }).map((_, i) => {
        const item = participationPool[i % participationPool.length];
        const d = new Date(today);
        d.setDate(today.getDate() - i * 3);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return { id: `${studentId}-P${i + 1}`, courseName: item.courseName, date: `${d.getFullYear()}-${mm}-${dd}`, status: item.status, homework: item.homework };
    });
    return { info, intentionHistory, recentParticipation };
}

function drawIntentionChart(history) {
    const canvas = document.getElementById('intentionChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // 根据容器宽度与 DPR 设置画布像素尺寸，提高清晰度（移动端友好）
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 800;
    const cssHeight = 260; // 固定 CSS 高度以保持可读性
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    const width = canvas.width;
    const height = canvas.height;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padding = { left: 50, right: 20, top: 20, bottom: 44 };
    const plotWidth = cssWidth - padding.left - padding.right;
    const plotHeight = cssHeight - padding.top - padding.bottom;

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();

    if (!history || history.length === 0) return;
    const values = history.map(p => p.value);
    const minVal = Math.min(0, Math.min(...values));
    const maxVal = Math.max(100, Math.max(...values));
    const xStep = plotWidth / (history.length - 1);

    ctx.strokeStyle = '#f1f3f4';
    ctx.fillStyle = '#888';
    ctx.font = '12px sans-serif';
    for (let g = 0; g <= 5; g++) {
        const val = (g * 20);
        const y = padding.top + (1 - (val - minVal) / (maxVal - minVal)) * plotHeight;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(String(val), 12, y + 4);
    }

    ctx.lineWidth = 2;
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    history.forEach((p, idx) => {
        const x = padding.left + idx * xStep;
        const y = padding.top + (1 - (p.value - minVal) / (maxVal - minVal)) * plotHeight;
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = '#667eea';
    history.forEach((p, idx) => {
        const x = padding.left + idx * xStep;
        const y = padding.top + (1 - (p.value - minVal) / (maxVal - minVal)) * plotHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.fillStyle = '#666';
    const labels = history.map(p => p.date.slice(5));
    const labelCount = labels.length;
    for (let i = 0; i < labelCount; i++) {
        if (i === 0 || i === labelCount - 1 || (labelCount <= 8) || (i % Math.ceil(labelCount / 6) === 0)) {
            const x = padding.left + i * xStep;
            const y = height - padding.bottom + 16;
            const text = labels[i];
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, x - textWidth / 2, y);
        }
    }
}

function renderParticipation(list) {
    const container = document.getElementById('participationList');
    container.innerHTML = '';
    if (!list || list.length === 0) {
        container.innerHTML = '<div class="empty-participation">暂无参与记录</div>';
        return;
    }
    list.forEach(item => {
        const row = document.createElement('div');
        row.className = 'participation-item';
        const left = document.createElement('div');
        left.className = 'p-left';
        const course = document.createElement('div');
        course.className = 'p-course';
        course.textContent = item.courseName;
        const meta = document.createElement('div');
        meta.className = 'p-meta';
        meta.textContent = `${item.date}`;
        left.appendChild(course);
        left.appendChild(meta);

        const right = document.createElement('div');
        right.className = 'p-right';

        const row1 = document.createElement('div');
        row1.className = 'tag-row';
        const label1 = document.createElement('span');
        label1.className = 'tag-label';
        label1.textContent = '出勤';
        const statusTag = document.createElement('div');
        statusTag.className = 'status-tag ' + (item.status === '已出勤' ? 'ok' : (item.status === '请假' ? 'warn' : 'bad'));
        statusTag.textContent = item.status;
        row1.appendChild(label1);
        row1.appendChild(statusTag);

        const row2 = document.createElement('div');
        row2.className = 'tag-row';
        const label2 = document.createElement('span');
        label2.className = 'tag-label';
        label2.textContent = '作业';
        const homeworkTag = document.createElement('div');
        const hwClass = item.homework === '已完成' ? 'ok' : (item.homework === '部分完成' ? 'warn' : (item.homework === '未布置' || item.homework === '不适用' ? '' : 'bad'));
        homeworkTag.className = 'status-tag ' + hwClass;
        homeworkTag.textContent = item.homework;
        row2.appendChild(label2);
        row2.appendChild(homeworkTag);

        right.appendChild(row1);
        right.appendChild(row2);

        row.appendChild(left);
        row.appendChild(right);
        container.appendChild(row);
    });
}

async function bootstrap() {
    const studentId = getQueryParam('id');
    if (!studentId) {
        alert('缺少学生ID');
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('studentIdText').textContent = studentId;
    const detail = await fetchStudentDetailById(studentId);
    const info = detail.info;
    document.getElementById('fieldId').textContent = info.id;
    document.getElementById('fieldName').textContent = info.name;
    document.getElementById('fieldPhone').textContent = info.phone;
    document.getElementById('fieldCourseId').textContent = info.courseId;
    document.getElementById('fieldCourseName').textContent = info.courseName;
    const probEl = document.getElementById('fieldProbability');
    probEl.textContent = `${info.probability}%`;
    setProbabilityClass(probEl, Number(info.probability) || 0);

    drawIntentionChart(detail.intentionHistory);
    renderParticipation(detail.recentParticipation);

    // 移动端基本信息折叠
    const toggleBtn = document.getElementById('toggleInfoBtn');
    const grid = document.querySelector('.basic-info-grid');
    function applyCollapsed(collapsed) {
        const items = grid.querySelectorAll('div');
        items.forEach((el, idx) => {
            // 保留：姓名(索引1) 与 当前意愿(索引5)，其余折叠
            if (collapsed) {
                if (idx !== 1 && idx !== 5) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            } else {
                el.style.display = '';
            }
        });
        toggleBtn.textContent = collapsed ? '展开更多' : '收起';
    }

    function updateToggleVisibility() {
        const isMobile = window.matchMedia('(max-width: 576px)').matches;
        toggleBtn.style.display = isMobile ? '' : 'none';
        if (isMobile) applyCollapsed(true); else applyCollapsed(false);
    }
    updateToggleVisibility();
    window.addEventListener('resize', updateToggleVisibility);
    toggleBtn.addEventListener('click', () => {
        const collapsedNow = toggleBtn.textContent === '展开更多';
        applyCollapsed(!collapsedNow);
    });
}

bootstrap();


