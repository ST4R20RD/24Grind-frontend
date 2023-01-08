import { Button } from "../Button";
import { Modal } from "../Modal";

export function Upload({
  isOpenUpload,
  setIsOpenUpload,
  handleFileInputChange,
  fileInputState,
  previewSource,
  uploadError,
  fileName,
}: any) {
  return (
    <Modal isOpen={isOpenUpload} setIsOpen={setIsOpenUpload}>
      <div className="bg-zinc-300 dark:bg-chinBlack dark:text-white flex flex-col rounded-lg p-2 m-5">
        {previewSource && (
          <div className="m-2 mb-10 rounded-lg shadow-md shadow-slate-900 dark:shadow-zinc-800 overflow-hidden">
            <img className="w-full h-full object-contain" src={previewSource} alt="chosen" />
          </div>
        )}
        <div className="text-center w-[80vw]">
          <span className="text-center text-red-600">{uploadError}</span>
          {fileName && (
            <p>
              {fileName.length > 30
                ? fileName.slice(0, 14) +
                  "..." +
                  fileName.slice(fileName.length - 14, fileName.length)
                : fileName}
            </p>
          )}
          <Button>
            <label htmlFor="fileInput">{!previewSource ? "Select Image" : "Change Image"}</label>
          </Button>
          <input
            id="fileInput"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              handleFileInputChange(e);
              if (uploadError !== "") setIsOpenUpload(false);
            }}
            value={fileInputState}
            className="hidden"
          />
        </div>
      </div>
    </Modal>
  );
}
