import { listContent } from '@/constants/documentation'
import React from 'react'

const List = ({ title, bulletPoints }: listContent) => {
    return (
      <div className="p-4  rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-cyan-200">{title}</h2>
        <ul className="list-disc text-lg list-inside text-stone-200">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    )
  }
  

export default List