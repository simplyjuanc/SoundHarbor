import { postUser } from '../../../src/lib/models/users.model.ts';
import prisma from '../../../src/lib/db.ts';

jest.mock('../../../src/lib/db.ts', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

describe('postUser', () => {
  it('should post a user', async () => {
    const mockUser = {
      id: 'TestUserId',
      email: 'TestUserEmail@you',
      username: 'TestUserName',
    };
    prisma.user.create.mockResolvedValue(mockUser);
    const result = await postUser(mockUser);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: mockUser });
    expect(result).toEqual(mockUser);
  });

  it('should throw an error when user post fails', async () => {
    const mockError = new Error('User creation failed');
    prisma.user.create.mockRejectedValue(mockError);

    await expect(postUser({})).rejects.toThrow('User creation failed');
  });
});
