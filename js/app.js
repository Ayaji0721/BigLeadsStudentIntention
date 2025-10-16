const App = {
    data() {
        return {
            // 当前登录用户
            currentUser: {
                name: '张老师',
                avatar: 'https://ui-avatars.com/api/?name=老师&background=d32f2f&color=fff&size=128'
            },
            
            // 统计数据
            stats: {
                bPlus: 56,
                bPlusPercent: 40.1,
                b: 56,
                bPercent: 40.1,
                bMinus: 56,
                bMinusPercent: 40.0
            },
            
            // 筛选条件
            filters: {
                name: '',
                phone: '',
                studentId: '',
                intention: ''
            },
            
            // 分页
            currentPage: 1,
            pageSize: 12,
            
            loading: false,
            
            // 模拟完整学生数据（包含头像、年级、性别、城市、科目）
            allStudents: [
                {
                    id: 'S001',
                    name: '乐欣',
                    phone: '138****1234',
                    courseId: 'C001',
                    courseName: '高中数学强化班',
                    probability: 85,
                    avatar: 'https://ui-avatars.com/api/?name=乐欣&background=4caf50&color=fff&size=128&length=2',
                    grade: '初二',
                    gender: '女',
                    city: '北京',
                    subject: '语文'
                },
                {
                    id: 'S002',
                    name: '李小红',
                    phone: '139****5678',
                    courseId: 'C002',
                    courseName: '初中英语冲刺班',
                    probability: 72,
                    avatar: 'https://ui-avatars.com/api/?name=小红&background=ff9800&color=fff&size=128&length=2',
                    grade: '初二',
                    gender: '女',
                    city: '上海',
                    subject: '英语'
                },
                {
                    id: 'S003',
                    name: '王小强',
                    phone: '137****9012',
                    courseId: 'C003',
                    courseName: '小学奥数提高班',
                    probability: 58,
                    avatar: 'https://ui-avatars.com/api/?name=小强&background=2196f3&color=fff&size=128&length=2',
                    grade: '初三',
                    gender: '男',
                    city: '广州',
                    subject: '数学'
                },
                {
                    id: 'S004',
                    name: '赵小丽',
                    phone: '136****3456',
                    courseId: 'C004',
                    courseName: '高中物理提升班',
                    probability: 91,
                    avatar: 'https://ui-avatars.com/api/?name=小丽&background=9c27b0&color=fff&size=128&length=2',
                    grade: '初一',
                    gender: '女',
                    city: '深圳',
                    subject: '物理'
                },
                {
                    id: 'S005',
                    name: '陈小华',
                    phone: '135****7890',
                    courseId: 'C005',
                    courseName: '初中数学基础班',
                    probability: 43,
                    avatar: 'https://ui-avatars.com/api/?name=小华&background=f44336&color=fff&size=128&length=2',
                    grade: '初二',
                    gender: '男',
                    city: '北京',
                    subject: '化学'
                },
                {
                    id: 'S006',
                    name: '刘明',
                    phone: '136****1111',
                    courseId: 'C006',
                    courseName: '初中物理进阶班',
                    probability: 78,
                    avatar: 'https://ui-avatars.com/api/?name=刘明&background=3f51b5&color=fff&size=128&length=2',
                    grade: '初三',
                    gender: '男',
                    city: '杭州',
                    subject: '物理'
                },
                {
                    id: 'S007',
                    name: '张婷',
                    phone: '137****2222',
                    courseId: 'C007',
                    courseName: '高中化学实验班',
                    probability: 65,
                    avatar: 'https://ui-avatars.com/api/?name=张婷&background=00bcd4&color=fff&size=128&length=2',
                    grade: '初一',
                    gender: '女',
                    city: '成都',
                    subject: '化学'
                },
                {
                    id: 'S008',
                    name: '周杰',
                    phone: '138****3333',
                    courseId: 'C008',
                    courseName: '初中语文阅读班',
                    probability: 88,
                    avatar: 'https://ui-avatars.com/api/?name=周杰&background=009688&color=fff&size=128&length=2',
                    grade: '初二',
                    gender: '男',
                    city: '武汉',
                    subject: '语文'
                },
                {
                    id: 'S009',
                    name: '吴娜',
                    phone: '139****4444',
                    courseId: 'C009',
                    courseName: '初中英语口语班',
                    probability: 52,
                    avatar: 'https://ui-avatars.com/api/?name=吴娜&background=8bc34a&color=fff&size=128&length=2',
                    grade: '初三',
                    gender: '女',
                    city: '西安',
                    subject: '英语'
                },
                {
                    id: 'S010',
                    name: '郑强',
                    phone: '136****5555',
                    courseId: 'C010',
                    courseName: '高中数学竞赛班',
                    probability: 95,
                    avatar: 'https://ui-avatars.com/api/?name=郑强&background=ff5722&color=fff&size=128&length=2',
                    grade: '初二',
                    gender: '男',
                    city: '南京',
                    subject: '数学'
                },
                {
                    id: 'S011',
                    name: '孙丽',
                    phone: '137****6666',
                    courseId: 'C011',
                    courseName: '初中生物基础班',
                    probability: 38,
                    avatar: 'https://ui-avatars.com/api/?name=孙丽&background=cddc39&color=333&size=128&length=2',
                    grade: '初一',
                    gender: '女',
                    city: '天津',
                    subject: '生物'
                },
                {
                    id: 'S012',
                    name: '钱勇',
                    phone: '138****7777',
                    courseId: 'C012',
                    courseName: '初中历史精讲班',
                    probability: 70,
                    avatar: 'https://ui-avatars.com/api/?name=钱勇&background=795548&color=fff&size=128&length=2',
                    grade: '初三',
                    gender: '男',
                    city: '重庆',
                    subject: '历史'
                }
            ],
            
            filteredStudents: []
        }
    },
    
    computed: {
        // 分页后的学生列表
        displayStudents() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredStudents.slice(start, end);
        },
        
        // 总页数
        totalPages() {
            return Math.ceil(this.filteredStudents.length / this.pageSize);
        },
        
        // 可见的页码
        visiblePages() {
            const pages = [];
            const total = this.totalPages;
            const current = this.currentPage;
            
            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                if (current <= 3) {
                    for (let i = 1; i <= 5; i++) pages.push(i);
                } else if (current >= total - 2) {
                    for (let i = total - 4; i <= total; i++) pages.push(i);
                } else {
                    for (let i = current - 2; i <= current + 2; i++) pages.push(i);
                }
            }
            
            return pages;
        }
    },
    
    methods: {
        search() {
            this.loading = true;
            
            // 模拟搜索延迟
            setTimeout(() => {
                // 根据筛选条件过滤
                this.filteredStudents = this.allStudents.filter(student => {
                    let match = true;
                    
                    if (this.filters.name && !student.name.includes(this.filters.name)) {
                        match = false;
                    }
                    
                    if (this.filters.phone && !student.phone.includes(this.filters.phone)) {
                        match = false;
                    }
                    
                    if (this.filters.studentId && !student.id.includes(this.filters.studentId)) {
                        match = false;
                    }
                    
                    if (this.filters.intention) {
                        if (this.filters.intention === 'bPlus' && student.probability < 70) {
                            match = false;
                        } else if (this.filters.intention === 'b' && (student.probability < 40 || student.probability >= 70)) {
                            match = false;
                        } else if (this.filters.intention === 'bMinus' && student.probability >= 40) {
                            match = false;
                        }
                    }
                    
                    return match;
                });
                
                // 重置到第一页
                this.currentPage = 1;
                this.loading = false;
            }, 500);
        },
        
        updateStats() {
            // 统计数据固定，基于所有学生
            const total = this.allStudents.length;
            const bPlus = this.allStudents.filter(s => s.probability >= 70).length;
            const b = this.allStudents.filter(s => s.probability >= 40 && s.probability < 70).length;
            const bMinus = this.allStudents.filter(s => s.probability < 40).length;
            
            this.stats.bPlus = bPlus;
            this.stats.bPlusPercent = total > 0 ? ((bPlus / total) * 100).toFixed(1) : 0;
            this.stats.b = b;
            this.stats.bPercent = total > 0 ? ((b / total) * 100).toFixed(1) : 0;
            this.stats.bMinus = bMinus;
            this.stats.bMinusPercent = total > 0 ? ((bMinus / total) * 100).toFixed(1) : 0;
        },
        
        getLevelLabel(probability) {
            if (probability >= 70) return 'B+';
            else if (probability >= 40) return 'B';
            else return 'B-';
        },
        
        getLevelClass(probability) {
            if (probability >= 70) return 'level-bplus';
            else if (probability >= 40) return 'level-b';
            else return 'level-bminus';
        },
        
        getProbabilityClass(probability) {
            if (probability >= 70) {
                return 'probability-high';
            } else if (probability >= 40) {
                return 'probability-medium';
            } else {
                return 'probability-low';
            }
        },
        
        navigateToDetail(studentId) {
            window.location.href = `student.html?id=${encodeURIComponent(studentId)}`;
        },
        
        viewCourseDetail(courseId) {
            alert(`查看课程 ${courseId} 的详细信息`);
        },
        
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    mounted() {
        // 页面加载时显示所有学生
        this.filteredStudents = [...this.allStudents];
        this.updateStats();
        console.log('学生转化管理系统已加载');
    }
};

// 创建Vue应用实例
Vue.createApp(App).mount('#app');
