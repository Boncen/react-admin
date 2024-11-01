
interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

interface UserInfo {
  id: string;
  email?: string;
  username: string;
  password?: string;
  avatar?: string;
  roles?: string[];
  permissions?: Permission[];
  token?: string;
  mobile: string;
}

interface Organization {
  id: string;
  name: string;
  status: "enable" | "disable";
  desc?: string;
  order?: number;
  children?: Organization[];
}

interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

// interface NavItem {
//   itemKey: string;
//   text: string;
//   icon?: ReactNode;
//   items?: NavItem[];
// }

interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age?: number;
  state: UserStateEnum;
  remark?: string;
}
