import React from 'react';
import SingleEntryFeed from '../SingleEntryFeed';

const FeedList = (props) => {
  const feedList = props.entries.map(entry => {

    let entryDate = new Date(entry.created_at)
    let entryDay = entryDate.getDate()
    let currentDate = new Date()
    let currentDay = currentDate.getDate();
    let threeDaysAgo = currentDate.getDate() - 3;

    if (entryDay >= threeDaysAgo && entryDay <= currentDay) {

      return (
        <SingleEntryFeed key={entry.id}
          entryData={entry}
        />
      )
    } else {
      return null
    }
  })

  return (
    <>
      {feedList}
    </>
  )
}

export default FeedList;