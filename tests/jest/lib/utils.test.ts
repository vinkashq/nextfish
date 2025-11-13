import { cn, getInputValue, clearInput, postRequest } from '@/lib/utils'
import fetchMock from 'jest-fetch-mock'

describe('cn', () => {
  it('merges Tailwind CSS classes correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'bg-blue-500');
    expect(result).toBe('text-white bg-blue-500');
  });
});

describe('getInputValue', () => {
  it('returns the value of the input element', () => {
    document.body.innerHTML = '<input id="test-input" value="test-value" />';
    const result = getInputValue('test-input');
    expect(result).toBe('test-value');
  });
});

describe('clearInput', () => {
  it('clears the value of the input element', () => {
    document.body.innerHTML = '<input id="test-input" value="test-value" />';
    clearInput('test-input');
    const inputElement = document.getElementById('test-input') as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });
});

describe('postRequest', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('sends a POST request with the correct headers and body', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    // eslint-disable-next-line no-unused-vars
    const response = await postRequest('/test-url', "mock-token", { data: 'test-data' });

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual('/test-url');
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST');
    expect(fetchMock.mock.calls[0][1]?.headers).toEqual({
      'Content-Type': 'application/json',
      'X-Firebase-AppCheck': 'mock-token',
    });
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify({ data: 'test-data' }));
  });
});
