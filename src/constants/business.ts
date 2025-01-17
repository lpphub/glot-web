import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  1: 'page.manage.common.status.enable',
  2: 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const menuTypeRecord: Record<Api.SystemManage.MenuType, App.I18n.I18nKey> = {
  1: 'page.manage.menu.type.directory',
  2: 'page.manage.menu.type.menu'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, App.I18n.I18nKey> = {
  1: 'page.manage.menu.iconType.iconify',
  2: 'page.manage.menu.iconType.local'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);

export const tenantStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  1: 'page.tenant.common.status.enable',
  2: 'page.tenant.common.status.disable'
};

export const tenantStatusOptions = transformRecordToOption(tenantStatusRecord);
