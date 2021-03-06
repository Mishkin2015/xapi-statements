import StoredStatementModel from '../../../../models/StoredStatementModel';
import Signature, { Opts } from '../Signature';
import matchesClientOption from '../../utils/memoryModels/matchesClientOption';
import Config from '../../utils/memoryModels/Config';
import matchesAgentOption from './matchesAgentOption';
import matchesCursorOption from './matchesCursorOption';
import matchesVerbOption from './matchesVerbOption';
import matchesActivityOption from './matchesActivityOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesUntilOption from './matchesUntilOption';
import matchesSinceOption from './matchesSinceOption';

const filterModels = (models: StoredStatementModel[], opts: Opts) => {
  return models.filter((model: StoredStatementModel) => {
    const statement = model.statement;
    return (
      matchesCursorOption(model, opts) &&
      matchesClientOption(model, opts.client, true) &&
      matchesAgentOption(model, opts) &&
      matchesVerbOption(model, opts) &&
      matchesActivityOption(model, opts) &&
      matchesRegistrationOption(model, opts) &&
      matchesUntilOption(statement, opts) &&
      matchesSinceOption(statement, opts)
    );
  });
};

const sortModels = (models: StoredStatementModel[], ascending: boolean) => {
  const lower = ascending ? -1 : 1;
  const higher = ascending ? 1 : -1;
  return models.sort((modelA, modelB) => {
    const storedA = modelA.statement.stored;
    const storedB = modelB.statement.stored;
    if (storedA < storedB) return lower;

    /* istanbul ignore next */
    if (storedA > storedB) return higher;
    if (modelA._id < modelB._id) return lower;
    /* istanbul ignore next */
    if (modelA._id > modelB._id) return higher;
    /* istanbul ignore next */
    return 0;
  });
};

const limitModels = (
  models: StoredStatementModel[],
  skip: number = 0,
  limit: number
) => {
  return models.slice(skip, limit + skip);
};

export default (config: Config): Signature => {
  return async (opts) => {
    const filteredItems = filterModels(config.state.statements, opts);
    const sortedItems = sortModels(filteredItems, opts.ascending);
    const limitedItems = limitModels(sortedItems, opts.skip, opts.limit);
    return limitedItems;
  };
};
