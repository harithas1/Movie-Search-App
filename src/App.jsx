import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { debounce } from "lodash";

function App() {
  const [searchQuery, setSearchQuery] = useState();
  // const [movies, setMovies] = useState([]);
  const [movies, setMovies] = useState([
    // array of randome 10 telugu movies
    {
      Title: "Arya",
      Year: "2022",
      imdbID: "tt1365519",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMWZiNTNjZTMtYTIyOC00NGM0LWE3YjgtMDFhNDM5MzBiZjIyXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Vikram",
      Year: "2022",
      imdbID: "tt9179430",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZTYxYmJiZWItMTZkYi00Yjg5LWE3Y2UtMGE4N2Y5NzhlNzljXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Darling",
      Year: "2010",
      imdbID: "tt1649303",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTM4ODk3OTctNjg4YS00MWY0LTk1MzctM2MzNzk5YTI2MGQyXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Dangal",
      Year: "2016",
      imdbID: "tt5074352",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg",
    },
    {
      Title: "Sita Ramam",
      Year: "2022",
      imdbID: "tt20850406",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWE0NDNiNzEtNThmMi00NjZlLTk3NDAtYzIzOWNmNWQyYTI3XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pushpa: The Rise - Part 1",
      Year: "2021",
      imdbID: "tt1630029",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOWE4YWEyNjYtMWFiNC00M2IzLWE3ZGMtMjQ0ZGEyOWI1YjAzXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Krishna Vrinda Vihari",
      Year: "2022",
      imdbID: "tt19893706",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BODRjNzA5NTktMDM2YS00YzhlLWIyMTMtNDNiOGYwZTk4ZjYzXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "K.G.F: Chapter 1",
      Year: "2018",
      imdbID: "tt7562110",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BM2M0YmIxNzItOWI4My00MmQzLWE0NGYtZTM3NjllNjIwZjc5XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Amaran",
      Year: "2024",
      imdbID: "tt27118357",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNTAzMGQ2MGItMjk5OC00YWIwLThmMjUtYmNjMTIxNzVlZWQ4XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Mayabazar",
      Year: "1957",
      imdbID: "tt0249795",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzAxYmQyNGItZTdiZC00MTZhLTgzMDEtOGE2YzQyMmRkNDhlXkEyXkFqcGc@._V1_SX300.jpg",
    },
  ]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("movie");
  // const [year, setYear] = useState("");

  const fetchMovies = debounce(async (page) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(
        `${apiUrl}&type=${type}&s=${searchQuery}&page=${page}`
        // `${apiUrl}&type=${type}&s=${searchQuery}&y=${year}&page=${page}`
      );
      const data = await response.json();
      setMovies(data.Search || []);
      setNoOfPages(Math.round(data.totalResults / 10));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(1); // always start from page 1 on new search
  };

  const onPageChange = (newPage, event) => {
    event.preventDefault();
    setPage(newPage);
    fetchMovies(newPage);
  };

  // Handling years dynamically based on movie data
  // const years = [...new Set(movies.map((movie) => movie.Year))];

  //ellipsis
  const generatePaginationItems = () => {
    const paginationItems = [];
    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(page + 2, noOfPages);

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(i);
    }

    if (startPage > 1) {
      paginationItems.unshift("...");
    }

    if (endPage < noOfPages) {
      paginationItems.push("...");
    }

    return paginationItems;
  };

  return (
    <section className="flex flex-col items-center gap-2 mt-4 ">
      <h1 className="text-3xl font-bold text-blue-700">Movies Zone</h1>
      <form onSubmit={handleSearch} className="p-3">
        <section className="flex justify-center gap-4 sm: flex-col lg:flex-row">
          <input
            className="border-2 border-gray-200 rounded-md p-2 m-2 w-64"
            type="search"
            value={searchQuery}
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <select
            className="border-2 border-gray-200 rounded-md p-2 m-2"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
          {/* <select
            className="border-2 border-gray-200 rounded-md p-2 m-2"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select> */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2"
          >
            Search
          </button>
        </section>
      </form>

      <div className="flex flex-wrap gap-4 justify-evenly mt-4">
        {movies.map((movie) => (
          <section
            key={movie.imdbID}
            className="border-2 border-gray-200 rounded-md p-4 flex flex-col items-center gap-2 w-60 justify-evenly"
          >
            <h2 className="font-bold text-center">{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img
              className="size-52 rounded-md"
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://picsum.photos/200"
              }
              alt={movie.Title}
            />
            <a
              href={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://picsum.photos/200"
              }
              className="border-2 border-gray-200 rounded-md p-2 m-2 bg-blue-500 text-white text-center w-full cursor-pointer"
            >
              Download Poster
            </a>

            {/* download poster */}
          </section>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => onPageChange(page - 1, event)}
              disabled={page === 1} // Disable previous when on first page
            />
          </PaginationItem>

          {/* {[...Array(noOfPages).fill(0)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={(event) => onPageChange(index + 1, event)}
                isActive={page === index + 1}
                href="#"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))} */}

          {generatePaginationItems().map((item, index) => (
            <PaginationItem key={index}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={(event) => onPageChange(item, event)}
                  isActive={page === item}
                  href="#"
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => onPageChange(page + 1, event)}
              disabled={page === noOfPages} // Disable next when on last page
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}

export default App;
