// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/fileTransformer.js',
//   },
// };

export {};
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
  moduleNameMapper: {
    // if your using tsconfig.paths thers is no harm in telling jest
    // '@components/(.*)$': '<rootDir>/src/components/$1',
    // '@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',

    // // mocking assests and styling
    // '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   '<rootDir>/tests/mocks/fileMock.ts',
    // '^.+\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.ts',
    // /* mock models and services folder */
    // '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
  },
  // to obtain access to the matchers.
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
};
