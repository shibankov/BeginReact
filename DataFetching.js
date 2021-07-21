import React,{ useState,useEffect } from 'react'
// import axios from "axios"
import ReactPaginate from 'react-paginate'

function DataFetching() {
  const [items,setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage,setCurrentPage] = useState(1);

  const PER_PAGE = 10;//Кол-во елементов на каждой страницы
  const offset = currentPage * PER_PAGE;//Кол-во елементов который были отображены на предыдущих страницах

  const currentPageData = items
    .slice(offset, offset + PER_PAGE)
    .map(item =>(
      <li key={item.id} className="card-list__item">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </li>
    ));

  const pageCount = Math.ceil(items.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  useEffect(() =>{
    fetch('https://pickcase.ua/bitrix/services/main/ajax.php?action=generator&model=iphone-x&page=2&c=diva:rest&mode=ajax&lang=ru?action=generator&model=iphone-x&c=diva:rest&mode=ajax&lang=ru ')
      .then((res) => res.json())
      .then(
      (res) =>{
        setIsLoaded(true);
        setItems(res);
        // console.log(res)

      },
      (error) =>{
        setIsLoaded(true);
        setError(error);
      }
      )
    },[]);

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    }

    return (

      <div>
        <ul className="card-list">
          {currentPageData}
        </ul>
        <ReactPaginate
          pageCount = {pageCount}
          onPageChange={handlePageClick}
          containerClassName = {"pagination"}
          pageClassName = {"pagination__li"}
          pageLinkClassName= {"pagination__link"}
          disabledClassName={"pagination__link-disabled"}
          activeClassName={"pagination__link-active"}
        />

      </div>
    );
}

export default DataFetching
