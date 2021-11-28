import React from 'react'

export const LoadingIndicator = ({ loading = false }) => {
  return (
        <div className={`loader ${loading ? 'active' : 'hidden'}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
  )
}
