import { useAuthStore } from '@/store/modules/auth';

export function useAuth() {
  const authStore = useAuthStore();

  function hasBtnAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return authStore.userInfo.buttons.includes(codes);
    }

    return codes.some(code => authStore.userInfo.buttons.includes(code));
  }

  function hasRoleAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return authStore.userInfo.roles.includes(codes);
    }

    return codes.some(code => authStore.userInfo.roles.includes(code));
  }

  return {
    hasBtnAuth,
    hasRoleAuth
  };
}
