import { request } from '../request';

export function fetchGetTenantList(params?: Api.TenantManage.TenantSearchParams) {
  return request<Api.TenantManage.TenantList>({
    url: '/tenant/list',
    method: 'get',
    params
  });
}
