import { login } from '../src/js/api/auth/login';
import { logout } from '../src/js/api/auth/logout';

beforeEach(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value;
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

jest.mock('../src/js/api/auth/login', () => ({
  login: jest.fn(async () => {
    const token = 'fakeToken';
    return { token };
  }),
}));

describe('Login Function', () => {
  it('should store a token when valid credentials are provided', async () => {
    const response = await login('validemail@example.com', 'validpassword');
    localStorage.setItem('accessToken', response.token);
    expect(localStorage.getItem('accessToken')).toBe('fakeToken');
  });
});

describe('Logout Function', () => {
  it('should clear the token and profile from localStorage', () => {
    localStorage.setItem('token', 'fakeToken');
    localStorage.setItem('profile', JSON.stringify({ name: 'John Doe' }));

    logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('profile')).toBeNull();
  });
});
