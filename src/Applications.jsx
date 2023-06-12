import React, { useEffect } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";

const FETCH_LIMIT = 5;

const Applications = () => {
  const [status, setStatus] = React.useState("idle");
  const [page, setPage] = React.useState(1);
  const [applications, setApplications] = React.useState([]);

  useEffect(() => {
    async function fetchApplications() {
      setStatus("loading");
      try {
        const request = await fetch(
          `/api/applications?_page=${page}&_limit=${FETCH_LIMIT}`
        );

        if (!request.ok) {
          setStatus("error");
        }

        const data = await request.json();
        setStatus("success");

        setApplications((currentApplications) => [
          ...currentApplications,
          ...data,
        ]);
      } catch (error) {
        setStatus("error");
      }
    }

    fetchApplications();
  }, [page]);

  function loadMore() {
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <div className={styles.Applications}>
      {status === "loading" ? (
        <p className={styles.Center}>Loading...</p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className={styles.Center}>
          Failed to load applications.
        </p>
      ) : null}
      {status === "success" ? (
        <>
          <ul>
            {applications.map((application) => (
              <SingleApplication
                key={application.id}
                application={application}
              />
            ))}
          </ul>
          <div className={styles.Center}>
            <Button onClick={loadMore}>Load more</Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Applications;
