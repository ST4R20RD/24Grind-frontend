import { Link, useLocation } from "react-router-dom";

interface groupProp {
  group: {
    id: number;
    img: string;
    name: string;
    members: number;
    grindCategories: [
      { name: string; icon: string },
      { name: string; icon: string },
      { name: string; icon: string },
      { name: string; icon: string }
    ];
  };
}

export function GroupFace({
  group: { id, img, name, members, grindCategories },
}: groupProp) {
    const { pathname } = useLocation();
  return (
    <Link to={`${pathname}/${id}`} >
      <button className="flex flex-col w-11/12 bg-gray-400 m-auto p-2 rounded-lg">
        <div className="flex items-center justify-between mx-2">
          <img className="h-16 rounded-full mx-2" src={img} alt="group img" />
          <div className="flex flex-col">
            <h1 className="text-bold">{name}</h1>
            <div className="flex p-1 mx-2 border border-black rounded-full">
              {grindCategories.map((category: any) => (
                <img
                  className="h-3 mx-2"
                  src={category.icon}
                  alt="categoryIcon"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full text-right">
          <h1 className="px-3">Members: {members}</h1>
        </div>
      </button>
    </Link>
  );
}
