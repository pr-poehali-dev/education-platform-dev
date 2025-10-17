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

  const schedule = [
    { id: 1, subject: 'Математика', start: '09:00', end: '10:30', duration: 90, icon: 'Calculator', gradient: 'from-purple-500 to-pink-500' },
    { id: 2, subject: 'Перерыв', start: '10:30', end: '10:45', duration: 15, icon: 'Coffee', gradient: 'from-green-400 to-emerald-400', isBreak: true },
    { id: 3, subject: 'Физика', start: '10:45', end: '12:15', duration: 90, icon: 'Atom', gradient: 'from-blue-500 to-cyan-500' },
    { id: 4, subject: 'Обед', start: '12:15', end: '13:00', duration: 45, icon: 'UtensilsCrossed', gradient: 'from-orange-400 to-amber-400', isBreak: true },
    { id: 5, subject: 'Программирование', start: '13:00', end: '14:30', duration: 90, icon: 'Code', gradient: 'from-orange-500 to-red-500' },
    { id: 6, subject: 'Перерыв', start: '14:30', end: '14:45', duration: 15, icon: 'Coffee', gradient: 'from-green-400 to-emerald-400', isBreak: true },
    { id: 7, subject: 'Английский', start: '14:45', end: '16:15', duration: 90, icon: 'Globe', gradient: 'from-green-500 to-emerald-500' },
  ];

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
                Learn & Grow Soro
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              {['Главная', 'Курсы', 'Расписание', 'Материалы', 'Тесты'].map((item) => (
                <button
                  key={item}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Профиль
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
                        <Badge className="bg-orange-500 text-white">Режим фокусировки</Badge>
                        <Icon name="Lock" size={16} className="text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold">{currentLesson.subject}</h3>
                      <p className="text-gray-600">{currentLesson.start} - {currentLesson.end}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Осталось времени</p>
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
              <h3 className="text-3xl font-bold mb-2">Расписание на сегодня</h3>
              <p className="text-gray-600">Общее время занятий: {Math.floor(totalStudyTime / 60)}ч {totalStudyTime % 60}м</p>
            </div>
            <Button 
              variant={focusMode ? "destructive" : "default"}
              className={focusMode ? "" : "bg-gradient-to-r from-purple-500 to-pink-500"}
            >
              <Icon name={focusMode ? "Lock" : "Unlock"} size={20} className="mr-2" />
              {focusMode ? 'Фокус активен' : 'Начать занятия'}
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
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
                Платформа нового поколения
              </Badge>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Обучение с{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  удовольствием
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Современная платформа для школьников и студентов с интерактивными курсами,
                отслеживанием прогресса и персональными рекомендациями
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать обучение
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Каталог курсов
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
                    <p className="text-sm text-gray-500">Твой прогресс</p>
                    <p className="text-2xl font-bold text-gray-800">{totalProgress}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Твои достижения</h3>
            <p className="text-gray-600">Отслеживай успехи и получай награды</p>
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