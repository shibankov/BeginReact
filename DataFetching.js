import React,{ useState,useEffect } from 'react'
// import axios from "axios"
import ReactPaginate from 'react-paginate'

function DataFetching() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [items,setItems] = useState([]);
  const [nav,setNav] = useState([]);
  const [offset, setOffset] = useState(0);

  const getData = async() =>{
    fetch('https://pickcase.ua/bitrix/services/main/ajax.php?action=generator&model=iphone-x&page=2&c=diva:rest&mode=ajax&lang=ru?action=generator&model=iphone-x&c=diva:rest&mode=ajax&lang=ru')
      .then((res) => res.json())
      .then(
        (res) =>{
          setIsLoaded(true);
          setItems(res.data.list);
          setNav(res.data.nav);
        },
        (error) =>{
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  const handlePageClick = (e) =>{
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
  };

  useEffect(() => {
    getData()
  }, [offset])
  const perPage = nav.pageSize;//Кол-во елементов на каждой страницы

  const pageCount = Math.ceil(nav.recordCount /  perPage);

  const currentPageItems = items
    .slice(offset, offset + perPage)
    .map((item) =>
      <div key={item.id} className="card-list__item">
        <img  src={'https://pickcase.ua' + item.img.[0].url} alt={item.name} loading="lazy"/>
        <h3 >{item.name}</h3>
      </div>
    );

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    }

    return (
      <div>
        <ul className="card-list">
          {currentPageItems}
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
