import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/system/role/list',
    method: 'get',
    params
  });
}

/** post role */
export function postRole(data: Api.SystemManage.Role) {
  return request<string>({
    url: '/system/role/post',
    method: 'post',
    data
  });
}

/** del role */
export function deleteRole(ids: number[]) {
  return request<string>({
    url: '/system/role/del',
    method: 'post',
    data: {
      ids
    }
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/system/role/all',
    method: 'get'
  });
}

/** get resource of role auth */
export function fetchGetRoleMenu(params: Api.SystemManage.RoleMenu) {
  return request<number[]>({
    url: '/system/role/menu',
    method: 'get',
    params
  });
}

/** role auth bind resource */
export function bindRoleMenu(data: Api.SystemManage.RoleMenu) {
  return request<string>({
    url: '/system/role/bind_menu',
    method: 'post',
    data
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/system/user/list',
    method: 'get',
    params
  });
}

/** post user */
export function postUser(data: Api.SystemManage.User) {
  return request<string>({
    url: '/system/user/post',
    method: 'post',
    data
  });
}

/** del user */
export function deleteUser(ids: number[]) {
  return request<string>({
    url: '/system/user/del',
    method: 'post',
    data: {
      ids
    }
  });
}

/** get menu list */
export function fetchGetMenuList(params?: Api.SystemManage.CommonSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/system/menu/list',
    method: 'get',
    params
  });
}

/** post menu */
export function postMenu(data: Api.SystemManage.Menu) {
  return request<string>({
    url: '/system/menu/post',
    method: 'post',
    data
  });
}

/** del menu */
export function deleteMenu(ids: number[]) {
  return request<string>({
    url: '/system/menu/del',
    method: 'post',
    data: {
      ids
    }
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/system/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/system/menu/tree',
    method: 'get'
  });
}

/** get menu button */
export function fetchGetMenuButton() {
  return request<Api.SystemManage.MenuButton[]>({
    url: '/system/menu/button',
    method: 'get'
  });
}
