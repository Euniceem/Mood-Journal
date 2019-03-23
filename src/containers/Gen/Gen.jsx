import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateEntries } from '../../actions';

class GenDataButton extends Component {
  constructor(props) {
    super(props);

    this.generate = this.generate.bind(this);
  }

  generate() {
    const gen1 = () => {
      const start = new Date('2019-02-22 17:30:21.637+00');
      const end = new Date();

      for (let i = 0; i < 31; i++) {
        const startHour = 18;
        const endHour = 22;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 4)
              : Math.round(Math.random() + 3.5),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [3, Math.random() > 0.7 ? 1 : 5],
          custom_activities: Math.random() > 0.4 ? [1] : [],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(40 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(90 + Math.random() * 10)
                  : Math.ceil(80 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(15 + Math.random() * 10)
                  : Math.ceil(15 + Math.random() * 10)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }

      for (let i = 0; i < 31; i++) {
        const startHour = 10;
        const endHour = 14;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 3.5)
              : Math.round(Math.random() + 2),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [
            date.getDay() === 6 || date.getDay() === 0 ? 4 : 1
          ],
          custom_activities: [
            date.getDay() === 6 || date.getDay() === 0 ? 2 : 4
          ],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(60 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(80 + Math.random() * 10)
                  : Math.ceil(60 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(15 + Math.random() * 10)
                  : Math.ceil(20 + Math.random() * 10)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }

      for (let i = 0; i < 31; i++) {
        const startHour = 5;
        const endHour = 8;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 4)
              : Math.round(Math.random() + 3.5),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [Math.random() > 0.7 ? 1 : 3],
          custom_activities: Math.random() > 0.4 ? [5] : [1],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(70 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(90 + Math.random() * 10)
                  : Math.ceil(80 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(15 + Math.random() * 10)
                  : Math.ceil(20 + Math.random() * 10)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }
    };

    const gen2 = () => {
      const start = new Date('2019-01-22 17:30:21.637+00');
      const end = new Date('2019-02-21 17:30:21.637+00');

      for (let i = 0; i < 31; i++) {
        const startHour = 18;
        const endHour = 22;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 3.5)
              : Math.round(Math.random() + 2),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [3, Math.random() > 0.7 ? 1 : 4],
          custom_activities: Math.random() > 0.4 ? [1] : [],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(30 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(70 + Math.random() * 10)
                  : Math.ceil(60 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(25 + Math.random() * 10)
                  : Math.ceil(30 + Math.random() * 20)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }

      for (let i = 0; i < 31; i++) {
        const startHour = 10;
        const endHour = 14;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 2.5)
              : Math.round(Math.random() + 1),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [
            date.getDay() === 6 || date.getDay() === 0 ? 4 : 1
          ],
          custom_activities:
            date.getDay() === 6 || date.getDay() === 0 ? [2, 3] : [4],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(50 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(60 + Math.random() * 10)
                  : Math.ceil(50 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(30 + Math.random() * 10)
                  : Math.ceil(40 + Math.random() * 20)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }

      for (let i = 0; i < 31; i++) {
        const startHour = 5;
        const endHour = 8;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 3.5)
              : Math.round(Math.random() + 3),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [Math.random() > 0.7 ? 1 : 3],
          custom_activities: [1],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(60 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(70 + Math.random() * 10)
                  : Math.ceil(60 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(25 + Math.random() * 10)
                  : Math.ceil(30 + Math.random() * 10)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }
    };

    const gen3 = () => {
      const start = new Date('2018-12-021 17:30:21.637+00');
      const end = new Date('2019-01-21 17:30:21.637+00');

      for (let i = 0; i < 31; i++) {
        const startHour = 18;
        const endHour = 22;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 2)
              : Math.round(Math.random() + 1),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [3, Math.random() > 0.7 ? 1 : 4],
          custom_activities: Math.random() > 0.4 ? [1] : [],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(20 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(40 + Math.random() * 10)
                  : Math.ceil(30 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(20 + Math.random() * 10)
                  : Math.ceil(25 + Math.random() * 20)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }

      for (let i = 0; i < 31; i++) {
        const startHour = 10;
        const endHour = 14;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 1)
              : Math.round(Math.random() + 0.5),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [
            date.getDay() === 6 || date.getDay() === 0 ? 4 : 1
          ],
          custom_activities:
            date.getDay() === 6 || date.getDay() === 0 ? [2, 3] : [4],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(30 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(30 + Math.random() * 10)
                  : Math.ceil(20 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(35 + Math.random() * 10)
                  : Math.ceil(45 + Math.random() * 20)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }

      for (let i = 0; i < 31; i++) {
        const startHour = 5;
        const endHour = 8;

        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        const hour = startHour + Math.random() * (endHour - startHour);
        date.setHours(hour);

        let entry = {
          mood_id:
            date.getDay() === 6 || date.getDay() === 0
              ? Math.round(Math.random() + 2.5)
              : Math.round(Math.random() + 1.5),
          notes: `Lorem ipsum dolor sit amet`,
          default_activities: [Math.random() > 0.7 ? 1 : 3],
          custom_activities: [1],
          default_emotions: [
            {
              default_emotion_id: 1,
              percent: Math.ceil(20 + Math.random() * 10)
            },
            {
              default_emotion_id: 2,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(40 + Math.random() * 10)
                  : Math.ceil(30 + Math.random() * 10)
            },
            {
              default_emotion_id: 4,
              percent:
                date.getDay() === 6 || date.getDay() === 0
                  ? Math.ceil(35 + Math.random() * 10)
                  : Math.ceil(35 + Math.random() * 10)
            }
          ],
          custom_emotions: [],
          created_at: date.toLocaleString()
        };
        this.props.generate(entry);
      }
    };

    gen1();
    gen2();
    gen3();
  }

  render() {
    return <button onClick={this.generate}>generate</button>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    generate: entry => dispatch(generateEntries(entry))
  };
};

GenDataButton = connect(
  null,
  mapDispatchToProps
)(GenDataButton);

export default GenDataButton;
