import { Opts } from '../Signature';

export type Matcher<Option> = (statementKey: string, opt: Option, opts: Opts) => Object;
export type Getter<Option> = (opts: Opts) => Option | undefined;
export type ModelMatcher = (opts: Opts) => Object;

export default <Option>(matcher: Matcher<Option>, getter: Getter<Option>): ModelMatcher => {
  return (opts) => {
    const opt = getter(opts);
    return opt === undefined ? {} : {
      $or: [
        matcher('statement', opt, opts),
        matcher('refs.statement', opt, opts),
      ],
    };
  };
};
