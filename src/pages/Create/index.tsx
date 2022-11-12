import { CardForm } from "../../components";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { useUploadImg } from "../../lib/api-hooks";
import { Upload } from "../../components/Upload";

export function Create() {
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);

  const [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    uploadedURL,
  ] = useUploadImg();

  return (
    <section>
      <CardForm
        setIsOpenUpload={setIsOpenUpload}
        uploadFetchState={uploadFetchState}
        uploadedURL={uploadedURL}
      />
      {isOpenUpload && (
        <Upload
          isOpenUpload={isOpenUpload}
          setIsOpenUpload={setIsOpenUpload}
          handleSubmitFile={handleSubmitFile}
          handleFileInputChange={handleFileInputChange}
          fileInputState={fileInputState}
          previewSource={previewSource}
        />
      )}
    </section>
  );
}
