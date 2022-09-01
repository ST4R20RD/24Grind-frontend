import { GroupFace } from "./groupFace";

export function Groups() {
  const mockGroup: {id: number, img: string, name: string, members: number, grindCategories:[{name: string, icon: string},{name: string, icon: string},{name: string, icon: string},{name: string, icon: string}]} = {
    id: 1,
    img: "https://png.pngtree.com/png-vector/20190226/ourmid/pngtree-vector-leader-of-group-icon-png-image_705771.jpg",
    name: "Grind Minset",
    members: 4,
    grindCategories: [
      {
        name: "Phisical",
        icon: "https://www.freeiconspng.com/thumbs/sports-icon-png/sports-running-icon-2.png",
      },
      {
        name: "Reading",
        icon: "https://uxwing.com/wp-content/themes/uxwing/download/education-school/read-book-icon.png",
      },
      {
        name: "Programming",
        icon: "https://img.lovepik.com/element/45004/4973.png_860.png",
      },
      {
        name: "Writing",
        icon: "https://toppng.com/uploads/preview/free-icons-content-writing-icon-1155338932377vifqj92j.png",
      },
    ],
  };

  return (
    <div>
      <section>
        <form className="px-4">
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
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
      </section>
      <section className="text-center">
        <h1 className="my-3">My Groups</h1>
        <GroupFace group={mockGroup}/>
      </section>
    </div>
  );
}
