import { describe, it, expect } from 'vitest';

import { zodSchema } from './zodSchema';

function createFileList(file: File): FileList {
  const input = document.createElement('input');
  input.type = 'file';

  const baseFileList = input.files;

  if (!baseFileList) {
    throw new Error('FileList is not available in test environment');
  }

  const fileList = Object.create(baseFileList) as FileList;

  Object.defineProperty(fileList, 0, {
    value: file,
    enumerable: true,
    configurable: true,
  });

  Object.defineProperty(fileList, 'length', {
    value: 1,
    configurable: true,
  });

  Object.defineProperty(fileList, 'item', {
    value: (index: number) => (index === 0 ? file : null),
    configurable: true,
  });

  return fileList;
}

function createValidData() {
  const file = new File(['test'], 'avatar.png', { type: 'image/png' });

  return {
    name: 'Test',
    age: '30',
    email: 'test@test.com',
    gender: 'male',
    terms: true,
    password: 'StrongPass1!',
    confirmPassword: 'StrongPass1!',
    country: 'Kazakhstan',
    avatar: createFileList(file),
  };
}

describe('zodSchema', () => {
  it('parses valid form data', () => {
    const result = zodSchema.safeParse(createValidData());

    expect(result.success).toBe(true);
  });

  it('trims name and converts age to number', () => {
    const result = zodSchema.parse({
      ...createValidData(),
      name: '  Test  ',
      age: '30',
    });

    expect(result.name).toBe('Test');
    expect(result.age).toBe(30);
  });

  it('returns error when name is empty', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      name: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Name is required');
    }
  });

  it('returns error when name does not start with uppercase', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      name: 'test',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'First letter must be uppercase'
      );
    }
  });

  it('returns error when age is not an integer', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      age: '30.5',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Age must be an integer');
    }
  });

  it('returns error when email is invalid', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      email: 'test',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Invalid email');
    }
  });

  it('returns error when gender is missing', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      gender: undefined,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Gender is required');
    }
  });

  it('returns error when terms are not accepted', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      terms: false,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Accept terms');
    }
  });

  it('returns error when password has no uppercase letter', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      password: 'strongpass1!',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Must contain at least 1 uppercase letter'
      );
    }
  });

  it('returns error when password has no lowercase letter', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      password: 'STRONGPASS1!',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Must contain at least 1 lowercase letter'
      );
    }
  });

  it('returns error when password has no digit', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      password: 'StrongPass!',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Must contain at least 1 number'
      );
    }
  });

  it('returns error when password has no special character', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      password: 'StrongPass1',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Must contain at least 1 special character'
      );
    }
  });

  it('returns error when confirmPassword is empty', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      confirmPassword: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Please confirm your password'
      );
    }
  });

  it('returns error when country is invalid', () => {
    const result = zodSchema.safeParse({
      ...createValidData(),
      country: 'test',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Please select a valid country'
      );
    }
  });

  it('returns error when avatar type is invalid', () => {
    const file = new File(['test'], 'avatar.gif', { type: 'image/gif' });

    const result = zodSchema.safeParse({
      ...createValidData(),
      avatar: createFileList(file),
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Only PNG and JPEG are allowed'
      );
    }
  });

  it('returns error when avatar size is larger than 2MB', () => {
    const largeFile = new File(
      [new Uint8Array(2 * 1024 * 1024 + 1)],
      'big.png',
      {
        type: 'image/png',
      }
    );

    const result = zodSchema.safeParse({
      ...createValidData(),
      avatar: createFileList(largeFile),
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'File size must be less than 2MB'
      );
    }
  });
});
