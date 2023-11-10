// Import necessary modules and models from Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to seed dummy data for the User model
// const seedUsers = async () => {
//   await prisma.user.createMany({
//     data: [
//       {
//         username: 'user1',
//         firstName: 'John',
//         lastName: 'Doe',
//       },
//       {
//         username: 'user2',
//         firstName: 'Jane',
//         lastName: 'Doe',
//       },
//       // Duplicate the users to double the number
//       {
//         username: 'user3',
//         firstName: 'Alice',
//         lastName: 'Smith',
//       },
//       {
//         username: 'user4',
//         firstName: 'Bob',
//         lastName: 'Johnson',
//       },
//       // Add more users as needed
//     ],
//   });
// };

// Function to seed dummy data for the Release model
const seedReleases = async () => {
  await prisma.release.createMany({
    data: [
      {
        label: 'Record Label 1',
        releaseType: 'Album',
        country: 'USA',
        releaseDate: new Date(),
        genres: ['Rock', 'Pop'],
        discogsUri: 'https://www.discogs.com/release/123456',
        spotifyUri: 'https://open.spotify.com/album/abcdef',
        // Link the first two releases to the first two users
        // owners: { connect: [{ id: 1 }, { id: 2 }] },
      },
      {
        label: 'Record Label 2',
        releaseType: 'Single',
        country: 'UK',
        releaseDate: new Date(),
        genres: ['Electronic', 'Dance'],
        discogsUri: 'https://www.discogs.com/release/789012',
        spotifyUri: 'https://open.spotify.com/album/ghijkl',
        // Link the next two releases to the next two users
        owners: { connect: [{ id: 3 }, { id: 4 }] },
      },
      // Duplicate the releases to quadruple the number
      {
        label: 'Record Label 3',
        releaseType: 'EP',
        country: 'Germany',
        releaseDate: new Date(),
        genres: ['Metal', 'Rock'],
        discogsUri: 'https://www.discogs.com/release/345678',
        spotifyUri: 'https://open.spotify.com/album/mnopqr',
      },
      {
        label: 'Record Label 4',
        releaseType: 'Compilation',
        country: 'France',
        releaseDate: new Date(),
        genres: ['Pop', 'R&B'],
        discogsUri: 'https://www.discogs.com/release/901234',
        spotifyUri: 'https://open.spotify.com/album/stuvwx',
      },
      // Add more releases as needed
    ],
  });
};

// Main function to seed both User and Release data
const seedData = async () => {
  // await seedUsers();
  await seedReleases();
};

// Execute the seeding script
seedData()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
