import React, { useState, useEffect } from "react";
import { number } from "prop-types";

export const DOTS = "...";

function usePagination({currentPage, totalCount, pageSize}) {

  // const [pagination, setPagination] = useState<[string | number]>([])

  // const onPageSizeChanged = () 

  // total count is number of all posts
  // pageSize is how many post on one page
  // current page is page number
  return [1, 2, 3, DOTS, 5];
}

export default usePagination;
