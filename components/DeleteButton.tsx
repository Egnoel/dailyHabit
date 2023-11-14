"use client"
import { deleteHabit } from '@/app/actions'
import Image from 'next/image'
import React from 'react'

const DeleteButton = ({habit}:{habit:string}) => {
  return (
    <button onClick={()=>deleteHabit(habit)}>
              <Image src="/images/trash.svg" alt='Lixeira' width={20} height={20} />
            </button>
  )
}

export default DeleteButton