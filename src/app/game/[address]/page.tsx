import React, { ReactNode } from 'react'

export default function Home({ params }
  : {
    params: {id: string}
  }): ReactNode {
  return (
    <div>
      <p>Hello World!</p>
    </div>
  );

}