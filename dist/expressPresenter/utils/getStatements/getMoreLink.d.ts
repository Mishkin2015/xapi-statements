import StatementsResult from '../../../models/StatementsResult';
import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';
export interface MoreLinkOptions {
    results: StatementsResult;
    statementsOpts: Partial<GetStatementsOptions>;
    resultOpts: StatementsResultOptions;
}
declare const _default: (opts: MoreLinkOptions) => string | undefined;
export default _default;