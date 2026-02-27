import { useState } from 'react'
import { ConfigProvider, DatePicker } from 'antd'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

const MyDatePicker = ({ mode, onChange }) => {
  const handleChange = (_, dateString) => {
    onChange(dateString)
    console.log(dateString)
  }

  const handleRangeChange = (_, dateStrings) => {
    onChange(dateStrings)
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

        {/* year range picker */}
        {mode === 'yearRange' && <RangePicker
          defaultValue={[dayjs().subtract(1, 'year'), dayjs()]}
          picker='year'
          style={{width: '200px'}}
          onChange={handleRangeChange}
        />}
      </div>
    </ConfigProvider>
  )
}

export default MyDatePicker