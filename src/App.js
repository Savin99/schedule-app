import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const ScheduleApp = () => {
  const [selectedTab, setSelectedTab] = useState('today');
  
  const isUpperWeek = () => {
    const currentDate = new Date();
    const startDate = new Date(2024, 0, 1);
    const diffTime = Math.abs(currentDate - startDate);
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks % 2 !== 0;
  };

  const schedule = {
    upper: {
      "Понедельник": [
        { time: "15:00-16:20", subject: "PR и международные отношения (лек.)", teacher: "Кореньков А.", room: "ауд. 528" }
      ],
      "Вторник": [
        { time: "10:30-11:50", subject: "Интегрированные коммуникации в бизнесе (лек.)", teacher: "Спиридонов В.В.", room: "ЕГФ-528" },
        { time: "12:00-13:20", subject: "Практика интегрированных маркетинговых коммуникаций (лек.)", teacher: "Спиридонов В.В.", room: "ЕГФ-528" },
        { time: "15:00-16:20", subject: "Интегрированные коммуникации в бизнесе (сем.)", teacher: "Спиридонов В.В.", room: "ЕГФ-729" },
        { time: "16:30-17:50", subject: "Интегрированные коммуникации в бизнесе (сем.)", teacher: "Спиридонов В.В.", room: "ЕГФ-729" }
      ],
      "Среда": [
        { time: "15:00-16:20", subject: "Лингвистические аспекты информационного права (лек.)", teacher: "Трофимова Г.Н.", room: "ауд. 541" },
        { time: "16:30-17:50", subject: "Лингвистические аспекты информационного права (сем.)", teacher: "Трофимова Г.Н.", room: "ауд. 541" }
      ],
      "Четверг": [],
      "Пятница": [
        { time: "12:00-13:20", subject: "Технологии производства в рекламе и связях с общественностью", teacher: "Водопетов С.В.", room: "зал №3 АТИ" },
        { time: "13:30-14:50", subject: "Технологии производства в рекламе и связях с общественностью", teacher: "Водопетов С.В.", room: "зал №3 АТИ" }
      ],
      "Суббота": [],
      "Воскресенье": []
    },
    lower: {
      "Понедельник": [
        { time: "12:00-13:20", subject: "Английский язык (без модуля) - группа 8", teacher: "Гишкаева Л.И.", room: "ГК-353 Б" },
        { time: "13:30-14:50", subject: "Английский язык (без модуля) - группа 8", teacher: "Гишкаева Л.И.", room: "ГК-353 Б" },
        { time: "15:00-16:20", subject: "PR и международные отношения (лек.)", teacher: "Кореньков А.", room: "ауд. 528" }
      ],
      "Вторник": [
        { time: "10:30-11:50", subject: "Интегрированные коммуникации в бизнесе (лек.)", teacher: "Спиридонов В.В.", room: "ЕГФ-528" },
        { time: "12:00-13:20", subject: "Практика интегрированных маркетинговых коммуникаций (лек.)", teacher: "Спиридонов В.В.", room: "ЕГФ-528" },
        { time: "15:00-16:20", subject: "Интегрированные коммуникации в бизнесе (сем.)", teacher: "Спиридонов В.В.", room: "ЕГФ-729" },
        { time: "16:30-17:50", subject: "Интегрированные коммуникации в бизнесе (сем.)", teacher: "Спиридонов В.В.", room: "ЕГФ-729" }
      ],
      "Среда": [
        { time: "15:00-16:20", subject: "Лингвистические аспекты информационного права (лек.)", teacher: "Трофимова Г.Н.", room: "ауд. 541" },
        { time: "16:30-17:50", subject: "Лингвистические аспекты информационного права (сем.)", teacher: "Трофимова Г.Н.", room: "ауд. 541" }
      ],
      "Четверг": [],
      "Пятница": [
        { time: "12:00-13:20", subject: "Организация работы отделов рекламы и связей с общественностью (сем.)", teacher: "Морева А.", room: "зал №3 АТИ" },
        { time: "13:30-14:50", subject: "Организация работы отделов рекламы и связей с общественностью (сем.)", teacher: "Морева А.", room: "зал №3 АТИ" }
      ],
      "Суббота": [],
      "Воскресенье": []
    }
  };

  const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  
  const getCurrentDay = () => {
    const date = new Date();
    return daysOfWeek[date.getDay()];
  };

  const getNextDay = () => {
    const date = new Date();
    const nextDay = date.getDay() + 1;
    return daysOfWeek[nextDay > 6 ? 0 : nextDay];
  };

  const renderLesson = (lesson) => (
    <div className="mb-4 p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        <Clock className="w-4 h-4" />
        <span className="font-medium">{lesson.time}</span>
      </div>
      <div className="font-medium mb-2">{lesson.subject}</div>
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
        <User className="w-4 h-4" />
        <span>{lesson.teacher}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <MapPin className="w-4 h-4" />
        <span>{lesson.room}</span>
      </div>
    </div>
  );

  const currentWeekType = isUpperWeek() ? 'upper' : 'lower';
  const currentDay = getCurrentDay();
  const nextDay = getNextDay();
  const nextWeekType = nextDay === "Понедельник" ? (isUpperWeek() ? 'lower' : 'upper') : currentWeekType;

  const renderSchedule = (day, weekType) => {
    const lessons = schedule[weekType][day];
    if (lessons.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <Calendar className="w-12 h-12 mb-2" />
          <p>Нет занятий</p>
        </div>
      );
    }
    return lessons.map((lesson, index) => renderLesson(lesson));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Моё расписание</h1>
        <p className="text-sm opacity-90">{isUpperWeek() ? 'Верхняя' : 'Нижняя'} неделя</p>
      </div>

      <div className="flex border-b bg-white">
        <button
          onClick={() => setSelectedTab('today')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            selectedTab === 'today' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Сегодня
        </button>
        <button
          onClick={() => setSelectedTab('tomorrow')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            selectedTab === 'tomorrow' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Завтра
        </button>
      </div>

      <div className="p-4">
        {selectedTab === 'today' ? (
          <div>
            <h2 className="text-lg font-medium mb-4">{currentDay}</h2>
            {renderSchedule(currentDay, currentWeekType)}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-medium mb-4">{nextDay}</h2>
            {renderSchedule(nextDay, nextWeekType)}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
        <button className="p-2 text-blue-600">
          <Calendar className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleApp;
