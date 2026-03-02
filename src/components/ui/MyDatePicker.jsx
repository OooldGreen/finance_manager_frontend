import { useState } from 'react'
import { ConfigProvider, DatePicker } from 'antd'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

const MyDatePicker = ({ mode, onChange }) => {
  const handleChange = (date, dateString) => {
    onChange(dateString)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 8
        }
      }}
    >
      <div className='incline-block'>
        {/* normal */}
        {mode === 'normal' && <DatePicker
          defaultValue={dayjs()}
          onChange={handleChange}
          format='YYYY-MM-DD'
        />}

        {/* month picker */}
        {mode === 'month' && <DatePicker
          defaultValue={dayjs()}
          picker='month'
          onChange={handleChange}
        />
        }

        {/* year picker */}
        {mode === 'year' && <DatePicker
          defaultValue={dayjs()}
          picker='year'
          onChange={handleChange}
        />}

        {/* month range picker */}
        {mode === 'monthRange' && <RangePicker
          defaultValue={[dayjs().startOf('year'), dayjs().endOf('year')]}
          picker='month'
          style={{width: '200px'}}
          onChange={handleChange}
        />}
      </div>
    </ConfigProvider>
  )
}

export default MyDatePicker