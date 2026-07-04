import { useEffect, useMemo, useState } from "react"
import { useStatistics } from "./hooks/use-statistics"
import { Chart } from "./components/chart"
import './index.css'

function App() {
  const statistics = useStatistics(10)
  const [activeView, setActiveView] = useState<View>('CPU')
  const cpuUsages = useMemo(() => statistics.map(stat => stat.cpuUsage), [statistics])
  const ramUsages = useMemo(() => statistics.map(stat => stat.ramUsage), [statistics])
  const ssdUsages = useMemo(() => statistics.map(stat => stat.storageUsage), [statistics])

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case 'CPU':
        return cpuUsages
      case 'RAM':
        return ramUsages
      case 'SSD':
        return ssdUsages
      default:
        return cpuUsages
    }
  }, [activeView, cpuUsages, ramUsages, ssdUsages])

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => {
      setActiveView(view)
    })
  }, [])

  return (
    <section className='flex h-screen w-screen'>
      <header className='absolute top-0 left-0 flex w-full justify-start text-left p-2 box-border bg-[#181818]'>
        <button id='close' onClick={() => window.electron.sendFrameAction('CLOSE')} className='bg-[#ff5a5a] rounded-full w-4 h-4 m-1' />
        <button id='minimize' onClick={() => window.electron.sendFrameAction('MINIMIZE')} className='bg-[#f3db3f] rounded-full w-4 h-4 m-1' />
        <button id='maximize' onClick={() => window.electron.sendFrameAction('MAXIMIZE')} className='bg-[#55ff55] rounded-full w-4 h-4 m-1' />
      </header>
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className='h-1/2 w-1/2'>
          <Chart data={activeUsages} maxDataPoints={10} />
        </div>
      </div>
    </section>
  )
}

export default App
