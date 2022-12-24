import { Modal } from "../Modal";

export function Upload({
  isOpenUpload,
  setIsOpenUpload,
  handleFileInputChange,
  fileInputState,
  previewSource,
  uploadError,
}: any) {
  return (
    <Modal isOpen={isOpenUpload} setIsOpen={setIsOpenUpload}>
      <div className="bg-slate-300 flex flex-col rounded-lg p-2 m-5">
        {previewSource && (
          <div className="h-80 w-80 m-5 mb-10 rounded-lg shadow-md shadow-slate-900 overflow-hidden">
            <img className="w-full h-full object-contain" src={previewSource} alt="chosen" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-center text-red-600">{uploadError}</span>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={(e) => {
              handleFileInputChange(e);
              if (uploadError !== "") setIsOpenUpload(false);
            }}
            value={fileInputState}
            className="shadow-lg p-2 mb-2 rounded-xl"
          />
          {/* <button
            type="submit"
            className="border border-blue-900 rounded-full px-4 py-1"
          >
            OK
          </button> */}
        </div>
      </div>
    </Modal>
  );
}
