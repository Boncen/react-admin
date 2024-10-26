
import { ResultEnum } from '@/types/enum'
import Mock from 'mockjs'

const data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1
  }]
})

const result: Result = {
  code: ResultEnum.SUCCESS,
  message: 'ok',
  data: data
}

export default result