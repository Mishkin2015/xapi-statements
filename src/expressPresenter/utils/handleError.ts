import { Response } from 'express';
import { isNull, isUndefined } from 'lodash';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import ChangedStatementRef from '../../errors/ChangedStatementRef';
import Conflict from '../../errors/Conflict';
import DataBeforeFirstBoundary from '../../errors/DataBeforeFirstBoundary';
import DataBeyondFinalBoundary from '../../errors/DataBeyondFinalBoundary';
import DuplicateId from '../../errors/DuplicateId';
import InvalidBoundary from '../../errors/InvalidBoundary';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidContentTransferEncoding from '../../errors/InvalidContentTransferEncoding';
import InvalidMethod from '../../errors/InvalidMethod';
import InvalidVoidType from '../../errors/InvalidVoidType';
import JsonSyntaxError from '../../errors/JsonSyntaxError';
import MissingAttachments from '../../errors/MissingAttachments';
import ExtraAttachments from '../../errors/ExtraAttachments';
import MissingLoadedId from '../../errors/MissingLoadedId';
import MissingStatementId from '../../errors/MissingStatementId';
import NoStatements from '../../errors/NoStatements';
import QueryIds from '../../errors/QueryIds';
import UnknownParams from '../../errors/UnknownParams';
import UnequalStatementId from '../../errors/UnequalStatementId';
import VoidingError from '../../errors/VoidingError';
import InvalidX5CType from '../../errors/InvalidX5CType';
import InvalidX5CChain from '../../errors/InvalidX5CChain';
import InvalidJws from '../../errors/InvalidJws';
import InvalidSignedStatement from '../../errors/InvalidSignedStatement';
import InvalidSignatureAlgorithm from '../../errors/InvalidSignatureAlgorithm';
import Translator from '../../translatorFactory/Translator';
import { xapiHeaderVersion } from '../../utils/constants';

export interface Options extends CommonOptions {
  translator: Translator;
}

export default ({ translator, errorId, res, err }: Options): Response => {
  const timestamp = new Date().toISOString();
  res.setHeader('X-Experience-API-Consistent-Through', timestamp);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  if (isNull(err) || isUndefined(null)) {
    const code = 500;
    const message = translator.serverError();
    return sendMessage({ res, code, errorId, message });
  }

  switch (err.constructor) {
    case InvalidSignatureAlgorithm: {
      const code = 400;
      const message = translator.invalidSignatureAlgorithmError(err as InvalidSignatureAlgorithm);
      return sendMessage({ res, code, errorId, message });
    } case InvalidX5CType: {
      const code = 400;
      const message = translator.invalidX5CTypeError(err as InvalidX5CType);
      return sendMessage({ res, code, errorId, message });
    } case InvalidX5CChain: {
      const code = 400;
      const message = translator.invalidX5CChainError(err as InvalidX5CChain);
      return sendMessage({ res, code, errorId, message });
    } case InvalidJws: {
      const code = 400;
      const message = translator.invalidJwsError(err as InvalidJws);
      return sendMessage({ res, code, errorId, message });
    } case InvalidSignedStatement: {
      const code = 400;
      const message = translator.invalidSignedStatementError(err as InvalidSignedStatement);
      return sendMessage({ res, code, errorId, message });
    } case JsonSyntaxError: {
      const code = 400;
      const message = translator.jsonSyntaxError(err as JsonSyntaxError);
      return sendMessage({ res, code, errorId, message });
    } case ChangedStatementRef: {
      const code = 500;
      const message = translator.changedStatementRefError(err as ChangedStatementRef);
      return sendMessage({ res, code, errorId, message });
    }
    case Conflict: {
      const code = 409;
      const message = translator.conflictError(err as Conflict);
      return sendMessage({ res, code, errorId, message });
    }
    case DataBeforeFirstBoundary: {
      const code = 400;
      const message = translator.dataBeforeFirstBoundaryError(err as DataBeforeFirstBoundary);
      return sendMessage({ res, code, errorId, message });
    }
    case DataBeyondFinalBoundary: {
      const code = 400;
      const message = translator.dataBeyondFinalBoundaryError(err as DataBeyondFinalBoundary);
      return sendMessage({ res, code, errorId, message });
    }
    case DuplicateId: {
      const code = 400;
      const message = translator.duplicateIdError(err as DuplicateId);
      return sendMessage({ res, code, errorId, message });
    }
    case ExtraAttachments: {
      const code = 400;
      const message = translator.extraAttachmentsError(err as ExtraAttachments);
      return sendMessage({ res, code, errorId, message });
    }
    case InvalidBoundary: {
      const code = 400;
      const message = translator.invalidBoundaryError(err as InvalidBoundary);
      return sendMessage({ res, code, errorId, message });
    }
    case InvalidContentType: {
      const code = 400;
      const message = translator.invalidContentTypeError(err as InvalidContentType);
      return sendMessage({ res, code, errorId, message });
    }
    case InvalidContentTransferEncoding: {
      const code = 400;
      const message = translator.invalidContentTransferEncodingError(err as InvalidContentTransferEncoding);
      return sendMessage({ res, code, errorId, message });
    }
    case InvalidMethod: {
      const code = 400;
      const message = translator.invalidMethodError(err as InvalidMethod);
      return sendMessage({ res, code, errorId, message });
    }
    case InvalidVoidType: {
      const code = 400;
      const message = translator.invalidVoidTypeError(err as InvalidVoidType);
      return sendMessage({ res, code, errorId, message });
    }
    case MissingAttachments: {
      const code = 400;
      const message = translator.missingAttachmentsError(err as MissingAttachments);
      return sendMessage({ res, code, errorId, message });
    }
    case MissingLoadedId: {
      const code = 500;
      const message = translator.missingLoadedIdError(err as MissingLoadedId);
      return sendMessage({ res, code, errorId, message });
    }
    case MissingStatementId: {
      const code = 400;
      const message = translator.missingStatementIdError(err as MissingStatementId);
      return sendMessage({ res, code, errorId, message });
    }
    case NoStatements: {
      const code = 400;
      const message = translator.noStatementsError(err as NoStatements);
      return sendMessage({ res, code, errorId, message });
    }
    case QueryIds: {
      const code = 400;
      const message = translator.queryIdsError(err as QueryIds);
      return sendMessage({ res, code, errorId, message });
    }
    case UnknownParams: {
      const code = 400;
      const message = translator.unknownParamsError(err as UnknownParams);
      return sendMessage({ res, code, errorId, message });
    }
    case UnequalStatementId: {
      const code = 400;
      const message = translator.unequalStatementIdError(err as UnequalStatementId);
      return sendMessage({ res, code, errorId, message });
    }
    case VoidingError: {
      const code = 400;
      const message = translator.voidingErrorError(err as VoidingError);
      return sendMessage({ res, code, errorId, message });
    }
    default: {
      return commonErrorHandler({ translator, errorId, res, err });
    }
  }
};
