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
    ,
    fileName,
  ] = useUploadImg();

  return (
    <section>
      <CardForm
        setIsOpenUpload={setIsOpenUpload}
        uploadFetchState={uploadFetchState}
        previewSource={previewSource}
        handleSubmitFile={handleSubmitFile}
      />
      {isOpenUpload && (
        <Upload
          isOpenUpload={isOpenUpload}
          setIsOpenUpload={setIsOpenUpload}
          handleFileInputChange={handleFileInputChange}
          fileInputState={fileInputState}
          previewSource={previewSource}
          fileName={fileName}
        />
      )}
    </section>
  );
}
