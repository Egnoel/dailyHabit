import React from 'react'
import { kv } from "@vercel/kv";
import Link from 'next/link';
import ArrowIcon from '@/components/ArrowIcon';
import Calendar from '@/components/Calendar';
import { Habits } from '@/app/page';



const Habit = async({params:{habit}}:{params:{habit:string}}) => {
  const decodedHabit = decodeURI(habit)
  const habitStreak:Record<string, boolean>|null = await kv.hget("habits", decodedHabit)



  return (
    <main className='container relative flex flex-col gap-8 px-12 pt-16'>
        <h1 className='text-white text-3xl font-light font-display'>
          {decodedHabit}
        </h1>
        <Link href="/" className='flex items-center font-sans text-xs text-neutral-300 gap-2' >
          <ArrowIcon width={12} height={12} />
          Voltar
        </Link>
        <Calendar habit={decodedHabit} habitStreak={habitStreak} />
    </main>
  )
}

export default Habit