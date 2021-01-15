import React from "react";
import { Pagination } from "react-bootstrap";

const JobPagination = ({
  page,
  setPage,
  hasNextPage,
}: {
  page: any;
  setPage: any;
  hasNextPage: boolean;
}) => {
  const adjustPage = (amount: any) => {
    setPage((prevPage: any) => prevPage + amount);
  };

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
      {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
    </Pagination>
  );
};

export default JobPagination;
