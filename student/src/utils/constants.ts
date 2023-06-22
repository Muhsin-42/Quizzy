export const serverBaseUrl = 'http://localhost:8000/'

export let quizQuestions = [
    {
      _id: 'randomId1',
      difficulty: 'easy',
      title: 'ReactJs Quiz',
      description: 'Easy Quiz to enhance react learning',
      totalQuestions: 5,
      tags:['Rect','Js','Redux'],
      questions: [
        {
          _id: '1',
          question: 'What is React?',
          options: ['A library', 'A framework', 'Reacting to someone', 'None of the above'],
          answer: 1
        },
        {
          _id: '2',
          question: 'What is JSX?',
          options: ['JavaScript XML', 'JavaScript Extension', 'Java Syntax Extension', 'None of the above'],
          answer: 1,
          },
        {
          _id: '3',
          question: 'What is state in React?',
          options: ['A JavaScript object', 'A React component', 'A function', 'None of the above'],
          answer: 4
        },
        {
          _id: '4',
          question: 'What is a React component?',
          options: ['A reusable piece of code', 'A stateless function', 'A class', 'All of the above'],
          answer: 4,
        },
        {
          _id: '5',
          question: 'What is the virtual DOM in React?',
          options: ['A lightweight copy of the real DOM', 'A concept used in React Native', 'A component hierarchy', 'None of the above'],
          answer: 1
        }
      ],
    },
    {
        _id: 'randomId2',
        difficulty: 'hard',
        title: 'JavaScript Quiz',
        description: 'Easy Quiz to enhance react learning',
        totalQuestions: 5,
        tags:['Rect','Js','Redux'],
        questions: [
            {
                _id: '6',
                question: 'What is the purpose of the render() method in React?',
                options: ['To render JSX elements', 'To update the state', 'To handle events', 'None of the above'],
                answer: 1,
              },
              {
                _id: '7',
                question: 'What is the use of keys in React lists?',
                options: ['To identify elements uniquely', 'To iterate over an array', 'To apply styles', 'None of the above'],
                answer: 2,
              },
              {
                _id: '8',
                question: 'What is React Router?',
                options: ['A routing library for React', 'A built-in feature of React', 'A state management tool', 'None of the above'],
                answer: 3,
              },
              {
                _id: '9',
                question: 'What is the purpose of propTypes in React?',
                options: ['To validate component props', 'To define component styles', 'To create reusable components', 'None of the above'],
                answer: 4
              },
              {
                _id: '10',
                question: 'What is the significance of componentDidMount() in React?',
                options: ['To fetch data from an API', 'To update the state', 'To handle events', 'None of the above'],
                answer: 2
              }
        ]
    }
]  