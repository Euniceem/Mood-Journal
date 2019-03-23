import React from 'react';

const EmotionList = (props) => {

  const emotionList = props.emotions.map((emotions, index) => {
    return (
      <div className="single-entry-view-emotion" key={index}>
        <div className="emotion-name">
          {emotions.custom_emotion
            ? emotions.custom_emotion.name
            : null}

          {emotions.default_emotion
            ? emotions.default_emotion.name
            : null
          }:
        </div>
        <div className="emotion-percent">
          {emotions.percent} %
        </div>
      </div>
    );
  })

  return (
    <>
      {emotionList}
    </>
  )
}

export default EmotionList;