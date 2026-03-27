import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Tooltip from '@uiw/react-tooltip'
import HeatMap from '@uiw/react-heat-map'
import { Segmented, ConfigProvider, Flex, Progress } from 'antd'
import { userAuth } from '../services/utils/userAuth'
import { UpIcon, DownIcon } from '../components/ui/Icon'
import MyPieChart from '../components/charts/MyPieChart'
import MyBarChart from '../components/charts/MyBarChart'
import OverviewChart from '../components/charts/OverviewChart'
import BudgetForm from '../components/forms/BudgetForm'
import dashboardService from '../services/dashboard'
import budgetsService from '../services/budgets'

const Dashboard = () => {
  const { user } = userAuth()
  const [kpiData, setKpiDate] = useState()
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [heatmapData, setHeatmapData] = useState([])
  const years = Array.from({length: 20}, (_, i) => new Date().getFullYear() - i)

  const [budget, setBudget] = useState({total: 0, expense: 0, pending: 0})
  const [showBudgetForm, setShowBudgetForm] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getHeatmapData()
  }, [selectedYear])

  const getData = async () => {
    try {
      getHeatmapData()
      const [kpiResponse, budgetResponse] = await Promise.all([
        dashboardService.getKpiData(),
        budgetsService.getBudgetByMonth(dayjs().year(), dayjs().month() + 1)
      ])
      if (kpiResponse.status === 200) {
        const data = kpiResponse.data
        setKpiDate({
          balance: data.monthlyBalance,
          remaining: data.monthlyRemaining,
          savingRate: data.savingRate,
          topExpense: data.topExpense
        })
      }
      if (budgetResponse.status === 200) {
        const data = budgetResponse.data
        setBudget({ total: data.totalBudget, expense: data.totalExpense, pending: data.totalPending })
      }
    } catch (err) {
      console.log('Fail to get kpi data', err)
      setBudget({total: 0, expense: 0, pending: 0})
    } finally {
      setLoading(false)
    }
  }

  const getHeatmapData = async () => {
    try {
      const response = await dashboardService.getHeatmapData(selectedYear)
      if (response.status === 200) {
        setHeatmapData(response.data)
      }
    } catch (err) {
      console.log('Fail to get heatmap data', err)
    }
  }

  // we do not show anything without user information
  if (!user || !years || years.length === 0) return null
  if (loading) return ( <div>loading...</div> )

  return (
    <div className="w-full min-h-screen bg-gray-100 z-0">
      
      <div className="px-5 pt-5 lg:pt-8 mx-auto grid md:grid-cols-4 gao-4 w-full items-stretch gap-2 z-0">
        {/* KPI cards */}
        <div className="grid md:col-span-3 grid-cols-1 sm:grid-cols-3 bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden">
          <div className="block p-4 md:p-5 relative bg-white flex flex-col justify-center hover:bg-gray-50 focus:outline-hidden before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
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

          <div className="block p-4 md:p-5 relative bg-white flex flex-col justify-center hover:bg-gray-50 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
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
                    <span className={`inline-block ${kpiData.topExpense.mom >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.abs(kpiData.topExpense.mom)} %
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="block p-4 md:p-5 relative bg-white flex flex-col justify-center hover:bg-gray-50 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
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
                  <div className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    {kpiData.savingRate.mom  >= 0 && <UpIcon className='inline-block size-3 self-center text-rose-600'/>}
                    {kpiData.savingRate.mom  < 0 && <DownIcon className="inline-block size-3 self-center text-emerald-600"/>}
                    <span className={`inline-block ${kpiData.savingRate.mom >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.abs(kpiData.savingRate.mom)} %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* budget progress */}
        <button className='z-0 md:col-span-1 bg-white border border-gray-200 shodow-2xs rounded-xl overflow-hidden flex justify-center hover:bg-gray-50 p-2' onClick={() => setShowBudgetForm(!showBudgetForm)}>
          <div className='hidden md:block' >
            <div className="relative size-40 flex items-center justify-center z-0">
              <Flex gap="default" align="center" vertical>
              <Progress 
                percent={budget.total !== 0 ? Number((budget.pending + budget.expense) * 100 / budget.total).toFixed(2) : 0} 
                type="dashboard"
                showInfo={false}
                strokeColor='#ccc'
                success={{ 
                  percent: budget.total !== 0 ? Number(budget.expense * 100 / budget.total).toFixed(2) : 0,
                  strokeColor: '#2563eb'
                }}
              />
            </Flex>
            <div className='absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <div className='text-blue-600 text-2xl font-bold'>{budget.total !== 0 ? 100 - Number(budget.expense * 100 / budget.total).toFixed(0) : 100}%</div>
              <span className='text-sm'>Budget</span>
            </div>
            </div>
          </div>
          
          <div className='block md:hidden flex items-center justify-center w-full px-4'>
            <div className='text-gray-600 pr-2 text-xs font-medium'>BUDGET </div>
            <Flex vertical className='w-full'>
              <Tooltip title='Click and view budget detials'>
                <Progress 
                  type="line"
                  percent={budget.total !== 0 ? Number(budget.pending * 100 / budget.total).toFixed(2) : 0} 
                  showInfo={false}
                  strokeColor='#ccc'
                  success={{ 
                    percent: budget.total !== 0 ? Number(budget.expense * 100 / budget.total).toFixed(2) : 0,
                    strokeColor: '#2563eb'
                  }}
                />
              </Tooltip>
            </Flex>
            <div className='text-blue-600 text-sm pl-2'>{budget.total !== 0 ? 100 - Number(budget.expense * 100 / budget.total).toFixed(0) : 100}%</div>
            </div>
        </button>
      </div>

      {/* charts */}
      <div>
        {/* pie chart,  */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:p-5 min-h-102.5 w-full md:h-[600px]">
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
      <div className='w-full px-5 min-h-50 h-70'>
        <div className='flex w-full p-5 bg-white h-60 shadow-2xs rounded-xl border border-gray-200 justify-between'>
          <div className='flex border border-gray-200 justify-start items-center p-2 rounded-sm bg-white text-center justify-center overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
            <div>
              <HeatMap
                value={heatmapData}
                width={900}
                style={{ color: '#000000'}}
                weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
                startDate={new Date(`${selectedYear}/01/01`)}
                endDate={new Date(`${selectedYear}/12/31`)}
                rectSize={14}
                panelColors={{
                  0: '#ebedf0', 
                  3: '#9be9a8', 
                  5: '#40c463', 
                  10: '#30a14e',
                  20: '#216e39', 
                }}
                rectProps={{ rx:2, 'data-tooptip-id': 'heatmap-tooltip' }}
                rectRender={(props, data) => {
                  return (
                    <rect {...props} data-tooltip-content={`records count : ${data.count || 0}`} /> 
                  )
                }}
                legendRender={() => null}
              />

              {/* <Tooltip 
                placement="top"
                id="heatmap-tooltip"
                style={{ 
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "12px",
                  zIndex: 50
                }}
              /> */}

              <div className='flex w-full justify-end items-center gap-1.5 text-gray-400 text-xs pr-20'>
                <span>Less</span>
                <div className="flex gap-1">
                  {[
                    '#ebedf0', // 0 笔
                    '#9be9a8', // 少
                    '#40c463', // 中
                    '#30a14e', // 多
                    '#216e39'  // 极多
                  ].map((color, index) => (
                    <div 
                      key={index}
                      style={{ backgroundColor: color }}
                      className="w-[12px] h-[12px] rounded-[2px] border border-black/5"
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          <div className='hidden md:flex flex-col xl:visible shrink-0"'>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: 'oklch(54.6% 0.245 262.881)',
                    itemSelectedColor: '#fff',
                    itemHoverBg: 'oklch(92.8% 0.006 264.531)',
                    trackBg: 'transparent',
                    trackPadding: 2,
                    controlHeight: 40,
                    controlPaddingHorizontal: 60
                  },
                },
              }}
            >
              <div className='h-[198px] pl-2 overflow-y-auto scrollbar-hide rounded-lg'>
                <Segmented
                  orientation="vertical"
                  options={years}
                  onChange={(value) => setSelectedYear(value)}
                  style={{
                    fontSize: '12px',
                  }}
                  block
                />
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {showBudgetForm && <BudgetForm setShowBudgetForm={setShowBudgetForm} showBudgetForm={showBudgetForm} />}
    </div>
  )
}

export default Dashboard