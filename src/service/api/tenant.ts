import { request } from '../request';

export function fetchGetTenantList(params?: Api.TenantManage.TenantSearchParams) {
  return request<Api.TenantManage.TenantList>({
    url: '/tenant/list',
    method: 'get',
    params
  });
}

export function fetchGetTenantRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/tenant/role_scope',
    method: 'get'
  });
}

export function postTenant(data: Api.TenantManage.Tenant) {
  return request<string>({
    url: '/tenant/post',
    method: 'post',
    data
  });
}
