import { Modal } from "../Modal";

export function Upload({
  isOpenUpload,
  setIsOpenUpload,
  handleFileInputChange,
  fileInputState,
  previewSource,
}: any) {
  return (
    <Modal isOpen={isOpenUpload} setIsOpen={setIsOpenUpload}>
      <div className="bg-zinc-300 dark:bg-chinBlack dark:text-white flex flex-col rounded-lg p-2 m-5">
        {previewSource && (
          <div className="h-80 w-80 m-5 mb-10 rounded-lg shadow-md shadow-slate-900 overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={previewSource}
              alt="chosen"
            />
          </div>
        )}
        <div className="flex flex-col">
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={(e) => {
              handleFileInputChange(e);
              setIsOpenUpload(false);
            }}
            value={fileInputState}
            className="p-2 file:border-none file:dark:bg-lustRed file:text-ueRed file:dark:text-black file:font-semibold file:rounded-xl file:px-3"
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
