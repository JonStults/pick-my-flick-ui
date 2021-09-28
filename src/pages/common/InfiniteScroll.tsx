import React, {useRef, useState, useEffect} from 'react';
import {Loader} from 'semantic-ui-react';

interface InfiniteScrollProps {
  className?: string;
  waiting?: boolean;
  dataLength: number;
  totalDataLength: number;
  page: number;
  children: React.ReactNode;
  onLoad: (...args: any) => void;
}

const InfiniteScroll = ({onLoad, dataLength, totalDataLength, page, className, children, waiting}: InfiniteScrollProps) => {
  const [showLoader, setShowLoader] = useState(false);
  const [refLoaded, setRefLoaded] = useState(false);
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (scrollRef.current && !waiting) {
      if (scrollRef.current.clientHeight > 0) {
        if (scrollRef.current.scrollHeight === scrollRef.current.clientHeight) {
          if (dataLength < totalDataLength) {
            onLoad(page + 1, true);
          }
        }
      } else {
        if (!refLoaded) {
          setRefLoaded(true);
        }
      }
    }
  })

  function handleScroll (e: any) {
    if ((scrollRef.current.scrollHeight - scrollRef.current.clientHeight) === e.target.scrollTop) {
      if (dataLength < totalDataLength) {
        if (!showLoader) {
          setShowLoader(true);
        }
        onLoad(page + 1, true);
      }
    } else {
      if (showLoader) {
        setShowLoader(false);
      }
    }
  }

  return (
    <div className={className} onScroll={(e) => handleScroll(e)} ref={scrollRef}>
      {children}
      <div style={{position: 'relative', height: dataLength < totalDataLength ? '60px' : 0}}>
        {
          (showLoader || waiting) && dataLength > 0 && dataLength !== totalDataLength &&
          <Loader active />
        }
      </div>
    </div>
  )
}

export default InfiniteScroll;