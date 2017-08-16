import { includes } from 'lodash';
import StatementHash from '../models/StatementHash';
import StoredStatementModel from '../models/StoredStatementModel';
import GetHashesOptions from '../repoFactory/options/GetHashesOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetHashesOptions): Promise<StatementHash[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(opts.ids, model.statement.id) &&
        matchesClientOption(model, opts.client, true)
      );
    });
    return filteredModels.map((model: StoredStatementModel): StatementHash => {
      return {
        statementId: model.statement.id,
        hash: model.hash,
      };
    });
  };
};
