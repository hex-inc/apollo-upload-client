// TODO: port back to definitelytyped

declare module "extract-files" {
  // Taken from https://github.com/jaydenseric/extract-files/blob/6665102dea163fc5a6a9753d336daaf975f953b5/readme.md
  export type ObjectPath = string;
  export type ExtractableFileMatcher = (value: any) => boolean;
  export type ExtractableFile = File | Blob | ReactNativeFile;
  export type ExtractFilesResult = {
    clone: any;
    files: Map<ExtractableFile, Array<ObjectPath>>;
  };

  export const extractFiles: (
    value: any,
    path?: ObjectPath,
    isExtractableFile?: ExtractableFileMatcher
  ) => ExtractFilesResult;

  export interface ReactNativeFileOptions {
    uri: string;
    type: string;
    name: string;
  }

  export class ReactNativeFile {
    uri: string;
    type: string;
    name: string;

    constructor(options: ReactNativeFileOptions);

    static list(files: ReactNativeFileOptions[]): ReactNativeFile[];
  }
}
