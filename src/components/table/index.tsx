import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './table.module.scss';

interface ITableProps {
  className?: string;
  thead: React.ReactElement;
  tbody: React.ReactElement[];
}

export const CustomTable: React.FC<ITableProps> = ({
  className = '', thead, tbody,
}) => (
  <div className={className}>
    <Table responsive="sm" className={styles.table}>
      <thead>
        {thead}
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </Table>
    <div className={styles.rawSeparator} />
  </div>
);
