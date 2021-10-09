import React from 'react';

interface IIndexProps {
  testString: string;
}

const Index: React.FC<IIndexProps> = ({testString}) => {
  return (
    <>
      <h1>INDEX PAGE</h1>
      <p>{testString}</p>
    </>
  );
};

export default Index;
