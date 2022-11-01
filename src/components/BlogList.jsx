import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState, useEffect } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];
const ALL_POSTS = blogs.posts

function BlogList() {

  const [currentPaginationData, setCurrentPaginationData] = useState(ALL_POSTS.slice(0, 15))
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setCurrentPageSize] = useState(15)

  const updateRowsPerPage = (pageSize) => {
    const numberedPageSize = parseInt(pageSize)
    setCurrentPageSize(numberedPageSize)
  };
  const updatePage = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const updatePosts = () => {
    const startPostIdx = (currentPage - 1) * currentPageSize
    const endPostIdx = startPostIdx + currentPageSize
    setCurrentPaginationData(ALL_POSTS.slice(startPostIdx, endPostIdx))
  }

  useEffect(() => {
    updatePosts()
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
    updatePosts()
  }, [currentPageSize])

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={currentPageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not modify the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
