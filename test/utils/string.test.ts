import { expect } from 'chai';

import { pascalCase } from '../../src/utils/string.js';

describe('pascalCase', () => {
  it('converts strings with separators to PascalCase', () => {
    expect(pascalCase('hello-world')).to.equal('HelloWorld');
    expect(pascalCase('foo_bar baz')).to.equal('FooBarBaz');
  });

  it('leaves alphanumeric strings intact', () => {
    expect(pascalCase('Sample')).to.equal('Sample');
  });
});
