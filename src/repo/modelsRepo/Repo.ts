import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateStatementsSignature from './createStatements/Signature';
import GetFullActivitySignature from './getFullActivity/Signature';
import GetStatementSignature from './getStatement/Signature';
import GetStatementsSignature from './getStatements/Signature';
import GetHashesSignature from './getHashes/Signature';
import GetVoidersByObjectIdsSignature from './getVoidersByObjectIds/Signature';
import GetVoidersByIdsSignature from './getVoidersByIds/Signature';
import VoidStatementsSignature from './voidStatements/Signature';
import GetDownRefIdSignature from './getDownRefId/Signature';
import GetUpRefIdsSignature from './getUpRefIds/Signature';
import SetRefsSignature from './setRefs/Signature';
import GetStatementsByIdsSignature from './getStatementsByIds/Signature';
import GetUpRefsByIdsSignature from './getUpRefsByIds/Signature';
import UpdateFullActivitiesSignature from './updateFullActivities/Signature';
import IncrementStoreCountSignature from './incrementStoreCount/Signature';

interface ModelsRepo extends CommonRepo {
  readonly createStatements: CreateStatementsSignature;
  readonly getFullActivity: GetFullActivitySignature;
  readonly getStatement: GetStatementSignature;
  readonly getStatements: GetStatementsSignature;
  readonly getHashes: GetHashesSignature;
  readonly getVoidersByObjectIds: GetVoidersByObjectIdsSignature;
  readonly getVoidersByIds: GetVoidersByIdsSignature;
  readonly voidStatements: VoidStatementsSignature;
  readonly getDownRefId: GetDownRefIdSignature;
  readonly getUpRefIds: GetUpRefIdsSignature;
  readonly setRefs: SetRefsSignature;
  readonly getStatementsByIds: GetStatementsByIdsSignature;
  readonly getUpRefsByIds: GetUpRefsByIdsSignature;
  readonly updateFullActivities: UpdateFullActivitiesSignature;
  readonly incrementStoreCount: IncrementStoreCountSignature;
}

export default ModelsRepo;
