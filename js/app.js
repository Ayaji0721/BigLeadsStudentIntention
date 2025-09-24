const App = {
    data() {
        return {
            searchType: 'course', // 'course' 或 'student'
            searchKeyword: '',
            loading: false,
            sortOrder: 'none', // 'none', 'asc', 'desc'
            originalStudents: [
                // 模拟数据
                {
                    id: 'S001',
                    name: '张小明',
                    courseId: 'C001',
                    courseName: '高中数学强化班',
                    phone: '138****1234',
                    probability: 85
                },
                {
                    id: 'S002',
                    name: '李小红',
                    courseId: 'C002',
                    courseName: '初中英语冲刺班',
                    phone: '139****5678',
                    probability: 72
                },
                {
                    id: 'S003',
                    name: '王小强',
                    courseId: 'C003',
                    courseName: '小学奥数提高班',
                    phone: '137****9012',
                    probability: 58
                },
                {
                    id: 'S004',
                    name: '赵小丽',
                    courseId: 'C004',
                    courseName: '高中物理提升班',
                    phone: '136****3456',
                    probability: 91
                },
                {
                    id: 'S005',
                    name: '陈小华',
                    courseId: 'C005',
                    courseName: '初中数学基础班',
                    phone: '135****7890',
                    probability: 43
                }
            ],
            students: []
        }
    },
    
    computed: {
        sortedStudents() {
            if (this.sortOrder === 'none') {
                return this.students;
            }
            
            const sorted = [...this.students].sort((a, b) => {
                if (this.sortOrder === 'asc') {
                    return a.probability - b.probability;
                } else {
                    return b.probability - a.probability;
                }
            });
            
            return sorted;
        }
    },
    methods: {
        search() {
            if (!this.searchKeyword.trim()) {
                alert('请输入搜索关键词');
                return;
            }
            
            this.loading = true;
            
            // 模拟搜索延迟
            setTimeout(() => {
                // 这里应该调用实际的API
                console.log(`搜索类型: ${this.searchType}, 关键词: ${this.searchKeyword}`);
                
                // 模拟搜索结果过滤
                const filteredStudents = this.originalStudents.filter(student => {
                    if (this.searchType === 'course') {
                        return student.courseName.includes(this.searchKeyword) || 
                               student.courseId.includes(this.searchKeyword);
                    } else {
                        return student.name.includes(this.searchKeyword) || 
                               student.id.includes(this.searchKeyword) ||
                               student.phone.includes(this.searchKeyword);
                    }
                });
                
                this.students = filteredStudents;
                this.loading = false;
            }, 1000);
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
            alert(`查看课程 ${courseId} 的详细信息\n\n` +
                  `课程ID: ${courseId}\n` +
                  `这里可以显示课程的详细信息，如课程介绍、价格、时间等`);
        },
        
        toggleSort() {
            if (this.sortOrder === 'none') {
                this.sortOrder = 'desc'; // 第一次点击：降序（高到低）
            } else if (this.sortOrder === 'desc') {
                this.sortOrder = 'asc'; // 第二次点击：升序（低到高）
            } else {
                this.sortOrder = 'none'; // 第三次点击：取消排序
            }
        }
    },
    
    mounted() {
        // 页面加载时的初始化逻辑
        this.students = [...this.originalStudents];
        console.log('学生转化管理系统已加载');
    }
};

// 创建Vue应用实例
Vue.createApp(App).mount('#app');
