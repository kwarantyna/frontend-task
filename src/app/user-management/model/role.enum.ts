export enum RoleEnum {
  admin = 'admin',
  user = 'user',
  operator = 'operator',
}

export const RoleEnumLabel: Record<RoleEnum, string> = {
  [RoleEnum.admin]: 'Administrator',
  [RoleEnum.user]: 'Użytkownik',
  [RoleEnum.operator]: 'Operator',
};
