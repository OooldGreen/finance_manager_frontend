import { 
  HeartOutlined, // Life
  SmileOutlined, // Hobby
  RocketOutlined, // Travel
  BookOutlined,   // Study
  TeamOutlined,   // Social
  EllipsisOutlined // Others
} from '@ant-design/icons'

export const Goal_category = [
  { id: 'LIFE', label: 'Life', color: '#fadb14', icon: <HeartOutlined /> },
  { id: 'HOBBY', label: 'Hobby', color: '#F06292', icon: <SmileOutlined /> },
  { id: 'TRAVEL', label: 'Travel', color: '#81D4FA', icon: <RocketOutlined /> },
  { id: 'STUDY', label: 'Study', color: '#B39DDB', icon: <BookOutlined /> },
  { id: 'SOCIAL', label: 'Social', color: '#FF8A80', icon: <TeamOutlined /> },
  { id: 'OTHERS', label: 'Others', color: '#CFD8DC', icon: <EllipsisOutlined /> }
]

export const getCategoryById = (id) => {
  return Goal_category.find(cat => cat.id === id) || Goal_category[5]; // 默认返回 Others
}

export const Record_catogory = {
  'Food_drink': '#A8E6CF', 
  'Shopping': '#FFD3B6',
  'Transport': '#B39DDB',
  'Daily': '#FFF176',
  'Rent': '#FF8A80',
  'Social': '#81D4FA', 
  'Subscription': '#DCE775',
  'Salary': '#4DB6AC',
  'Investment': '#FFB74D',
  'Sideline': '#F06292'
}