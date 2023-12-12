import { requestHandler } from '@/utils/request'

import { BaseResponseList } from '@/@types'
import { BaseRequestPayload } from '@/@types/request'
import axios from '@/libs/axios'

import { UserResponse } from './types'

const getAll = requestHandler<
  BaseRequestPayload,
  BaseResponseList<UserResponse>
>((params) => axios.get('/user', { params }))

export { getAll }
