import { join } from 'path';
import { fs } from '@graphql-mesh/cross-helpers';

const { readFile } = fs.promises;

describe('Artifacts', () => {
  it('should execute queries', async () => {
    const { getBuiltMesh } = await import('../.compiled/.mesh/index');
    const { execute } = await getBuiltMesh();
    const query = await readFile(
      join(__dirname, '../src/example-query.graphql'),
      'utf-8'
    );
    const executionResult = await execute(query, {});
    expect(executionResult?.data?.breeds).toHaveLength(2);
    expect(
      executionResult?.data?.breeds[0]?.id).toBeDefined();
  }, 12000);
});
