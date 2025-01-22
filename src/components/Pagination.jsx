import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from 'react-router-dom';

export default function PaginationX({ pageno, newpage }) {
  
  const [page,setpage]=useState([1,2,3,4])
  const [status, setStatus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      let curr = parseInt(inputValue, 10);
      if (!isNaN(curr)) {
       
        setpage([curr+1,curr+2,curr+3,curr+4])
        setStatus(false);
        newpage(curr) 
      }
    }
  }
  function handle(num) {
    if (num === page[page.length - 1]) {
      setpage((prev) => prev.map((num) => num + 3));
    } else if (num === 'prev') {
      if (page[0] > 1) {
        setpage((prev) => prev.map((num) => num - 1));
      }
    } else if (num === 'next') {
      setpage((prev) => prev.map((num) => num + 1));
    }
    if(!isNaN(num)) newpage(num)
      else {
    if(num=='prev') newpage(pageno-1)
      else newpage([pageno]+1)
      }
  }

  return (
    <Pagination className='bg-black  w-max p-1 h-max top-0 border rounded-xl border-gray-400 '>
      <PaginationContent className='w-max flex-col '>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handle('prev')}
            className='rotate-90 p-2 border  '
          />
        </PaginationItem>

       
        {page?.map((e, i) => (
          <PaginationItem key={i} onClick={() => handle(e)}>
            <Link to={'#'}>
              <PaginationLink>{e}</PaginationLink>
            </Link>
          </PaginationItem>
        ))}

        <PaginationItem onClick={() => setStatus(true)}>
          {status ? (
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className='w-5 bg-background text-foreground overflow-hidden p-1 border-white border-2'
            />
          ) : (
            <PaginationEllipsis />
          )}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => handle('next')}
            className='rotate-90 p-2 border'
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
