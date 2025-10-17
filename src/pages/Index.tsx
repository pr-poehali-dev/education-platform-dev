import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusMode, setFocusMode] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [language, setLanguage] = useState('ru');
  const [startTime, setStartTime] = useState('09:00');
  const [showTimeSettings, setShowTimeSettings] = useState(false);

  const translations: any = {
    ru: {
      appName: 'Learn & Grow Soro',
      home: 'Главная',
      courses: 'Курсы',
      schedule: 'Расписание',
      materials: 'Материалы',
      tests: 'Тесты',
      profile: 'Профиль',
      discipline: 'Дисциплина',
      disciplineText: 'Строй свою будущее через ежедневную дисциплину',
      description: 'Бесплатная платформа для школьников и студентов с фокусом на результате',
      startLearning: 'Начать занятия',
      achievements: 'Достижения',
      scheduleToday: 'Расписание на сегодня',
      totalTime: 'Общее время занятий',
      focusMode: 'Режим фокусировки',
      timeLeft: 'Осталось времени',
      free: 'Бесплатно',
      setTime: 'Установить время',
      chooseStartTime: 'Выберите время начала занятий',
    },
    tj: {
      appName: 'Learn & Grow Soro',
      home: 'Саҳифаи асосӣ',
      courses: 'Курсҳо',
      schedule: 'Дастури рӯз',
      materials: 'Маводд',
      tests: 'Азмунҳо',
      profile: 'Профил',
      discipline: 'Интизом',
      disciplineText: 'Ояндаатонро бо интизоми ҳаррӯза бисозед',
      description: 'Платформаи ройгон барои хонандагон ва донишҷӯён',
      startLearning: 'Оғози таҳсил',
      achievements: 'Дастовардҳо',
      scheduleToday: 'Дастури имрӯз',
      totalTime: 'Вақти умумӣ',
      focusMode: 'Ҳолати тамаркуз',
      timeLeft: 'Вақти боқимонда',
      free: 'Ройгон',
      setTime: 'Вақтро танзим кунед',
      chooseStartTime: 'Вақти оғозро интихоб кунед',
    },
    kk: {
      appName: 'Learn & Grow Soro',
      home: 'Басты бет',
      courses: 'Курстар',
      schedule: 'Кесте',
      materials: 'Құралдар',
      tests: 'Тесттер',
      profile: 'Профиль',
      discipline: 'Тәртіп',
      disciplineText: 'Күнделікті тәртіп арқылы болашақыңды құр',
      description: 'Оқушылар мен студенттерге тегін платформа',
      startLearning: 'Оқуды бастау',
      achievements: 'Жетістіктер',
      scheduleToday: 'Бүгінгі кесте',
      totalTime: 'Жалпы уақыт',
      focusMode: 'Фокус режимі',
      timeLeft: 'Қалған уақыт',
      free: 'Тегін',
      setTime: 'Уақытты орнату',
      chooseStartTime: 'Бастау уақытын таңдаңыз',
    },
    uz: {
      appName: 'Learn & Grow Soro',
      home: 'Bosh sahifa',
      courses: 'Kurslar',
      schedule: 'Jadval',
      materials: 'Materiallar',
      tests: 'Testlar',
      profile: 'Profil',
      discipline: 'Intizom',
      disciplineText: 'Kelajakni har kungi intizom orqali qur',
      description: 'O\'quvchilar va talabalar uchun bepul platforma',
      startLearning: 'O\'qishni boshlash',
      achievements: 'Yutuqlar',
      scheduleToday: 'Bugungi jadval',
      totalTime: 'Umumiy vaqt',
      focusMode: 'Fokus rejimi',
      timeLeft: 'Qolgan vaqt',
      free: 'Bepul',
      setTime: 'Vaqtni o\'rnatish',
      chooseStartTime: 'Boshlanish vaqtini tanlang',
    },
    ko: {
      appName: 'Learn & Grow Soro',
      home: '홈',
      courses: '과정',
      schedule: '일정',
      materials: '자료',
      tests: '테스트',
      profile: '프로필',
      discipline: '규율',
      disciplineText: '매일의 규율로 미래를 만들어라',
      description: '학생을 위한 무료 플랫폼',
      startLearning: '학습 시작',
      achievements: '성취',
      scheduleToday: '오늘의 일정',
      totalTime: '총 시간',
      focusMode: '집중 모드',
      timeLeft: '남은 시간',
      free: '무료',
      setTime: '시간 설정',
      chooseStartTime: '시작 시간 선택',
    },
    zh: {
      appName: 'Learn & Grow Soro',
      home: '主页',
      courses: '课程',
      schedule: '日程',
      materials: '材料',
      tests: '测试',
      profile: '个人资料',
      discipline: '纪律',
      disciplineText: '通过每日纪律构建未来',
      description: '面向学生的免费平台',
      startLearning: '开始学习',
      achievements: '成就',
      scheduleToday: '今日日程',
      totalTime: '总时间',
      focusMode: '专注模式',
      timeLeft: '剩余时间',
      free: '免费',
      setTime: '设置时间',
      chooseStartTime: '选择开始时间',
    },
  };

  const t = translations[language];

  const generateSchedule = (start: string) => {
    const [startH, startM] = start.split(':').map(Number);
    let currentMin = startH * 60 + startM;
    
    const addTime = (minutes: number) => {
      currentMin += minutes;
      const h = Math.floor(currentMin / 60);
      const m = currentMin % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };
    
    const lessons = [
      { subject: 'Математика', duration: 90, icon: 'Calculator', gradient: 'from-purple-500 to-pink-500' },
      { subject: 'Перерыв', duration: 15, icon: 'Coffee', gradient: 'from-green-400 to-emerald-400', isBreak: true },
      { subject: 'Физика', duration: 90, icon: 'Atom', gradient: 'from-blue-500 to-cyan-500' },
      { subject: 'Обед', duration: 45, icon: 'UtensilsCrossed', gradient: 'from-orange-400 to-amber-400', isBreak: true },
      { subject: 'Программирование', duration: 90, icon: 'Code', gradient: 'from-orange-500 to-red-500' },
      { subject: 'Перерыв', duration: 15, icon: 'Coffee', gradient: 'from-green-400 to-emerald-400', isBreak: true },
      { subject: 'Английский', duration: 90, icon: 'Globe', gradient: 'from-green-500 to-emerald-500' },
    ];
    
    return lessons.map((lesson, index) => {
      const startTime = index === 0 ? start : addTime(0);
      const endTime = addTime(lesson.duration);
      return {
        id: index + 1,
        ...lesson,
        start: startTime,
        end: endTime,
      };
    });
  };

  const schedule = generateSchedule(startTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const current = schedule.find(lesson => {
      const [startH, startM] = lesson.start.split(':').map(Number);
      const [endH, endM] = lesson.end.split(':').map(Number);
      const startMin = startH * 60 + startM;
      const endMin = endH * 60 + endM;
      return now >= startMin && now < endMin;
    });
    setCurrentLesson(current || null);
    if (current && !current.isBreak) {
      setFocusMode(true);
    } else {
      setFocusMode(false);
    }
  }, [currentTime]);

  const getTimeRemaining = () => {
    if (!currentLesson) return null;
    const [endH, endM] = currentLesson.end.split(':').map(Number);
    const endTime = endH * 60 + endM;
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const remaining = endTime - now;
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    return { hours, minutes, total: remaining };
  };

  const blockedSites = [
    'youtube.com', 'instagram.com', 'tiktok.com', 'vk.com', 'telegram.org',
    'netflix.com', 'twitch.tv', 'reddit.com', 'twitter.com'
  ];

  const totalStudyTime = schedule.filter(s => !s.isBreak).reduce((acc, s) => acc + s.duration, 0);

  const courses = [
    {
      id: 1,
      title: 'Математика',
      progress: 75,
      level: 'Продвинутый',
      icon: 'Calculator',
      gradient: 'from-purple-500 to-pink-500',
      lessons: 24,
      completed: 18,
    },
    {
      id: 2,
      title: 'Физика',
      progress: 45,
      level: 'Средний',
      icon: 'Atom',
      gradient: 'from-blue-500 to-cyan-500',
      lessons: 20,
      completed: 9,
    },
    {
      id: 3,
      title: 'Программирование',
      progress: 90,
      level: 'Эксперт',
      icon: 'Code',
      gradient: 'from-orange-500 to-red-500',
      lessons: 30,
      completed: 27,
    },
    {
      id: 4,
      title: 'Английский',
      progress: 60,
      level: 'Средний',
      icon: 'Globe',
      gradient: 'from-green-500 to-emerald-500',
      lessons: 40,
      completed: 24,
    },
  ];

  const achievements = [
    { icon: 'Trophy', title: '10 курсов пройдено', color: 'text-yellow-500' },
    { icon: 'Award', title: '5 сертификатов', color: 'text-purple-500' },
    { icon: 'Target', title: '150 тестов сдано', color: 'text-blue-500' },
    { icon: 'Zap', title: '30 дней подряд', color: 'text-orange-500' },
  ];

  const teachers = [
    { name: 'Анна Петрова', subject: 'Математика', rating: 4.9, students: 250 },
    { name: 'Иван Смирнов', subject: 'Физика', rating: 4.8, students: 180 },
    { name: 'Мария Козлова', subject: 'Программирование', rating: 5.0, students: 320 },
  ];

  const totalProgress = Math.round(
    courses.reduce((acc, course) => acc + course.progress, 0) / courses.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.appName}
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              {[t.home, t.courses, t.schedule, t.materials, t.tests].map((item) => (
                <button
                  key={item}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="ru">🇷🇺 Русский</option>
                <option value="tj">🇹🇯 Тоҷикӣ</option>
                <option value="kk">🇰🇿 Қазақ</option>
                <option value="uz">🇺🇿 O'zbek</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                {t.profile}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {focusMode && currentLesson && (
          <div className="mb-8 animate-fade-in">
            <Card className="border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentLesson.gradient} flex items-center justify-center animate-float`}>
                      <Icon name={currentLesson.icon} className="text-white" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-orange-500 text-white">{t.focusMode}</Badge>
                        <Icon name="Lock" size={16} className="text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold">{currentLesson.subject}</h3>
                      <p className="text-gray-600">{currentLesson.start} - {currentLesson.end}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">{t.timeLeft}</p>
                    <p className="text-4xl font-bold text-orange-600">
                      {getTimeRemaining()?.hours}ч {getTimeRemaining()?.minutes}м
                    </p>
                    <Progress 
                      value={((currentLesson.duration - (getTimeRemaining()?.total || 0)) / currentLesson.duration) * 100} 
                      className="h-2 mt-2 w-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">{t.scheduleToday}</h3>
              <p className="text-gray-600">{t.totalTime}: {Math.floor(totalStudyTime / 60)}ч {totalStudyTime % 60}м (начало {startTime})</p>
            </div>
            <Button 
              variant={focusMode ? "destructive" : "default"}
              className={focusMode ? "" : "bg-gradient-to-r from-purple-500 to-pink-500"}
            >
              <Icon name={focusMode ? "Lock" : "Target"} size={20} className="mr-2" />
              {focusMode ? t.focusMode : t.discipline}
            </Button>
          </div>
          <div className="grid gap-4">
            {schedule.map((lesson, index) => {
              const isCurrent = currentLesson?.id === lesson.id;
              const [startH, startM] = lesson.start.split(':').map(Number);
              const startMin = startH * 60 + startM;
              const now = currentTime.getHours() * 60 + currentTime.getMinutes();
              const isPast = now > startMin + lesson.duration;
              
              return (
                <Card 
                  key={lesson.id} 
                  className={`transition-all ${
                    isCurrent ? 'border-2 border-orange-500 shadow-lg scale-105' : 
                    isPast ? 'opacity-50' : ''
                  } ${lesson.isBreak ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''}`}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lesson.gradient} flex items-center justify-center`}>
                          <Icon name={lesson.icon} className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold">{lesson.subject}</h4>
                            {isCurrent && <Badge className="bg-orange-500">Сейчас</Badge>}
                            {isPast && <Badge variant="secondary">Завершено</Badge>}
                            {lesson.isBreak && <Badge className="bg-green-500">Перерыв</Badge>}
                          </div>
                          <p className="text-gray-600">{lesson.start} - {lesson.end} ({lesson.duration} мин)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {!lesson.isBreak && (
                          <div className="text-right">
                            <Icon name="BookOpen" className="inline text-purple-500" size={20} />
                            <span className="ml-2 text-sm text-gray-600">Учебное время</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {focusMode && (
          <section className="mb-16">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Icon name="ShieldAlert" size={24} />
                  Заблокированные сайты во время занятий
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Для максимальной концентрации доступ к следующим сайтам временно ограничен:
                </p>
                <div className="flex flex-wrap gap-2">
                  {blockedSites.map((site, index) => (
                    <Badge key={index} variant="destructive" className="flex items-center gap-1">
                      <Icon name="Ban" size={14} />
                      {site}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  ⏰ Доступ восстановится после окончания текущего занятия
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="mb-16 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {t.free}
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  {t.discipline}
                </Badge>
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {t.disciplineText}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t.description}
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Icon name="Target" size={20} className="mr-2" />
                  {t.startLearning}
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowTimeSettings(true)}>
                  <Icon name="Clock" size={20} className="mr-2" />
                  {t.setTime}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/a97f273c-6a2c-448f-9b52-e4a48d080a6c/files/cc990203-d566-4bdc-8d1e-ce9e5054c20c.jpg"
                alt="Обучение"
                className="rounded-2xl shadow-2xl animate-float"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-scale-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Icon name="TrendingUp" className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.discipline}</p>
                    <p className="text-2xl font-bold text-gray-800">{totalProgress}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showTimeSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <Card className="max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.chooseStartTime}</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowTimeSettings(false)}>
                    <Icon name="X" size={20} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.chooseStartTime}</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg text-lg"
                    />
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {t.totalTime}: 6ч 0м
                    </p>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                    onClick={() => setShowTimeSettings(false)}
                  >
                    <Icon name="Check" size={20} className="mr-2" />
                    Сохранить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t.achievements}</h3>
            <p className="text-gray-600">{t.discipline}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 border-2"
              >
                <CardContent className="pt-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${achievement.color}`}>
                    <Icon name={achievement.icon as any} size={32} />
                  </div>
                  <p className="font-semibold">{achievement.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">Мои курсы</h3>
              <p className="text-gray-600">Продолжай обучение прямо сейчас</p>
            </div>
            <Button variant="outline">
              <Icon name="Filter" size={20} className="mr-2" />
              Фильтр
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                className="hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                        <Icon name={course.icon as any} className="text-white" size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Прогресс</span>
                        <span className="font-bold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        <Icon name="BookOpen" size={16} className="inline mr-1" />
                        {course.completed}/{course.lessons} уроков
                      </span>
                      <Button size="sm" className={`bg-gradient-to-r ${course.gradient} hover:opacity-90`}>
                        Продолжить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Наши преподаватели</h3>
            <p className="text-gray-600">Учись у лучших специалистов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {teachers.map((teacher, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer text-center"
              >
                <CardContent className="pt-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{teacher.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{teacher.subject}</p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{teacher.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Icon name="Users" size={16} />
                      <span>{teacher.students}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-4xl font-bold mb-4">Готов начать обучение?</h3>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйся к тысячам студентов и развивайся каждый день
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            <Icon name="Rocket" size={20} className="mr-2" />
            Начать бесплатно
          </Button>
        </section>
      </main>

      <footer className="border-t mt-20 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Learn & Grow Soro. Платформа для современного обучения</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;