import { useEffect, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight , faPlus, faMinus, faSearch, faSortNumericDown, faChevronDown, faX } from '@fortawesome/free-solid-svg-icons';

function Gray({ children }: { children: ReactNode }) {
  return <span className="text-stone-200">
    {children}
  </span>
}

const MIN_TILE_SIZE = 2;
const MAX_TILE_SIZE = 8;

const TILE_SIZE_BASE = 10;

const DEFAULT_FILTERS = "all";
const DEFAULT_SORT_BY = "date";
const DEFAULT_SORT_ORDER_DESC = true;

interface Image {
  url: string,
  baseUrl: string,
  date: number,
  size: number,
  type: string,
  fileType: string;
  name: string;
}

interface Video {
  url: string,
  baseUrl: string,
  date: number,
  size: number,
  type: string,
  fileType: string;
  name: string;
}

export default function AppHome() {
  const [filters, setFilters] = useState<string>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_BY);
  const [sortOrderDesc, setSortOrderDesc] = useState<boolean>(DEFAULT_SORT_ORDER_DESC);

  const [sideBarOpen, setSidebarOpen] = useState<boolean>(true);
  const [sideBarPosition, setSidebarPosition] = useState<'left'|'right'>('left');
  const [tileSize, setTileSize] = useState<number>(5);
  const [totalFiles, setTotalFiles] = useState<number>(100);

  const [images, setImages] = useState<Image[]>([]); // Define state for images

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('https://s3.christiande.com/api/images.php');
        const baseUrl = 'https://s3.christiande.com/uploads/';
        const data = await response.json();
        // const baseUrl = 'https://images.unsplash.com/';
        // const data = [
        //   "photo-1750126833705-ba98013f16f3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1746311507414-bce6f67abb44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1750112938913-a174d739469c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1744019960830-eb79b2528f8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1749880783183-0a15dfa9e0c0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1743596259979-7c0d026abdcd?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1744816713148-9caf0e19f5cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "photo-1746294250258-a2c039ece448?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // ]
        // if (response.ok) {
          // const data = await response.json();
          setImages(data.map((image: any) => ({
              url: `${baseUrl}${image}`,
              baseUrl: image,
              date: Math.floor(Math.random() * (new Date('2010-12-31').getTime() - new Date('2000-01-01').getTime()) + new Date('2000-01-01').getTime()),
              size: Math.random() * 5_000_000, // MB
              type: Math.random() > 0.5 ? 'jpg' : 'png',
              fileType: 'image',
              name: `${["Alice","Bob","Carol","Dave","Eve"][Math.floor(Math.random()*5)]} ${["Smith","Johnson","Lee","Brown","Garcia"][Math.floor(Math.random()*5)]}`,
            })
          )); // Set the fetched data to the state
          setTotalFiles(data.length); // Set the total number of files
        // } else {
        //   console.error('Failed to fetch images:', response.status);
        // }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchFiles();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // const [videos, setVideos] = useState<Video[]>([]); // Define state for images

  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     try {
  //       const response = await fetch('https://v.s3.christiande.com/api/videos.php');
  //       const baseUrl = 'https://v.s3.christiande.com/uploads/';
  //       if (response.ok) {
  //         const data = await response.json();
  //         setVideos(data.map((video: any) => ({
  //             url: `${baseUrl}${video}`,
  //             baseUrl: video,
  //             date: Math.floor(Math.random() * (new Date('2010-12-31').getTime() - new Date('2000-01-01').getTime()) + new Date('2000-01-01').getTime()),
  //             size: Math.random() * 1_000_000_000, // GB
  //             type: Math.random() > 0.5 ? 'mp4' : 'mov',
  //             fileType: 'video',
  //             name: `${["Alice","Bob","Carol","Dave","Eve"][Math.floor(Math.random()*5)]} ${["Smith","Johnson","Lee","Brown","Garcia"][Math.floor(Math.random()*5)]}`,
  //           })
  //         )); // Set the fetched data to the state
  //         setTotalFiles(data.length); // Set the total number of files
  //       } else {
  //         console.error('Failed to fetch videos:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching videos:', error);
  //     }
  //   };

  //   fetchFiles();
  // }, []); // Empty dependency array ensures the effect runs only once after initial render

  function ZoomIn() {
    setTileSize(prev => Math.min(prev + 1, MAX_TILE_SIZE));
  }

  function ZoomOut() {
    setTileSize(prev => Math.max(prev - 1, MIN_TILE_SIZE));
  }

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        ZoomIn();
        // Your custom zoom in logic here
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        ZoomOut();
        // Your custom zoom out logic here
      }
    };

    const handleWheel = (e: any) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          ZoomIn();
          // Your custom zoom in logic here
        } else {
          ZoomOut();
          // Your custom zoom out logic here
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // const files = [...images, ...videos];
  const files = [...images];
  // files
  //   .sort((a, b) => sortBy === 'date' ? (sortOrderDesc ? b.date - a.date : a.date - b.date) : 0)
  //   .sort((a, b) => sortBy === 'size' ? (sortOrderDesc ? b.size - a.size : a.size - b.size) : 0)
  //   .sort((a, b) => sortBy === 'type' ? (sortOrderDesc ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type)) : 0)
  //   .sort((a, b) => sortBy === 'name' ? (sortOrderDesc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)) : 0);

  // const groupByMonthAndYear = (files: any[]) => {
  //   return files.reduce((acc, file) => {
  //     const date = new Date(file.date); // Convert the date to a Date object
  //     const year = date.getFullYear();
  //     const month = date.getMonth(); // 0-based index (0 = January, 11 = December)
  //     const monthYearKey = `${year}-${month}`;

  //     if (!acc[monthYearKey]) {
  //       acc[monthYearKey] = {
  //         year,
  //         month,
  //         files: []
  //       };
  //     }
  //     acc[monthYearKey].files.push(file);
  //     return acc;
  //   }, {});
  // };

  // const groupedFiles = groupByMonthAndYear(files); // Assuming files is already sorted

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  return (
    <main className={`bg-stone-900 h-screen overflow-hidden flex ${sideBarPosition === "left" ? "flex-row" : "flex-row-reverse"}`}>
      {
        sideBarOpen && (
          <div className="
          px-1 md:px-2 lg:px-4 xl:px-6
          w-full max-w-xs
          h-full
          bg-stone-900
          flex flex-col justify-between gap-2
          py-4
          ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="filters"><FontAwesomeIcon icon={faSearch} /> Filters:</label>
                <select name="filters" id="filters" defaultValue={filters} onChange={(e) => {
                  setFilters(e.target.value);
                  }} className="w-full bg-rose-600 text-white rounded-md px-2 py-1">
                  <option value="all">All</option>
                  <option value="photos">Photos</option>
                  <option value="videos">Videos</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="sort-by"><FontAwesomeIcon icon={faSortNumericDown} /> Sort by:</label>
                <select name="sort-by" id="sort-by" defaultValue={sortBy} onChange={(e) => {
                  setSortBy(e.target.value);
                  }} className="w-full bg-rose-600 text-white rounded-md px-2 py-1">
                  <option value="date">Date</option>
                  <option value="size">Size</option>
                  <option value="type">Type</option>
                  <option value="name">Name</option>
                  {/* <option value="location">Location</option> */}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="sort-order"><FontAwesomeIcon icon={faChevronDown} /> Sort order:</label>
                <button onClick={() => setSortOrderDesc(!sortOrderDesc)}
                  className="w-full bg-rose-600 text-white rounded-md px-2 py-1">
                  {sortOrderDesc ? "▼ descending" : "▲ ascending"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              no account setting yet..
              <button className="w-full bg-rose-600 text-white rounded-md px-2 py-1"
              onClick={() => setSettingsOpen(true)}>Settings</button>
            </div>
          </div>
        )
      }

      <div className="w-full flex flex-col justify-between">
        <div className="px-2 md:px-4 lg:px-8 xl:px-12 w-full h-12 bg-stone-900 flex flex-row justify-between items-center">
          <p>
            <button onClick={() => setSidebarOpen(!sideBarOpen)} className="text-rose-600 h-6 aspect-square">
              {sideBarOpen ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faArrowRight} />}
            </button> <b>Framize</b> app</p>

          <div className="flex flex-row gap-1 items-center">
              <label htmlFor="tileSize" className="w-full">
                  Tile size:
              </label>

              <button onClick={ZoomOut} className="text-rose-600 h-6 aspect-square">
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <input
                type="range"
                name="tileSize"
                id="tileSize"
                min={MIN_TILE_SIZE}
                max={MAX_TILE_SIZE}
                value={tileSize}
                onChange={(e) => setTileSize(Number(e.target.value))}
                className="
                  w-32 h-2 
                  appearance-none 
                  bg-gradient-to-r from-rose-500 to-rose-600 
                  rounded-full 
                  outline-none 
                  transition-all duration-200 
                  hover:brightness-110 focus:ring-2 focus:ring-rose-500
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:shadow-md 
                  [&::-webkit-slider-thumb]:transition-all 
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:h-4 
                  [&::-moz-range-thumb]:w-4 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:bg-white 
                  [&::-moz-range-thumb]:shadow-md
                "
              />

              <button onClick={ZoomIn} className="text-rose-600 h-6 aspect-square">
                <FontAwesomeIcon icon={faPlus} />
              </button>
          </div>
        </div>

        <div className="px-2 md:px-4 lg:px-8 xl:px-12 w-full h-full overflow-y-scroll">
          {/* <div className="flex flex-col gap-2"> */}
          <div
            className={`w-full grid grid-rows-auto gap-1 relative`}
            style={{
              gridTemplateColumns: `repeat(${TILE_SIZE_BASE - tileSize}, 1fr)`,
            }}>
            {files
              .slice()
              .filter((e) => {
                if (filters === 'videos') {
                  return e.fileType === 'video'; // Ensure it's 'video' (singular)
                } else if (filters === 'photos') {
                  return e.fileType === 'image'; // Ensure it's 'image' (singular)
                }
                return true; // If no filter is applied, return all items
              })
              .sort((a, b) => sortBy === 'date' ? (sortOrderDesc ? b.date - a.date : a.date - b.date) : 0)
              .sort((a, b) => sortBy === 'size' ? (sortOrderDesc ? b.size - a.size : a.size - b.size) : 0)
              .sort((a, b) => sortBy === 'type' ? (sortOrderDesc ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type)) : 0)
              .sort((a, b) => sortBy === 'name' ? (sortOrderDesc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)) : 0)
              .map((file: Image | Video, index: number) => (
              <div key={index}>
                <a href={`/app/view?fileUrl=${file.baseUrl}&fileType=${file.fileType}`}>
                  <img src={file.url} className="w-full h-full object-cover object-center" />
                </a>
              </div>
            ))}
            {/* {Object.keys(groupedFiles)
              .map((monthYearKey) => {
                const group = groupedFiles[monthYearKey];
                const monthNames = [
                  'January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'
                ];
                const monthName = monthNames[group.month];
                
                return (
                  <div key={monthYearKey}>
                    <h3>Month: {monthName} {group.year}</h3>
                    <div
                      className={`w-full grid grid-rows-auto gap-1 relative`}
                      style={{
                        gridTemplateColumns: `repeat(${TILE_SIZE_BASE - tileSize}, 1fr)`,
                      }}
                    >
                      {group.files.map((image: any, index: number) => (
                        <div key={index}>
                          <img src={image.url} className="w-full h-full object-cover object-center" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })} */}
          </div>
        </div>

        <div className="px-2 md:px-4 lg:px-8 xl:px-12 w-full h-8 bg-stone-900 flex flex-row justify-between items-center">
          <p>{totalFiles} <Gray>photos & videos</Gray> 📂</p>
          <p>Made by Christian LDE</p>
        </div>
      </div>

      {
        settingsOpen && (
          <section id="settings" className="fixed inset-0 bg-stone-950/75 grid place-items-center">
            <div className="w-full max-w-3xl h-fit bg-stone-900 rounded-md p-4 drop-shadow-lg flex flex-col gap-4">
              <div className="flex flex-row gap-2 justify-between items-center">
                <p><b>Settings</b></p>
                <button className="text-rose-600"
                  onClick={() => setSettingsOpen(false)}><FontAwesomeIcon icon={faX} /></button>
              </div>

              <div className="w-full h-[1px] bg-rose-600"></div>

              <div className="flex flex-col gap-3">
                <p>Application</p>
                <div className="bg-stone-800 rounded-md p-2 flex flex-row gap-2 justify-between items-center">
                  <p>Sidebar position</p>

                  <button onClick={() => setSidebarPosition(sideBarPosition == "right" ? "left" : "right")}
                    className="bg-rose-600 text-white rounded-md px-2 py-1">
                    {sideBarPosition}
                  </button>
                </div>

                <div className="bg-stone-800 rounded-md p-2 flex flex-row gap-2 justify-between items-center">
                  <p>Theme</p>

                  <button
                    className="bg-rose-600 text-white rounded-md px-2 py-1">
                    Light/Dark
                  </button>
                </div>

                <p>Server</p>
                <div className="bg-stone-800 rounded-md p-2 flex flex-row gap-2 justify-between items-center">
                  {/* <p>File server <b>(not yet working, just placeholder)</b></p> */}
                  <p>Placeholder Images from <b>s3.christiande.com</b></p>

                  <button className="bg-rose-600 text-white rounded-md px-2 py-1">
                    s3.christiande.com
                  </button>
                </div>

                <p>Account</p>
                <div className="bg-stone-800 rounded-md p-2 flex flex-row gap-2 justify-between items-center">
                  <p>no account setting yet.. probably later though, stay tuned!</p>
                </div>

                <small>v0.0.1b</small>

                <button className="mx-auto my-4 w-fit bg-rose-600 text-white rounded-md px-2 py-1">Log out <b>(just for placeholder)</b></button>
              </div>
            </div>
          </section>
        )
      }
    </main>
  );
}
