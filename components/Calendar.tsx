"use client";
import React, { useEffect, useState } from 'react'
import ArrowIcon from '@/components/ArrowIcon';
import DayState from './DayState';
import { toogleHabit } from '@/app/actions';

const weekDays = ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"]

const getDaysInMonth = (month:number, year:number) => {
    const date = new Date(year, month, 1);
    const firstWeekDay = date.getDay()
    const numberOfEmptyDays = Array(
      firstWeekDay
    ).fill(null)
    const days = [...numberOfEmptyDays];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

const Calendar = ({habit, habitStreak}:{habit:string, habitStreak:Record<string, boolean>|null}) => {
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(month, year))
    const [selectedDate, setSelectedDate] = useState(new Date())

    const previousMonth =()=>{
        if(month === 0){
            setMonth(11)
            setYear(year - 1)
        }else{
            setMonth(month - 1)
        }
    }
    const nextMonth =()=>{
        if(month === 11){
            setMonth(0)
            setYear(year + 1)
        }else{
            setMonth(month + 1)
        }
    }

    const fullDateString =()=>{
        const monthName = selectedDate.toLocaleString("pt-BR", {month:"long"})
        const upperCaseMonthName = monthName[0].toUpperCase() + monthName.slice(1)
        return `${upperCaseMonthName} de ${selectedDate.getFullYear()}`
    }

    const getDayString =(day:Date)=>{
        return `${year.toString()}-${(month+1).toString().padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`
    }

    useEffect(()=>{
        setDaysInMonth(getDaysInMonth(month, year))
        setSelectedDate(new Date(year, month, 1))
    }, [month, year])

  return (
    <section className='w-full my-2 rounded-md bg-neutral-800'>
          <div className='flex justify-between mx-2 my-4 font-sans text-neutral-400'>
            <button onClick={previousMonth}>
            <ArrowIcon width={12} height={12} className='stroke-neutral-400' />
            </button>
            <span>
                {fullDateString()}
            </span>
            <button onClick={nextMonth}>
            <ArrowIcon width={12} height={12} className='rotate-180 stroke-neutral-400' />
            </button>
          </div>
          <div className='w-full grid grid-cols-7 mt-2'>
              {
                weekDays.map((day, i) =>(
                  <div key={i} className='flex flex-col items-center p-2'>
                    <span className='font-sans text-neutral-200 text-xs font-light'>
                      {day}
                    </span>
                  </div>
                ))
              }
              {
                daysInMonth.map((day, i) => (
                  <div key={i} className='flex flex-col items-center p-2' onClick={()=>toogleHabit(
                    {
                        habit, habitStreak, date:getDayString(day), done:habitStreak?habitStreak[getDayString(day)]:true
                    })}>
                    <span className='font-sans text-neutral-400 text-xs font-light'>
                      {day?.getDate()}
                    </span>
                    {
                        day && (<DayState day={habitStreak ?habitStreak[getDayString(day)] : undefined} />)
                    }
                  </div>
                ))
              }
          </div>
        </section>
  )
}

export default Calendar