import { parse as parseAcceptedLanguages } from 'accept-language-parser';
import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import QueryIds from '../../../errors/QueryIds';
import Config from '../../Config';
import getSingleStatement from './getSingleStatement';
import getMultipleStatements from './getMultipleStatements';

export interface Options {
  config: Config;
  res: Response;
  client: ClientModel;
  queryParams: any;
  urlPath: string;
  acceptedLangs: string;
}

const getAcceptedLanguages = (acceptedLangs: string) => {
  return parseAcceptedLanguages(acceptedLangs).map((acceptedLang) => {
    const ending = acceptedLang.region === undefined ? '' : `-${acceptedLang.region}`;
    return `${acceptedLang.code}${ending}`;
  });
};

export default async ({ config, res, client, queryParams, urlPath, acceptedLangs }: Options) => {
  const statementId = queryParams.statementId;
  const voidedStatementId = queryParams.voidedStatementId;
  const langs = getAcceptedLanguages(acceptedLangs);

  if (statementId !== undefined && voidedStatementId !== undefined) {
    throw new QueryIds();
  }

  if (statementId !== undefined && voidedStatementId === undefined) {
    const id = statementId;
    const voided = false;
    return getSingleStatement({ config, res, queryParams, id, voided, client, langs });
  }

  if (statementId === undefined && voidedStatementId !== undefined) {
    const id = voidedStatementId;
    const voided = true;
    return getSingleStatement({ config, res, queryParams, id, voided, client, langs });
  }

  return getMultipleStatements({ config, res, queryParams, client, urlPath, langs });
};
