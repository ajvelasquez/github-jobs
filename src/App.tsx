import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Job from "./components/Job";
import JobPagination from "./components/JobPagination";
import SearchForm from "./components/SearchForm";
import useFetchJobs from "./customHooks/useFetchJobs";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, isLoading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (e: React.FormEvent<HTMLInputElement>) => {
    const param = e.currentTarget.name;
    const value =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;

    setPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      [param]: value,
    }));
  };

  return (
    <Container className="my-4">
      <h1>GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />

      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing.</h1>}
      {jobs.map((job: any) => (
        <Job key={job.id} job={job} />
      ))}

      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
