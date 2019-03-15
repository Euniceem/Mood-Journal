import React from 'react';
import SingleEntryFeed from '../SingleEntryFeed';

const FeedList = (props) => {
  const feedList = props.entries.map(entry => {
    // console.log('feedlist', entry)
    return (
      <SingleEntryFeed key={entry.id}
        entryData={entry}
      />
    )
  })

  return (
    <>
      {feedList}
    </>
  )
}

export default FeedList;