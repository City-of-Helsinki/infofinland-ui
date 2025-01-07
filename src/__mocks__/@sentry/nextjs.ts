
module.exports = {
  withSentryConfig: cfg => cfg,
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setUser: jest.fn(),
};
