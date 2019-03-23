import React from 'react';

const EmotionList = (props) => {
  console.log(props.emotions);

  const emotionList = props.emotions.map((emotions, index) => {
    console.log(emotions.default_emotion);
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