import React from 'react';
import SingleEntryFeed from '../SingleEntryFeed';

const FeedList = props => {
  const feedList = props.entries.map(entry => {
    let entryDate = new Date(entry.created_at);
    let entryDay = entryDate.getDate();
    let entryMonth = entryDate.getMonth();
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let threeDaysAgo = new Date(currentDate.getDate() - 3);

    if (
      entryMonth === currentMonth &&
      entryDay <= currentDay &&
      entryDay >= threeDaysAgo
    ) {
      return <SingleEntryFeed key={entry.id} entryData={entry} />;
    } else {
      return null;
    }
  });

  return <>{feedList}</>;
};

export default FeedList;
