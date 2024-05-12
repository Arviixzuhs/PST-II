import React from 'react'
import { Calendar } from '@nextui-org/react'
import { setConsults } from '@renderer/features/consultSlice'
import { newParseDate } from '@renderer/utils/newParseDate'
import { reqGetAllConsults } from '@renderer/api/Requests'
import { setCurrentConsultDate } from '@renderer/features/consultSlice'
import { useDispatch, useSelector } from 'react-redux'

export const MedicalConsultationCalendar = () => {
  const dispatch = useDispatch()
  const consults = useSelector((state: any) => state.consult)

  React.useEffect(() => {
    const loadAllConsults = async () => {
      const response = await reqGetAllConsults()
      dispatch(setConsults(response.data))
    }
    loadAllConsults()
  }, [])

  const isDateUnavailable = (date: any) => {
    return !consults.data.some((consult: any) => {
      const parsedConsultDate = newParseDate({ date: consult.date })
      return (
        parsedConsultDate.day === date.day &&
        parsedConsultDate.month === date.month &&
        parsedConsultDate.year === date.year
      )
    })
  }

  return (
    <Calendar
      aria-label='Date (Controlled Focused Value)'
      onChange={(e) =>
        dispatch(setCurrentConsultDate({ day: e.day, month: e.month, year: e.year }))
      }
      isDateUnavailable={isDateUnavailable}
    />
  )
}
