import React from 'react';

const EmotionList = (props) => {
  const emotionList = props.emotions.map((emotions, index) => {

    return (
      <div className="single-entry-view-emotion" key={index}>
        {emotions.custom_emotion
          ? emotions.custom_emotion.name
          : emotions.default_emotion.name}
      </div>
    )
  })

  return (
    <>
      {emotionList}
    </>
  )
}

export default EmotionList;