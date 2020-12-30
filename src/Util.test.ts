import { camelToSnakeCase } from './Util';

test('camelToSnakeCase should convert text to snake case', () => {
  const text = 'helloWorld';

  expect(camelToSnakeCase(text)).toEqual('hello-world');
});
