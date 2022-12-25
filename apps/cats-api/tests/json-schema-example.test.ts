import { findAndParseConfig } from '@graphql-mesh/cli';
import { getMesh } from '@graphql-mesh/runtime';
import { readFile } from 'fs-extra';
import { join } from 'path';

import { printSchema, lexicographicSortSchema } from 'graphql';

const mesh$ = findAndParseConfig({
  dir: join(__dirname, '../config'),
}).then((config) => getMesh(config));

describe('JSON Schema Example', () => {
  it('should generate correct schema', async () => {
    const { schema } = await mesh$;
    expect(
      printSchema(lexicographicSortSchema(schema))
    ).toMatchSnapshot();
  });
  it('should give correct response', async () => {
    const { execute } = await mesh$;
    const query = await readFile(
      join(__dirname, '../src/example-query.graphql'),
      'utf8'
    );
    const result = await execute(query, {});
    expect(result?.data?.breeds).toHaveLength(2);
    expect(result?.data?.breeds[0]?.id).toBeDefined();
  });
  afterAll(() => mesh$.then((mesh) => mesh.destroy()));
});
