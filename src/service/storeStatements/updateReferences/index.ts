import { includes, union, pull, has, get, size, keys, intersection, difference } from 'lodash';
import NoModel from '../../../errors/NoModel';
import StatementModel from '../../../models/StatementModel';
import Statement from '../../../models/Statement';
import Config from '../../Config';
import logger from '../../../logger';
import eagerLoadUpRefs from './eagerLoadUpRefs';
import eagerLoadDownRefs from './eagerLoadDownRefs';

const shortId = (id: string) => {
  return id[id.length - 1];
};

const shortIds = (ids: string[]) => {
  return `[${ids.map(shortId).join(',')}]`;
};

const stack = <T>(value: T, values: T[]): T[] => {
  return union([value], values);
};

export default async (config: Config, models: StatementModel[]): Promise<void> => {
  if (!config.enableReferencing) return;

  const groupedUpRefIds = await eagerLoadUpRefs(config, models);
  const groupedDownRefs = await eagerLoadDownRefs(config, models);
  const groupedDownRefIds = keys(groupedDownRefs);

  if (size(groupedUpRefIds) === 0 && size(groupedDownRefs) === 0) return;

  const getDownRefId = (id: string): Promise<string> => {
    logger.debug('getDownRefId', shortId(id));
    return config.repo.getDownRefId({ id });
  };

  const getUpRefIds = async (id: string): Promise<string[]> => {
    if (has(groupedUpRefIds, id)) {
      logger.silly('getUpRefIds cached', shortId(id));
      return get(groupedUpRefIds, id, []);
    }
    logger.debug('getUpRefIds', shortId(id));
    return config.repo.getUpRefIds({ id });
  };

  const getDownRefs = async (targetIds: string[]): Promise<Statement[]> => {
    const loadedTargetIds = intersection(targetIds, groupedDownRefIds);
    const unloadedTargetIds = difference(targetIds, groupedDownRefIds);
    const loadedDownRefs = loadedTargetIds.map((targetId) => {
      if (has(groupedDownRefs, targetId)) {
        return groupedDownRefs[targetId];
      }
      throw new Error('Eager loaded targetId is now missing');
    });
    const unloadedDownRefs = await config.repo.getStatementsByIds({
      ids: unloadedTargetIds,
    });

    logger.silly('getDownRefs cached', shortIds(loadedTargetIds));
    logger.silly('getDownRefs uncached', shortIds(unloadedTargetIds));
    return [...loadedDownRefs, ...unloadedDownRefs];
  };

  const setRefs = async (id: string, givenRefIds: string[]): Promise<void> => {
    const refIds = pull(givenRefIds, id);
    const refs = await getDownRefs(refIds);
    logger.debug('setRefs', shortId(id), shortIds(refIds));
    return config.repo.setRefs({ id, refs });
  };

  const traverseDown = async (modelId: string, visitedIds: string[]): Promise<string[]> => {
    logger.silly('traverseDown', shortId(modelId), shortIds(visitedIds));
    try {
      const newVisitedIds = stack(modelId, visitedIds);
      const downRefId = await getDownRefId(modelId);
      return (
        includes(newVisitedIds, downRefId) ?
        traverseUp([], newVisitedIds, downRefId) :
        traverseDown(downRefId, newVisitedIds)
      );
    } catch (err) {
      if (err.constructor === NoModel) {
        return traverseUp([], [], modelId);
      }
      throw err;
    }
  };

  const traverseUp = async (
    visitedIds: string[],
    refIds: string[],
    modelId: string
  ): Promise<string[]> => {
    logger.silly('traverseUp', shortIds(visitedIds), shortIds(refIds), shortId(modelId));
    if (includes(visitedIds, modelId)) return [];
    if (refIds.length > 0) await setRefs(modelId, refIds);

    const newVisitedIds = stack(modelId, visitedIds);
    const newRefIds = stack(modelId, refIds);
    const upRefIds = await getUpRefIds(modelId);
    return traverseUpRefs(newVisitedIds, newRefIds, upRefIds);
  };

  const traverseUpRefs = async (
    visitedIds: string[],
    refIds: string[],
    upRefIds: string[]
  ): Promise<string[]> => {
    logger.silly('traverseUpRefs', shortIds(visitedIds), shortIds(refIds), shortIds(upRefIds));
    const traversedIds: string[][] = await Promise.all(upRefIds.map((upRefId) => {
      return traverseUp(visitedIds, refIds, upRefId);
    }));
    return union(visitedIds, refIds, ...traversedIds);
  };

  logger.debug('Updating references for storage');
  await models.reduce(async (results, model): Promise<string[]> => {
    const visitedIds = await results;
    const modelId = model.statement.id;
    logger.debug('Updating references', shortId(modelId));
    if (includes(visitedIds, modelId)) return visitedIds;

    if (model.statement.object.objectType !== 'StatementRef') {
      const traversedIds = await traverseUp([], [], modelId);
      return union(visitedIds, traversedIds);
    } else {
      const traversedIds = await traverseDown(modelId, []);
      return union(visitedIds, traversedIds);
    }
  }, Promise.resolve([]));
};
