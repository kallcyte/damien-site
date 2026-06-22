declare module "just-validate" {
  export default JustValidate;
  class JustValidate {
    constructor(
      form: string | Element,
      globalConfig?: Record<string, unknown>,
      dictLocale?: Array<Record<string, unknown>>
    );
    addField(
      fieldSelector: string,
      rules: Array<Record<string, unknown>>,
      config?: Record<string, unknown>
    ): JustValidate;
    onSuccess(callback: (event: Event) => void): JustValidate;
    onFail(
      callback: (fields: Record<string, unknown>, groups: Record<string, unknown>) => void
    ): JustValidate;
  }
}
