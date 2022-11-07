import { Modal } from "../Modal";

export function Upload({ isOpenUpload, setIsOpenUpload, handleSubmitFile, handleFileInputChange, fileInputState, previewSource}: any) {
    
    return (
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
    )
}