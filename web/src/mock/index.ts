
import Mock from 'mockjs'
import data from './data/list'


export default function setupMock(){
    
Mock.setup({
    timeout: '350-600'
  })
  
  Mock.mock('/api/data', 'get', data)
}