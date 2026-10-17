const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('Utility Functions - Unit Tests', () => {

  // Test suite for capitalizeWords
  describe('capitalizeWords(input)', () => {
    test('should capitalize normal cases like "hello world"', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('should handle an empty string edge case', () => {
      expect(capitalizeWords('')).toBe('');
    });

    test('should handle strings with special characters', () => {
      expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });

    test('should handle single-word strings', () => {
      expect(capitalizeWords('javascript')).toBe('Javascript');
    });
  });

  // Test suite for filterActiveUsers
  describe('filterActiveUsers(users)', () => {
    test('should filter active users from a mixed array', () => {
      const mixedUsers = [
        { name: 'Alice', isActive: true },
        { name: 'Bob', isActive: false },
        { name: 'Charlie', isActive: true }
      ];
      expect(filterActiveUsers(mixedUsers)).toEqual([
        { name: 'Alice', isActive: true },
        { name: 'Charlie', isActive: true }
      ]);
    });

    test('should return an empty array when all users are inactive', () => {
      const inactiveUsers = [
        { name: 'Bob', isActive: false },
        { name: 'Dan', isActive: false }
      ];
      expect(filterActiveUsers(inactiveUsers)).toEqual([]);
    });

    test('should handle an empty array input safely', () => {
      expect(filterActiveUsers([])).toEqual([]);
    });
  });

  // Test suite for logAction
  describe('logAction(action, username)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-10-17T18:46:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should format log string with correct action, username, and timestamp', () => {
      const log = logAction('login', 'Alice');
      expect(log).toBe('User Alice performed login at 2026-10-17T18:46:00.000Z');
    });

    test('should handle different actions and usernames', () => {
      const log = logAction('post_comment', 'Bob');
      expect(log).toBe('User Bob performed post_comment at 2026-10-17T18:46:00.000Z');
    });

    test('should handle missing action or username gracefully', () => {
      const result = logAction(undefined, 'Alice');
      expect(result).toContain('User Alice performed undefined');
    });

    test('should handle empty strings as inputs', () => {
      const result = logAction('', '');
      expect(result).toBe('User  performed  at 2026-10-17T18:46:00.000Z');
    });
  });
});

