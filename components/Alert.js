
import React from 'react'

export default ({ children }) =>
  <p className="error">
    {children}
    <style jsx>{`
      .error {
        color: red;
      }
    `}</style>
  </p>