import { CardForm, Upload } from "../../components";
import { useState } from "react";
import { useUploadImg } from "../../lib/api-hooks";

export function Create() {
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);

  const [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    clear,
    uploadError,
    fileName,
  ] = useUploadImg();

  return (
    <section>
      <CardForm
        setIsOpenUpload={setIsOpenUpload}
        uploadFetchState={uploadFetchState}
        previewSource={previewSource}
        handleSubmitFile={handleSubmitFile}
        clear={clear}
      />
      {isOpenUpload && (
        <Upload
          isOpenUpload={isOpenUpload}
          setIsOpenUpload={setIsOpenUpload}
          handleFileInputChange={handleFileInputChange}
          fileInputState={fileInputState}
          previewSource={previewSource}
          uploadError={uploadError}
          fileName={fileName}
        />
      )}
    </section>
  );
}
