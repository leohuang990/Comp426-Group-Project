const questions = [
    {
      "id": 1,
      "question": "I am the life of the party",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 2,
      "question": "I feel little concern for others",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 3,
      "question": "I am always prepared",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 4,
      "question": "I get stressed out easily",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 5,
      "question": "I have a rich vocabulary",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 6,
      "question": "I don't talk a lot",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 7,
      "question": "I am interested in people",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 8,
      "question": "I leave my belongings around",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 9,
      "question": "I am relaxed most of the time",
      "category": "emotional_stability",
      "scale": 1
    },
    {
      "id": 10,
      "question": "I have difficulty understanding abstract ideas",
      "category": "intellect",
      "scale": -1
    },
    {
      "id": 11,
      "question": "I feel comfortable around people",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 12,
      "question": "I insult people",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 13,
      "question": "I pay attention to details",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 14,
      "question": "I worry about things",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 15,
      "question": "I have a vivid imagination",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 16,
      "question": "I keep in the background",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 17,
      "question": "I sympathize with other's feelings",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 18,
      "question": "I make a mess of things",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 19,
      "question": "I seldom feel blue",
      "category": "emotional_stability",
      "scale": 1
    },
    {
      "id": 20,
      "question": "I am not interested in abstract ideas",
      "category": "intellect",
      "scale": -1
    },
    {
      "id": 21,
      "question": "I start conversations",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 22,
      "question": "I am not interested in other people's problems",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 23,
      "question": "I get chores done right away",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 24,
      "question": "I am easily disturbed",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 25,
      "question": "I have excellent ideas",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 26,
      "question": "I have little to say",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 27,
      "question": "I have a soft heart",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 28,
      "question": "I often forget to put things back in their place",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 29,
      "question": "I get upset easily",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 30,
      "question": "I do not have a good imagination",
      "category": "intellect",
      "scale": -1
    },
    {
      "id": 31,
      "question": "I talk to a lot of different people at parties",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 32,
      "question": "I am not really interested in others",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 33,
      "question": "I like order",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 34,
      "question": "I change my mood a lot",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 35,
      "question": "I am quick to understand things",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 36,
      "question": "I don't like to draw attention to myself",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 37,
      "question": "I take time out for others",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 38,
      "question": "I shirk my duties",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 39,
      "question": "I have frequent mood swings",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 40,
      "question": "I use difficult words",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 41,
      "question": "I don't mind being the center of attention",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 42,
      "question": "I feel others' emotions",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 43,
      "question": "I follow a schedule",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 44,
      "question": "I get irritated easily",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 45,
      "question": "I spend time reflecting on things",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 46,
      "question": "I am quiet around strangers",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 47,
      "question": "I make people feel at ease",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 48,
      "question": "I am exacting in my work",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 49,
      "question": "I often feel blue",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 50,
      "question": "I am full of ideas",
      "category": "intellect",
      "scale": 1
    }
  ]

  export default function getQuestions(){
      return questions
  }