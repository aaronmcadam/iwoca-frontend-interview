import React from "react";
import styles from "./SingleApplication.module.css";
import cn from "classnames";

const SingleApplication = ({ application }) => {
  return (
    <li className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a href={`mailto:${application.email}`}>{application.email}</a>
      </div>
      <div className={cn(styles.cell, styles.numeric)}>
        <sub>Loan Amount</sub>
        {application.loan_amount}
      </div>
      <div className={cn(styles.cell, styles.numeric)}>
        <sub>Application Date</sub>
        {application.date_created}
      </div>
      <div className={cn(styles.cell, styles.numeric)}>
        <sub>Expiry date</sub>
        {application.expiry_date}
      </div>
    </li>
  );
};

export default SingleApplication;
