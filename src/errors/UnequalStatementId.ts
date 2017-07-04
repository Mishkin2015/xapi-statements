import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public statementId: string) {
    super(`Expected the statement's id to match the query param (${statementId})`);
  }
}