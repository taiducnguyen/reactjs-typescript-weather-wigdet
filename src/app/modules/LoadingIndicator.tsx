import React from 'react'

interface ILoadingIndicatorProp {
  loading: boolean;
  className: string;
}
const LoadingIndicator = ({ loading = false, className = '' }: ILoadingIndicatorProp) => {
  return (
    <div className={`loading__loader ${className} ${loading ? 'active' : 'hidden'}`}>
      <div className="loading__line"></div>
      <div className="loading__line"></div>
      <div className="loading__line"></div>
    </div>
  )
}
export default LoadingIndicator
