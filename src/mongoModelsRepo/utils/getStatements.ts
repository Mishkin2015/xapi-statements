import matchesClientOption from '../utils/matchesClientOption';
import Config from '../Config';
import ClientModel from '../../models/ClientModel';

export interface Options {
  config: Config;
  query: Object;
  project: Object;
  client: ClientModel;
}

export default async ({ config, query, project, client }: Options) => {
  const collection = (await config.db).collection('statements');
  const orgQuery = {
    ...query,
    ...matchesClientOption(client)
  };
  const results = await collection.find(orgQuery).project(project).toArray();
  return results;
};
