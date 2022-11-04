import { CardForm } from "../../components";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { useUploadImg } from "../../lib/api-hooks";

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
        <Modal isOpen={isOpenUpload} setIsOpen={setIsOpenUpload}>
          <div className="bg-slate-300 flex flex-col rounded-lg p-2 m-5">
            {previewSource && (
              <div className="h-80 w-80 m-5 mb-10">
                <img src={previewSource} alt="chosen" />
              </div>
            )}
            <form
              onSubmit={(e) => {
                handleSubmitFile(e);
                setIsOpenUpload(false);
              }}
              className="flex flex-col"
            >
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="shadow-lg p-2 mb-2 rounded-xl"
              />
              <button className="border border-blue-900 rounded-full px-4 py-1">OK</button>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
}
