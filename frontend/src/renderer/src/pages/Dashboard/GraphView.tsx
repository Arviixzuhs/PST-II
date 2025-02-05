import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { EmptyContent } from '@renderer/components/TableUser/components/EmptyContent'
import { ColorType, createChart } from 'lightweight-charts'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

const ChartComponent = ({ data, colors }) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null)
  const theme = localStorage.getItem('theme')

  React.useEffect(() => {
    if (!data || data.length === 0) return

    const handleResize = () => {
      if (chartContainerRef.current === null) return
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    if (chartContainerRef.current === null) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: {
          color: 'transparent',
        },
        horzLines: {
          color: 'transparent',
        },
      },
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    })
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, colors, theme])

  if (!data || data.length === 0) {
    return <EmptyContent description='Las métricas se verán aquí' />
  }

  return <div ref={chartContainerRef} />
}

export const GraphView = () => {
  const hospitalStats = useSelector((state: RootState) => state.hospital)
  const PieChartData = hospitalStats.patientsCountByGender.map((item) => ({
    title: `${item.gender === 'FEMALE' ? 'Mujeres' : 'Hombres'}: ${item.count}`,
    value: item.count,
    color: item.gender === 'FEMALE' ? 'rgba(160, 214, 255)' : 'rgba(0, 123, 255)',
  }))

  const graphList = [
    {
      title: 'Frecuencia de pacientes',
      colors: {
        backgroundColor: 'transparent',
        lineColor: '#007BFF',
        textColor: '#71717a',
        areaTopColor: '#007BFF',
        areaBottomColor: 'rgba(0, 123, 255, 0.1)',
      },
      initialData: hospitalStats.patientsCount,
    },
    {
      title: 'Frecuencia de personal',
      colors: {
        backgroundColor: 'transparent',
        lineColor: '#4C9EFF',
        textColor: '#71717a',
        areaTopColor: '#4C9EFF',
        areaBottomColor: 'rgba(76, 159, 255, 0.1)',
      },
      initialData: hospitalStats.clinicalStaffsCount,
    },
  ]

  return (
    <div className='flex flex-col md:flex-row gap-4 h-full'>
      <Card className='w-full md:w-1/3 min-h-96 md:min-h-max' shadow='none'>
        <CardHeader>
          <h3 className='font-medium'>Resumen de estadísticas</h3>
        </CardHeader>
        <CardBody className='flex items-center justify-center'>
          {hospitalStats.patientsCountByGender.length > 0 ? (
            <PieChart style={{ maxWidth: '220px' }} data={PieChartData} />
          ) : (
            <EmptyContent description='No hay datos de género disponibles' />
          )}
        </CardBody>
      </Card>
      {graphList.map((item, index) => (
        <Card className='w-full md:w-1/3 min-h-96 md:min-h-max' key={index} shadow='none'>
          <CardHeader>
            <h3 className='font-medium'>{item.title}</h3>
          </CardHeader>
          <CardBody>
            <ChartComponent data={item.initialData} colors={item.colors} />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
