import { useState, useEffect } from 'react'
import { userAuth } from '../services/utils/userAuth'
import { UpIcon, DownIcon } from '../components/ui/Icon'
import MyPieChart from '../components/charts/MyPieChart'
import MyBarChart from '../components/charts/MyBarChart'
import OverviewChart from '../components/charts/OverviewChart'
import dashboardService from '../services/dashboard'

const Dashboard = () => {
  const { user } = userAuth()
  const [kpiData, setKpiDate] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await dashboardService.getKpiData()
      const data = response.data
      setKpiDate({
        balance: data.monthlyBalance,
        remaining: data.monthlyRemaining,
        savingRate: data.savingRate,
        topExpense: data.topExpense
      })
      setLoading(false)
    } catch (err) {
      console.log('Fail to get kpi data', err)
    }
  }

  // we do not show anything without user information
  if (!user) return null
  if (loading) return ( <div>loading...</div> )

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* KPI cards */}
      <div className="max-w-[85rem] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14 mx-auto">
        <div className="grid md:grid-cols-4 bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden">
          <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-100 focus:outline-hidden before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Balance
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  {kpiData.balance.current >= 0 ? `€${kpiData.balance.current}` : `-€${Math.abs(kpiData.balance.current)}`}
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    last month <span className="font-semibold text-foreground">{kpiData.balance.previous >= 0 ? `€${kpiData.balance.previous}` : `-€${Math.abs(kpiData.balance.current)}`}</span>
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    {kpiData.balance.mom  >= 0 && <UpIcon className='inline-block size-3 self-center text-rose-600'/>}
                    {kpiData.balance.mom  < 0 && <DownIcon className="inline-block size-3 self-center text-emerald-600"/>}
                    <span className={`inline-block ${kpiData.balance.mom >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.abs(kpiData.balance.mom)} %
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-100 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Remaining
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  29.4%
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    <span className="font-semibold text-foreground">29.1%</span> left
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="block p-4 md:p-5 relative bg-white  hover:bg-gray-100 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Top Expense
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  {kpiData.topExpense.current >= 0 ? `€${kpiData.topExpense.current}` : `-€${Math.abs(kpiData.topExpense.current)}`}
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    last month <span className="font-semibold text-foreground">{kpiData.topExpense.previous >= 0 ? `€${kpiData.topExpense.previous}` : `-€${Math.abs(kpiData.topExpense.current)}`}</span>
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    {kpiData.topExpense.mom  >= 0 && <UpIcon className='inline-block size-3 self-center text-rose-600'/>}
                    {kpiData.topExpense.mom  < 0 && <DownIcon className="inline-block size-3 self-center text-emerald-600"/>}
                    <span className={`inline-block ${kpiData.balance.mom >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.abs(kpiData.topExpense.mom)} %
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="block p-4 md:p-5 relative bg-white  hover:bg-gray-100 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">

              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Savings Rate
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  {kpiData.savingRate.current} %
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    last month <span className="font-semibold text-foreground">{kpiData.savingRate.previous}</span> %
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    {kpiData.savingRate.mom  >= 0 && <UpIcon className='inline-block size-3 self-center text-rose-600'/>}
                    {kpiData.savingRate.mom  < 0 && <DownIcon className="inline-block size-3 self-center text-emerald-600"/>}
                    <span className={`inline-block ${kpiData.balance.mom >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.abs(kpiData.savingRate.mom)} %
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* charts */}
      <div>
        {/* pie chart,  */}
        <div className="flex justify-between items-center mt-2 grid grid-cols-2 gap-2 p-4 md:p-5 min-h-102.5 flex-col w-full h-[600px]">
          <MyPieChart />
          {/* bar chart */}
          <MyBarChart />
        </div>
        {/* summary chart */}
        <div className="flex justify-between items-center mt-2 p-4 md:p-5 min-h-102.5 flex-col">
          <OverviewChart />
        </div>
      </div>

      {/* heatmap */}
      <div>

      </div>
    </div>
  )
}

export default Dashboard