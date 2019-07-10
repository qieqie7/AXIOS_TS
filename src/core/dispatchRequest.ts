/*
 * @Desc:
 * @Author: ykst
 * @Date: 2019-07-04 22:36:50
 * @LastEditors: ykst
 * @LastEditTime: 2019-07-10 22:16:37
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  // url 转换
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest!)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse!)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  // if (config.cancelToken) {
  //   config.cancelToken.throwIfRequested()
  // }
}
