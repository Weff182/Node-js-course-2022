import { bootstrap } from '../src/main';
import registerUserBasic from './specs/auth/registerUser/registerUser';
import registerUserExitingEmail from './specs/auth/registerUser/registerUserExitingEmail';
import registerUserValidations from './specs/auth/registerUser/registerUserValidations';
import loginUserBasic from './specs/auth/loginUser/loginUser';
import loginUserNotExitingEmail from './specs/auth/loginUser/loginUserNotExitingEmail';
import loginUserValidations from './specs/auth/loginUser/loginUserValidations';
import seeProfile from './specs/users/seeProfile/seeUserProfile';
import seeProfileAuthValidate from './specs/users/seeProfile/seeProfileAuthValidation';
import updateProfile from './specs/users/updateProfile/updateUserProfile';
import updateProfileAuthValidate from './specs/users/updateProfile/updateUserProfile';
import updateProfileFieldTypesValidate from './specs/users/updateProfile/updateUserProfile';
import getAllUsers from './specs/users/getAllUsers/getAllUser';
import validationGetAllUsers from './specs/users/getAllUsers/verifyUserRoleWhenGettingUsers';
import giveRole from './specs/users/giveRole/giveRole';
import validationRoleGuardGiveRole from './specs/users/giveRole/giveRoleValidateAuthGuard';
import validationFieldGiveRole from './specs/users/giveRole/giveRoleFieldValidation';
import banUser from './specs/users/banUser/banUser';
import validationAdminRoleWhenBanUser from './specs/users/banUser/validationRoleGuardbanUser';
import validationFieldWhenBanUser from './specs/users/banUser/validationFieldBanUser';
import deleteUser from './specs/users/deleteUser/deleteUser';
import validationAdminRoleWhenDeleteUser from './specs/users/deleteUser/AdminRoleValidationWhenDeleteUser';
import createVinyl from './specs/vinyls/createVinyl/createVinyl';
import createVinylAsUser from './specs/vinyls/createVinyl/createVinylAsUser';
import createVinylInvalidField from './specs/vinyls/createVinyl/createVinylwithInvalidField';
import getAlVinyls from './specs/vinyls/gettAllVinyls/getAllVinyls';
import createVinylReview from './specs/vinyls/createVinylRview/createVinylReview';
import createVinylReviewUnAuth from './specs/vinyls/createVinylRview/createVinylReviewAsUnAuthUser';
import validationFiledVinylReview from './specs/vinyls/createVinylRview/createVinylReviewValidationField';
import buyVinylAsAuthUser from './specs/vinyls/buyVinyl/buyVinyl';
import buyVinylAsUnAuthUser from './specs/vinyls/buyVinyl/biyVinylAsUnAuthUser';
import findVinylByNameAndAuthor from './specs/vinyls/findVinyl/findVinylwithNameAndAuthor';
import validationFindVinyl from './specs/vinyls/findVinyl/ValidationFindVinyl';

describe('Nodejs Course final task project tests:', () => {
  beforeAll(async () => {
    await bootstrap();
  });
  describe('Auth tests:', () => {
    describe('Register user test:', () => {
      it('Register user', registerUserBasic);
      it('Register user exiting email', registerUserExitingEmail);
      it('Register user validations', registerUserValidations);
    });
    describe('Login user test:', () => {
      it('Login user', loginUserBasic);
      it('Login user not existing email', loginUserNotExitingEmail);
      it('Login user validations', loginUserValidations);
    });
  });
  describe('User operations test:', () => {
    describe('See Profile:', () => {
      it('As Authorized user i want to see my profile', seeProfile);
      it('Auth validations function "see my profile"', seeProfileAuthValidate);
    });
    describe('Update Profile:', () => {
      it('As Authorized user i want to update my profile', updateProfile);
      it(
        'Auth validations function "update my profile"',
        updateProfileAuthValidate,
      );
      it(
        'Field types validations function "update my profile"',
        updateProfileFieldTypesValidate,
      );
    });
    describe('Get all Users as Admin:', () => {
      it('As ADMIN i want to get all users', getAllUsers);
      it(
        'Validation ADMIN role when i want to get all users',
        validationGetAllUsers,
      );
    });
    describe('Give User role from Admin:', () => {
      it('Give User role from Admin', giveRole);
      it(
        'Validation ADMIN role when i want to give role User',
        validationRoleGuardGiveRole,
      );
      it(
        'Validation field when i want to give role User',
        validationFieldGiveRole,
      );
    });
    describe('Ban a user as Admin:', () => {
      it('Ban a user as Admin', banUser);
      it(
        'Validation ADMIN role when i want to ban User',
        validationAdminRoleWhenBanUser,
      );
      it(
        'Validation field when i want to ban User',
        validationFieldWhenBanUser,
      );
    });
    describe('Delete a user as Admin:', () => {
      it('Delete a user as Admin', deleteUser);
      it(
        'Validation ADMIN role when i want to Delete User',
        validationAdminRoleWhenDeleteUser,
      );
    });
  });
  describe('Vinyls operations test:', () => {
    describe('Create a vinyl as Admin:', () => {
      it('Create a vinyl as Admin', createVinyl);
      it('Create a vinyl as User', createVinylAsUser);
      it(
        'Validation field when i want Create a vinyl',
        createVinylInvalidField,
      );
    });
    describe('Get all vynils as UnAuth User:', () => {
      it('Get all vinyls as UnAuth User', getAlVinyls);
    });
    describe('Create vinyl review:', () => {
      it('Create review for some Vinyl', createVinylReview);
      it('Create review as UnAuth User', createVinylReviewUnAuth);
      it('Validation field vynil review', validationFiledVinylReview);
    });
    describe('Buy vinyl:', () => {
      it('Buy Vinyl as Auth user', buyVinylAsAuthUser);
      it('Buy Vinyl as UnAuth user', buyVinylAsUnAuthUser);
    });
    describe('Find vinyl by name and author name:', () => {
      it('Find vinyl by name and author name', findVinylByNameAndAuthor);
      it('Validation Find vinyl', validationFindVinyl);
    });
  });

  //   afterAll(async () => {
  //     await expressService.shutdown();
});
