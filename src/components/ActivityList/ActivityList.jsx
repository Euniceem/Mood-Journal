import React from 'react';

const ActivityList = (props) => {
  const activityList = props.activities.map((activities, index) => {
    return (
      <div className="single-entry-view-activity" key={index}>
        {activities.custom_activity
          ? activities.custom_activity.name
          : activities.default_activity.name}
      </div>
    )
  })
  return (
    <>
      {activityList}
    </>
  )

}

export default ActivityList;