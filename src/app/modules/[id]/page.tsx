"use client"
import { useFetcModules } from '@/api/modulesApi'
import Loading from '@/app/loading'
import { ModuleFilterProps } from '@/types/moduleType'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, {useState } from 'react'

const ModulesPage = () => {
    const {id} = useParams()
    const pathId = id ? id as string : ""

   const [moduleFilter,] = useState<ModuleFilterProps>({
       PageIndex: 1,
       PageSize: 16,
       PathId : pathId
     });

    const {data:module , isError, isLoading} = useFetcModules(moduleFilter)


    if(isLoading) return <Loading/>
    if(isError) return <p className='loading'>Faild Please Try Again</p>

  return (
    <div>
         <div>
          <Image src={module?.attachment} alt={module?.title} width={500} height={500}/>
          <div>
            <div>
              <h2>{module.title}</h2>
              <span>{module.numOfSections}</span>
            </div>
            <p>{module.description}</p>
          </div>
         </div>
    </div>
  )
}

export default ModulesPage