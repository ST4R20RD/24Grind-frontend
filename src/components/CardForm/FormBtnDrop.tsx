import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import { Modal } from "../Modal";
import { ItemType } from "../../utils/types";

interface FormBtnDropProps {
  label: string;
  list: ItemType[];
  multiple: boolean;
  searchBar: boolean;
  getSearchResult?: (searchString?: string) => void;
  value?: ItemType;
  setValue?: React.Dispatch<React.SetStateAction<ItemType | undefined>>;
  multiValue?: ItemType[];
  setMultiValue?: React.Dispatch<React.SetStateAction<ItemType[]>>;
  icon?: string;
}

export function FormBtnDrop({
  label,
  list,
  multiple,
  searchBar,
  getSearchResult,
  icon,
  value,
  setValue,
  multiValue,
  setMultiValue,
}: FormBtnDropProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemIsAdded, setItemIsAdded] = useState<boolean>(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  type ItemProps = {
    children: JSX.Element;
  };

  const Item = ({ children }: ItemProps) => {
    return (
      <div className="shadow-sm shadow-slate-900 rounded-full px-2 py-1 font-bold dark:text-gray-500 w-fit mx-1">
        {children}
      </div>
    );
  };

  const uniqueAddItems = (item: ItemType) => {
    const isDuplicate = multiValue?.some((e) => e.id === item.id);
    if (!isDuplicate && multiValue) {
      setMultiValue?.([...multiValue, item]);
    }
  };

  const AddItem = (item: ItemType) => {
    setValue?.(item);
  };

  const clearAddedItem = () => {
    setValue?.(undefined);
    setItemIsAdded(false);
  };

  const clearSingleAddedItem = (removeId: number) => {
    setMultiValue?.((current) =>
      current.filter((item) => {
        return item.id !== removeId;
      })
    );
  };

  const handleAdd = (item: ItemType) => {
    multiple ? uniqueAddItems(item) : AddItem(item);
    setIsOpen(false);
    setItemIsAdded(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (searchBar) getSearchResult?.();
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    string: string
  ) => {
    e.preventDefault();
    getSearchResult?.(string);
  };

  useEffect(() => {
    if (multiValue?.length === 0) setItemIsAdded(false);
  }, [multiValue]);

  return (
    <div className="w-full bg-slate-50 border-y my-1 border-slate-800 dark:border-slate-500 px-1 py-2 text-left">
      {!itemIsAdded ? (
        <button type="button" ref={btnRef} onClick={handleOpen}>
          <h3 className="pointer-events-none">{label}</h3>
        </button>
      ) : multiple ? (
        <div className="flex items-center flex-wrap">
          {multiValue?.map((item) => {
            return (
              <Item key={item.id}>
                <div className="flex">
                  <h3 className="pointer-events-none">{item.name}</h3>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => clearSingleAddedItem(item.id)}
                  >
                    <h1>
                      <TiDelete />
                    </h1>
                  </button>
                </div>
              </Item>
            );
          })}
          <button type="button" ref={btnRef} onClick={handleOpen}>
            {multiple && <FaPlus className="mx-1 pointer-events-none" />}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            {icon === "Group" && <HiUserGroup />}
            <Item>
              <h3>{value?.name}</h3>
            </Item>
            <button type="button" onClick={clearAddedItem}>
              <h1>
                <TiDelete />
              </h1>
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <section className="fixed max-w-[90vw] max-h-[80vh] mx-2 bg-slate-200 rounded-md shadow-md text-black overflow-scroll">
            {searchBar && (
              <form className="px-4 m-2">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e, e.target.value)}
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                  />
                </div>
              </form>
            )}
            <div className="">
              <ul>
                {list.map((item: ItemType, index) => {
                  return (
                    <li key={index} className="border-b border-zinc-400 pl-2 pr-7">
                      <button
                        type="button"
                        onClick={() => {
                          handleAdd(item);
                        }}
                      >
                        <span className="flex items-center my-1">
                          {item.img && (
                            <img
                              className="h-9 w-9 rounded-full mx-2"
                              src={item.img}
                              alt="user img"
                            />
                          )}
                          <div className="text-left my-1">
                            <h2>{item.name}</h2>
                            <p className="text-xs text-slate-400">
                              {item.accountName}
                            </p>
                          </div>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
}
