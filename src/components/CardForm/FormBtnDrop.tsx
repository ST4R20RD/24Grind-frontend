import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";

interface FormBtnDropProps {
  label: string;
  list: ItemType[];
  multiple: boolean;
  setValue?: React.Dispatch<React.SetStateAction<ItemType>>;
  setMultiValue?: React.Dispatch<React.SetStateAction<ItemType[]>>;
  icon?: string;
  setIsGroupSelected?: React.Dispatch<React.SetStateAction<boolean>>;
}

type ItemType = {
  id: number;
  name: string;
};

export function FormBtnDrop({
  label,
  list,
  multiple,
  icon,
  setIsGroupSelected,
  setValue,
  setMultiValue,
}: FormBtnDropProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemIsAdded, setItemIsAdded] = useState<boolean>(false);
  const [addedItems, setAddedItems] = useState<ItemType[]>([]);
  const [addedItem, setAddedItem] = useState<ItemType>();

  type ItemProps = {
    children: JSX.Element;
  };

  const Item = ({ children }: ItemProps) => {
    return (
      <div className="shadow-sm shadow-slate-900 rounded-full px-2 py-1 dark:text-gray-400 w-fit mx-1">
        {children}
      </div>
    );
  };

  const uniqueAddItems = (item: ItemType) => {
    const isDuplicate = addedItems.includes(item);
    if (!isDuplicate) {
      setAddedItems([...addedItems, item]);
      setMultiValue?.([...addedItems, item]);
    }
  };

  const AddItem = (item: ItemType) => {
    setAddedItem(item);
    setValue?.(item);
  };

  const clearAddedItem = () => {
    setItemIsAdded(false);
    setIsGroupSelected?.(false);
  };

  const handleAdd = (item: ItemType) => {
    multiple ? uniqueAddItems(item) : AddItem(item);
    setIsOpen(!isOpen);
    setItemIsAdded(true);
    setIsGroupSelected?.(true);
  };

  return (
    <div className="w-full border-y border-slate-800 dark:border-slate-500 mt-3 p-1 text-left">
      {!itemIsAdded ? (
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <h3>{label}</h3>
        </button>
      ) : multiple ? (
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center flex-wrap">
            {addedItems.map((item) => {
              return (
                <Item key={item.id}>
                  <h3>{item.name}</h3>
                </Item>
              );
            })}
            {multiple && <FaPlus />}
          </div>
        </button>
      ) : (
        <div>
          <div className="flex items-center">
            {icon === "Locat" && <MdLocationOn />}
            {icon === "Group" && <HiUserGroup />}
            <Item>
              <h3>{addedItem?.name}</h3>
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
        <div className="fixed w-[76vw] mx-2 p-2 bg-slate-200 rounded-b-md shadow-md text-black">
          <ul>
            {list.map((item: ItemType) => {
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      handleAdd(item);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
