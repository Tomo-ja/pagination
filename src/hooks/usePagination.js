import { useState } from "react";

export const DOTS = "...";

export const initialState = [1, 2, 3, DOTS, 5];

function usePagination(totalCount) {
  const [pagination, setPagination] = useState(initialState)

  let maximumPage = Math.ceil(totalCount / 15)
  let possiblePages = Array.from({length: maximumPage}, (_, i) => i + 1)

  const isUpdateRequired = () => {
    return possiblePages.length >= 5
  }

  const isPaginationNeeded = (pageSize) => {
    if (totalCount <= pageSize) {
      setPagination([1])
      return false
    }
    return true
  }

  const createPagination = (page) => {
    switch(page) {
      case 1:
      case 2:
        setPagination([1, 2, 3, DOTS, maximumPage])
        break
      case 3:
        setPagination([1,2,3,4,DOTS, maximumPage])
        break
      case maximumPage - 2 :
        setPagination([1,DOTS, maximumPage - 3, maximumPage - 2, maximumPage - 1, maximumPage])
        break
      case maximumPage -1:
      case maximumPage:
        setPagination([1, DOTS, maximumPage - 2, maximumPage - 1, maximumPage])
        break
      default:
        setPagination([1, DOTS, page - 1, page, page + 1, DOTS, maximumPage])
    }
  }


  const handlePageChanged = (page, pageSize) => {
    createPagination(page, pageSize)
  }

  const handlePageSizeChanged = (pageSize) => {
    maximumPage = Math.ceil(totalCount / pageSize)
    possiblePages = Array.from({length: maximumPage}, (_, i) => i + 1)
    if (isUpdateRequired() && isPaginationNeeded(pageSize)) {
      createPagination(1, pageSize)
    }
  }

  return [
    pagination,
    {
      setPageNumber: handlePageChanged,
      setPageSize: handlePageSizeChanged
    }
  ];
}

export default usePagination;
