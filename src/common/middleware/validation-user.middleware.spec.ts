import { ValidationUserMiddleware } from './validation-user.middleware';

describe('Middleware', () => {
  it('should be defined', () => {
    expect(new ValidationUserMiddleware()).toBeDefined();
  });
});
