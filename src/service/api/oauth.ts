import { request } from '../request';

export function fetchGetOAuthUrl(plat: string) {
  return request<string>({
    url: '/oauth/get_auth_url',
    method: 'get',
    params: { plat }
  });
}
