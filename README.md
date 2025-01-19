# Mental Maths API

Simple API that generates random mental maths questions. Created by JD Hobbs / Jay for Minds Matter UK.

## Using with Axios

```javascript
// Get random question
axios.get('https://mentalmathsapi.netlify.app/api/question')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

// Get specific type/difficulty
axios.get('https://mentalmathsapi.netlify.app/api/question?type=multiplication&difficulty=hard')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

## Options
Types: `addition`, `subtraction`, `multiplication`, `division`, `percentages`
Difficulties: `easy`, `medium`, `hard`
