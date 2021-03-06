import StatementHash from '../../../models/StatementHash';
import Signature, { Opts } from './Signature';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import Config from '../utils/mongoModels/Config';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';

interface Result {
  hash: string;
  statement: {
    id: string;
  };
}

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.id': { $in: ids },
      ...matchesClientOption(client)
    };
    const project = {
      _id: 0,
      'statement.id': 1,
      hash: 1,
    };
    const results = await collection.find(query).project(project).toArray() as Result[];

    return results.map((result) => {
      return {
        hash: result.hash,
        statementId: result.statement.id,
      };
    });
  };
};
