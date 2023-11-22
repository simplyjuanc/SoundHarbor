import {
  getAllReleases,
  getRelease,
} from '../../../src/lib/models/releases.model.ts';
import prisma from '../../../src/lib/db.ts';

//Mock Prisma client
jest.mock('../../../src/lib/db.ts', () => ({
  __esModule: true,
  default: {
    release: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('getAllReleases', () => {
  it('should return a list of releases', async () => {
    const mockAllRelease = [
      { id: 1, title: 'Release 1', artists: 'Artist A' },
      { id: 2, title: 'Release 2', artists: 'Artist B' },
    ];
    prisma.release.findMany.mockResolvedValue(mockAllRelease);

    const result = await getAllReleases();

    expect(prisma.release.findMany).toHaveBeenCalledWith({
      orderBy: { artists: 'asc' },
    });
    expect(result).toEqual(mockAllRelease);
  });
});

describe('getRelease', () => {
  it('should return a release for a valid ID', async () => {
    const validReleaseId = 'valid-id';
    const mockRelease = {
      id: validReleaseId,
      title: 'Sample title',
      artist: 'Sample artist',
    };
    prisma.release.findUnique.mockResolvedValue(mockRelease);
    const result = await getRelease(validReleaseId);

    expect(prisma.release.findUnique).toHaveBeenCalledWith({
      where: { id: validReleaseId },
    });
    expect(result).toEqual(mockRelease);
  });

  it('should throw an error for an invalid ID', async () => {
    const invalidID = null;
    prisma.release.findUnique.mockResolvedValue(invalidID);

    await expect(getRelease(invalidID)).rejects.toThrow(
      'getRelease - no release found in DB'
    );

    expect(prisma.release.findUnique).toHaveBeenCalledWith({
      where: { id: invalidID },
    });
  });
});
