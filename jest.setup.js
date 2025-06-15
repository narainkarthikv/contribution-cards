import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Setup global environment to mimic browser
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

// Mock localStorage with full implementation
const store = new Map();

const createLocalStorageMock = () => ({
  getItem: jest.fn((key) => store.get(key) || null),
  setItem: jest.fn((key, value) => {
    store.set(key, value);
  }),
  removeItem: jest.fn((key) => {
    store.delete(key);
  }),
  clear: jest.fn(() => {
    store.clear();
  }),
  key: jest.fn((index) => {
    return Array.from(store.keys())[index] || null;
  }),
  get length() {
    return store.size;
  }
});

Object.defineProperty(window, 'localStorage', {
  value: createLocalStorageMock()
});

// Mock window.matchMedia for responsive design testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }
  observe(element) {
    this.elements.add(element);
  }
  unobserve(element) {
    this.elements.delete(element);
  }
  disconnect() {
    this.elements.clear();
  }
  trigger(entries) {
    this.callback(entries, this);
  }
};

// Performance API mock
if (!global.performance) {
  global.performance = {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn()
  };
}

// Mock fetch
global.fetch = jest.fn();

// Add error event listener to window
window.addEventListener('error', (event) => {
  console.error('Global error handler:', event.error);
});
