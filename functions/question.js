
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const questionTypes = {
    addition: {
        easy: () => generateAddition(1, 20),
        medium: () => generateAddition(20, 100),
        hard: () => generateAddition(100, 1000)
    },
    subtraction: {
        easy: () => generateSubtraction(1, 20),
        medium: () => generateSubtraction(20, 100),
        hard: () => generateSubtraction(100, 1000)
    },
    multiplication: {
        easy: () => generateMultiplication(1, 10),
        medium: () => generateMultiplication(10, 20),
        hard: () => generateMultiplication(20, 100)
    },
    division: {
        easy: () => generateDivision(1, 10),
        medium: () => generateDivision(10, 20),
        hard: () => generateDivision(20, 50)
    },
    percentages: {
        easy: () => generatePercentage('easy'),
        medium: () => generatePercentage('medium'),
        hard: () => generatePercentage('hard')
    }
};


const generateAddition = (min, max) => {
    const num1 = getRandomInt(min, max);
    const num2 = getRandomInt(min, max);
    return {
        question: `What is ${num1} + ${num2}?`,
        answer: num1 + num2
    };
};

const generateSubtraction = (min, max) => {
    const num1 = getRandomInt(min, max);
    const num2 = getRandomInt(min, num1);
    return {
        question: `What is ${num1} - ${num2}?`,
        answer: num1 - num2
    };
};

const generateMultiplication = (min, max) => {
    const num1 = getRandomInt(min, max);
    const num2 = getRandomInt(min, max);
    return {
        question: `What is ${num1} × ${num2}?`,
        answer: num1 * num2
    };
};

const generateDivision = (min, max) => {
    const divisor = getRandomInt(min, max);
    const answer = getRandomInt(min, max);
    const dividend = divisor * answer;
    return {
        question: `What is ${dividend} ÷ ${divisor}?`,
        answer: answer
    };
};

const generatePercentage = (difficulty) => {
    let number, percentage;
    switch(difficulty) {
        case 'easy':
            percentage = getRandomItem([10, 25, 50, 75, 100]);
            number = getRandomInt(1, 100);
            break;
        case 'medium':
            percentage = getRandomItem([20, 30, 40, 60, 70, 80, 90]);
            number = getRandomInt(1, 200);
            break;
        case 'hard':
            percentage = getRandomInt(1, 99);
            number = getRandomInt(1, 500);
            break;
    }
    return {
        question: `What is ${percentage}% of ${number}?`,
        answer: (number * percentage) / 100
    };
};


const generateQuestion = (type = null, difficulty = null) => {
    const types = Object.keys(questionTypes);
    const difficulties = ['easy', 'medium', 'hard'];
    
    const selectedType = type || getRandomItem(types);
    const selectedDifficulty = difficulty || getRandomItem(difficulties);
    
    if (!types.includes(selectedType)) {
        throw new Error('Invalid question type');
    }
    
    if (!difficulties.includes(selectedDifficulty)) {
        throw new Error('Invalid difficulty level');
    }

    const { question, answer } = questionTypes[selectedType][selectedDifficulty]();
    
    return {
        question,
        answer: Number(answer.toFixed(2)),
        type: selectedType,
        difficulty: selectedDifficulty
    };
};

exports.handler = async (event) => {
    try {
       
        const params = event.queryStringParameters || {};
        const { type, difficulty } = params;
        const question = generateQuestion(type, difficulty);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify(question)
        };
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
