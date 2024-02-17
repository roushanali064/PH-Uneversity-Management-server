import config from '../config';
import { userRole } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superAdmin = {
  id: '0001',
  email: 'superAdmin@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: userRole.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const superAdminExits = await User.findOne({ role: userRole.superAdmin });

  if (!superAdminExits) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
