import { useState } from 'react'
import { userAuth } from '../services/utils/userAuth'
import MyDatePicker from '../components/ui/MyDatePicker'
import { ConfigProvider, Select, Segmented } from 'antd'
import ExpensePieChart from '../components/charts/ExpensePieChart'

const Dashboard = () => {
  const { user } = userAuth()
  

  const onDatePickerChange = () => {

  }

  // we do not show anything without user information
  if (!user) return null

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* KPI cards */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-4 bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden">
          <a className="block p-4 md:p-5 relative bg-white hover:bg-gray-100 focus:outline-hidden before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">

              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Monthly Balance
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  72,540
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    from <span className="font-semibold text-foreground">70,104</span>
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    <svg className="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                    <span className="inline-block">
                      12.5%
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </a>

          <a className="block p-4 md:p-5 relative bg-white hover:bg-gray-100 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">

              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  MoM Growth
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  29.4%
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    from <span className="font-semibold text-foreground">29.1%</span>
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    <svg className="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                    <span className="inline-block">
                      1.7%
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </a>

          <a className="block p-4 md:p-5 relative bg-white  hover:bg-gray-100 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">

              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Top Expense Category
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  56.8%
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    from <span className="font-semibold text-foreground">61.2%</span>
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    <svg className="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                    <span className="inline-block">
                      4.4%
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </a>

          <a className="block p-4 md:p-5 relative bg-white  hover:bg-gray-100 focus:outline-hidden focus:bg-layer-focus before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:h-full before:border-s before:border-gray-200 first:before:bg-transparent" href="#">
            <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">

              <div className="grow">
                <p className="text-xs uppercase font-medium text-foreground">
                  Savings Rate
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-primary">
                  92,913
                </h3>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground-1">
                    from <span className="font-semibold text-foreground">94,012</span>
                  </p>
                  <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-surface-1 text-surface-foreground">
                    <svg className="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                    <span className="inline-block">
                      0.1%
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* charts */}
      <div>
        {/* summary chart */}
        <div>
          <div className="flex justify-between items-center mt-2 p-4 md:p-5 min-h-102.5 flex-col">
            <div className="p-4 bg-white border border-gray-200 shadow-2xs rounded-xl">
              {/* date picker */}
                <div className='flex justify-end p-4'><MyDatePicker mode='yearRange' onChange={onDatePickerChange}/></div>
                chart 3 总复盘图：收入支出综合占比图，横轴月份，总轴金额，可按年份筛选range
            </div>
          </div>
        </div>

        {/* pie chart,  */}
        <div className="flex justify-between items-center mt-2 grid grid-cols-2 gap-2 p-4 md:p-5 min-h-102.5 flex-col">
          <ExpensePieChart/> 

          {/* bar chart */}
          <div>
            <div className="flex justify-between items-center mt-2 p-4 md:p-5 min-h-102.5 flex-col">
              <div className="p-4 bg-white border border-gray-200 shadow-2xs rounded-xl">
                {/* date picker */}
                  <div className='flex justify-end p-4'><MyDatePicker mode='month' onChange={onDatePickerChange}/></div>
                  chart2 支出预算和实际双柱状对比图：按分类画，可以按月份筛选
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* heatmap */}
      <div>

      </div>

    </div>
  )
}

export default Dashboard