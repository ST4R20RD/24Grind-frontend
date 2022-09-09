export function Profile() {
  const categories = [
    {
      icon: "https://www.freeiconspng.com/thumbs/sports-icon-png/sports-running-icon-2.png",
      name: "Phisical Training",
    },
    {
      icon: "https://toppng.com/uploads/preview/open-book-icon-png-download-book-black-and-white-11563256975aruucvosij.png",
      name: "Reading",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/copywriting-3044590-2541240.png",
      name: "Copywriting",
    },
    {
      icon: "http://simpleicon.com/wp-content/uploads/pc.png",
      name: "Web Development",
    },
  ];
  return (
    <div className="">
      <section className="mx-2">
        <div className="flex">
          <img
            className="w-16 rounded-full"
            src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            alt="profile pic"
          />
          <h2 className="ml-3">Username</h2>
        </div>
        <div className="m-2">
          <h2>Echo chambers</h2>
          <button className="bg-gray-500 rounded-full p-1 flex">
            <img
              className="w-4 rounded-full"
              src="https://geodash.gov.bd/uploaded/people_group/default_group.png"
              alt="group pic"
            />
            <h3 className="mx-1">Grind Mindset</h3>
          </button>
        </div>
      </section>
      <section className="m-4">
        <div className="flex flex-wrap">
          <h2>Filters</h2>
          {categories.map((category) => (
            <button className="flex bg-gray-500 rounded-full p-1 m-1">
              <img
                className="w-4 rounded-full"
                src={category.icon}
                alt="filter icon"
              />
              <h3 className="mx-1">{category.name}</h3>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-center font-bold">Latest Grinds</h1>
      </section>
    </div>
  );
}
